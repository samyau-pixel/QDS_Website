# Screenshot capture script for Sunbird dcTrack
# Uses Playwright via Node.js for reliability

$targetDir = "C:\Users\Sam\QDS_web\qds-web\content\vendors\sunbird-dcim\solutions\dc-track-test-drive\images"
$url = "https://info2.sunbirddcim.com/dctrack-test-drive/"

# Create images directory if it doesn't exist
if (-not (Test-Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
}

# Create a simple Node.js script for Playwright
$nodeScript = @"
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    try {
        await page.goto('https://info2.sunbirddcim.com/dctrack-test-drive/', { waitUntil: 'networkidle', timeout: 60000 });
        
        // Wait for page to fully load
        await page.waitForTimeout(3000);
        
        // Capture full page screenshot
        await page.screenshot({ 
            path: 'C:/Users/Sam/QDS_web/qds-web/content/vendors/sunbird-dcim/solutions/dc-track-test-drive/images/screenshot-01-fullpage.png',
            fullPage: true
        });
        console.log('Captured full page screenshot');
        
        // Capture viewport screenshot
        await page.screenshot({ 
            path: 'C:/Users/Sam/QDS_web/qds-web/content/vendors/sunbird-dcim/solutions/dc-track-test-drive/images/screenshot-02-viewport.png',
            fullPage: false
        });
        console.log('Captured viewport screenshot');
        
        // Try to capture specific sections if they exist
        const sections = await page.$$eval('section, div.hero, div.content', els => els.length);
        if (sections > 0) {
            // Capture hero section
            const hero = await page.$('section.hero, div.hero, div.content');
            if (hero) {
                await hero.screenshot({ 
                    path: 'C:/Users/Sam/QDS_web/qds-web/content/vendors/sunbird-dcim/solutions/dc-track-test-drive/images/screenshot-03-hero.png'
                });
                console.log('Captured hero section');
            }
        }
        
    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await browser.close();
    }
})();
"@

$nodeScript | Out-File -FilePath "C:\Users\Sam\QDS_web\qds-web\temp\capture-screenshots.js" -Encoding utf8

# Check if Playwright is installed
$playwrightCheck = & node -e "try { require('playwright'); console.log('ok'); } catch(e) { console.log('not-installed'); }" 2>&1

if ($playwrightCheck -eq "not-installed") {
    Write-Host "Installing Playwright..."
    & npm install playwright --prefix "C:\Users\Sam\QDS_web\qds-web"
    & npx playwright install chromium --prefix "C:\Users\Sam\QDS_web\qds-web"
}

# Run the screenshot capture
Write-Host "Capturing screenshots..."
& node "C:\Users\Sam\QDS_web\qds-web\temp\capture-screenshots.js"

Write-Host "Screenshots saved to: $targetDir"
Get-ChildItem $targetDir | Select-Object Name, Length
