# Playwright ChatGPT Agent Instructions

These instructions apply to everything inside `playwright_chatgpt/`.

## Environment setup
- Use Node.js 18+.
- Install JavaScript dependencies from this folder with `npm ci`.
- After installing dependencies, install required Playwright browsers with `npx playwright install chromium` (or `npx playwright install --with-deps` if system dependencies are missing).
- For the Python `playwright-pytest/` helper, create a virtual environment and install dependencies with `pip install pytest playwright`.

## Test execution
- Run JavaScript Playwright tests from this folder with `npx playwright test`.
- Run the Python smoke test with `pytest playwright-pytest` after ensuring browsers are installed via `python -m playwright install chromium` if needed.

## Reporting
- In final responses, mention any setup commands you executed and list the exact test commands you ran, noting any failures or skipped suites.
