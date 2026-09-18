export {};

declare global {
  interface Window {
    Cookiebot?: {
      renew: () => void;
      show: () => void;
      consented: boolean;
    };
  }
}
