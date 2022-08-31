import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";

import Dashboard from "./pages/Dashboard";
import Console from "./pages/Console";
import ServiceCatalogue from "./pages/ServiceCatalogue";
import CreditRating from "./pages/CreditRating";
import Loans from "./pages/Loans";
import FraudDetection from "./pages/FraudDetection";
import Analytics from "./pages/Analytics";
import LoansAndP2P from "./pages/LoansandP2P";
import Banking from "./pages/Banking";
import BankingDashboard from "./pages/BankingDashboard";
import LoansDashboard from "./pages/LoansDashboard";
import UpdateBank from "./pages/UpdateBank";
import CreateBank from "./pages/CreateBank";
import Simulation from "./pages/Simulation";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/servicecatalogue" element={<ServiceCatalogue />} />
      <Route path="/console" element={<Console />} />
      <Route path="/LoansAndP2P" element={<LoansAndP2P />} />
      <Route path="/CreditRating" element={<CreditRating />} />
      <Route path="/Loans" element={<Loans />} />
      <Route path="/FraudDetection" element={<FraudDetection />} />
      <Route path="/Analytics" element={<Analytics />} />
      <Route path="/EmbeddedBanking" element={<Banking />} />
      <Route path="/BankingDashboard" element={<BankingDashboard />} />
      <Route path="/LoansDashboard" element={<LoansDashboard />} />
      <Route path="/UpdateBank" element={<UpdateBank />} />
      <Route path="/CreateBank" element={<CreateBank />} />
      <Route path="/Simulation" element={<Simulation />}/>
    </Routes>
  </BrowserRouter>
);
