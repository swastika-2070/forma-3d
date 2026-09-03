'use client';

import { useMemo, useState } from 'react';
import type { Product } from '../../lib/api';

interface ProductFiltersProps {
  products: Product[];
}

export default function ProductFilters({
  products,
}: ProductFiltersProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const categories = useMemo(() => {
    return Array.from(
      new Set(products.map((product) => product.category)),
    );
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === 'all' || product.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, category]);

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <input
          type="search"
          placeholder="Search products..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full rounded-xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-neutral-500 sm:flex-1"
        />

        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-xl border border-neutral-200 px-4 py-3 outline-none"
        >
          <option value="all">All categories</option>

          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-xl border border-dashed p-12 text-center">
          <p className="text-neutral-500">
            No products match your search.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <a
              key={product.id}
              href={`/products/${product.id}`}
              className="group rounded-2xl border bg-white p-5 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-5 flex h-48 items-center justify-center overflow-hidden rounded-xl bg-neutral-100">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover transition group-hover:scale-105"
                  />
                ) : (
                  <span className="text-sm text-neutral-400">
                    3D Preview
                  </span>
                )}
              </div>

              <p className="text-sm text-neutral-500">
                {product.category}
              </p>

              <h3 className="mt-1 text-xl font-semibold text-neutral-900">
                {product.name}
              </h3>

              <p className="mt-2 line-clamp-2 text-sm text-neutral-500">
                {product.description}
              </p>

              <p className="mt-4 text-lg font-bold text-neutral-900">
                ${product.price.toFixed(2)}
              </p>
            </a>
          ))}
        </div>
      )}
    </>
  );
}