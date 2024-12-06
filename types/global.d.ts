interface IResDto {
    status: string;
    page: number;
    perPage: number;
    totalPages: number;
    total: number;
    data: {
      products: IProduct[];
    };
  }