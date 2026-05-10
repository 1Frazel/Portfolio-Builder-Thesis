import App from "../App";
import ErrorPage from "../pages/error/ErrorPage";
import AtsTemplate from "../pages/generate-pdf/components/templates/ats-template/AtsTemplate";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "creation",
    element: <AtsTemplate />,
  },
];

export default routes;
