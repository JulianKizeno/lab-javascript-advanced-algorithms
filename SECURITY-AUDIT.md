# Security review — 2026-11-14

This is a partial remediation, not a certification that the repository is free of vulnerabilities. Changes remain in a draft pull request pending review.

User-supplied stack and queue values now use textContent so markup is not executed. Vendored jQuery was upgraded from 3.1.1 to 3.7.1; the downloaded asset was verified against its SHA-256 SRI value.
