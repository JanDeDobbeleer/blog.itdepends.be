# IT depends - blog

A Hugo-based blog deployed to GitHub Pages.

## Local Development

To run the site locally, you need to have [Hugo](https://gohugo.io/) installed.

```bash
# Install Hugo (extended version)
# See https://gohugo.io/installation/

# Run the development server
hugo server -D

# Build the site
hugo
```

## Deployment

This site is automatically deployed to GitHub Pages using GitHub Actions whenever changes are pushed to the `main` branch.

The workflow:
1. Builds the Hugo site using Hugo version 0.152.2
2. Uploads the built site as an artifact
3. Deploys to GitHub Pages

## GitHub Pages Configuration

To enable GitHub Pages for this repository:

1. Go to repository Settings > Pages
2. Set Source to "GitHub Actions"
3. The site will be available at: https://jandeddobbeleer.github.io/blog.itdepends.be/

## Structure

- `content/` - Blog posts and content
- `layouts/` - Hugo layout templates
- `static/` - Static assets (CSS, JS, images)
- `config.toml` - Hugo configuration
- `.github/workflows/hugo.yml` - GitHub Actions workflow for deployment
