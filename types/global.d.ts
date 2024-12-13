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
  interface IChildren {
    children: React.ReactNode | React.JSX.Element | React.JSX.Element[];
  }