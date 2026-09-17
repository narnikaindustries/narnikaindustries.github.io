# Narnika Industries website

Static, responsive website for GitHub Pages. No build step or package dependencies are required.

## Preview

```sh
python3 -m http.server 8000
```

Open http://localhost:8000. To check page links and JavaScript syntax:

```sh
python3 scripts/check_site.py
node --check js/main.js
```

## Pages

- `index.html`: brand introduction, product categories, business applications.
- `products.html`: bagasse, standard paper, and customized paper enquiry categories.
- `about.html`: company story and purpose.
- `sustainability.html`: approach and product evaluation FAQs.
- `contact.html`: email enquiry preparation and downloadable brief.
- `privacy.html`: actual website data handling.
- `404.html`: root-relative custom GitHub Pages error page.

Older template URLs redirect to their relevant replacement pages. Shared styling is in `css/style.css`; mobile navigation and enquiry behavior are in `js/main.js`. Header and footer markup is static in each page so navigation remains available without JavaScript.

## Enquiries

The business email is **sales@ekomorph.com**. The form validates inputs and opens a `mailto:` draft; visitors review and send the email through their email app. A downloadable text brief is available if no email client is configured or the draft is too long for a client. There is no server-side form service and no automatic delivery confirmation. Form data is not stored by this website.

## Content and imagery

`img/ekomorph-editorial.jpg` is an AI-generated editorial concept, not a photo of verified stock. Product sections disclose that images are illustrative and that specifications and availability require confirmation. Replace this visual with approved product photography when available. The source generation file remains outside this repository; the optimized JPEG is self-contained here.

The confirmed business scope is bagasse and paper products, with custom paper products for HoReCa as the current specialty, standard non-customized paper options, and expansion into retail, medical, and other packaging sectors. Hyderabad, India is the stated location. No customer counts, certifications, export coverage, manufacturing capacity, lead times, or product-specific technical claims have been invented.

The original template license and its attribution remain. Legacy libraries and images are retained for provenance, but redesigned pages do not load them.

## Publishing

The site remains compatible with the existing GitHub Pages repository. Commit and push through your usual review/deployment process. The root `CNAME` preserves the existing GitHub Pages custom domain, `www.narnikaindustries.com`, recovered from the remote main branch. Keep this file in the published root. Canonical URLs, Open Graph image URLs, organization URLs, redirects, `robots.txt`, and `sitemap.xml` use `https://www.narnikaindustries.com/`; update these together if changing domains.


## EkoMorph brand page and catalogue

`ekomorph.html#catalogue` includes the supplied **EkoMorph Product Catalogue 2026** with a real cover preview, view/download links, file size, and an eight-category index linking to PDF pages. The original 21-page PDF is preserved byte-for-byte at `catalogues/EkoMorph_Product_Catalogue_2026.pdf` (29,741,327 bytes). The PDF is not embedded or preloaded, keeping normal page loads lightweight. The cover JPEG is rendered from page 1.

The PDF contact page lists +91 91580 11100 and +91 83283 72792. The website deliberately retains the user-confirmed +91 73307 46504. The supplied PDF has not been edited. Category information is taken from its contents and category pages; detailed specifications remain in the source PDF.

When replacing the catalogue, update the PDF, cover preview, page count, file size, and category page links together. Run `python3 scripts/check_site.py` afterwards.

Phone: **+91 73307 46504** (`tel:+917330746504`). The product concept image uses EkoMorph sample branding; it is not an approved production artwork file.
