import { createBrowserRouter } from "react-router";
import App from "./App";
import AtsTemplate from "./pages/generate-pdf/components/templates/ats-template/AtsTemplate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "creation",
    element: <AtsTemplate />,
  },
]);

export default router;
