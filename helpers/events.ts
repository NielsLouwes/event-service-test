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
};

type PageViewType = {
  eventType: string;
  location: string;
};

export type DataLayerEventType = ProductEventType | PageViewType;

export class Events {
  // Check of limit of 5 has been reached every time an item is added to eventQueue
  // We don't need to call the eventBufferService until 5 is reached? Or else we call it every single time a new product or pageview event happens

  addProduct(product: TProduct) {
    const eventItem: ProductEventType = {
      eventType: "offer_open",
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
      location: path,
    };

    eventBufferService(eventItem);
  }
}

export const events: Events =
  typeof window !== "undefined"
    ? ((window as Window).events = (window as Window).events || new Events())
    : new Events();
