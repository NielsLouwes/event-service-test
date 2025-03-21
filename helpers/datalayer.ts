import { TProduct } from "@/components/products-handler";

declare global {
  interface Window {
    dataLayer: DataLayer;
  }
}

type ProductEventType = Pick<TProduct, "title" | "category" | "price"> & {
  eventType: string;
};

type PageViewType = {
  eventType: string;
  location?: string;
};

type DataLayerEventType = ProductEventType | PageViewType;

export class DataLayer {
  private eventQueue: DataLayerEventType[] = [];

  addProduct(product: TProduct) {
    const eventItem: ProductEventType = {
      eventType: "offer_open",
      title: product.title,
      category: product.category,
      price: product.price,
    };

    this.eventQueue.push(eventItem as ProductEventType);
  }

  pageView(path: string) {
    const eventItem: PageViewType = {
      eventType: "page_view",
      location: path,
    };

    this.eventQueue.push(eventItem);
  }

  reset() {
    this.eventQueue = [];
  }
}

export const dataLayer: DataLayer =
  typeof window !== "undefined"
    ? ((window as Window).dataLayer =
        (window as Window).dataLayer || new DataLayer())
    : new DataLayer();
