import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";

import AppRoutes from "./AppRoutes.jsx";

// Build-time only (scripts/prerender.mjs): the HTML one page shows before its JavaScript runs.
export function render(url) {
  return renderToString(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>
  );
}

export { BUSINESS, DEFAULT_OG_IMAGE, NOT_FOUND, PAGES, SITE_NAME, SITE_URL } from "./seo/pages.js";
