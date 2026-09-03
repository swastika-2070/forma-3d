import { describe, expect, it, vi } from 'vitest';
import { NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service.js';

describe('ProductsService', () => {
  function createService() {
    const prisma = {
      product: {
        findMany: vi.fn(),
        findUnique: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
      },
    };

    return {
      service: new ProductsService(prisma as any),
      prisma,
    };
  }

  it('should return products', async () => {
    const { service, prisma } = createService();

    const products = [
      {
        id: 1,
        name: 'Bee',
        category: 'Animals',
        price: 29.99,
        modelUrl: '/models/Bee.glb',
      },
    ];

    prisma.product.findMany.mockResolvedValue(products);

    await expect(service.findAll()).resolves.toEqual(products);
  });

  it('should search products by name or description', async () => {
    const { service, prisma } = createService();

    prisma.product.findMany.mockResolvedValue([]);

    await service.findAll('bee');

    expect(prisma.product.findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({
          OR: expect.any(Array),
        }),
      }),
    );
  });

  it('should throw when product does not exist', async () => {
    const { service, prisma } = createService();

    prisma.product.findUnique.mockResolvedValue(null);

    await expect(service.findOne(999)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('should create a product', async () => {
    const { service, prisma } = createService();

    const product = {
      id: 1,
      name: 'Bee',
      category: 'Animals',
      price: 29.99,
      modelUrl: '/models/Bee.glb',
    };

    prisma.product.create.mockResolvedValue(product);

    await expect(
      service.create({
        name: 'Bee',
        category: 'Animals',
        price: 29.99,
        modelUrl: '/models/Bee.glb',
      }),
    ).resolves.toEqual(product);
  });

  it('should delete a product', async () => {
    const { service, prisma } = createService();

    const product = {
      id: 1,
      name: 'Bee',
      category: 'Animals',
      price: 29.99,
      modelUrl: '/models/Bee.glb',
    };

    prisma.product.findUnique.mockResolvedValue(product);
    prisma.product.delete.mockResolvedValue(product);

    await expect(service.remove(1)).resolves.toEqual(product);
  });
});