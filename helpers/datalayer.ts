import { TProduct } from "@/components/products-handler";

export class DataLayer {
  // fields
  eventQueue: TProduct[] = [];

  // methods
  push(product: TProduct) {
    this.eventQueue.push(product);
    console.log("DataLayer Event Pushed:", product);
  }

  reset() {
    this.eventQueue = [];
  }
}

export const dataLayer: DataLayer =
  typeof window !== "undefined"
    ? ((window as any).dataLayer = (window as any).dataLayer || new DataLayer())
    : new DataLayer();
