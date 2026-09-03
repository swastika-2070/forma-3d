import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'http://localhost:3000',
      lastModified: new Date(),
    },
    {
      url: 'http://localhost:3000/admin',
      lastModified: new Date(),
    },
  ];
}