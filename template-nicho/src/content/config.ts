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
    especificaciones: z.record(z.string(), z.string()).optional(),
    preguntasFrecuentes: z
      .array(z.object({ pregunta: z.string(), respuesta: z.string() }))
      .optional(),
  }),
});

// Resúmenes de capítulos del manga (contenido editorial, no reseñas de producto).
// Cada capítulo enlaza a la reseña del tomo que lo incluye y ofrece dos opciones
// de compra: la edición "3 en 1" y, si existe, el tomo individual.
const capitulos = defineCollection({
  type: 'content',
  schema: z.object({
    numero: z.number(),
    titulo: z.string(),
    tituloJapones: z.string().optional(),
    volumen: z.number(),
    arco: z.string(),
    personajes: z.array(z.string()).optional(),
    resenaTomoSlug: z.string(),
    tomoTresEnUno: z.object({
      titulo: z.string(),
      urlAmazon: z.string().url(),
    }),
    tomoIndividual: z
      .object({
        titulo: z.string(),
        urlAmazon: z.string().url(),
      })
      .optional(),
    fechaPublicacion: z.date(),
    resumenCorto: z.string(),
  }),
});

export const collections = { resenas, capitulos };
