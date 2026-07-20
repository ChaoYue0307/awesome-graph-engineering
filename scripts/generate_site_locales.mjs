#!/usr/bin/env node

/**
 * Generate crawlable localized website routes from docs/index.html.
 *
 * The English page remains the source template. Localized copy is imported from
 * docs/i18n.js so the static HTML and client-side language layer cannot drift.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT_DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(SCRIPT_DIR, "..");
const DEFAULT_SOURCE = resolve(ROOT, "docs/index.html");
const DEFAULT_I18N = resolve(ROOT, "docs/i18n.js");
const DEFAULT_OUTPUT_ROOT = resolve(ROOT, "docs");
const SITE_URL = "https://chaoyue0307.github.io/awesome-graph-engineering/";

function parseArguments(argv) {
  const options = {
    check: false,
    source: DEFAULT_SOURCE,
    i18n: DEFAULT_I18N,
    outputRoot: DEFAULT_OUTPUT_ROOT,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--check") {
      options.check = true;
      continue;
    }
    if (["--source", "--i18n", "--output-root"].includes(argument)) {
      const value = argv[index + 1];
      if (!value) throw new Error(`${argument} requires a path`);
      index += 1;
      const key = argument === "--output-root" ? "outputRoot" : argument.slice(2);
      options[key] = resolve(value);
      continue;
    }
    throw new Error(`Unknown argument: ${argument}`);
  }

  return options;
}

async function loadTranslations(path) {
  const source = await readFile(path, "utf8");
  const moduleUrl = `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`;
  const module = await import(moduleUrl);
  if (!module.copy || !module.localeConfig) {
    throw new Error(`${path} must export copy and localeConfig`);
  }
  return { copy: module.copy, localeConfig: module.localeConfig };
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeRegularExpression(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function localeUrl(locale) {
  return locale === "en" ? SITE_URL : `${SITE_URL}${locale}/`;
}

function isLocalReference(value) {
  return !/^(?:[a-z][a-z0-9+.-]*:|\/\/|\/|#)/i.test(value);
}

function localizeElements(html, strings) {
  const pattern = /(<([a-z][\w-]*)\b[^>]*\bdata-i18n="([^"]+)"[^>]*>)[\s\S]*?(<\/\2>)/gi;
  let replacements = 0;
  const output = html.replace(pattern, (_, opening, _tag, key, closing) => {
    if (!Object.hasOwn(strings, key)) throw new Error(`docs/i18n.js has no copy for HTML key ${key}`);
    replacements += 1;
    return `${opening}${escapeHtml(strings[key])}${closing}`;
  });
  if (replacements === 0) throw new Error("Template does not contain any data-i18n elements");
  return output;
}

function setAttribute(html, pattern, value, label) {
  let replacements = 0;
  const output = html.replace(pattern, (_, before, after = "") => {
    replacements += 1;
    return `${before}${escapeHtml(value)}${after}`;
  });
  if (replacements === 0) throw new Error(`Template does not contain ${label}`);
  return output;
}

function localizeStructuredData(html, locale, strings, url) {
  const pattern = /(<script\b[^>]*\btype="application\/ld\+json"[^>]*>)[\s\S]*?(<\/script>)/i;
  const match = html.match(pattern);
  if (!match) throw new Error("Template does not contain JSON-LD structured data");

  const payloadMatch = match[0].match(/<script\b[^>]*>([\s\S]*?)<\/script>/i);
  let payload;
  try {
    payload = JSON.parse(payloadMatch[1]);
  } catch (error) {
    throw new Error(`Template JSON-LD is invalid: ${error.message}`);
  }

  const graph = Array.isArray(payload["@graph"]) ? payload["@graph"] : [];
  const pages = graph.filter((node) => {
    const types = Array.isArray(node?.["@type"]) ? node["@type"] : [node?.["@type"]];
    return types.includes("WebPage");
  });
  if (pages.length !== 1) throw new Error(`Template must contain exactly one WebPage JSON-LD node; found ${pages.length}`);

  const page = pages[0];
  page["@id"] = `${url}#webpage`;
  page.url = url;
  page.name = strings.metaTitle;
  page.description = strings.metaDescription;
  page.inLanguage = locale;

  const serialized = JSON.stringify(payload, null, 2)
    .replaceAll("<", "\\u003c")
    .split("\n")
    .map((line) => `    ${line}`)
    .join("\n");
  return html.replace(pattern, `${match[1]}\n${serialized}\n  ${match[2]}`);
}

function localizeHtml(template, locale, strings, localeConfig) {
  let html = template;
  const url = localeUrl(locale);
  const shortTitle = strings.metaTitle.split(" — ")[0];

  html = setAttribute(html, /(<html\b[^>]*\blang=")[^"]*(")/i, locale, "html lang");
  html = setAttribute(html, /(<html\b[^>]*\bdata-locale=")[^"]*(")/i, locale, "html data-locale");
  html = setAttribute(html, /(<title>)[\s\S]*?(<\/title>)/i, strings.metaTitle, "title");
  html = setAttribute(html, /(<meta\s+name="description"\s+content=")[^"]*(")/i, strings.metaDescription, "meta description");
  html = setAttribute(html, /(<meta\s+property="og:title"\s+content=")[^"]*(")/i, shortTitle, "Open Graph title");
  html = setAttribute(html, /(<meta\s+property="og:description"\s+content=")[^"]*(")/i, strings.metaDescription, "Open Graph description");
  html = setAttribute(html, /(<meta\s+property="og:locale"\s+content=")[^"]*(")/i, localeConfig[locale].og, "Open Graph locale");
  html = setAttribute(html, /(<meta\s+property="og:url"\s+content=")[^"]*(")/i, url, "Open Graph URL");
  html = setAttribute(html, /(<meta\s+name="twitter:title"\s+content=")[^"]*(")/i, shortTitle, "Twitter title");
  html = setAttribute(html, /(<meta\s+name="twitter:description"\s+content=")[^"]*(")/i, strings.metaDescription, "Twitter description");
  html = setAttribute(html, /(<link\s+rel="canonical"\s+href=")[^"]*(")/i, url, "canonical URL");

  for (const candidate of Object.keys(localeConfig)) {
    const hreflang = escapeRegularExpression(candidate);
    html = setAttribute(
      html,
      new RegExp(`(<link\\s+rel="alternate"\\s+hreflang="${hreflang}"\\s+href=")[^"]*(")`, "i"),
      localeUrl(candidate),
      `hreflang ${candidate}`,
    );
  }
  html = setAttribute(
    html,
    /(<link\s+rel="alternate"\s+hreflang="x-default"\s+href=")[^"]*(")/i,
    localeUrl("en"),
    "hreflang x-default",
  );
  html = localizeStructuredData(html, locale, strings, url);

  html = localizeElements(html, strings);

  const heroLabel = [strings["hero.line1"], strings["hero.line2"], strings["hero.line3"]].join(" ");
  html = setAttribute(html, /(<h1\b[^>]*\baria-label=")[^"]*(")/i, heroLabel, "hero aria-label");

  // Every generated locale route is one directory below the English source.
  // Prefix only local file references; fragments and absolute URLs stay intact.
  html = html.replace(/\b(href|src)="([^"]+)"/gi, (match, attribute, value) => (
    isLocalReference(value) ? `${attribute}="../${value}"` : match
  ));
  html = html.replace(/\bsrcset="([^"]+)"/gi, (_, value) => {
    const localized = value.split(",").map((candidate) => {
      const parts = candidate.trim().split(/\s+/);
      if (isLocalReference(parts[0])) parts[0] = `../${parts[0]}`;
      return parts.join(" ");
    });
    return `srcset="${localized.join(", ")}"`;
  });

  return `${html.trimEnd()}\n`;
}

function renderSitemap(locales, lastModified) {
  const rows = locales
    .map((locale) => `  <url><loc>${localeUrl(locale)}</loc><lastmod>${lastModified}</lastmod></url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows}\n</urlset>\n`;
}

async function checkOrWrite(path, content, check) {
  if (check) {
    let current;
    try {
      current = await readFile(path, "utf8");
    } catch {
      throw new Error(`Missing generated file: ${path}`);
    }
    if (current !== content) throw new Error(`Generated file is stale: ${path}`);
    return;
  }
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, content, "utf8");
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  const [template, translations] = await Promise.all([
    readFile(options.source, "utf8"),
    loadTranslations(options.i18n),
  ]);
  const { copy, localeConfig } = translations;
  const locales = Object.keys(localeConfig);
  if (!copy.en) throw new Error("docs/i18n.js must define English copy");
  const lastModified = template.match(/"dateModified"\s*:\s*"(\d{4}-\d{2}-\d{2})"/)?.[1];
  if (!lastModified) throw new Error("docs/index.html must declare a dateModified value");

  for (const locale of locales.filter((candidate) => candidate !== "en")) {
    if (!copy[locale]) throw new Error(`docs/i18n.js has no copy for ${locale}`);
    const output = localizeHtml(template, locale, copy[locale], localeConfig);
    await checkOrWrite(resolve(options.outputRoot, locale, "index.html"), output, options.check);
  }
  await checkOrWrite(resolve(options.outputRoot, "sitemap.xml"), renderSitemap(locales, lastModified), options.check);

  const action = options.check ? "verified" : "generated";
  console.log(`Static locale routes ${action}: ${locales.filter((locale) => locale !== "en").join(", ")}`);
}

main().catch((error) => {
  console.error(`Locale generation failed: ${error.message}`);
  process.exitCode = 1;
});
