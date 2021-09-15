import React, { Suspense } from "react";
// import "..src/App.css";
import NavBar from "./Components/NavBar";
import { createBrowserHistory } from "history";

import { Switch, Route, Router } from "react-router-dom";

const DataA = React.lazy(() => import("../src/Components/DataA"));
const DataB = React.lazy(() => import("../src/Components/DataB"));

function App() {
  return (
    <Router history={createBrowserHistory()}>
      <div style={{ overflow: "auto" }} className="App">
        <NavBar />

        <Switch>
          <Suspense fallback={<div>loading</div>}>
            <Route path="/dataA" render={() => <DataA />} />
            <Route path="/dataB" render={() => <DataB />} />
          </Suspense>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
