// src/app/api/products/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  const products = [
    {
      id: 1,
      name: 'Product 1',
      price: 29.99,
      description: 'Description for Product 1',
      imageUrl: '/images/product1.jpg',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 49.99,
      description: 'Description for Product 2',
      imageUrl: '/images/product2.jpg',
    },
    {
      id: 3,
      name: 'Product 3',
      price: 19.99,
      description: 'Description for Product 3',
      imageUrl: '/images/product3.jpg',
    },
  ];

  return NextResponse.json(products);
}
