# UPGRADE memo


### Nextjs: 13 -> 14.1 (2024/1/20)

https://nextjs.org/docs/pages/building-your-application/upgrading/version-14

```zsh
yarn add next@latest react@latest react-dom@latest eslint-config-next@latest @types/react @types/react-dom
```






### Nextjs: 11.0.1 -> 13

```
yarn upgrade-interactive --latest
```

https://nextjs.org/docs/pages/building-your-application/upgrading/version-13

- `Error: Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.`
  https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor

```
npx @next/codemod new-link .
```

```json
// package.json
{
  "name": "next-test",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@types/node": "20.3.1",
    "@types/react": "18.2.12",
    "@types/react-dom": "18.2.5",
    "autoprefixer": "10.4.14",
    "eslint": "8.43.0",
    "eslint-config-next": "13.4.6",
    "next": "13.4.6",
    "postcss": "8.4.24",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "tailwindcss": "3.3.2",
    "typescript": "5.1.3"
  }
}
```

```json
// .eslintrc.json
{
  "extends": "next/core-web-vitals"
}
```


- tailwindcss v3
https://tailwindcss.com/docs/upgrade-guide#configure-content-sources
https://tailwindcss.com/docs/upgrade-guide#remove-dark-mode-configuration