import App from "../App";
import ErrorPage from "../pages/error/ErrorPage";
import AtsTemplate from "../pages/generate-pdf/components/templates/ats-template/AtsTemplate";
import ParsePdf from "../pages/parse-pdf/ParsePdf";

import RequireAuth from "../shared/hooks/RequireAuth";
import TemplateSelection from "../pages/select-template/TemplateSelection";
import CVList from "../pages/my-resume/CVList";

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
