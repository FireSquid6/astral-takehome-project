# Development Guide

## Commands
- Build: `bun run build`
- Dev server: `bun run dev`
- Start: `bun run start`
- Lint: `bun run lint`

## Code Style
- **Imports**: Group imports by source (React/Next.js, components, lib)
- **Components**: Functional components with React hooks
- **TypeScript**: Use strict typing with interfaces for complex types
- **State Management**: Use Jotai for state management
- **CSS**: TailwindCSS for styling with className
- **Naming**: camelCase for variables, PascalCase for components/interfaces
- **Error Handling**: Use try/catch and throw Error with descriptive messages

## Project Structure
- `/src/app`: Next.js app router pages
- `/src/components`: Reusable React components
- `/src/lib`: Utility functions, types, and state management

## Best Practices
- Use "use client" directive for client components
- Utilize Next.js features (prefetching, app router)
- Extract complex logic to lib/ utilities
- Type all props and state