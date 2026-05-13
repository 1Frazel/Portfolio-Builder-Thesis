import App from "../App";
import ErrorPage from "../pages/error/ErrorPage";
import AtsTemplate from "../pages/generate-pdf/components/templates/ats-template/AtsTemplate";
import ParsePdf from "../pages/parse-pdf/ParsePdf";

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
  {
    path: "checker",
    element: <ParsePdf />,
  },
];

export default routes;
