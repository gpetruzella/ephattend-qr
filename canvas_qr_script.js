/* Canvas QR Generator Script - CORB-Resistant Version */
/* This script runs entirely self-contained to bypass Canvas security restrictions */

window.generateCanvasQR = function() {
    // Prevent multiple instances
    if (document.getElementById('qr-generator-overlay')) {
        return;
    }

    // Inline QR Code generator (simplified version)
    function generateQRCode(text, size = 200) {
        // Simple QR code generation using QR Server API as fallback
        // This creates an image URL instead of loading external libraries
        const encodedText = encodeURIComponent(text);
        return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedText}&margin=1`;
    }

    // Simple PDF creation using data URLs and print functionality
    function createSimplePDF(students) {
        const printWindow = window.open('', '_blank');
        const html = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Student QR Codes</title>
                <style>
                    body { 
                        font-family: Arial, sans-serif; 
                        margin: 0; 
                        padding: 20px;
                        background: white;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 30px;
                        border-bottom: 2px solid #333;
                        padding-bottom: 10px;
                    }
                    .grid {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 30px;
                        page-break-inside: avoid;
                    }
                    .student-card {
                        text-align: center;
                        border: 1px solid #ddd;
                        padding: 15px;
                        border-radius: 8px;
                        page-break-inside: avoid;
                        break-inside: avoid;
                    }
                    .qr-code {
                        width: 150px;
                        height: 150px;
                        margin: 0 auto 10px;
                        display: block;
                    }
                    .student-name {
                        font-weight: bold;
                        font-size: 14px;
                        margin: 5px 0;
                    }
                    .student-id {
                        color: #666;
                        font-size: 12px;
                    }
                    @media print {
                        body { margin: 0; }
                        .grid { page-break-inside: avoid; }
                        .student-card { 
                            page-break-inside: avoid;
                            break-inside: avoid;
                        }
                    }
                    @page {
                        margin: 0.5in;
                        size: letter;
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Student QR Codes</h1>
                    <p>Generated: ${new Date().toLocaleDateString()} | Total Students: ${students.length}</p>
                </div>
                <div class="grid">
                    ${students.map(student => `
                        <div class="student-card">
                            <img src="${generateQRCode(student.displayText, 150)}" 
                                 alt="QR Code for ${student.name}" 
                                 class="qr-code"
                                 onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                            <div style="display:none; background:#f0f0f0; padding:20px; font-size:10px;">QR: ${student.displayText}</div>
                            <div class="student-name">${student.name}</div>
                            <div class="student-id">ID: ${student.id}</div>
                        </div>
                    `).join('')}
                </div>
                <script>
                    // Auto-print when loaded
                    window.onload = function() {
                        setTimeout(() => {
                            window.print();
                        }, 1000);
                    };
                </script>
            </body>
            </html>
        `;
        
        printWindow.document.write(html);
        printWindow.document.close();
        return printWindow;
    }

    // Create overlay UI
    function createOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'qr-generator-overlay';
        overlay.innerHTML = `
            <div style='position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 10000; display: flex; align-items: center; justify-content: center; font-family: Arial, sans-serif;'>
                <div style='background: white; padding: 30px; border-radius: 10px; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto;'>
                    <h2 style='margin-top: 0; color: #333; text-align: center;'>📋 Canvas Students Found</h2>
                    <div id='student-list' style='max-height: 300px; overflow-y: auto; margin: 20px 0; border: 1px solid #ddd; border-radius: 5px; padding: 15px; background: #f8f9fa;'></div>
                    <div style='text-align: center; margin: 20px 0;'>
                        <button id='generate-qr-btn' style='background: #28a745; color: white; padding: 12px 24px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px; margin-right: 10px;'>🖨️ Generate & Print QR Codes</button>
                        <button id='close-overlay-btn' style='background: #6c757d; color: white; padding: 12px 24px; border: none; border-radius: 5px; cursor: pointer; font-size: 16px;'>❌ Cancel</button>
                    </div>
                    <div id='status' style='margin-top: 15px; text-align: center; color: #666; min-height: 20px;'></div>
                    <div style='margin-top: 15px; padding: 10px; background: #e7f3ff; border-radius: 5px; font-size: 12px; color: #0c5460;'>
                        <strong>📋 Instructions:</strong> Click "Generate & Print" to open a new window with QR codes. Use your browser's print function to save as PDF or print directly.
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    // Extract student data from Canvas
    function extractStudents() {
        const students = [];
        
        // Enhanced selectors for different Canvas layouts
        const selectors = [
            // Modern Canvas People page
            '[data-testid*="user"] a[href*="/users/"]',
            'tr[data-testid*="user"] td a[href*="/users/"]',
            '[data-automation-id*="user"] a[href*="/users/"]',
            
            // Classic Canvas roster
            '.roster_user_name a[href*="/users/"]',
            '.student_roster .student .name a[href*="/users/"]',
            '.user_name a[href*="/users/"]',
            
            // Table-based layouts
            'table tr td a[href*="/users/"]',
            '.roster td a[href*="/users/"]',
            
            // Generic fallbacks
            'a[href*="/users/"][title]:not([href*="/conversations"])',
            '.student a[href*="/users/"]'
        ];
        
        console.log('Searching for students...');
        
        for (const selector of selectors) {
            const elements = document.querySelectorAll(selector);
            if (elements.length > 0) {
                console.log(`Found ${elements.length} potential students using: ${selector}`);
                
                elements.forEach(el => {
                    const name = el.textContent.trim();
                    const href = el.href;
                    const idMatch = href.match(/users\/(\d+)/);
                    const id = idMatch ? idMatch[1] : '';
                    
                    // Enhanced filtering for student entries
                    if (name && id && 
                        name.length > 2 && 
                        name.length < 100 && 
                        !name.toLowerCase().includes('test user') &&
                        !name.toLowerCase().includes('admin') &&
                        !name.toLowerCase().includes('teacher') &&
                        !name.toLowerCase().includes('instructor') &&
                        !/^\d+$/.test(name) && // Not just numbers
                        !students.find(s => s.id === id)) {
                        
                        students.push({
                            name: name,
                            id: id,
                            displayText: `${name} (${id})`
                        });
                    }
                });
                
                if (students.length > 0) break; // Use first successful selector
            }
        }
        
        // Alternative: Look for student names in specific contexts
        if (students.length === 0) {
            console.log('Trying alternative extraction methods...');
            
            // Look for student section specifically
            const studentSection = document.querySelector('[data-testid="people-roster"], .roster, .student_roster');
            if (studentSection) {
                const links = studentSection.querySelectorAll('a[href*="/users/"]');
                links.forEach(el => {
                    const name = el.textContent.trim();
                    const href = el.href;
                    const idMatch = href.match(/users\/(\d+)/);
                    const id = idMatch ? idMatch[1] : '';
                    
                    if (name && id && name.length > 2 && !students.find(s => s.id === id)) {
                        students.push({
                            name: name,
                            id: id,
                            displayText: `${name} (${id})`
                        });
                    }
                });
            }
        }
        
        // Remove duplicates and sort
        const uniqueStudents = students
            .filter((student, index, self) => index === self.findIndex(s => s.id === student.id))
            .sort((a, b) => a.name.localeCompare(b.name));
        
        console.log(`Extracted ${uniqueStudents.length} unique students`);
        return uniqueStudents;
    }

    // Show status message
    function showStatus(message, type = 'info') {
        const statusEl = document.getElementById('status');
        if (statusEl) {
            const colors = {
                info: '#007bff',
                success: '#28a745', 
                error: '#dc3545',
                warning: '#ffc107'
            };
            statusEl.innerHTML = `<div style="color: ${colors[type]}; font-weight: bold;">${message}</div>`;
        }
    }

    // Main execution
    console.log('Canvas QR Generator: Starting (CORB-resistant version)...');
    createOverlay();
    
    const students = extractStudents();
    
    if (students.length === 0) {
        console.log('No students found. Showing help message.');
        document.getElementById('student-list').innerHTML = `
            <div style="color: #dc3545; text-align: center; padding: 20px;">
                <h4>⚠️ No students found</h4>
                <p>Make sure you're on the Canvas <strong>People</strong> page with students visible.</p>
                <div style="text-align: left; margin: 15px 0; padding: 10px; background: #f8f9fa; border-radius: 5px; font-size: 12px;">
                    <strong>Try these steps:</strong><br>
                    1. Navigate to your course's "People" tab<br>
                    2. Scroll down to load all students<br>
                    3. Make sure you're viewing "Students" not "Teachers"<br>
                    4. Run the bookmarklet again
                </div>
            </div>
        `;
        document.getElementById('generate-qr-btn').disabled = true;
        document.getElementById('generate-qr-btn').style.opacity = '0.5';
        return;
    }
    
    // Display found students
    const listEl = document.getElementById('student-list');
    listEl.innerHTML = `
        <div style="text-align: center; margin-bottom: 15px;">
            <strong style="color: #28a745;">✅ Found ${students.length} students</strong>
        </div>
        <div style="max-height: 200px; overflow-y: auto;">
            ${students.map(s => `
                <div style='padding: 8px; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center;'>
                    <span style="flex: 1;">${s.name}</span>
                    <small style="color: #666; font-family: monospace;">ID: ${s.id}</small>
                </div>
            `).join('')}
        </div>
    `;
    
    // Event listeners
    document.getElementById('close-overlay-btn').onclick = () => {
        document.body.removeChild(document.getElementById('qr-generator-overlay'));
    };
    
    document.getElementById('generate-qr-btn').onclick = () => {
        showStatus('🔄 Opening print window...', 'info');
        try {
            const printWindow = createSimplePDF(students);
            showStatus('✅ QR codes generated! Use browser print to save as PDF.', 'success');
            
            // Auto-close overlay after successful generation
            setTimeout(() => {
                const overlay = document.getElementById('qr-generator-overlay');
                if (overlay) {
                    document.body.removeChild(overlay);
                }
            }, 2000);
        } catch (error) {
            console.error('Error generating QR codes:', error);
            showStatus('❌ Error generating QR codes. Please try again.', 'error');
        }
    };
    
    console.log(`Canvas QR Generator: Ready with ${students.length} students`);
};