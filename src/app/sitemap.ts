import { MetadataRoute } from 'next';
import { getBlogs } from '@/services/blogService';
import { getProjects } from '@/services/projectService';

type FirestoreTimestampLike = {
  toDate: () => Date;
};

const isFirestoreTimestampLike = (value: unknown): value is FirestoreTimestampLike => {
  return (
    typeof value === 'object' &&
    value !== null &&
    'toDate' in value &&
    typeof (value as FirestoreTimestampLike).toDate === 'function'
  );
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://winbarghomes.com';

  // Static routes
  const routes = ['', '/about', '/services', '/properties', '/team', '/contact', '/blog'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  try {
    // Dynamic Blog Routes
    const blogs = await getBlogs(true);
    const blogRoutes = blogs.map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: isFirestoreTimestampLike(blog.updatedAt) ? blog.updatedAt.toDate() : new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    // Dynamic Project Routes
    const projects = await getProjects();
    const projectRoutes = projects.map((project) => ({
      url: `${baseUrl}/properties/${project.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

    return [...routes, ...blogRoutes, ...projectRoutes];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // Return at least the static routes if DB fetch fails during build
    return routes;
  }
}
