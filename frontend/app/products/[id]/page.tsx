import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductViewer from '../../components/ProductViewer';
import { getProduct } from '../../../lib/api';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const product = await getProduct(id);

    return {
      title: `${product.name} | Forma 3D`,
      description:
        product.description ||
        `Explore ${product.name} in an interactive 3D experience.`,
      openGraph: {
        title: `${product.name} | Forma 3D`,
        description:
          product.description ||
          `Explore ${product.name} in 3D.`,
        images: product.imageUrl ? [product.imageUrl] : [],
      },
    };
  } catch {
    return {
      title: 'Product | Forma 3D',
    };
  }
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const { id } = await params;

  let product;

  try {
    product = await getProduct(id);
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <Link
          href="/"
          className="text-sm font-medium text-neutral-500 hover:text-neutral-900"
        >
          ← Back to products
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-2">
          <ProductViewer modelUrl={product.modelUrl} />

          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-neutral-500">
              {product.category}
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-neutral-900">
              {product.name}
            </h1>

            <p className="mt-5 text-lg leading-8 text-neutral-600">
              {product.description}
            </p>

            <div className="mt-8">
              <p className="text-sm text-neutral-500">Price</p>
              <p className="mt-1 text-3xl font-bold text-neutral-900">
                ${product.price.toFixed(2)}
              </p>
            </div>

            <div className="mt-8 rounded-xl bg-neutral-50 p-5">
              <h2 className="font-semibold text-neutral-900">
                Interactive 3D Viewer
              </h2>

              <p className="mt-2 text-sm text-neutral-600">
                Drag to rotate the product and scroll to zoom.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}