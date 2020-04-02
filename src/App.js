import React from "react";
import "antd/dist/antd.dark.css";
import "./styles/app.css";

import { Layout } from "antd";

import AppHeader from "./components/layout/AppHeader";
import AppContent from "./components/layout/AppContent";

const App = () => {
  return (
    <div className="App">
      <Layout>
        <AppHeader />
        <AppContent />
      </Layout>
    </div>
  );
};

export default App;
