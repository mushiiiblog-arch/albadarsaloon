# Al Baddar Barbers — website

A static HTML/CSS website with no build step and no database. Upload the folder as it is to any web host.

## Files

```
index.html                 Home page (hero video, services, gallery, FAQ, contact + map)
about.html                 About Us page (story, why choose us, then & now, team)
contact.html               Contact page (call / WhatsApp / directions, map, hours, WhatsApp booking form)
services/*.html            8 service pages (price, details, "Get Appointment" → WhatsApp)
404.html                   "Page not found" page
assets/css/style.css       All styles
assets/js/main.js          Gallery slider, scroll reveal, photo thumbnails, video control (site works without it)
assets/video/              Hero video (WebM + MP4)
assets/img/                Photos (WebP), logo, favicons, og-image.jpg (social share image)
sitemap.xml  robots.txt    For Google
site.webmanifest           App icon / theme colour for phones
.htaccess                  HTTPS redirect, caching, 404 (Apache hosts only)
```

## Before going live — 3 steps

1. **Set your domain.** These files use `https://www.albaddarbarbers.co.uk` as a placeholder. If your domain is different, use find-and-replace across the folder to change it everywhere. It appears in the canonical tags, the social share tags, the structured data (schema), `sitemap.xml`, `robots.txt` and `.htaccess`.
2. **Check the WhatsApp number.** Every WhatsApp button opens a chat with `441273494283` (the shop landline). This only works if WhatsApp Business is set up on that number. If you use a mobile instead, replace `wa.me/441273494283` with `wa.me/447XXXXXXXXX` in all the HTML files.
3. **Upload** everything, including the hidden `.htaccess` file, to your host's public folder (usually `public_html`).

## Hero video

`assets/video/hero-shop.webm` (≈660 KB) and `hero-shop.mp4` (≈730 KB, for Safari) — your vertical shop video, served from your own site (no YouTube), so it works everywhere. It shows a still frame first and only starts downloading after the page has loaded, so it never slows the first screen. It plays muted on a loop, pauses when scrolled off-screen and stays still for visitors who turn on "reduce motion". To swap it, replace both files (and `assets/img/hero-shop-poster.webp`) keeping the same names; vertical 9:16 videos fit the frame best.

## Speed

- Phone home page loads ~310 KB in 8 requests; main content paints in ~0.4 s with zero layout shift (tested on simulated fast 4G).
- Photos have 400/800 px versions so phones download small files; below-the-fold images lazy-load.
- CSS/JS are minified (`style.min.css`, `main.min.js` — edit `style.css` / `main.js`, then re-minify or point the pages at the unminified files).
- Fonts load without blocking the page. For the last bit of speed, self-host Oswald + Manrope (e.g. via google-webfonts-helper) and replace the Google Fonts link.
- Turn on HTTPS + HTTP/2 or HTTP/3 and gzip/brotli at your host (the `.htaccess` enables caching and gzip on Apache). A CDN such as Cloudflare (free) helps further.

## After going live — Google

- Add the site to **Google Search Console**, then submit `https://YOUR-DOMAIN/sitemap.xml`.
- In **Google Business Profile**, set the website link to your domain. Make sure the name, address and phone number match the site exactly: *Al Baddar Barbers, 3 Aleys, High St, Henfield BN5 9HP, 01273 494283*. Matching details across the web help local rankings.
- Test the structured data at https://search.google.com/test/rich-results.

## Changing prices or opening hours

Prices and opening hours appear in several places: the home page cards, the menu dropdown, the footer, each service page, the FAQ and the structured data in each page's `<head>`. Use find-and-replace, for example `£21` → `£22`.

## SEO included

- A unique title, description, canonical link, Open Graph and Twitter card on every page, plus local geo tags
- Structured data (JSON-LD):
  - home page: `HairSalon`/`LocalBusiness` (address, hours, prices, social profiles), `WebSite`, `WebPage`, `FAQPage`
  - each service page: `Service` with `Offer`, and `BreadcrumbList`
- One H1 per page, alt text on every photo, image width and height set to stop the layout jumping, lazy-loaded images, WebP photos
- Accessible: skip link, keyboard focus styles, labelled buttons, and a reduced-motion setting is respected
- `sitemap.xml`, `robots.txt`, favicons, web manifest, custom 404 page

No reviews or star ratings are included. Google penalises review markup the site creates itself. Link to your Google reviews instead.

## Privacy note

The YouTube video and the Google map can set cookies once a visitor loads the page. UK sites should have a short privacy/cookie page. Add one before launch, or ask your web developer.
