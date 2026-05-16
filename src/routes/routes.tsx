import App from "../App";
import ErrorPage from "../pages/error/ErrorPage";
import AtsTemplate from "../pages/generate-pdf/components/templates/ats-template/AtsTemplate";
import ParsePdf from "../pages/parse-pdf/ParsePdf";
import CVList from "../pages/generation/CVList";
import TemplateSelection from "../pages/generation/TemplateSelection";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "creation",
    element: <CVList />,
  },
  {
    path: "creation/template-selection",
    element: <TemplateSelection />,
  },
  {
    path: "creation/edit",
    element: <AtsTemplate />,
  },
  {
    path: "creation/edit/:id",
    element: <AtsTemplate />,
  },
  {
    path: "checker",
    element: <ParsePdf />,
  },
];

export default routes;
