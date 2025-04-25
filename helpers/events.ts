import { TProduct } from "@/components/products-handler";
import { eventBufferService } from "./event-buffer-service";

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
  timeStamp: number;
};

type PageViewType = {
  eventType: string;
  location: string;
  timeStamp: number;
};

export type DataLayerEventType = ProductEventType | PageViewType;

export class Events {
  addProduct(product: TProduct) {
    const eventItem: ProductEventType = {
      eventType: "offer_open",
      timeStamp: Date.now(),
      id: product.id,
      title: product.title,
      category: product.category,
      price: product.price,
    };

    eventBufferService(eventItem);
  }

  pageView(path: string) {
    const eventItem: PageViewType = {
      eventType: "page_view",
      timeStamp: Date.now(),
      location: path,
    };

    eventBufferService(eventItem);
  }
}

export const events: Events =
  typeof window !== "undefined"
    ? ((window as Window).events = (window as Window).events || new Events())
    : new Events();
