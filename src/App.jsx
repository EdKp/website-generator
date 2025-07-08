import { useState } from 'react'
import JSZip from 'jszip'

// Font combinations
const fontPairs = {
  professional: {
    name: 'Professional',
    description: 'Clean and corporate feel',
    heading: {
      family: 'Inter',
      weights: [600, 700],
      fallback: 'sans-serif'
    },
    body: {
      family: 'Inter',
      weights: [400, 500],
      fallback: 'sans-serif'
    }
  },
  modern: {
    name: 'Modern',
    description: 'Contemporary and sleek',
    heading: {
      family: 'Outfit',
      weights: [600, 700],
      fallback: 'sans-serif'
    },
    body: {
      family: 'Plus Jakarta Sans',
      weights: [400, 500],
      fallback: 'sans-serif'
    }
  },
  classic: {
    name: 'Classic',
    description: 'Timeless and readable',
    heading: {
      family: 'Playfair Display',
      weights: [700, 800],
      fallback: 'serif'
    },
    body: {
      family: 'Source Serif Pro',
      weights: [400, 600],
      fallback: 'serif'
    }
  },
  creative: {
    name: 'Creative',
    description: 'Unique and distinctive',
    heading: {
      family: 'Cabinet Grotesk',
      weights: [700, 800],
      fallback: 'sans-serif'
    },
    body: {
      family: 'Satoshi',
      weights: [400, 500],
      fallback: 'sans-serif'
    }
  }
}

// Font size presets
const fontSizes = {
  compact: {
    name: 'Compact',
    description: 'Space-efficient typography',
    heading1: '2rem',
    heading2: '1.5rem',
    heading3: '1.25rem',
    body: '1rem'
  },
  balanced: {
    name: 'Balanced',
    description: 'Harmonious size relationships',
    heading1: '2.5rem',
    heading2: '1.75rem',
    heading3: '1.5rem',
    body: '1.125rem'
  },
  spacious: {
    name: 'Spacious',
    description: 'Bold, impactful typography',
    heading1: '3rem',
    heading2: '2rem',
    heading3: '1.75rem',
    body: '1.25rem'
  }
}

// Sample data for random generation
const sampleBusinesses = {
  'Restaurant': [
    { name: 'The Rustic Table', description: 'A farm-to-table restaurant offering seasonal dishes made with locally-sourced ingredients. Our menu changes daily to showcase the freshest produce and artisanal creations.' },
    { name: 'Urban Spice', description: 'Modern fusion cuisine blending traditional flavors with contemporary cooking techniques. Experience a culinary journey in our vibrant downtown location.' }
  ],
  'Technology': [
    { name: 'ByteCraft Solutions', description: 'Innovative software development company specializing in custom enterprise solutions. We transform business challenges into powerful digital solutions.' },
    { name: 'Digital Nexus', description: 'Leading provider of cloud computing and AI-driven solutions. Empowering businesses with cutting-edge technology for the digital age.' }
  ],
  'Healthcare': [
    { name: 'Wellness Springs', description: 'Comprehensive wellness center offering holistic healthcare solutions. Our integrated approach focuses on your complete physical and mental well-being.' },
    { name: 'VitalCare Medical', description: 'State-of-the-art medical facility providing personalized healthcare services. Expert care with a patient-centered approach.' }
  ],
  'Real Estate': [
    { name: 'Premier Properties', description: 'Luxury real estate agency specializing in exceptional properties. We connect distinguished clients with their dream homes.' },
    { name: 'Urban Habitat', description: 'Modern real estate solutions for urban living. Finding you the perfect space in the heart of the city.' }
  ],
  'Consulting': [
    { name: 'Strategic Insights', description: 'Business consulting firm delivering actionable strategies for growth. We partner with organizations to achieve breakthrough results.' },
    { name: 'Catalyst Consulting', description: 'Expert business advisors helping companies navigate change and drive innovation. Transform your business with data-driven insights.' }
  ]
}

const colorPalettes = [
  { primary: '#2563EB', title: '#1E40AF' }, // Blue
  { primary: '#059669', title: '#047857' }, // Emerald
  { primary: '#7C3AED', title: '#5B21B6' }, // Purple
  { primary: '#DB2777', title: '#BE185D' }, // Pink
  { primary: '#EA580C', title: '#C2410C' }, // Orange
  { primary: '#0891B2', title: '#0E7490' }  // Cyan
]

const industries = [
  'Restaurant', 
  'Technology', 
  'Healthcare', 
  'Real Estate', 
  'Consulting', 
  'Retail', 
  'Education', 
  'Manufacturing', 
  'Finance', 
  'Marketing'
]

function App() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [formData, setFormData] = useState({
    businessName: '',
    industry: 'Technology',
    primaryColor: '#3B82F6',
    description: '',
    darkMode: false,
    titleColor: '',
    useTitleColor: false,
    backgroundPattern: 'none',
    patternSize: 'regular',
    fontPair: 'professional',
    fontSize: 'balanced'
  })
  const [isGenerating, setIsGenerating] = useState(false)

  // Pattern definitions
  const patterns = {
    none: {
      name: 'None',
      description: 'Solid color background',
      preview: null,
      sizes: {
        regular: { preview: null, size: 'auto' },
        large: { preview: null, size: 'auto' }
      }
    },
    dots: {
      name: 'Dots',
      description: 'Elegant dot pattern overlay',
      preview: 'radial-gradient(circle, rgba(255,255,255,0.15) 2px, transparent 2.5px)',
      sizes: {
        regular: {
          preview: 'radial-gradient(circle, rgba(255,255,255,0.15) 2px, transparent 2.5px)',
          size: '30px 30px'
        },
        large: {
          preview: 'radial-gradient(circle, rgba(255,255,255,0.15) 4px, transparent 5px)',
          size: '60px 60px'
        }
      }
    },
    crosshatch: {
      name: 'Crosshatch',
      description: 'Sophisticated diagonal line pattern',
      preview: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.15), rgba(255,255,255,0.15) 1px, transparent 1px, transparent 10px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.15), rgba(255,255,255,0.15) 1px, transparent 1px, transparent 10px)',
      sizes: {
        regular: {
          preview: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.15), rgba(255,255,255,0.15) 1px, transparent 1px, transparent 10px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.15), rgba(255,255,255,0.15) 1px, transparent 1px, transparent 10px)',
          size: '10px 10px'
        },
        large: {
          preview: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.15), rgba(255,255,255,0.15) 2px, transparent 2px, transparent 20px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.15), rgba(255,255,255,0.15) 2px, transparent 2px, transparent 20px)',
          size: '20px 20px'
        }
      }
    }
  }

  // Smart text color detection utility function
  const getTextColor = (backgroundColor) => {
    // Remove # if present
    const hex = backgroundColor.replace('#', '')
    
    // Convert hex to RGB
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    
    // Calculate luminance using standard formula
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    
    // Return black text for bright backgrounds, white text for dark backgrounds
    return luminance > 0.5 ? '#000000' : '#ffffff'
  }

  // Helper function to adjust color brightness
  const adjustColor = (color, amount) => {
    const hex = color.replace('#', '');
    const num = parseInt(hex, 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
    const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  };

  // Generate random website data
  const generateRandomData = () => {
    // Pick random business name and description
    const industry = industries[Math.floor(Math.random() * industries.length)]
    const business = sampleBusinesses[industry][Math.floor(Math.random() * sampleBusinesses[industry].length)]

    // Pick random color
    const colorScheme = colorPalettes[Math.floor(Math.random() * colorPalettes.length)]

    // Pick random pattern
    const patternKeys = Object.keys(patterns)
    const pattern = patternKeys[Math.floor(Math.random() * patternKeys.length)]
    const size = Math.random() > 0.5 ? 'regular' : 'large'

    // Pick random font pair and size
    const fontPairKeys = Object.keys(fontPairs)
    const fontPair = fontPairKeys[Math.floor(Math.random() * fontPairKeys.length)]
    const fontSizeKeys = Object.keys(fontSizes)
    const fontSize = fontSizeKeys[Math.floor(Math.random() * fontSizeKeys.length)]

    // Dark mode and custom title color
    const useDarkMode = Math.random() > 0.7 // 30% chance of dark mode
    const useCustomTitle = Math.random() > 0.5 // 50% chance of custom title color

    // Update form data
    setFormData({
      businessName: business.name,
      industry: industry,
      description: business.description,
      primaryColor: colorScheme.primary,
      titleColor: colorScheme.title,
      useTitleColor: useCustomTitle,
      darkMode: useDarkMode,
      backgroundPattern: pattern,
      patternSize: size,
      fontPair: fontPair,
      fontSize: fontSize
    })
  }

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // Handle website generation
  const handleGenerate = async () => {
    setIsGenerating(true)
    try {
      const zip = new JSZip()
      
      // Add files to zip
      zip.file('index.html', generateWebsiteHTML())
      
      // Generate zip file
      const content = await zip.generateAsync({ type: 'blob' })
      
      // Create download link
      const url = window.URL.createObjectURL(content)
      const link = document.createElement('a')
      link.href = url
      link.download = 'website.zip'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error generating website:', error)
    }
    setIsGenerating(false)
  }

  // Toggle preview
  const togglePreview = () => {
    setIsPreviewOpen(!isPreviewOpen)
  }

  // Generate website HTML
  const generateWebsiteHTML = () => {
    const { 
      businessName, 
      description, 
      primaryColor,
      titleColor,
      useTitleColor,
      darkMode,
      backgroundPattern,
      patternSize,
      fontPair,
      fontSize
    } = formData;

    // Get font information
    const selectedFontPair = fontPairs[fontPair];
    const selectedFontSize = fontSizes[fontSize];
    const selectedPattern = patterns[backgroundPattern];

    // Calculate text colors based on background
    const textColor = darkMode ? '#F8FAFC' : '#0F172A';
    const mutedTextColor = darkMode ? '#CBD5E1' : '#475569';

    // Generate pattern CSS
    const patternCSS = backgroundPattern !== 'none'
      ? `${selectedPattern.sizes[patternSize].preview}, `
      : '';
    const patternSizeCSS = backgroundPattern !== 'none'
      ? `background-size: ${selectedPattern.sizes[patternSize].size}, 100% 100%;`
      : '';

    // Generate the HTML
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${businessName}</title>
    
    <!-- Load fonts -->
    <link href="https://api.fontshare.com/v2/css?f=cabinet-grotesk@700,800&display=swap" rel="stylesheet">
    <link href="https://api.fontshare.com/v2/css?f=satoshi@400,500&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400,500,600,700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400,500,600,700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400,500,600,700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700,800&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Source+Serif+Pro:wght@400,600&display=swap" rel="stylesheet">
    
    <style>
        /* Reset and base styles */
        *, *::before, *::after {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        /* Custom properties */
        :root {
            --primary: ${primaryColor};
            --primary-dark: ${adjustColor(primaryColor, -20)};
            --primary-light: ${adjustColor(primaryColor, 20)};
            --text: ${textColor};
            --text-muted: ${mutedTextColor};
            --heading-font: "${selectedFontPair.heading.family}", ${selectedFontPair.heading.fallback};
            --body-font: "${selectedFontPair.body.family}", ${selectedFontPair.body.fallback};
            --h1: ${selectedFontSize.heading1};
            --h2: ${selectedFontSize.heading2};
            --h3: ${selectedFontSize.heading3};
            --body: ${selectedFontSize.body};
        }
        
        /* Global styles */
        body {
            font-family: var(--body-font);
            font-size: var(--body);
            line-height: 1.6;
            color: var(--text);
            background-color: ${darkMode ? '#0F172A' : '#F8FAFC'};
        }
        
        h1, h2, h3, h4, h5, h6 {
            font-family: var(--heading-font);
            line-height: 1.2;
            color: ${useTitleColor ? titleColor : 'var(--text)'};
        }
        
        h1 { font-size: var(--h1); }
        h2 { font-size: var(--h2); }
        h3 { font-size: var(--h3); }
        
        /* Layout */
        .container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }
        
        /* Navigation */
        nav {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 100;
            padding: 1rem 0;
            background-color: ${darkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(248, 250, 252, 0.8)'};
            backdrop-filter: blur(8px);
            border-bottom: 1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
        }
        
        nav .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-family: var(--heading-font);
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text);
            text-decoration: none;
        }
        
        .nav-links {
            display: flex;
            gap: 2rem;
            list-style: none;
        }
        
        .nav-links a {
            color: var(--text-muted);
            text-decoration: none;
            font-weight: 500;
            transition: color 0.2s;
        }
        
        .nav-links a:hover {
            color: var(--text);
        }
        
        /* Hero section */
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            background: ${patternCSS}linear-gradient(135deg, var(--primary), var(--primary-dark));
            ${patternSizeCSS}
            padding: 6rem 0;
        }
        
        .hero-content {
            max-width: 800px;
        }
        
        .hero h1 {
            font-size: var(--h1);
            font-weight: 800;
            margin-bottom: 1.5rem;
            color: white;
        }
        
        .hero p {
            font-size: var(--body);
            color: rgba(255, 255, 255, 0.9);
            margin-bottom: 2rem;
            max-width: 600px;
        }
        
        .cta-button {
            display: inline-block;
            padding: 1rem 2rem;
            background-color: white;
            color: var(--primary);
            text-decoration: none;
            border-radius: 0.5rem;
            font-weight: 600;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        /* Features section */
        .features {
            padding: 6rem 0;
            background-color: ${darkMode ? '#1E293B' : 'white'};
        }
        
        .section-title {
            text-align: center;
            margin-bottom: 4rem;
        }
        
        .section-title h2 {
            font-size: var(--h2);
            margin-bottom: 1rem;
        }
        
        .section-title p {
            color: var(--text-muted);
            max-width: 600px;
            margin: 0 auto;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
        }
        
        .feature-card {
            padding: 2rem;
            background-color: ${darkMode ? '#0F172A' : '#F8FAFC'};
            border-radius: 1rem;
            transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .feature-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 24px ${darkMode ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.1)'};
        }
        
        .feature-card h3 {
            margin-bottom: 1rem;
        }
        
        .feature-card p {
            color: var(--text-muted);
        }
        
        /* Contact section */
        .contact {
            padding: 6rem 0;
            background-color: ${darkMode ? '#0F172A' : '#F8FAFC'};
        }
        
        .contact-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 4rem;
            align-items: center;
        }
        
        .contact-content h2 {
            margin-bottom: 1.5rem;
        }
        
        .contact-content p {
            color: var(--text-muted);
            margin-bottom: 2rem;
        }
        
        .contact-form {
            display: grid;
            gap: 1.5rem;
        }
        
        .form-group {
            display: grid;
            gap: 0.5rem;
        }
        
        .form-group label {
            font-weight: 500;
        }
        
        .form-group input,
        .form-group textarea {
            padding: 0.75rem 1rem;
            border: 1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
            border-radius: 0.5rem;
            background-color: ${darkMode ? '#1E293B' : 'white'};
            color: var(--text);
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: var(--primary);
        }
        
        .submit-button {
            padding: 1rem 2rem;
            background-color: var(--primary);
            color: white;
            border: none;
            border-radius: 0.5rem;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        
        .submit-button:hover {
            background-color: var(--primary-dark);
        }
        
        /* Footer */
        footer {
            padding: 4rem 0;
            background-color: ${darkMode ? '#1E293B' : 'white'};
            border-top: 1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
        }
        
        .footer-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .footer-content p {
            color: var(--text-muted);
        }
        
        /* Responsive design */
        @media (max-width: 768px) {
            .container {
                padding: 0 1rem;
            }
            
            .nav-links {
                display: none;
            }
            
            .hero {
                padding: 4rem 0;
                text-align: center;
            }
            
            .hero-content {
                margin: 0 auto;
            }
            
            .features-grid,
            .contact-grid {
                grid-template-columns: 1fr;
            }
            
            .footer-content {
                flex-direction: column;
                gap: 1rem;
                text-align: center;
            }
        }
    </style>
</head>
<body>
    <nav>
        <div class="container">
            <a href="#" class="logo">${businessName}</a>
            <ul class="nav-links">
                <li><a href="#features">Features</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
    </nav>

    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <h1>Welcome to ${businessName}</h1>
                <p>${description}</p>
                <a href="#contact" class="cta-button">Get Started</a>
            </div>
        </div>
    </section>

    <section id="features" class="features">
        <div class="container">
            <div class="section-title">
                <h2>What We Offer</h2>
                <p>Discover the unique features and services that set us apart.</p>
            </div>
            <div class="features-grid">
                <div class="feature-card">
                    <h3>Quality Service</h3>
                    <p>We pride ourselves on delivering exceptional service that exceeds expectations.</p>
                </div>
                <div class="feature-card">
                    <h3>Expert Team</h3>
                    <p>Our experienced professionals are dedicated to your success.</p>
                </div>
                <div class="feature-card">
                    <h3>Innovation</h3>
                    <p>Stay ahead with our cutting-edge solutions and forward-thinking approach.</p>
                </div>
            </div>
        </div>
    </section>

    <section id="contact" class="contact">
        <div class="container">
            <div class="contact-grid">
                <div class="contact-content">
                    <h2>Get in Touch</h2>
                    <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
                </div>
                <form class="contact-form">
                    <div class="form-group">
                        <label for="name">Name</label>
                        <input type="text" id="name" name="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="message">Message</label>
                        <textarea id="message" name="message" rows="4" required></textarea>
                    </div>
                    <button type="submit" class="submit-button">Send Message</button>
                </form>
            </div>
        </div>
    </section>

    <footer>
        <div class="container">
            <div class="footer-content">
                <p>&copy; ${new Date().getFullYear()} ${businessName}. All rights reserved.</p>
            </div>
        </div>
    </footer>
</body>
</html>`;
  };

  const generateREADME = () => {
    const { businessName, industry, description } = formData
    const currentDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })

    return `# ${businessName} Website

**Industry**: ${industry}
**Generated**: ${currentDate}

## About This Website
${description || `Professional ${industry.toLowerCase()} services with a focus on quality, innovation, and customer satisfaction.`}

## How This Website Was Created
This website was automatically generated using a custom website generator tool. The generator created:
- Professional HTML structure
- Custom CSS styling with your brand colors
- Interactive JavaScript features
- Mobile-responsive design

## Files Included
- index.html - Main website file
- styles.css - Styling and colors
- script.js - Interactive features

## How to Deploy
1. Upload all files to your web hosting provider
2. Your website will be live at your domain
3. No additional setup required

Generated with ❤️ by Website Generator`
  }

  const isFormValid = formData.businessName.trim() && formData.description.trim()

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <h1 className="text-3xl font-bold">Website Generator</h1>
            <p className="mt-2 text-blue-100">Create a professional website in minutes</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="border-r border-slate-200">
              <div className="sticky top-0 bg-white z-10 p-8 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-slate-800">Website Settings</h2>
                  <button
                    onClick={generateRandomData}
                    className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
                  >
                    Generate Random
                  </button>
                </div>
              </div>

              <form className="p-8 space-y-8">
                {/* Business Info Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 text-slate-700 font-semibold">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm flex items-center justify-center font-bold">1</span>
                    <span>Business Information</span>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Business Name
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        placeholder="e.g. Acme Corporation"
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Industry
                      </label>
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      >
                        {industries.map(industry => (
                          <option key={industry} value={industry}>{industry}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        Business Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe your business and what makes it unique..."
                        rows="4"
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Typography Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 text-slate-700 font-semibold">
                    <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full text-sm flex items-center justify-center font-bold">2</span>
                    <span>Typography</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <label className="block text-sm font-semibold text-slate-700">
                        Font Style
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(fontPairs).map(([key, font]) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => handleInputChange({ target: { name: 'fontPair', value: key } })}
                            className={`p-3 rounded-xl border-2 text-left transition-all ${
                              formData.fontPair === key
                                ? 'border-green-500 bg-green-50'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <h4 className="font-semibold text-slate-900">{font.name}</h4>
                            <p className="text-xs text-slate-500 mt-1">{font.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="block text-sm font-semibold text-slate-700">
                        Font Size Scale
                      </label>
                      <div className="grid grid-cols-1 gap-3">
                        {Object.entries(fontSizes).map(([key, size]) => (
                          <button
                            key={key}
                            type="button"
                            onClick={() => handleInputChange({ target: { name: 'fontSize', value: key } })}
                            className={`p-3 rounded-xl border-2 text-left transition-all ${
                              formData.fontSize === key
                                ? 'border-green-500 bg-green-50'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <h4 className="font-semibold text-slate-900">{size.name}</h4>
                                <p className="text-xs text-slate-500 mt-1">{size.description}</p>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="text-lg font-semibold">Aa</span>
                                <span className="text-xs">16-{parseInt(size.heading1)}px</span>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Design Options */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 text-slate-700 font-semibold">
                    <span className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full text-sm flex items-center justify-center font-bold">3</span>
                    <span>Design Options</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <label className="block text-sm font-semibold text-slate-700">
                        Primary Brand Color
                      </label>
                      <div className="flex items-center space-x-3">
                        <input
                          type="color"
                          name="primaryColor"
                          value={formData.primaryColor}
                          onChange={handleInputChange}
                          className="w-16 h-16 border-2 border-slate-300 rounded-xl cursor-pointer shadow-sm"
                        />
                        <div className="flex-1">
                          <input
                            type="text"
                            name="primaryColor"
                            value={formData.primaryColor}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-slate-900 font-mono"
                            placeholder="#3B82F6"
                          />
                          <p className="text-xs text-slate-500 mt-1">Used for buttons, accents, and highlights</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <label className="block text-sm font-semibold text-slate-700">
                        Website Theme
                      </label>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-slate-600">
                          {formData.darkMode ? 'Dark' : 'Light'}
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name="darkMode"
                            checked={formData.darkMode}
                            onChange={handleInputChange}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-800"></div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Advanced Options */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 text-slate-700 font-semibold">
                    <span className="w-6 h-6 bg-amber-100 text-amber-600 rounded-full text-sm flex items-center justify-center font-bold">4</span>
                    <span>Advanced Options</span>
                  </div>
                  
                  <div className="border border-slate-200 rounded-xl p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <input
                        type="checkbox"
                        name="useTitleColor"
                        checked={formData.useTitleColor}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                      />
                      <label className="text-sm font-semibold text-slate-700">
                        Use custom title color
                      </label>
                    </div>
                  
                  {formData.useTitleColor && (
                    <div className="flex items-center space-x-3">
                      <input
                        type="color"
                        name="titleColor"
                        value={formData.titleColor || '#3B82F6'}
                        onChange={handleInputChange}
                        className="w-10 h-10 border border-slate-300 rounded-lg cursor-pointer"
                      />
                      <input
                        type="text"
                        name="titleColor"
                        value={formData.titleColor}
                        onChange={handleInputChange}
                        className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-slate-900 font-mono text-sm"
                        placeholder="#3B82F6"
                      />
                    </div>
                  )}
                  </div>

                  <div className="border border-slate-200 rounded-xl p-4">
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Background Pattern
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {Object.entries(patterns).map(([key, pattern]) => (
                        <button
                          key={key}
                          type="button"
                          onClick={() => handleInputChange({ target: { name: 'backgroundPattern', value: key } })}
                          className={`aspect-square rounded-xl border-2 transition-all relative overflow-hidden ${
                            formData.backgroundPattern === key
                              ? 'border-blue-500'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                          style={{
                            background: pattern.preview
                              ? `${pattern.preview}, linear-gradient(135deg, ${formData.primaryColor}, ${formData.primaryColor}dd)`
                              : `linear-gradient(135deg, ${formData.primaryColor}, ${formData.primaryColor}dd)`
                          }}
                        >
                          <div className="absolute bottom-2 left-2 right-2 text-xs font-medium text-white bg-black/50 rounded-lg px-2 py-1 text-center">
                            {pattern.name}
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    {formData.backgroundPattern !== 'none' && (
                      <div className="mt-3">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Pattern Size
                        </label>
                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => handleInputChange({ target: { name: 'patternSize', value: 'regular' } })}
                            className={`flex-1 py-2 px-3 rounded-lg border transition-all ${
                              formData.patternSize === 'regular'
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-slate-200 hover:border-slate-300 text-slate-600'
                            }`}
                          >
                            Regular
                          </button>
                          <button
                            type="button"
                            onClick={() => handleInputChange({ target: { name: 'patternSize', value: 'large' } })}
                            className={`flex-1 py-2 px-3 rounded-lg border transition-all ${
                              formData.patternSize === 'large'
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-slate-200 hover:border-slate-300 text-slate-600'
                            }`}
                          >
                            Large
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </form>
            </div>

            <div className="bg-slate-50">
              <div className="sticky top-0 bg-white z-10 p-8 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-slate-800">Preview</h2>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setIsPreviewOpen(true)}
                      className="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 flex items-center space-x-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                      <span>Full Screen</span>
                    </button>
                    <button
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isGenerating ? 'Generating...' : 'Download Website'}
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <iframe
                    srcDoc={`
                      <!DOCTYPE html>
                      <html>
                        <head>
                          <meta charset="UTF-8">
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <title>Preview</title>
                        </head>
                        <body>
                          ${generateWebsiteHTML()}
                        </body>
                      </html>
                    `}
                    className="w-full h-[600px] border-0"
                    title="Website Preview"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Screen Preview Modal */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          <div className="sticky top-0 bg-white z-10 p-4 border-b border-slate-200">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-800">Full Preview</h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="px-6 py-3 text-sm font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? 'Generating...' : 'Download Website'}
                </button>
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-2 text-slate-500 hover:text-slate-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div className="h-[calc(100vh-73px)]">
            <iframe
              srcDoc={`
                <!DOCTYPE html>
                <html>
                  <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Full Preview</title>
                  </head>
                  <body>
                    ${generateWebsiteHTML()}
                  </body>
                </html>
              `}
              className="w-full h-full border-0"
              title="Full Website Preview"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App 