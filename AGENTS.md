# Branch Agent Instructions

These rules apply to the entire repository. Use them to prepare a working environment and validate changes before opening pull requests.

## Environment setup
- Prefer Python 3.11+ and create an isolated virtual environment in the repo root (`python -m venv .venv && source .venv/bin/activate`).
- When working in Python projects, install dependencies from the most specific file available (`requirements.txt`, `dev_requirements.txt`, or `pyproject.toml`). For example:
  - `pip install -r api_test_pytest_fw/dev_requirements.txt`
  - `pip install -r pytest_test/dev_req.txt`
  - `pip install -e .` in `react_agent` if using the included `pyproject.toml`.
- For Java code under `java_test/`, use the bundled Maven wrapper/installation on the system; no additional setup beyond JDK is expected.
- For Playwright JavaScript code under `playwright_javascript/PlayWright`, install Node modules with `npm ci` to honor the lockfile.

## Test execution
- Run Python test suites with `pytest` from the corresponding project root (e.g., `cd api_test_pytest_fw && pytest`).
- Run Java checks from `java_test/` with `mvn test`.
- Run Playwright JavaScript tests from `playwright_javascript/PlayWright` with `npx playwright test` after installing dependencies.
- If a change only affects a subset of projects, it is acceptable to run tests for the impacted project(s) only.

## Reporting
- Summarize executed setup steps and tests (including commands) in the final response for visibility.
