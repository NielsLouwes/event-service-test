import { TProduct } from "@/components/products-handler";

declare global {
  interface Window {
    events: Events;
  }
}

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

type DataLayerEventType = ProductEventType | PageViewType;

export class Events {
  private eventQueue: DataLayerEventType[] = [];

  addProduct(product: TProduct) {
    const eventItem: ProductEventType = {
      eventType: "offer_open",
      id: product.id,
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

export const events: Events =
  typeof window !== "undefined"
    ? ((window as Window).events = (window as Window).events || new Events())
    : new Events();
