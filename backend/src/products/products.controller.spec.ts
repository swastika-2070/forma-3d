import { Test, TestingModule } from '@nestjs/testing';
import { describe, expect, it } from 'vitest';
import { ProductsController } from './products.controller.js';
import { ProductsService } from './products.service.js';

describe('ProductsController', () => {
  let controller: ProductsController;

  const productsServiceMock = {
    findAll: async () => [],
    findOne: async () => null,
    create: async () => null,
    update: async () => null,
    remove: async () => null,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: productsServiceMock,
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});