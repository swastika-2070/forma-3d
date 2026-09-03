import { getProducts } from '../lib/api';
import ProductFilters from './components/ProductFilters';

export const metadata = {
  title: 'Forma 3D | Explore Products',
  description:
    'Explore and interact with products through an immersive 3D experience.',
};

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b bg-neutral-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-neutral-500">
            Forma 3D
          </p>

          <h1 className="max-w-3xl text-5xl font-bold tracking-tight text-neutral-900">
            Explore products in 3D
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-neutral-600">
            Discover products through an interactive 3D experience.
            Rotate, zoom and explore every detail.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-neutral-900">
            Product Collection
          </h2>

          <p className="mt-2 text-neutral-500">
            Search and filter our 3D product collection.
          </p>
        </div>

        <ProductFilters products={products} />
      </section>
    </main>
  );
}