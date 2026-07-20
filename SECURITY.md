# Security Policy

Awesome Graph Engineering publishes a curated resource list and a static GitHub Pages website. It ships no executable dependencies to users; its main security risks are malicious or hijacked external links and injection defects in the website.

## Reporting

- **Malicious or hijacked link** (a listed resource now serves malware, phishing, or a parked-domain takeover): report it privately via [GitHub private vulnerability reporting](https://github.com/ChaoYue0307/awesome-graph-engineering/security/advisories/new) or email <hechaoyue0307@gmail.com>. It will be removed first and investigated second.
- **Website issue** (XSS or injection in `docs/`): same channels as above.
- Anything else (typos, dead-but-harmless links): a normal public issue is fine.

## Scope

- In scope: every URL in `README.md`, `data/`, and `docs/`; the static site under `docs/`.
- Out of scope: vulnerabilities in the third-party projects this list links to — report those upstream to the project itself.

Reports are reviewed on a best-effort basis. Confirmed malicious links are removed before further investigation.
