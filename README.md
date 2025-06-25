# Der Baukasten

> Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

### Includes:

- [x] [Storyblok](https://www.storyblok.com/)
- [x] [Nuxt Icons](https://nuxt.com/modules/icon)
- [x] [Nuxt Images](https://nuxt.com/modules/image)
- [x] [Lenis Scroll](https://github.com/darkroomengineering/lenis)

## Setup

```bash
# Install dependencies
npm install

# Initialize Git
git init

# Install Husky
npm run prepare
```

## Development Server

Start the development server on `http://localhost:6620`

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Local preview production build:

```bash
npm run preview
```

> Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Storyblok API Key

Replace the `STORYBLOK_API_KEY` in `nuxt.config.js` with your key.

## Favicons

Replace the favicons in `public/favicons` with your own. Use [RealFaviconGenerator](https://realfavicongenerator.net/)
to generate them.

## Icons

To use icons, use the `Icon` component like this:

```vue
<Icon name="icon-name" />
```

Replace `icon-name` with the icon you want to use. You can find all icons [here](https://icones.js.org/).

## Pre-Commit Hooks

To prevent committing code with linting errors, a pre-commit hook is installed, which runs `npm run pre-commit` before
every commit. If you want to commit code with linting errors, run `git commit --no-verify`.
