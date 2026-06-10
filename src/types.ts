/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type BrandWorld = 'jewelry' | 'clothing' | 'shoes' | 'accessories' | 'makeup';

export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface MakeupShade {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviewsCount: number;
  primaryImage: string;
  hoverImage: string;
  description: string;
  world: BrandWorld;
  collections: string[];
  tags: string[];
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  
  // World-specific metadata
  colorSwatches?: ColorSwatch[];
  sizeOptions?: string[];
  metalTypes?: string[];
  gemstones?: string[];
  materials?: string[];
  shades?: MakeupShade[];
  ingredientHighlights?: string[];
  detailsList?: string[];
}

export interface CartItem {
  id: string; // Unique ID based on product.id + selected configurations
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  selectedMetal?: string;
  selectedShade?: string;
}

export interface LookbookStory {
  id: string;
  title: string;
  subtitle: string;
  quote: string;
  image: string;
  videoUrl?: string;
  location: string;
  world: BrandWorld;
  credits: string;
}

export interface FilterState {
  priceRange: [number, number];
  selectedMetal: string;
  selectedGem: string;
  selectedSize: string;
  selectedMaterial: string;
  selectedFabric: string;
  sortOrder: 'recommended' | 'price-low' | 'price-high' | 'rating';
}
