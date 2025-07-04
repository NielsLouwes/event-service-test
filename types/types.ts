export type TProduct = {
  category: string;
  description: string;
  id: string;
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
  eventType: 'offer_open';
};

type PageViewType = {
  eventType: 'page_view';
  location: string;
  timeStamp: number;
  id: string
};

export type DataLayerEventType = ProductEventType | PageViewType;

export interface EventBatch {
  events: DataLayerEventType[];
  batchTimestamp: number;
}
