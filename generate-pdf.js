// generate-pdf.js
// Uses Playwright (already installed) to render documentation.html
// and export it as a high-quality A4 PDF.

const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log('🚀 Starting PDF generation...');

  // Launch a headless Chromium browser
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  // Set viewport to A4 width in pixels at 96dpi (794px wide)
  await page.setViewportSize({ width: 794, height: 1123 });

  // Build the absolute file path to documentation.html
  const htmlPath = path.resolve(__dirname, 'documentation.html');
  const fileUrl = `file:///${htmlPath.replace(/\\/g, '/')}`;

  console.log(`📄 Opening: ${fileUrl}`);
  await page.goto(fileUrl, { waitUntil: 'networkidle' });

  // Wait for Google Fonts to load
  await page.waitForTimeout(3000);

  // Output PDF path
  const pdfPath = path.resolve(__dirname, 'documentation.pdf');

  // Generate the PDF
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,   // Include all background colors and gradients
    margin: {
      top: '0mm',
      right: '0mm',
      bottom: '0mm',
      left: '0mm',
    },
    displayHeaderFooter: false,
  });

  await browser.close();

  // Confirm the file was created
  const stats = fs.statSync(pdfPath);
  const fileSizeKB = (stats.size / 1024).toFixed(1);

  console.log('');
  console.log('✅ SUCCESS! PDF Generated!');
  console.log(`📁 File: ${pdfPath}`);
  console.log(`📦 Size: ${fileSizeKB} KB`);
  console.log('');
  console.log('Open the file in File Explorer to view your documentation.');
})();
