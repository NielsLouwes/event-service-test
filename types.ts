export type TProduct = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  title: string;
  rating: {
    rate: number;
    count: number;
  };
};

type ProductEventType = Pick<
  TProduct,
  "title" | "category" | "price" | "id"
> & {
  eventType: string;
};

type PageViewType = {
  eventType: string;
  location: string;
};

export type DataLayerEventType = ProductEventType | PageViewType;
