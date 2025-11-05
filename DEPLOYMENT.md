# GitHub Pages Deployment Guide

This guide explains how to deploy your blog to GitHub Pages.

## Option 1: Automatic Deployment with GitHub Actions (Recommended)

1. **Enable GitHub Pages in your repository:**
   - Go to your repository on GitHub
   - Click on **Settings** → **Pages**
   - Under **Source**, select **GitHub Actions**

2. **Push your code:**
   - The workflow file (`.github/workflows/deploy.yml`) is already set up
   - Push your code to the `main` branch (or `master` if that's your default branch)
   - GitHub Actions will automatically build and deploy your site

3. **Your site will be available at:**
   - `https://<your-username>.github.io/<repository-name>/`

## Option 2: Manual Deployment with gh-pages

1. **Set the base path:**
   - Create a `.env` file in the root directory
   - Add: `VITE_BASE_PATH=/<repository-name>/`
   - Replace `<repository-name>` with your actual repository name

2. **Deploy:**
   ```bash
   npm run deploy
   ```

3. **Configure GitHub Pages:**
   - Go to your repository on GitHub
   - Click on **Settings** → **Pages**
   - Under **Source**, select the `gh-pages` branch
   - Click **Save**

## Important Notes

- **Repository name matters:** If your repository is named `my-blog`, your site will be at `https://<username>.github.io/my-blog/`
- **Custom domain:** If you want to use a custom domain (e.g., `yourdomain.com`), set `VITE_BASE_PATH=/` in your `.env` file
- **For username.github.io repos:** If your repository is named `<username>.github.io`, set `VITE_BASE_PATH=/` (no repo name needed)

## Troubleshooting

- **404 errors on routes:** Make sure `VITE_BASE_PATH` matches your repository name
- **Assets not loading:** Check that the base path in `vite.config.ts` matches your deployment path
- **Build fails:** Make sure all dependencies are installed with `npm install`

## Testing Locally

To test the production build locally:
```bash
# Set the base path
export VITE_BASE_PATH=/<repository-name>/
npm run build
npm run preview
```

