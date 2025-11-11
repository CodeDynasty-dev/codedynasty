# Project Structure

## Root Directory
- `package.json` - Project configuration and dependencies
- `tailwind.config.js` - Tailwind CSS configuration
- `.gitignore` - Git ignore rules (excludes node_modules, dist, backups)

## Content Organization

### `/posts/` - Blog Articles
- Markdown files for blog posts and technical articles
- Each post uses Docmach wrapper with `fragments/post-structure.html`
- Required frontmatter parameters: author, title, topic, image, time_created, etc.
- Example: `posts/welcome.md`, `posts/JavaScript-Microtasks-A-deep-look-and-comparision-to-defer.md`

### `/pages/` - Static Pages
- Standalone pages like author profiles and special content
- Uses `fragments/page-structure.html` wrapper
- Example: `pages/friday.md` (author portfolio page)

### `/fragments/` - Template Components
- `page-structure.html` - Base template for static pages
- `post-structure.html` - Template for blog posts with full metadata
- `code-block.html` - Reusable code block component
- `tags.js` - Tag generation functionality

### `/assets/` - Static Resources
- `/assets/post-images/` - Images for blog posts
- `/assets/script/` - JavaScript files
- `/assets/styles/` - CSS files
- Logo files, favicons, and other static assets
- Organized by type and purpose

## Build Output
- `/dist/` - Generated static site (excluded from git)
- `/node_modules/` - Dependencies (excluded from git)

## Content Conventions

### Docmach Template Usage
```html
<docmach type="wrapper" file="fragments/post-structure.html" replacement="content" params="
author:Friday Candour;
title:Article Title;
topic:Category;
image:/path/to/image.png;
">
Content goes here
</docmach>
```

### File Naming
- Use kebab-case for file names
- Descriptive names for posts: `JavaScript-Microtasks-A-deep-look-and-comparision-to-defer.md`
- Simple names for pages: `friday.md`

### Asset Organization
- Post images in `/assets/post-images/`
- Use WebP format for optimized images
- Maintain consistent naming conventions

## Backup and Archive
- `/arise_backup/` - Contains backup of previous site version (excluded from git)
- `/fov/` - Additional resources and ideas (excluded from git)