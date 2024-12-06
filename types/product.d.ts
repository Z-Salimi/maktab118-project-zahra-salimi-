interface IProduct {
  _id: string;
  category: string;
  subcategory: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  description: string;
  thumbnail: string;
  images: Array<string>;
  slugname: string;
}



interface IAllProducts {
  products: IProduct[];
  total: number;
}
