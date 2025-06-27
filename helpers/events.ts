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
  "title" | "category" | "price" | "id"
> & {
  eventType: 'offer_open';
  timeStamp: number;
};

type PageViewType = {
  eventType: 'page_view';
  location: string;
  timeStamp: number;
  id: string
};

export type DataLayerEventType = ProductEventType | PageViewType;

const eventId = uuidv4();
export class Events {
  addProduct(product: TProduct) {
    const eventItem: ProductEventType = {
      eventType: "offer_open",
      timeStamp: Date.now(),
      id: `offer-open-${eventId}`,
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
      id: `page-view-${eventId}`,
    };

    eventBufferService(eventItem);
  }
}

export const events: Events =
  typeof window !== "undefined"
    ? ((window as Window).events = (window as Window).events || new Events())
    : new Events();
