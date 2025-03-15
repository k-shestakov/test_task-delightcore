import React from "react";
import "./App.scss";
import { Calculator } from "./components/Calculator";

export const App: React.FC = () => {
  return (
    <div className="container">
      <Calculator />
    </div>
  );
};
