# Lowcode Cloud Platform Architecture

A comprehensive architecture documentation site for a multi-tenant cloud platform deployed on Alibaba Cloud.

## Overview

This project provides an interactive visualization of the Lowcode Cloud Platform architecture, showcasing 5 independent systems deployed within an Alibaba Cloud VPC:

- **Broker System** - Serverless OAuth authentication proxy (Function Compute)
- **Tenant Management** - Control plane for tenant lifecycle management
- **API Platform** - Developer portal with unified API gateway
- **Tenant (Data Plane)** - Standalone backend for each tenant
- **Observability** - Logging, monitoring, and dashboard system

## Deployment

This project is automatically deployed to **GitHub Pages** using **GitHub Actions**.

### How it works

1. **Automatic Deployment**: When you push to the `main` branch, GitHub Actions automatically:

   - Builds the project (`npm run build`)
   - Deploys to GitHub Pages
   - Handles SPA routing with 404.html trick

2. **Manual Trigger**: You can also manually trigger deployment from the Actions tab.

3. **Live Site**: The site is available at:
   ```
   https://Cybozu-SHSD.github.io/nata-doc
   ```

### GitHub Pages Setup

**Important**: Before the first deployment, you need to configure GitHub Pages:

1. Go to your repository **Settings** → **Pages**
2. Under **Build and deployment**:
   - Set **Source** to **GitHub Actions** (not "Deploy from a branch")
3. The workflow (`.github/workflows/deploy.yml`) will handle the rest automatically

Once configured, every push to `main` will trigger automatic deployment.

## Project Structure

```
├── src/
│   ├── components/        # React components
│   │   ├── architecture/  # Architecture diagrams
│   │   └── ui/            # shadcn-ui components
│   ├── pages/             # Page components
│   └── lib/               # Utilities
├── .github/workflows/     # GitHub Actions workflow
└── public/                # Static assets
```

## License

This project is part of the Cybozu-SHSD organization.
