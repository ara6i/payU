import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./pages/HomePage";
import StatusPage from "./pages/StatusPage";
import SubscriptionSuccess from "./pages/SubscriptionSuccess";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        path: "",
        Component: HomePage,
      },
      {
        path: "payment/:status/:id",
        Component: StatusPage,
      },
      {
        path: "subscription/success",
        Component: SubscriptionSuccess,
      },
    ],
  },
]);
