# Terminal Commands Documentation

This document contains a record of all terminal commands executed in this project with detailed explanations.

## Command Log

### Date: November 16, 2025

---

*Commands will be logged here as you execute them in the terminal.*

## Command Reference Guide

### Common Command Types

#### Navigation Commands
- `cd <directory>` - Changes the current directory to the specified path
- `dir` - Lists files and folders in the current directory (Windows)
- `pwd` - Prints the current working directory

#### Node.js & Package Management
- `npm install` - Installs dependencies listed in package.json
- `npm run <script>` - Runs a script defined in package.json
- `npm test` - Runs test suite
- `npx <command>` - Executes a package without installing globally

#### Git Commands
- `git status` - Shows current branch and changes
- `git add <files>` - Stages files for commit
- `git commit -m "<message>"` - Creates a commit with a message
- `git push` - Pushes commits to remote repository
- `git pull` - Fetches and merges remote changes

#### Playwright Specific
- `npx playwright install` - Installs Playwright browsers
- `npx playwright test` - Runs Playwright tests
- `npx playwright codegen` - Opens Playwright inspector for recording tests
- `npx playwright test -g "has title" --project=chromium` -  This runs tests against chrome browser
- `npx playwright test -g "has title" --project=chromium --headed` -  This runs tests against chrome browser in headed mode. -g flag runs the test has title only.
- `npx playwright test --ui` -  This runs tests in playwright ui mode.
---

## Notes

As you execute commands, they will be documented here with:
1. **Command**: The exact command typed
2. **Explanation**: What the command does
3. **Output/Result**: Any relevant output or result

Please share the commands you'd like to document, and I'll add them to this file with detailed explanations.
