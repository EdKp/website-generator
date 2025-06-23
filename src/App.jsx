import { useState } from 'react'
import JSZip from 'jszip'

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
  const [formData, setFormData] = useState({
    businessName: '',
    industry: 'Technology',
    primaryColor: '#3B82F6',
    description: '',
    darkMode: false,
    titleColor: '',
    useTitleColor: false
  })
  const [isGenerating, setIsGenerating] = useState(false)

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const generateHTML = () => {
    const { businessName, industry, primaryColor, description } = formData
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${businessName} - Professional ${industry} Services</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <h1 class="nav-logo">${businessName}</h1>
            <ul class="nav-menu">
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#services">Services</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
    </nav>

    <!-- Hero Section -->
    <section id="home" class="hero">
        <div class="hero-content">
            <h1 class="hero-title">Welcome to ${businessName}</h1>
            <p class="hero-subtitle">Professional ${industry} services you can trust</p>
            <p class="hero-description">${description || `We provide exceptional ${industry.toLowerCase()} services with a focus on quality, innovation, and customer satisfaction.`}</p>
            <button class="cta-button">Get Started</button>
        </div>
    </section>

    <!-- About Section -->
    <section id="about" class="about">
        <div class="container">
            <h2 class="section-title">About ${businessName}</h2>
            <div class="about-content">
                <div class="about-text">
                    <p>At ${businessName}, we are committed to delivering excellence in ${industry.toLowerCase()}. Our team of experienced professionals brings years of expertise and a passion for innovation to every project.</p>
                    <p>We believe in building lasting relationships with our clients through transparency, reliability, and exceptional service quality.</p>
                </div>
                <div class="about-stats">
                    <div class="stat">
                        <h3>500+</h3>
                        <p>Projects Completed</p>
                    </div>
                    <div class="stat">
                        <h3>50+</h3>
                        <p>Happy Clients</p>
                    </div>
                    <div class="stat">
                        <h3>5+</h3>
                        <p>Years Experience</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="services">
        <div class="container">
            <h2 class="section-title">Our Services</h2>
            <div class="services-grid">
                <div class="service-card">
                    <h3>Consultation</h3>
                    <p>Expert advice and strategic planning for your ${industry.toLowerCase()} needs.</p>
                </div>
                <div class="service-card">
                    <h3>Implementation</h3>
                    <p>Professional implementation services with attention to detail and quality.</p>
                </div>
                <div class="service-card">
                    <h3>Support</h3>
                    <p>Ongoing support and maintenance to ensure your continued success.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact">
        <div class="container">
            <h2 class="section-title">Contact Us</h2>
            <div class="contact-content">
                <div class="contact-info">
                    <h3>Get in Touch</h3>
                    <p>Ready to start your project? We'd love to hear from you!</p>
                    <div class="contact-details">
                        <p><strong>Email:</strong> info@${businessName.toLowerCase().replace(/\s+/g, '')}.com</p>
                        <p><strong>Phone:</strong> (555) 123-4567</p>
                        <p><strong>Address:</strong> 123 Business St, City, State 12345</p>
                    </div>
                </div>
                <form class="contact-form">
                    <input type="text" placeholder="Your Name" required>
                    <input type="email" placeholder="Your Email" required>
                    <textarea placeholder="Your Message" rows="5" required></textarea>
                    <button type="submit" class="submit-button">Send Message</button>
                </form>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 ${businessName}. All rights reserved.</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>`
  }

  const generateCSS = () => {
    const { primaryColor, darkMode, titleColor, useTitleColor } = formData
    
    // Calculate optimal text color for primary color backgrounds
    const heroTextColor = getTextColor(primaryColor)
    
    // Determine which color to use for titles (logo and navigation)
    const finalTitleColor = useTitleColor && titleColor ? titleColor : primaryColor
    
    // Generate light/dark theme variables
    const lightTheme = `
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --text-primary: #333333;
  --text-secondary: #666666;
  --nav-bg: #ffffff;
  --card-bg: #ffffff;
  --border-color: #e0e0e0;
`
    
    const darkTheme = `
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --text-primary: #ffffff;
  --text-secondary: #cccccc;
  --nav-bg: #2d2d2d;
  --card-bg: #333333;
  --border-color: #404040;
`
    
    return `/* Reset and Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {${darkMode ? darkTheme : lightTheme}}

body {
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    color: var(--text-primary);
    background-color: var(--bg-primary);
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Navigation */
.navbar {
    background: var(--nav-bg);
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
}

.nav-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.nav-logo {
    color: ${finalTitleColor};
    font-size: 1.8rem;
    font-weight: bold;
}

.nav-menu {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-menu a {
    text-decoration: none;
    color: var(--text-primary);
    font-weight: 500;
    transition: color 0.3s;
}

.nav-menu a:hover {
    color: ${primaryColor};
}

/* Hero Section */
.hero {
    background: linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd);
    color: ${heroTextColor};
    padding: 120px 0 80px;
    text-align: center;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.hero-content {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 20px;
}

.hero-title {
    font-size: 3.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
    color: ${heroTextColor};
}

.hero-subtitle {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    opacity: 0.9;
    color: ${heroTextColor};
}

.hero-description {
    font-size: 1.1rem;
    margin-bottom: 2rem;
    opacity: 0.8;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    color: ${heroTextColor};
}

.cta-button {
    background: ${heroTextColor};
    color: ${primaryColor};
    padding: 15px 30px;
    border: 2px solid ${heroTextColor};
    border-radius: 5px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
}

.cta-button:hover {
    background: transparent;
    color: ${heroTextColor};
    border-color: ${heroTextColor};
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
}

/* Sections */
.section-title {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: var(--text-primary);
}

/* About Section */
.about {
    padding: 80px 0;
    background: var(--bg-secondary);
}

.about-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 4rem;
    align-items: center;
}

.about-text p {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    color: var(--text-secondary);
}

.about-stats {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.stat {
    text-align: center;
    padding: 1.5rem;
    background: var(--card-bg);
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    border: 1px solid var(--border-color);
}

.stat h3 {
    font-size: 2.5rem;
    color: ${primaryColor};
    margin-bottom: 0.5rem;
}

/* Services Section */
.services {
    padding: 80px 0;
    background: var(--bg-primary);
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.service-card {
    background: var(--card-bg);
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    text-align: center;
    transition: transform 0.3s;
    border: 1px solid var(--border-color);
}

.service-card:hover {
    transform: translateY(-5px);
}

.service-card h3 {
    color: ${primaryColor};
    margin-bottom: 1rem;
    font-size: 1.5rem;
}

.service-card p {
    color: var(--text-secondary);
}

/* Contact Section */
.contact {
    padding: 80px 0;
    background: var(--bg-secondary);
}

.contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
}

.contact-info h3 {
    color: ${primaryColor};
    margin-bottom: 1rem;
    font-size: 1.8rem;
}

.contact-info p {
    color: var(--text-secondary);
}

.contact-details {
    margin-top: 2rem;
}

.contact-details p {
    margin-bottom: 0.5rem;
    color: var(--text-secondary);
}

.contact-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.contact-form input,
.contact-form textarea {
    padding: 1rem;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    font-size: 1rem;
    background: var(--card-bg);
    color: var(--text-primary);
}

.submit-button {
    background: ${primaryColor};
    color: ${getTextColor(primaryColor)};
    padding: 1rem;
    border: none;
    border-radius: 5px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background 0.3s;
}

.submit-button:hover {
    background: ${primaryColor}dd;
}

/* Footer */
.footer {
    background: var(--nav-bg);
    color: var(--text-primary);
    text-align: center;
    padding: 2rem 0;
    border-top: 1px solid var(--border-color);
}

/* Responsive Design */
@media (max-width: 768px) {
    .nav-menu {
        display: none;
    }
    
    .hero-title {
        font-size: 2.5rem;
    }
    
    .about-content,
    .contact-content {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    
    .about-stats {
        flex-direction: row;
        justify-content: space-around;
    }
}`
  }

  const generateJS = () => {
    const { darkMode } = formData
    
    return `// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Contact form handling
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Navbar scroll effect - respects theme mode
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const rootStyles = getComputedStyle(document.documentElement);
    const navBg = rootStyles.getPropertyValue('--nav-bg').trim();
    
    if (window.scrollY > 50) {
        // Use theme-appropriate background with transparency
        ${darkMode ? 
          "navbar.style.background = 'rgba(45, 45, 45, 0.95)';" : 
          "navbar.style.background = 'rgba(255, 255, 255, 0.95)';"
        }
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        // Use original theme background
        navbar.style.background = navBg;
        navbar.style.backdropFilter = 'none';
    }
});`
  }

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

  const downloadWebsite = async () => {
    setIsGenerating(true)
    
    try {
      const zip = new JSZip()
      
      // Add files to zip
      zip.file('index.html', generateHTML())
      zip.file('styles.css', generateCSS())
      zip.file('script.js', generateJS())
      zip.file('README.md', generateREADME())
      
      // Generate zip file
      const content = await zip.generateAsync({ type: 'blob' })
      
      // Create download link
      const link = document.createElement('a')
      link.href = URL.createObjectURL(content)
      link.download = `${formData.businessName.replace(/\s+/g, '-').toLowerCase()}-website.zip`
      link.click()
      
      // Cleanup
      URL.revokeObjectURL(link.href)
    } catch (error) {
      console.error('Error generating website:', error)
      alert('Error generating website. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const isFormValid = formData.businessName.trim() && formData.description.trim()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
                  Website Generator
                </h1>
                <p className="text-sm text-slate-500">Professional websites in seconds</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-sm text-slate-600">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">✨ Live</span>
              <span>Real-time preview</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Form */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Create Your Website</h2>
                <p className="text-blue-100">Fill in your details to generate a professional website</p>
              </div>

              <form className="p-8 space-y-8">
                {/* Business Info Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 text-slate-700 font-semibold">
                    <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm flex items-center justify-center font-bold">1</span>
                    <span>Business Information</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Business Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-slate-900 placeholder-slate-400"
                        placeholder="Acme Corporation"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Industry
                      </label>
                      <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-slate-900"
                      >
                        {industries.map(industry => (
                          <option key={industry} value={industry}>
                            {industry}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Business Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white text-slate-900 placeholder-slate-400 resize-none"
                      placeholder="Brief description of your business and services..."
                      required
                    />
                  </div>
                </div>

                {/* Design Section */}
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 text-slate-700 font-semibold">
                    <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full text-sm flex items-center justify-center font-bold">2</span>
                    <span>Design & Branding</span>
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

                {/* Optional Title Color Section */}
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
                        placeholder="#FF6B6B"
                      />
                    </div>
                  )}
                </div>

                {/* Generate Button */}
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={downloadWebsite}
                    disabled={!isFormValid || isGenerating}
                    className={`w-full py-4 px-6 rounded-xl font-bold text-lg transition-all transform ${
                      isFormValid && !isGenerating
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl hover:scale-105'
                        : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    {isGenerating ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Generating Website...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span>🚀</span>
                        <span>Generate & Download Website</span>
                      </div>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden sticky top-24">
              {/* Preview Header */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Live Preview</h2>
                <p className="text-emerald-100">See your website come to life</p>
              </div>

              <div className="p-8">
                {formData.businessName ? (
                  <div className="space-y-6">
                    {/* Website Preview Card */}
                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 bg-slate-50">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                        <div className="flex-1 bg-slate-200 rounded-full h-6 flex items-center px-3">
                          <span className="text-xs text-slate-500">
                            {formData.businessName.toLowerCase().replace(/\s+/g, '')}.com
                          </span>
                        </div>
                      </div>
                      
                      <div 
                        className="rounded-lg overflow-hidden shadow-sm border"
                        style={{ 
                          backgroundColor: formData.darkMode ? '#1a1a1a' : '#ffffff',
                          borderColor: formData.darkMode ? '#404040' : '#e5e7eb'
                        }}
                      >
                        {/* Mini navbar */}
                        <div 
                          className="border-b px-4 py-2 flex items-center justify-between"
                          style={{ 
                            backgroundColor: formData.darkMode ? '#2d2d2d' : '#ffffff',
                            borderBottomColor: formData.darkMode ? '#404040' : '#e5e7eb'
                          }}
                        >
                          <div 
                            className="font-bold text-sm"
                            style={{ color: formData.useTitleColor && formData.titleColor ? formData.titleColor : formData.primaryColor }}
                          >
                            {formData.businessName}
                          </div>
                          <div className="flex space-x-2 text-xs" style={{ color: formData.darkMode ? '#cccccc' : '#6b7280' }}>
                            <span>Home</span>
                            <span>About</span>
                            <span>Services</span>
                          </div>
                        </div>
                        
                        {/* Mini hero section */}
                        <div 
                          className="px-4 py-6 text-center text-white"
                          style={{ 
                            background: `linear-gradient(135deg, ${formData.primaryColor}, ${formData.primaryColor}dd)`,
                            color: getTextColor(formData.primaryColor)
                          }}
                        >
                          <h3 className="font-bold text-sm mb-1">Welcome to {formData.businessName}</h3>
                          <p className="text-xs opacity-90">Professional {formData.industry} services</p>
                        </div>
                        
                        {/* Mini content sections */}
                        <div className="p-4 space-y-3">
                          <div 
                            className="h-2 rounded w-3/4"
                            style={{ backgroundColor: formData.darkMode ? '#404040' : '#e5e7eb' }}
                          ></div>
                          <div 
                            className="h-2 rounded w-1/2"
                            style={{ backgroundColor: formData.darkMode ? '#404040' : '#e5e7eb' }}
                          ></div>
                          <div className="grid grid-cols-3 gap-2 mt-3">
                            <div 
                              className="h-8 rounded"
                              style={{ backgroundColor: formData.darkMode ? '#333333' : '#f1f5f9' }}
                            ></div>
                            <div 
                              className="h-8 rounded"
                              style={{ backgroundColor: formData.darkMode ? '#333333' : '#f1f5f9' }}
                            ></div>
                            <div 
                              className="h-8 rounded"
                              style={{ backgroundColor: formData.darkMode ? '#333333' : '#f1f5f9' }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Preview Details */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <span className="text-sm font-medium text-slate-700">Business Name</span>
                        <span className="text-sm text-slate-900 font-semibold">{formData.businessName}</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <span className="text-sm font-medium text-slate-700">Industry</span>
                        <span className="text-sm text-slate-900">{formData.industry}</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                        <span className="text-sm font-medium text-slate-700">Theme</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-slate-900">
                            {formData.darkMode ? '🌙 Dark' : '☀️ Light'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-slate-50 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-slate-700">Colors</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-6 h-6 rounded-lg border-2 border-white shadow-sm" 
                              style={{ backgroundColor: formData.primaryColor }}
                            ></div>
                            <div>
                              <p className="text-xs font-medium text-slate-700">Primary</p>
                              <p className="text-xs text-slate-500">{formData.primaryColor}</p>
                            </div>
                          </div>
                          
                          {formData.useTitleColor && formData.titleColor && (
                            <div className="flex items-center space-x-2">
                              <div 
                                className="w-6 h-6 rounded-lg border-2 border-white shadow-sm" 
                                style={{ backgroundColor: formData.titleColor }}
                              ></div>
                              <div>
                                <p className="text-xs font-medium text-slate-700">Title</p>
                                <p className="text-xs text-slate-500">{formData.titleColor}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-xl">
                        <span className="text-sm font-medium text-slate-700 block mb-2">Smart Text Contrast</span>
                        <div className="flex items-center space-x-2">
                          <span 
                            className="px-3 py-1 rounded-full text-xs font-medium"
                            style={{
                              backgroundColor: formData.primaryColor,
                              color: getTextColor(formData.primaryColor)
                            }}
                          >
                            {getTextColor(formData.primaryColor) === '#ffffff' ? 'White Text' : 'Black Text'}
                          </span>
                          <span className="text-xs text-slate-500">Auto-calculated for accessibility</span>
                        </div>
                      </div>
                      
                      {formData.description && (
                        <div className="p-4 bg-slate-50 rounded-xl">
                          <span className="text-sm font-medium text-slate-700 block mb-2">Description</span>
                          <p className="text-sm text-slate-600 italic">"{formData.description}"</p>
                        </div>
                      )}
                    </div>

                    {/* Features List */}
                    <div className="border-t pt-6">
                      <h4 className="font-semibold text-slate-700 mb-4">Your website will include:</h4>
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="flex items-center space-x-2">
                          <span className="text-green-500">✓</span>
                          <span className="text-slate-600">Responsive Design</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-500">✓</span>
                          <span className="text-slate-600">Contact Form</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-500">✓</span>
                          <span className="text-slate-600">Hero Section</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-500">✓</span>
                          <span className="text-slate-600">Services Grid</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-500">✓</span>
                          <span className="text-slate-600">About Section</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-500">✓</span>
                          <span className="text-slate-600">SEO Ready</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl text-slate-400">🌐</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700 mb-2">Ready to Create</h3>
                    <p className="text-slate-500">Enter your business details to see a preview</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App 