import React, { useEffect, useState } from "react";
import Main from "./components/Main";
import api from "./services/axios";
import "./App.css";

function App() {
  const [data, setData] = useState({msg: 's'});
  useEffect(() => {
    api.get("/api/main").then((response) => {
      setData(() => response.data);
    });
  }, []);

  return (
    <Main>
      <p>Response:{data.msg}</p>
      {/* <Map coordinates={[52.505, -0.09]} /> */}
      {/* <TreeView/> */}
    </Main>
  );
}

export default App;
