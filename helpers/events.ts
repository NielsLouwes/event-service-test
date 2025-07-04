import { TProduct } from "@/components/products-handler";
import { eventBufferService } from "./event-buffer-service";
import {v4 as uuidv4} from 'uuid';

declare global {
  interface Window {
    events: Events;
  }
}

type ProductEventType = Pick<
  TProduct,
  "title" | "category" | "price"
> & {
  eventType: 'offer_open';
  timeStamp: number;
  eventId: string
  productId: string
};

type PageViewType = {
  eventType: 'page_view';
  location: string;
  timeStamp: number;
  eventId: string
};

export type DataLayerEventType = ProductEventType | PageViewType;

export class Events {
  addProduct(product: TProduct) {
    const eventId = uuidv4();
    const eventItem: ProductEventType = {
      eventType: "offer_open",
      timeStamp: Date.now(),
      productId: product.id,
      eventId: eventId,
      title: product.title,
      category: product.category,
      price: product.price,
    };

    eventBufferService(eventItem);
  }

  pageView(path: string) {
    const eventId = uuidv4();
    const eventItem: PageViewType = {
      eventType: "page_view",
      timeStamp: Date.now(),
      location: path,
      eventId: eventId,
    };

    eventBufferService(eventItem);
  }
}

export const events: Events =
  typeof window !== "undefined"
    ? ((window as Window).events = (window as Window).events || new Events())
    : new Events();
