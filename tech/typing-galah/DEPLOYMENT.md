# 🚀 Deployment Guide - Typing Galah

## Quick Deploy to Vercel (Recommended)

### 1. Prepare Your Repository

```bash
# In tech/typing-galah directory
git init
git add .
git commit -m "Initial Typing Galah commit"
git branch -M main

# Create GitHub repo and push
git remote add origin https://github.com/yourusername/typing-galah.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click "New Project" → Import your `typing-galah` repository
3. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (or `tech/typing-galah` if needed)
   - **Build Command**: `npm run build`
   - **Install Command**: `npm install`

### 3. Set Environment Variables

In Vercel dashboard → Settings → Environment Variables:

```
NEXT_PUBLIC_SUPABASE_URL = your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY = your-supabase-anon-key
```

### 4. Fix Supabase Email Links

1. Go to your Supabase dashboard
2. Navigate to: **Authentication → URL Configuration**
3. Update **Site URL** to your Vercel URL (e.g., `https://typing-galah.vercel.app`)
4. Add **Redirect URLs**:

   ```
   https://typing-galah.vercel.app/auth/callback
   https://your-custom-domain.com/auth/callback
   ```

### 5. Custom Domain (Optional)

- In Vercel: Settings → Domains
- Add your custom domain
- Update Supabase URLs accordingly

---

## Alternative: Deploy to Netlify

### 1. Build Locally

```bash
npm run build
npm run export  # If using static export
```

### 2. Deploy

1. Go to [netlify.com](https://netlify.com)
2. Drag `.next` folder to deploy
3. Or connect GitHub for auto-deploys

### 3. Environment Variables

- Site Settings → Environment Variables
- Add same Supabase credentials

---

## Alternative: Railway

### 1. One-Click Deploy

1. Go to [railway.app](https://railway.app)
2. "Deploy from GitHub"
3. Select your repository
4. Add environment variables

---

## Post-Deployment Checklist

✅ **Test Authentication**

- Sign up with new email
- Check email links work with new domain
- Test login/logout functionality

✅ **Test Typing Interface**

- Demo page loads correctly
- Typing recognition is responsive
- Data saves to Supabase

✅ **Test Database**

- User profiles create correctly
- Typing attempts save properly
- Achievements system works

✅ **Performance**

- Page load speeds
- Typing responsiveness
- Mobile compatibility

---

## Custom Domain Setup

### 1. Add Domain to Vercel

```bash
# Using Vercel CLI (optional)
npm i -g vercel
vercel --prod
vercel domains add yourdomain.com
```

### 2. Update DNS Records

Point your domain to Vercel:

```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

### 3. Update Supabase

Update all URLs in Supabase to use your custom domain.

---

## Troubleshooting

### Email Links Still Point to Localhost

- Check Supabase → Authentication → URL Configuration
- Ensure Site URL matches your deployed domain
- Clear browser cache and test with incognito

### Build Errors

- Check environment variables are set correctly
- Ensure all dependencies are in package.json
- Check Vercel build logs for specific errors

### Database Connection Issues

- Verify Supabase URL and key are correct
- Check network requests in browser dev tools
- Ensure Supabase project is not paused

---

## Free Tier Limits

### Vercel Free Tier

- 100GB bandwidth/month
- 100GB-hours serverless function execution
- 6,000 serverless function invocations/day

### Supabase Free Tier

- Up to 500MB database size
- Up to 2GB bandwidth
- 50MB file uploads
- 50,000 monthly active users

These limits are generous for most projects! 🎉
