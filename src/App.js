import { useState } from "react";
import Navbar from "./Navbar.js";
import Scenelist from "./Scenelist.js";

const App = () => {
  const [request, setRequest] = useState("");

  return (
    <>
      <Navbar setRequest={setRequest} />
      <Scenelist request={request} />
    </>
  );
};

export default App;
