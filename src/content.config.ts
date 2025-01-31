import { defineCollection, z } from 'astro:content'
// import { glob } from 'astro/loaders'

const components = defineCollection({
  // loader: glob({ pattern: '**/*.mdx', base: './src/content/components' }),
  schema: z.object({
    name: z.string().min(1, 'El nombre del componente es obligatorio.'),
    description: z.string().min(1, 'La descripción es obligatoria.')
  })
})

const overview = defineCollection({
  // loader: glob({ pattern: '**/*.mdx', base: './src/content/overview' }),
  schema: z.object({
    name: z.string().min(1, 'El nombre del componente es obligatorio.'),
    description: z.string().min(1, 'La descripción es obligatoria.')
  })
})

export const collections = {
  components,
  overview
}
