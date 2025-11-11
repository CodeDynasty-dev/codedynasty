# Technology Stack

## Build System
- **Primary Tool**: Docmach (v1.0.18) - Static site generator for content publishing
- **Package Manager**: npm
- **Module System**: ES modules (type: "module")

## Frontend Technologies
- **Styling**: Tailwind CSS for utility-first styling
- **JavaScript**: Vanilla ES6+ modules
- **Icons**: Font Awesome 6.4.2
- **Code Highlighting**: Highlight.js (Atom One Dark theme)
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## Content Management
- **Content Format**: Markdown files with Docmach templating
- **Template Engine**: Custom Docmach wrapper system
- **Asset Management**: Static assets in `/assets` folder
- **Image Optimization**: WebP format preferred for logos and graphics

## Development Dependencies
- docmach: ^1.0.18 (main build tool)
- source-map: ^0.7.6 (debugging support)

## Common Commands

### Development
```bash
npm run watch    # Start development server with file watching
```

### Building
```bash
npm run build    # Build production site to dist/ folder
npm run print    # Generate print-friendly version
```

### Project Setup
```bash
npm install      # Install dependencies
```

## Configuration
- **Build Directory**: `dist/` (configured in package.json)
- **Assets Folder**: `./assets` (static files)
- **Content Structure**: Posts in `/posts`, Pages in `/pages`, Templates in `/fragments`

## Browser Support
- Modern browsers with ES6+ support
- Mobile-responsive design
- Progressive enhancement approach