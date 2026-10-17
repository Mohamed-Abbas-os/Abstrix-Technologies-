# Abstrix Technologies – Corporate Website

Static site: HTML5, CSS3, vanilla JavaScript. No build step, backend, database or paid service.

```
index.html  css/style.css  js/script.js  assets/ (logo.png, logo.svg, favicon.svg, og-image.png)  robots.txt  sitemap.xml
```
Open `index.html` in a browser to preview locally.

## Deploy to GitHub Pages
1. Create a repository and upload all files to the root.
2. Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)` → Save.
3. Your site appears at `https://<username>.github.io/<repo>/`. All asset paths are relative, so project-repo hosting works.

## After choosing the final URL, replace `YOUR-USERNAME.github.io/YOUR-REPO`
- `index.html`: `<link rel="canonical">`, `og:url`, `og:image`
- `robots.txt`: `Sitemap:` line
- `sitemap.xml`: `<loc>`

## Add real projects
Edit the `PROJECTS` array at the top of `js/script.js`. Copy an entry, set `placeholder:false`, and fill in `name`, `problem`, `features`, `tech`, `github`, and `demo` (leave `""` to hide). Delete the sample placeholders when you have genuine work. Never present samples as client work.

## Contact form
It validates input, then opens the visitor's email app with a prefilled message to Mohamed.abbas.devops@gmail.com via `mailto:`. The visitor must press send; the site shows no "sent" confirmation and stores nothing. A fallback link is shown. To use an external form service later, document its privacy implications first.

## Notes
- The official logo is `assets/logo.png` (resized from the supplied artwork). `logo.svg`/`favicon.svg` are a simple original A mark.
- No tracking, analytics, API keys or credentials are included.
- Lighthouse scores have not been measured; run Lighthouse in Chrome DevTools after deployment.
