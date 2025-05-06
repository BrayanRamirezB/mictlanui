// src/pages/searchData.ts
export const pages = Object.entries(
  import.meta.glob<{ frontmatter: { name: string } }>('/src/content/**/*.mdx', {
    eager: false
  })
).map(([path, mod]) => ({
  title: mod.frontmatter?.name || path.split('/').pop()?.replace('.mdx', ''),
  path: path.replace('/src/content', '').replace('.mdx', '').toLowerCase()
}))
