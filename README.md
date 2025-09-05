# Carlo Vii - Portfolio

A modern, responsive portfolio website built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

- **Modern Design**: Clean, professional layout with smooth animations
- **Responsive**: Works perfectly on all devices
- **Fast Performance**: Optimized with Next.js static generation
- **Easy to Update**: Modular data files for projects, statistics, and personal info
- **GitHub Pages Ready**: Configured for automatic deployment

## Project Structure

```
src/
├── components/          # React components
├── data/               # Data files (easily editable)
│   ├── projects.ts     # Project portfolio data
│   ├── statistics.ts   # Statistics/metrics data
│   └── personal-info.ts # Personal information and skills
└── app/                # Next.js app directory

public/
└── img/                # Static images and assets
```

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Customization

### Adding New Projects
Edit `src/data/projects.ts` to add new projects:

```typescript
{
  id: 'new-project',
  title: 'New Project',
  description: 'Short description',
  category: 'personal',
  technologies: ['React', 'TypeScript'],
  // ... other fields
}
```

### Updating Statistics
Edit `src/data/statistics.ts` to update your metrics:

```typescript
{
  id: 'websites',
  icon: '📄',
  value: 10,
  label: 'Websites'
}
```

### Personal Information
Update your details in `src/data/personal-info.ts`

## Deployment

This project is configured for GitHub Pages deployment:

1. Push to your main branch
2. GitHub Actions will automatically build and deploy
3. Enable Pages in your repository settings

## Technologies Used

- [Next.js 15](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Lucide React](https://lucide.dev/) - Icons
