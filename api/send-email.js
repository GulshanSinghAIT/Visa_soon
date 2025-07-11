import sgMail from '@sendgrid/mail';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Set up SendGrid with API key from environment variables
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    // Extract data from request body
    const { userData } = req.body;
    
    if (!userData || !userData.email || !userData.fullName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Email configuration
    const msg = {
      to: userData.email,
      from: process.env.FROM_EMAIL, // Must be verified sender in SendGrid
      subject: "🎉 You're On the List! Here's What's Next",
      text: `Hi ${userData.fullName}, thanks for signing up for VisaFriendly!`,
      html: `
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Waitlist Confirmation - VisaFriendly</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f0f4f8;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f0f4f8;">
    <tr>
      <td align="center" style="padding: 20px 10px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; box-shadow: 0 8px 32px rgba(59, 130, 246, 0.1); overflow: hidden;">
          
          <!-- Header with gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                🎯 You're on the List!
              </h1>
              <p style="margin: 10px 0 0 0; color: #dbeafe; font-size: 16px; opacity: 0.9;">
                Early access to your visa-sponsored career awaits
              </p>
            </td>
          </tr>
          
          <!-- Main content -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="margin: 0 0 20px 0; color: #1e40af; font-size: 24px; font-weight: 600;">
                Hi ${userData.fullName}! 👋
              </h2>
              
              <p style="margin: 0 0 25px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                <strong>Thank you for joining the VisaFriendly Early Access Waitlist!</strong>
              </p>
              
              <p style="margin: 0 0 25px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                We're excited to help you unlock your U.S. career opportunities — with zero visa guesswork. 🌟
              </p>
              
              <!-- Feature highlights -->
              <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
                <h3 style="margin: 0 0 15px 0; color: #1e40af; font-size: 18px; font-weight: 600;">
                  Here's what makes VisaFriendly different:
                </h3>
                <ul style="margin: 0; padding-left: 20px; color: #374151; font-size: 15px; line-height: 1.7;">
                  <li style="margin-bottom: 12px;">
                    <strong style="color: #1e40af;">✅ Verified Visa Sponsorship</strong><br>
                    <span style="color: #6b7280; font-size: 14px;">No more wasted time — find jobs, internships, and co-ops at companies that actually sponsor H-1B and Green Cards.</span>
                  </li>
                  <li style="margin-bottom: 12px;">
                    <strong style="color: #1e40af;">✅ Personalized Job Matches</strong><br>
                    <span style="color: #6b7280; font-size: 14px;">Get roles tailored to your visa status, experience, and career goals.</span>
                  </li>
                  <li style="margin-bottom: 12px;">
                    <strong style="color: #1e40af;">✅ Faster, Smarter Applications</strong><br>
                    <span style="color: #6b7280; font-size: 14px;">Save jobs, track applications, and follow up — all in one place.</span>
                  </li>
                  <li style="margin-bottom: 8px;">
                    <strong style="color: #1e40af;">✅ Real Insights for F-1 and H-1B Holders</strong><br>
                    <span style="color: #6b7280; font-size: 14px;">Resources, checklists, and hiring trends designed just for you.</span>
                  </li>
                </ul>
              </div>
              
              <!-- What's Next Section -->
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;">
                <h3 style="margin: 0 0 15px 0; color: #92400e; font-size: 18px; font-weight: 600;">
                  👀 What's Next?
                </h3>
                <p style="margin: 0; color: #78350f; font-size: 15px; line-height: 1.6;">
                  We'll email you as soon as your early access is ready. Until then, stay tuned — and get ready to land your visa-sponsored dream job faster.
                </p>
              </div>
              
              <p style="margin: 25px 0; color: #374151; font-size: 16px; line-height: 1.6;">
                Thank you for being part of our growing community. We're building VisaFriendly for you — and we can't wait to support your journey!
              </p>
              
              <!-- CTA Button -->
              <div style="text-align: center; margin: 35px 0;">
                <a href="https://www.visafriendly.com/" style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 14px rgba(59, 130, 246, 0.3); transition: all 0.3s ease;">
                  Visit VisaFriendly →
                </a>
              </div>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 10px 0; color: #64748b; font-size: 14px;">
                Questions? Reply to this email
              </p>
              <p style="margin: 0; color: #94a3b8; font-size: 13px;">
                © 2024 VisaFriendly Team. Helping dreams become reality, with no visa barriers.
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
      `
    };

    // Send email
    await sgMail.send(msg);
    
    console.log(`✅ Email sent to ${userData.email}`);
    
    // Return success response
    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully' 
    });

  } catch (error) {
    console.error('❌ Email failed:', error.message);
    
    // Return error response
    res.status(500).json({ 
      success: false, 
      error: 'Failed to send email' 
    });
  }
} 