
'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  type Product,
  type CreateProductData,
} from '../../lib/api';

const emptyForm = {
  name: '',
  description: '',
  category: '',
  price: '',
  modelUrl: '',
  imageUrl: '',
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadProducts = useCallback(async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadProducts();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [loadProducts]);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);

    const data: CreateProductData = {
      name: form.name,
      description: form.description || undefined,
      category: form.category,
      price: Number(form.price),
      modelUrl: form.modelUrl,
      imageUrl: form.imageUrl || undefined,
    };

    try {
      if (editingId !== null) {
        await updateProduct(editingId, data);
      } else {
        await createProduct(data);
      }

      resetForm();
      await loadProducts();
    } catch (error) {
      console.error('Failed to save product:', error);
      window.alert('Failed to save product.');
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(product: Product) {
    setEditingId(product.id);

    setForm({
      name: product.name,
      description: product.description ?? '',
      category: product.category,
      price: String(product.price),
      modelUrl: product.modelUrl,
      imageUrl: product.imageUrl ?? '',
    });

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  async function handleDelete(id: number) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this product?',
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProduct(id);
      await loadProducts();
    } catch (error) {
      console.error('Failed to delete product:', error);
      window.alert('Failed to delete product.');
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-6 py-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#B08D57]">
            Forma 3D
          </p>

          <h1 className="mt-2 text-4xl font-bold text-[#2E2A25]">
            Product Administration
          </h1>

          <p className="mt-2 text-[#6B6459]">
            Create, update and manage your 3D product catalog.
          </p>
        </div>

        <section className="mb-10 rounded-2xl border border-[#E8E1D5] bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[#2E2A25]">
                {editingId !== null ? 'Edit Product' : 'Add Product'}
              </h2>

              <p className="mt-1 text-sm text-[#8A8072]">
                Add product information and its 3D model.
              </p>
            </div>

            {editingId !== null && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-lg border border-[#E8E1D5] px-4 py-2 text-sm text-[#2E2A25] hover:bg-[#FAF7F2]"
              >
                Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#2E2A25]">
                Product Name
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-[#E8E1D5] px-4 py-3 outline-none focus:border-[#B08D57]"
                placeholder="Modern Chair"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#2E2A25]">
                Category
              </label>

              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-[#E8E1D5] px-4 py-3 outline-none focus:border-[#B08D57]"
                placeholder="Furniture"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#2E2A25]">
                Price
              </label>

              <input
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-[#E8E1D5] px-4 py-3 outline-none focus:border-[#B08D57]"
                placeholder="299.99"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#2E2A25]">
                Product Image Path
              </label>

              <input
                name="imageUrl"
                type="text"
                value={form.imageUrl}
                onChange={handleChange}
                className="w-full rounded-lg border border-[#E8E1D5] px-4 py-3 outline-none focus:border-[#B08D57]"
                placeholder="/images/bee.jpg"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-[#2E2A25]">
                3D Model Path (.glb / .gltf)
              </label>

              <input
                name="modelUrl"
                type="text"
                value={form.modelUrl}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-[#E8E1D5] px-4 py-3 outline-none focus:border-[#B08D57]"
                placeholder="/models/Bee.glb"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-[#2E2A25]">
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                className="w-full rounded-lg border border-[#E8E1D5] px-4 py-3 outline-none focus:border-[#B08D57]"
                placeholder="Describe the product..."
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-[#2E2A25] px-6 py-3 font-medium text-white transition hover:bg-[#B08D57] disabled:opacity-50"
              >
                {saving
                  ? 'Saving...'
                  : editingId !== null
                    ? 'Update Product'
                    : 'Create Product'}
              </button>
            </div>
          </form>
        </section>

        <section>
          <h2 className="mb-5 text-xl font-semibold text-[#2E2A25]">
            Products ({products.length})
          </h2>

          {loading ? (
            <div className="rounded-xl border border-[#E8E1D5] bg-white p-8 text-center text-[#6B6459]">
              Loading products...
            </div>
          ) : products.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#E8E1D5] bg-white p-12 text-center">
              <p className="text-[#8A8072]">
                No products have been added yet.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-2xl border border-[#E8E1D5] bg-white">
              <div className="divide-y divide-[#E8E1D5]">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between"
                  >
                    <div>
                      <p className="font-semibold text-[#2E2A25]">
                        {product.name}
                      </p>

                      <p className="text-sm text-[#8A8072]">
                        {product.category} · ${product.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => handleEdit(product)}
                        className="rounded-lg border border-[#E8E1D5] px-4 py-2 text-sm font-medium text-[#2E2A25] hover:bg-[#FAF7F2]"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(product.id)}
                        className="rounded-lg bg-[#A3432F] px-4 py-2 text-sm font-medium text-white hover:bg-[#8A3627]"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

