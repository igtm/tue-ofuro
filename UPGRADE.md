# UPGRADE memo


### Nextjs: 11.0.1 -> 13

https://nextjs.org/docs/pages/building-your-application/upgrading/version-13

- `Error: Invalid <Link> with <a> child. Please remove <a> or use <Link legacyBehavior>.`
  https://nextjs.org/docs/messages/invalid-new-link-with-extra-anchor

```
npx @next/codemod new-link .
```

