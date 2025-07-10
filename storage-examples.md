# Storage Integration Examples

This document provides code examples for different storage solutions you can integrate with your waitlist form.

## 1. Formspree Integration (Recommended)

### Step 1: Sign up and create form
1. Go to [formspree.io](https://formspree.io)
2. Create account and new form
3. Get your form ID (looks like `xpzgkrqv`)

### Step 2: Update the form submission code
Replace `YOUR_FORM_ID` in `src/pages/WaitlistPage.jsx`:

```javascript
const response = await fetch('https://formspree.io/f/xpzgkrqv', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: formData.fullName,
    email: formData.email,
    jobTitle: formData.jobTitle,
    message: formData.message,
    timestamp: new Date().toISOString()
  }),
});
```

## 2. Google Sheets Integration

### Step 1: Create Google Apps Script
1. Go to [script.google.com](https://script.google.com)
2. Create new project with this code:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    new Date(),
    data.name,
    data.email,
    data.jobTitle,
    data.message
  ]);
  
  return ContentService
    .createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

### Step 2: Deploy and get URL
1. Deploy as web app
2. Copy the web app URL
3. Update fetch URL in your component

## 3. Airtable Integration

### Step 1: Setup Airtable
1. Create Airtable base with these fields:
   - Name (Single line text)
   - Email (Email)
   - Job Title (Single line text)
   - Message (Long text)
   - Timestamp (Date)

### Step 2: Get API credentials
1. Go to [airtable.com/api](https://airtable.com/api)
2. Get your base ID and API key

### Step 3: Update submission code
```javascript
const response = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    fields: {
      'Name': formData.fullName,
      'Email': formData.email,
      'Job Title': formData.jobTitle,
      'Message': formData.message,
      'Timestamp': new Date().toISOString()
    }
  })
});
```

## 4. Firebase Integration

### Step 1: Install Firebase
```bash
npm install firebase
```

### Step 2: Initialize Firebase
Create `src/firebase.js`:

```javascript
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  // Your config
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```

### Step 3: Update form submission
```javascript
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

// In your submit handler
await addDoc(collection(db, 'waitlist'), {
  name: formData.fullName,
  email: formData.email,
  jobTitle: formData.jobTitle,
  message: formData.message,
  timestamp: new Date()
});
```

## 5. Netlify Forms Integration

### Step 1: Add netlify attribute to form
```javascript
<form onSubmit={handleSubmit} className="space-y-6" netlify>
  <input type="hidden" name="form-name" value="waitlist" />
  {/* rest of your form */}
</form>
```

### Step 2: Update submission for Netlify
```javascript
const formData = new FormData();
formData.append('form-name', 'waitlist');
formData.append('name', formData.fullName);
formData.append('email', formData.email);
formData.append('jobTitle', formData.jobTitle);
formData.append('message', formData.message);

await fetch('/', {
  method: 'POST',
  body: formData
});
```

## 6. Supabase Integration

### Step 1: Install Supabase
```bash
npm install @supabase/supabase-js
```

### Step 2: Setup client
Create `src/supabase.js`:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'your-url';
const supabaseKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
```

### Step 3: Update submission
```javascript
import { supabase } from '../supabase';

// In your submit handler
const { data, error } = await supabase
  .from('waitlist')
  .insert([
    {
      name: formData.fullName,
      email: formData.email,
      job_title: formData.jobTitle,
      message: formData.message,
      created_at: new Date()
    }
  ]);
```

## Environment Variables

For production, use environment variables:

Create `.env`:
```
VITE_FORMSPREE_ID=your_form_id
VITE_AIRTABLE_API_KEY=your_api_key
VITE_FIREBASE_CONFIG=your_config
```

Access in code:
```javascript
const formId = import.meta.env.VITE_FORMSPREE_ID;
```

## Error Handling

Always implement proper error handling:

```javascript
try {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error('Submission failed');
  // Success handling
} catch (error) {
  console.error('Error:', error);
  // Fallback to localStorage
  const existingData = JSON.parse(localStorage.getItem('h1b-waitlist') || '[]');
  existingData.push({ ...formData, id: Date.now(), timestamp: new Date().toISOString() });
  localStorage.setItem('h1b-waitlist', JSON.stringify(existingData));
  // Still show success message
}
```

Choose the solution that best fits your needs and technical requirements! 