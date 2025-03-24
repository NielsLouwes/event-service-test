import { TProduct } from "@/components/products-handler";

export interface Window {
  events: {
    addProduct: (data: TProduct) => void;
    pageView: (data: string) => void;

    reset: () => void;
  };
}
