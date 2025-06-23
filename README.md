# Website Generator

A powerful, instant website generator that creates professional, responsive websites from basic client information. Built with React and Vite for lightning-fast development and generation.

## Features

### Customizable Design
- **Primary Color Selection**: Choose your brand color with visual color picker
- **Optional Title Color Override**: Separate color control for business name/logo
- **Day/Night Mode**: Toggle between light and dark themes
- **Smart Text Contrast**: Automatically calculates optimal text colors for accessibility

### Business Information
- Business name and industry selection (10+ industries)
- Custom business description
- Professional contact information generation

### Generated Website Features
- **Fully Responsive Design**: Mobile-first approach with perfect tablet/desktop scaling
- **Modern Navigation**: Fixed navbar with smooth scrolling
- **Hero Section**: Eye-catching banner with business information
- **About Section**: Professional description with statistics
- **Services Grid**: Customizable service offerings
- **Contact Form**: Functional contact form with validation
- **Interactive JavaScript**: Smooth animations and form handling

### Download Package
Each generated website includes:
- `index.html` - Complete website structure
- `styles.css` - Custom styling with user's color scheme
- `script.js` - Interactive features and functionality
- `README.md` - Deployment instructions and project details

## Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/website-generator.git

# Navigate to project directory
cd website-generator

# Install dependencies
npm install

# Start development server
npm run dev
```

### Usage
1. Open http://localhost:5173 in your browser
2. Fill in your business information:
   - Business name (required)
   - Industry selection
   - Primary brand color
   - Optional custom title color
   - Theme mode (day/night)
   - Business description (required)
3. Preview your selections in real-time
4. Click "Generate & Download Website" 
5. Extract the ZIP file and deploy to any web hosting service

## Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 3.x
- **Styling**: Tailwind CSS
- **File Generation**: JSZip
- **Development**: Hot reload with Vite dev server

## Project Structure

```
website-generator/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Application entry point
│   └── index.css        # Global styles
├── public/              # Static assets
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── README.md           # Project documentation
```

## Generated Website Features

### Responsive Design
- Mobile-first CSS with breakpoints
- Flexible grid layouts
- Scalable typography and spacing

### Interactive Elements
- Smooth scroll navigation
- Form validation and submission
- Dynamic navbar effects
- Hover animations and transitions

### Accessibility
- Smart color contrast calculation
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly

### SEO Ready
- Semantic HTML5 structure
- Meta tags and proper heading hierarchy
- Fast loading times
- Mobile-friendly design

## Development

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Adding New Industries
Edit the `industries` array in `App.jsx`:
```javascript
const industries = [
  'Restaurant', 
  'Technology', 
  'Healthcare',
  // Add new industry here
]
```

### Customizing Generated Templates
Modify the generation functions in `App.jsx`:
- `generateHTML()` - Website structure
- `generateCSS()` - Styling and themes
- `generateJS()` - Interactive features

## Deployment

### Deploy the Generator
1. Build the project: `npm run build`
2. Deploy the `dist/` folder to your hosting service
3. Recommended platforms: Vercel, Netlify, GitHub Pages

### Deploy Generated Websites
1. Extract the downloaded ZIP file
2. Upload all files to web hosting
3. No additional setup required - websites are self-contained

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with React and Vite for optimal performance
- Tailwind CSS for rapid UI development
- JSZip for seamless file packaging
- Color contrast calculations for accessibility

## Support

For support, feature requests, or bug reports, please open an issue on GitHub.

---

**Made with care by [Your Name]**

*Generate professional websites in seconds!* 