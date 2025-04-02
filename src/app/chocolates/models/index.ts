export interface Price {
  price: number;
  shop: string;
  link: string;
  unit: string;
  amount: number;
}

interface Fat {
  total: number;
  saturated: number;
}

interface Carbohydrates {
  total: number;
  sugar: number;
}

interface Nutrition {
  fat: Fat;
  carbohydrates: Carbohydrates;
  protein: number;
  salt: number;
}

export interface Chocolate {
  id: string;
  name: string;
  brand: string;
  currency: string;
  lowestPricePer100g?: number
  averagePricePer100g?: number
  lowestPriceLink?: string;
  prices: Price[];
  nutrition: Nutrition;
}
