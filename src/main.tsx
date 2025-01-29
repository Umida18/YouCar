import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

const RootComponent = (
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);

const root = createRoot(document.getElementById("root")!);

if (import.meta.env.MODE === "development") {
  root.render(<StrictMode>{RootComponent}</StrictMode>);
} else {
  root.render(RootComponent);
}
