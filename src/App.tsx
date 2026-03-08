import { PDFViewer } from "@react-pdf/renderer";
import "./App.css";
import CurrentDocument from "./pages/generate-pdf/Document";
import { useState } from "react";

function App() {
  const [user, setUser] = useState({
    name: "",
  });

  return (
    <div className="h-screen w-screen flex px-[8px] py-[4px]">
      <div className="basis-1/2">
        <div>
          <label htmlFor="">Full Name: </label>
          <input
            type="text"
            value={user.name}
            className="border"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>
      </div>
      <div className="basis-1/2">
        <PDFViewer className="w-full h-full" showToolbar={false}>
          <CurrentDocument user={user} />
        </PDFViewer>
      </div>
    </div>
  );
}

export default App;
