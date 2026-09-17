"""Check local pages for broken resources, links, anchors, and basic metadata."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import json

ROOT = Path(__file__).resolve().parents[1]
class Page(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path, self.links, self.ids, self.h1, self.description = path, [], set(), 0, False
        self.feed(path.read_text())
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            assert attrs['id'] not in self.ids, f'{self.path.name}: duplicate id {attrs["id"]}'
            self.ids.add(attrs['id'])
        if tag == 'h1': self.h1 += 1
        if tag == 'meta' and attrs.get('name') == 'description': self.description = bool(attrs.get('content'))
        for key in ('src', 'href'):
            if key in attrs: self.links.append(attrs[key])

pages = {p: Page(p) for p in ROOT.glob('*.html')}
count = 0
for path, page in pages.items():
    redirect = 'http-equiv="refresh"' in path.read_text()
    if not redirect:
        assert page.h1 == 1, f'{path.name}: expected one h1'
        assert page.description, f'{path.name}: missing description'
    for link in page.links:
        assert link, f'{path.name}: empty link'
        url = urlsplit(link)
        if url.scheme or url.netloc: continue
        target = ((ROOT / unquote(url.path).lstrip('/')) if url.path.startswith('/') else (path.parent / unquote(url.path))) if url.path else path
        assert target.exists(), f'{path.name}: missing {link}'
        if url.fragment and target in pages:
            assert url.fragment in pages[target].ids, f'{path.name}: missing anchor {link}'
        count += 1
print(f'PASS: {len(pages)} pages, {count} local links/resources, headings, descriptions, and anchors.')

assert (ROOT / "CNAME").read_text().strip() == "www.narnikaindustries.com", "Missing or unexpected GitHub Pages custom domain"
print("PASS: GitHub Pages CNAME preserved.")
