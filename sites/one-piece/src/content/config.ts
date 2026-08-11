import { defineCollection, z } from 'astro:content';

const resenas = defineCollection({
  type: 'content',
  schema: z.object({
    titulo: z.string(),
    producto: z.string(),
    marca: z.string().optional(),
    imagen: z.string().optional(),
    precioAprox: z.string(),
    valoracion: z.number().min(1).max(5).optional(),
    pros: z.array(z.string()),
    contras: z.array(z.string()),
    urlAmazon: z.string().url(),
    categoria: z.string(),
    destacado: z.boolean().default(false),
    fechaPublicacion: z.date(),
    resumen: z.string(),
  }),
});

export const collections = { resenas };
