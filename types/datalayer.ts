export interface Window {
  dataLayer: {
    push: (data: any) => void;

    reset: () => void;
  };
}
