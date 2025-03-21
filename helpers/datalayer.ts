import { TProduct } from "@/components/products-handler";

declare global {
  interface Window {
    dataLayer: DataLayer;
  }
}

type EventItemType = Pick<TProduct, "title" | "category" | "price"> & {
  eventType: string;
};

export class DataLayer {
  private eventQueue: EventItemType[] = [];

  push(product: TProduct) {
    const eventItem: EventItemType = {
      eventType: "offer_open",
      title: product.title,
      category: product.category,
      price: product.price,
    };

    this.eventQueue.push(eventItem as EventItemType);
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
