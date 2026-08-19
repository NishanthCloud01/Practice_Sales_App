const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  use: {
    // When running tests, target this URL
    baseURL: 'http://localhost', 
    headless: true,
  },
});
