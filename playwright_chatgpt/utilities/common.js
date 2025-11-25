// utilities/common.js
const LOG_PREFIX = '[TEST LOG]';

function logStep(message, prefix = LOG_PREFIX) {
  console.log(`${prefix} ${message}`);
}

async function enterText(locator, text) {
  try {
    await locator.fill(text);
  } catch (err) {
    throw new Error(`Failed to enter text into locator: ${err.message || err}`);
  }
}

async function clickSubmit(locator) {
  try {
    await locator.click();
  } catch (err) {
    throw new Error(`Failed to click submit: ${err.message || err}`);
  }
}

async function clickCancel(locator) {
  try {
    await locator.click();
  } catch (err) {
    throw new Error(`Failed to click cancel: ${err.message || err}`);
  }
}

async function selectAnOptionFromDropDown(locator, option) {
  try {
    await locator.selectOption(option);
  } catch (err) {
    throw new Error(`Failed to select option "${option}" from dropdown: ${err.message || err}`);
  }
}

module.exports = {
  logStep,
  enterText,
  clickSubmit,
  clickCancel,
  selectAnOptionFromDropDown  
};
