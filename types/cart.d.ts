interface ICart {
    _id: string;
    product: {
      _id: string;
      brand: string;
      category: string;
      createdAt: string;
      description: string;
      images: string[];
      name: string;
      price: number;
      quantity: number;
      rating: {
        rate: number;
        count: number;
      };
      slugname: string;
      subcategory: string;
      thumbnail: string;
      updatedAt: string;
      __v: number;
    };
    quantity: number;
  }
  