# Automatic WhatsApp/Email Notification Setup

## 🎯 What This Does

When a customer submits a message through your contact form, **you will automatically receive an email notification** on your phone/email that looks like it came from WhatsApp. The customer **does NOT need to open WhatsApp** - the message is sent automatically to you.

## ✅ Step-by-Step Setup

### Step 1: Create a Free EmailJS Account (2 minutes)

1. Go to **https://www.emailjs.com**
2. Sign up for a **FREE account**
3. You'll get 200 emails per month FREE (plenty for a small business!)

### Step 2: Create an Email Service

1. In EmailJS dashboard, click **"Add New Service"**
2. Choose **"Gmail"** (or your email provider)
3. Connect your email (the one where you want to receive notifications)
4. Click **"Create Service"**
5. Copy your **Service ID** (something like: `service_abc123`)

### Step 3: Create an Email Template

1. Click **"Create New Template"**
2. Give it a name: **"Elegant Eats Contact Form"**
3. Set **Subject** to: `📱 New Contact - {{service}} - {{from_name}}`
4. For the template content, **open the file `EMAILJS_TEMPLATE_CODE.txt`** in your folder and copy ALL the HTML code starting from `<div style="font-family...` to the end.
5. Paste it into the EmailJS template editor.

6. Set **"To Email"** to: **YOUR email address** (where you want to receive notifications)
7. Set **"From Name"** to: **Elegant Eats Website**
8. Click **"Save"**
9. Copy your **Template ID** (something like: `template_xyz789`)

### Step 4: Get Your Public Key

1. In EmailJS dashboard, go to **"Account"** or **"Integration"**
2. Find your **"Public Key"** (something like: `user_abc123xyz`)
3. Copy it

### Step 5: Update Your Website in script.js

Open `script.js` and find these lines around **line 47-76**:

```javascript
// Line 48: Replace with your Public Key
emailjs.init("YOUR_PUBLIC_KEY_HERE");

// Lines 74-76: Replace with your IDs
await emailjs.send(
    'YOUR_SERVICE_ID',    // Your Service ID
    'YOUR_TEMPLATE_ID',   // Your Template ID
```

**Replace:**
- `YOUR_PUBLIC_KEY_HERE` → Your Public Key from EmailJS
- `YOUR_SERVICE_ID` → Your Service ID
- `YOUR_TEMPLATE_ID` → Your Template ID

### Step 6: Test It!

1. Open your website
2. Fill out the contact form
3. Submit it
4. **Check your email** - you should receive the notification!

---

## 📱 What Happens When Customer Submits Form?

1. ✅ Customer fills out the form and clicks "Send Message"
2. ✅ The form data is **automatically sent to your email**
3. ✅ You receive an email notification (can check on phone, email, or WhatsApp if connected)
4. ✅ Customer sees "Thank you" message
5. ✅ You now have all their details to contact them back!

---

## 🎨 Customization Options

### Option A: Email-Only (Current Setup)
- You receive notifications via email
- Free and reliable
- Works immediately

### Option B: Email + WhatsApp Notification
- Forward emails to your WhatsApp
- Set up email forwarding: `your-email+forward@smtp.gmail.com` → WhatsApp number
- Or use Zapier/Make.com to auto-forward to WhatsApp

### Option C: True WhatsApp API (Advanced)
- Requires WhatsApp Business API approval from Meta
- Costs money (~$50-200/month)
- Best for high-volume businesses
- Contact Meta/Facebook for access

---

## 🆘 Troubleshooting

### Not receiving emails?
1. Check your EmailJS dashboard for errors
2. Check spam folder
3. Verify your Service ID, Template ID, and Public Key are correct
4. Make sure you're within the free tier limits (200 emails/month)

### Want to change the notification format?
Edit the template in EmailJS to customize the message format.

### Want to add WhatsApp directly?
Use a service like:
- **Make.com** (integrates with WhatsApp Business API)
- **Zapier** (connects webhook to WhatsApp)
- **WhatsApp Cloud API** (requires Meta approval)

---

## 💰 Pricing

- **EmailJS Free Tier:** 200 emails/month = **FREE**
- **EmailJS Paid:** Starts at $15/month for 1,000 emails
- **WhatsApp Business API:** Requires application and fees

---

## 📞 Need Help?

If you need help setting this up, you can:
1. Email the EmailJS support
2. Contact a developer to help you integrate
3. Use the built-in notification system above

Good luck! 🍽️

