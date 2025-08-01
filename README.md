# Canvas QR Code Generator

A minimalist bookmarklet that extracts student data directly from Canvas People pages and generates print-ready QR codes. Great for creating student QR codes for attendance tracking, lab access, or any application requiring unique student identification. Perfect companion to **EphAttend**, the local, privacy-respecting PWA.

## ✨ Features

- **Canvas Integration**: Extract students directly from any Canvas course People page
- **One-Click Operation**: Single bookmarklet click to find and process all students
- **Print-Ready Output**: Clean 2×6 grid layout optimized for printing and distribution
- **Privacy-First**: All processing happens locally in your browser - no data collection
- **Zero Setup**: No accounts, installations, or configurations required
- **Cross-Platform**: Works on any desktop browser with Canvas access
- **Bypass CORB**: Self-contained script that works with Canvas security restrictions

## 🎯 Why This Tool?

Canvas doesn't provide an easy way to generate QR codes for students. This bookmarklet solves that by:
- **Automatically extracting** all student names and IDs from Canvas
- **Generating QR codes** containing student information  
- **Creating print-ready PDFs** for easy distribution
- **Working with any Canvas course** regardless of size

Perfect for instructors who need to:
- Distribute QR codes for attendance scanning
- Create student identification cards
- Set up lab access systems
- Enable contactless check-in processes

## 🚀 Quick Start

### 1. Deploy the Bookmarklet Page
**Option A: GitHub Pages**
1. Fork this repository
2. Enable GitHub Pages in repository Settings
3. Visit your GitHub Pages URL

**Option B: Local Development**
```bash
git clone [your-repo-url]
cd canvas-qr-generator
python -m http.server 8000
# Visit http://localhost:8000
```

### 2. Install the Bookmarklet
1. **Visit your deployed page**
2. **Drag the blue "Generate Canvas QR Codes" button** to your browser's bookmarks bar
3. **Update the URL** in the bookmarklet to match your GitHub Pages URL

### 3. Generate QR Codes
1. **Navigate to any Canvas course People page**
2. **Ensure students are visible** (scroll to load all students)
3. **Click the bookmarklet** in your bookmarks bar
4. **Review found students** in the popup
5. **Click "Generate & Print"** to create QR codes
6. **Use browser print dialog** to save as PDF or print directly

## 📁 File Structure

```
├── qr-generator.html       # Main bookmarklet installation page
├── canvas-qr-script.js     # QR generator functionality
├── README.md              # This file
└── LICENSE                # MIT License
```

## 🔧 How It Works

### Technical Overview
1. **Bookmarklet injection**: Loads external script into Canvas page
2. **Student detection**: Uses multiple CSS selectors to find student data
3. **Data extraction**: Parses student names and Canvas user IDs
4. **QR generation**: Creates QR codes using external API service
5. **PDF creation**: Formats QR codes in print-ready grid layout

### Canvas Compatibility
Tested and working with:
- **Modern Canvas interface** (2023+)
- **Classic Canvas interface** 
- **Various institutional Canvas customizations**
- **Different Canvas course layouts**

### Security Approach
- **CORB-resistant**: Self-contained script bypasses Cross-Origin restrictions
- **Local processing**: All data processing happens in your browser
- **No external dependencies**: Minimal external API usage (QR image generation only)
- **Privacy-first**: Student data never leaves your device

## 📋 Usage Instructions

### Prerequisites
- **Canvas course access** with student roster
- **Desktop browser** (Chrome, Firefox, Safari, Edge)
- **Pop-up permissions** enabled for Canvas domain

### Step-by-Step Process
1. **Access Canvas**: Navigate to your course's People page
2. **Load students**: Scroll down to ensure **all** students are visibly loaded (Canvas lazy-loads)
3. **Run bookmarklet**: Click the bookmarklet in your bookmarks bar
4. **Verify extraction**: Review the list of found students
5. **Generate QR codes**: Click "Generate & Print" button
6. **Print or save**: Use browser's print dialog to save as PDF or print directly

### PDF Output Details
- **Layout**: 2 columns × 6 rows per page (12 QR codes per page)
- **Content**: Each QR code contains "Student Name (Canvas ID)"
- **Format**: Student name and ID printed below each QR code
- **Multi-page**: Automatically flows to additional pages for large courses
- **Print-ready**: Optimized margins and sizing for standard paper

## 🧪 Testing

### Installation Testing
- [ ] Bookmarklet appears as button on webpage (not code text)
- [ ] Bookmarklet can be dragged to bookmarks bar
- [ ] Manual bookmark creation works as alternative
- [ ] GitHub Pages URL correctly updated in bookmarklet

### Canvas Integration Testing  
- [ ] Works on Canvas People page
- [ ] Detects students in various Canvas layouts
- [ ] Handles courses with 10-500+ students
- [ ] Extracts correct student names and IDs
- [ ] Filters out non-student entries (TAs, instructors)

### QR Generation Testing
- [ ] QR codes generate successfully
- [ ] Print window opens automatically
- [ ] PDF layout is clean and properly formatted  
- [ ] QR codes contain correct student information
- [ ] QR codes are scannable by standard QR readers

## 🔧 Troubleshooting

### Bookmarklet Installation Issues
**Code displays instead of button:**
- Use the manual bookmark creation method
- Copy the JavaScript code and create bookmark manually
- Ensure you're viewing the deployed page, not local file

**Bookmarklet doesn't appear in bookmarks:**
- Try right-clicking and "Add to bookmarks" instead of dragging
- Check that bookmarks bar is visible in browser
- Use keyboard shortcut to show bookmarks bar

### Canvas Detection Issues
**No students found:**
- Ensure you're on the Canvas **People** page (not Grades/Modules)
- Scroll down to load all students (Canvas uses lazy loading)
- Try switching to "All" or "Students" view if available
- Refresh the Canvas page and try again
- Check browser console for error messages

**Wrong data extracted:**
- Verify you're in the correct Canvas course
- Make sure you have appropriate permissions to view student list
- Check that Canvas course has enrolled students

### QR Generation Issues
**Print window doesn't open:**
- Check that pop-ups are allowed for Canvas domain
- Try running on Chrome or Firefox (best compatibility)
- Disable browser ad-blockers temporarily

**QR codes don't display:**
- Ensure stable internet connection (for QR image generation)
- Try again after a few moments
- Check browser developer tools for network errors

**Print formatting issues:**
- Use browser's print preview to verify layout
- Adjust print margins if needed
- Try "Print to PDF" option for best results

## 🔗 Integration

### Companion Projects
This QR generator pairs perfectly with:
- **QR Attendance Scanners**: Use generated codes for classroom attendance
- **Student Check-in Systems**: Enable contactless registration processes  
- **Lab Access Control**: Create student identification systems

### QR Code Format
Generated QR codes contain:
```
Student Name (Canvas_User_ID)
Example: "John Doe (12345678)"
```

This format is compatible with most attendance and check-in applications.

## 🎓 Use Cases

### Educational Institutions
- **Large lecture attendance**: Generate codes once, use all semester
- **Lab access management**: Create student identification cards
- **Event registration**: Quick student check-in for activities
- **Exam proctoring**: Verify student identity efficiently

### Process Optimization
- **Semester setup**: Generate QR codes during first week of classes
- **Substitute teaching**: Provide easy attendance method for substitutes  
- **Multi-section courses**: Generate codes for all course sections
- **Cross-registration**: Handle students from multiple departments

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Test with various Canvas installations
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Notes
- Test across different Canvas versions and customizations
- Maintain compatibility with institutional Canvas themes
- Keep security considerations in mind for educational environments
- Ensure accessibility for all instructors

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

For questions or issues:
1. Check existing [Issues](../../issues)
2. Create a new issue with:
   - Canvas version/institution details
   - Browser and OS information  
   - Screenshots of any error messages
   - Steps to reproduce the problem

## 🔒 Privacy & Security

- **Local processing**: All student data processing happens in your browser
- **No data collection**: This tool collects no analytics or personal information
- **Minimal external calls**: Only QR image generation uses external service
- **FERPA compliant**: No student data leaves your device during processing
- **Institutional friendly**: Compatible with Canvas security policies

---

**Built with ❤️ for educators who need simple, privacy-focused Canvas integration tools.**
