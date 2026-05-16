import App from "../App";
import ErrorPage from "../pages/error/ErrorPage";
import AtsTemplate from "../pages/generate-pdf/components/templates/ats-template/AtsTemplate";
import ParsePdf from "../pages/parse-pdf/ParsePdf";
import CVList from "../pages/generation/CVList";
import TemplateSelection from "../pages/generation/TemplateSelection";
import RequireAuth from "../shared/hooks/RequireAuth";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "creation",
    element: (
      <RequireAuth>
        <CVList />
      </RequireAuth>
    ),
  },
  {
    path: "creation/template-selection",
    element: (
      <RequireAuth>
        <TemplateSelection />
      </RequireAuth>
    ),
  },
  {
    path: "creation/edit",
    element: (
      <RequireAuth>
        <AtsTemplate />
      </RequireAuth>
    ),
  },
  {
    path: "creation/edit/:id",
    element: (
      <RequireAuth>
        <AtsTemplate />
      </RequireAuth>
    ),
  },
  {
    path: "checker",
    element: <ParsePdf />,
  },
];

export default routes;
