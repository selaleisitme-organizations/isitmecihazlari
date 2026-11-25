// Runs after "vite build" and the SSR build (see package.json "build"). For every page in src/seo/pages.js it
// writes dist/<page>.html: the page's own title, description, canonical, Open Graph tags and the clinic's
// structured data in <head>, and the page's rendered content inside #root. Vercel serves these with cleanUrls,
// so crawlers that do not run JavaScript read the real page; in the browser React then takes over as before.
// Unknown addresses get dist/404.html (noindex), which Vercel answers with a real 404 status.
import { readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const serverEntry = path.join(root, "dist-server", "entry-server.js");

const { render, PAGES, NOT_FOUND, BUSINESS, SITE_URL, SITE_NAME, DEFAULT_OG_IMAGE } = await import(
  pathToFileURL(serverEntry).href
);

const template = await readFile(path.join(dist, "index.html"), "utf8");

function escapeAttr(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

// The tags the template ships with for every page; each page gets its own versions instead.
const REPLACED = [
  /<title>[\s\S]*?<\/title>\s*/i,
  /<meta\s+name="description"[^>]*>\s*/i,
  /<meta\s+name="keywords"[^>]*>\s*/i,
  /<meta\s+name="robots"[^>]*>\s*/i,
];

function headFor(urlPath, page, noindex) {
  const url = urlPath ? `${SITE_URL}${urlPath === "/" ? "/" : urlPath}` : null;
  const image = `${SITE_URL}${page.ogImage ?? DEFAULT_OG_IMAGE}`;
  const tags = [
    `<title>${escapeAttr(page.title)}</title>`,
    `<meta name="description" content="${escapeAttr(page.description)}" />`,
    `<meta name="robots" content="${noindex ? "noindex, follow" : "index, follow"}" />`,
    url && `<link rel="canonical" href="${url}" />`,
    `<meta property="og:title" content="${escapeAttr(page.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(page.description)}" />`,
    url && `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(page.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(page.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<script type="application/ld+json">${JSON.stringify(BUSINESS).replace(/</g, "\u003c")}</script>`,
  ];
  return tags.filter(Boolean).join("\n    ");
}

function pageHtml(urlPath, page, { noindex = false, renderPath = urlPath } = {}) {
  let html = template;
  for (const pattern of REPLACED) html = html.replace(pattern, "");
  html = html.replace("</head>", `    ${headFor(noindex ? null : urlPath, page, noindex)}\n  </head>`);
  let body = "";
  try {
    body = render(renderPath);
  } catch (error) {
    // The head alone still gives crawlers the right title and description; the browser renders the body.
    console.warn(`prerender: ${renderPath} rendered head only (${error.message})`);
  }
  return html.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

const written = [];
for (const [urlPath, page] of Object.entries(PAGES)) {
  const file = urlPath === "/" ? "index.html" : `${urlPath.slice(1)}.html`;
  await writeFile(path.join(dist, file), pageHtml(urlPath, page));
  written.push(file);
}
await writeFile(path.join(dist, "404.html"), pageHtml(null, NOT_FOUND, { noindex: true, renderPath: "/404" }));
written.push("404.html");

// The SSR bundle was only needed to render; it must not be deployed.
await rm(path.join(root, "dist-server"), { recursive: true, force: true });
console.log(`prerender: ${SITE_NAME} — wrote ${written.join(", ")}`);
