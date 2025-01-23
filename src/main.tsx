import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { Provider } from "react-redux";
import App from "./App.tsx";
// import store from "./store/store.ts";
import "./index.css";

// QueryClient ni optimallashtirish
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

const RootComponent = (
  // <Provider store={store}>
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
  // </Provider>
);

const root = createRoot(document.getElementById("root")!);

if (import.meta.env.MODE === "development") {
  root.render(<StrictMode>{RootComponent}</StrictMode>);
} else {
  root.render(RootComponent);
}
