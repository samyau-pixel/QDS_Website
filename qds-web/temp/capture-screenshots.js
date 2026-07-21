const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    // Set viewport size
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    try {
        console.log('Navigating to page...');
        await page.goto('https://info2.sunbirddcim.com/dctrack-test-drive/', { 
            waitUntil: 'networkidle', 
            timeout: 60000 
        });
        
        // Wait for page to fully load
        await page.waitForTimeout(5000);
        
        const outputDir = 'C:/Users/Sam/QDS_web/qds-web/content/vendors/sunbird-dcim/solutions/dc-track-test-drive/images';
        
        // Ensure output directory exists
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        
        // Capture full page screenshot
        console.log('Capturing full page screenshot...');
        await page.screenshot({ 
            path: path.join(outputDir, 'screenshot-01-fullpage.png'),
            fullPage: true
        });
        console.log('✓ Captured full page screenshot');
        
        // Capture viewport screenshot (above the fold)
        console.log('Capturing viewport screenshot...');
        await page.screenshot({ 
            path: path.join(outputDir, 'screenshot-02-viewport.png'),
            fullPage: false
        });
        console.log('✓ Captured viewport screenshot');
        
        // Try to capture specific sections
        const heroElement = await page.$('section, .hero, header, div[class*="hero"]');
        if (heroElement) {
            console.log('Capturing hero section...');
            await heroElement.screenshot({ 
                path: path.join(outputDir, 'screenshot-03-hero.png')
            });
            console.log('✓ Captured hero section');
        }
        
        // Capture testimonial section if exists
        const testimonials = await page.$('.testimonial, blockquote, [class*="testimonial"]');
        if (testimonials) {
            console.log('Capturing testimonials section...');
            await testimonials.screenshot({ 
                path: path.join(outputDir, 'screenshot-04-testimonials.png')
            });
            console.log('✓ Captured testimonials section');
        }
        
        // Capture features section if exists
        const features = await page.$('.features, .features-section, div[class*="feature"]');
        if (features) {
            console.log('Capturing features section...');
            await features.screenshot({ 
                path: path.join(outputDir, 'screenshot-05-features.png')
            });
            console.log('✓ Captured features section');
        }
        
        console.log('\n✅ Screenshot capture complete!');
        console.log('Files saved to:', outputDir);
        
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await browser.close();
    }
})();
