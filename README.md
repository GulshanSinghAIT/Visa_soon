# H-1B Job Board Waitlist

A beautiful, responsive React waitlist application for your H-1B job board. Built with React, Vite, Tailwind CSS, and shadcn/ui components.

## Features

- ✨ Modern UI with shadcn/ui components and Tailwind CSS
- 🏠 Professional landing page with 100vh hero section
- 📋 Dedicated waitlist form page
- 📱 Fully responsive design
- 🔄 React Router navigation between pages
- ✅ Form validation with real-time feedback
- 🎉 Thank you message after submission
- 💾 Multiple data storage options
- ⚡ Fast development with Vite

## Pages

### 1. Landing Page (`/`)
- 100vh hero section with compelling messaging
- Features showcase with icons and descriptions
- Statistics and social proof
- Call-to-action buttons linking to waitlist
- Additional information sections
- Professional footer

### 2. Waitlist Form Page (`/waitlist`)
- Dedicated form page with shadcn/ui components
- Form validation with real-time feedback
- Success page with next steps
- Navigation back to landing page

## Form Fields

- **Full Name** (required)
- **Email Address** (required, with validation)
- **Preferred Job Title** (required)
- **Message** (optional)

## Data Storage Options

The application supports multiple storage methods:

### 1. Formspree (Recommended - No Backend Required)

1. Go to [Formspree.io](https://formspree.io) and create a free account
2. Create a new form and get your form ID
3. Replace `YOUR_FORM_ID` in `src/components/WaitlistForm.jsx` with your actual form ID:
   ```javascript
   const response = await fetch('https://formspree.io/f/YOUR_ACTUAL_FORM_ID', {
   ```

**Benefits:**
- Free tier: 50 submissions/month
- Email notifications
- Spam protection
- Export to CSV/JSON
- No backend required

### 2. Netlify Forms (If deploying on Netlify)

1. Add `netlify` attribute to your form tag
2. Deploy on Netlify
3. Forms will be automatically handled

### 3. LocalStorage (Development/Fallback)

Data is automatically saved to browser's localStorage as a backup. To view stored data:

```javascript
// In browser console
console.log(JSON.parse(localStorage.getItem('h1b-waitlist')))
```

### 4. Other Options

You can easily integrate with:
- Google Sheets (via Google Apps Script)
- Airtable
- Firebase
- Supabase
- Your own backend API

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

## Setup for Production

1. **Configure form submission:**
   - Sign up for Formspree and replace `YOUR_FORM_ID` in `src/pages/WaitlistPage.jsx`
   - Or implement your preferred storage solution

2. **Build for production:**
   ```bash
   npm run build
   ```

3. **Deploy:**
   - Upload `dist/` folder to your hosting provider
   - Or use services like Netlify, Vercel, or GitHub Pages

## Customization

### Styling
- Modify colors in `tailwind.config.js`
- Update custom styles in `src/index.css`
- Adjust component styles in the React components

### Content
- Update branding in `src/App.jsx`
- Modify form fields in `src/components/WaitlistForm.jsx`
- Change meta tags in `index.html`

### Form Fields
To add/remove fields:
1. Update the `formData` state in `WaitlistForm.jsx`
2. Add validation in the `validateForm` function
3. Add the input field to the form JSX

## Project Structure

```
├── src/
│   ├── components/
│   │   └── ui/                # shadcn/ui components
│   │       ├── button.jsx
│   │       ├── card.jsx
│   │       ├── input.jsx
│   │       ├── label.jsx
│   │       └── textarea.jsx
│   ├── lib/
│   │   └── utils.js           # Utility functions
│   ├── pages/
│   │   ├── LandingPage.jsx    # 100vh landing page
│   │   └── WaitlistPage.jsx   # Waitlist form page
│   ├── App.jsx                # Main app with routing
│   ├── main.jsx               # React entry point
│   └── index.css              # Tailwind styles
├── index.html                 # HTML template
├── jsconfig.json              # JavaScript configuration
├── components.json            # shadcn/ui configuration
├── package.json               # Dependencies
├── tailwind.config.js         # Tailwind configuration
├── vite.config.js            # Vite configuration
└── postcss.config.js         # PostCSS configuration
```

## Technologies Used

- **React 18** - UI framework
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **Lucide React** - Modern icon library
- **Formspree** - Form handling (optional)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this for your own projects!

---

**Need help?** Check the issues section or create a new issue if you encounter any problems. #   V i s a _ s o o n  
 