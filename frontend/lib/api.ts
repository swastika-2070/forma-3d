const API_URL =
  typeof window === 'undefined'
    ? process.env.INTERNAL_API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      'http://backend:3001'
    : process.env.NEXT_PUBLIC_API_URL ||
      'http://localhost:3001';

export interface Product {
  id: number;
  name: string;
  description?: string;
  category: string;
  price: number;
  modelUrl: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductData {
  name: string;
  description?: string;
  category: string;
  price: number;
  modelUrl: string;
  imageUrl?: string;
}

export interface UpdateProductData {
  name?: string;
  description?: string;
  category?: string;
  price?: number;
  modelUrl?: string;
  imageUrl?: string;
}

export async function getProducts(
  search?: string,
  category?: string,
): Promise<Product[]> {
  const params = new URLSearchParams();

  if (search) {
    params.set('search', search);
  }

  if (category) {
    params.set('category', category);
  }

  const query = params.toString();

  const response = await fetch(
    `${API_URL}/products${query ? `?${query}` : ''}`,
    {
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status}`);
  }

  return response.json();
}

export async function getProduct(id: string): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Product not found: ${response.status}`);
  }

  return response.json();
}

export async function createProduct(
  product: CreateProductData,
): Promise<Product> {
  const response = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error(`Failed to create product: ${response.status}`);
  }

  return response.json();
}

export async function updateProduct(
  id: number,
  product: UpdateProductData,
): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error(`Failed to update product: ${response.status}`);
  }

  return response.json();
}

export async function deleteProduct(id: number): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete product: ${response.status}`);
  }

  return response.json();
}