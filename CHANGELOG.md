# Changelog

All notable changes to **problem-consciousness** are documented here.
The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Git version control for the project (first tracked baseline).
- `CHANGELOG.md` — auditable release history.
- `tests/pc-gate.test.js` — dependency-free tests for the PreToolUse gate covering
  the deny / ack-unlock / already-unlocked / fail-open paths.
- `scripts/check-version.sh` — guards against version-string drift across
  `plugin.json`, `marketplace.json`, and `SUBMISSION.md`.
- `.github/workflows/ci.yml` — CI runs strict plugin validation, the gate tests,
  and the version-consistency check on every push and pull request.

### Fixed
- Version drift: `SUBMISSION.md` listed `0.2.0` while the plugin shipped `0.3.0`.

## [0.3.0]

- 84 skills (81 method + 3 governance: `meta-problem-layer`, `problem-state-machine`,
  `peer-cross-check`).
- Two hooks: `SessionStart` advisory reminder + `PreToolUse` first-mutation gate
  (`pc-gate.js`, fail-open).
- Passes `claude plugin validate --strict`.
