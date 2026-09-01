import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import "./styles/components.css";

import Home from "./pages/Home.jsx";
import Platform from "./pages/Platform.jsx";
import Features from "./pages/Features.jsx";
import FeatureDetail from "./pages/FeatureDetail.jsx";
import Solutions from "./pages/Solutions.jsx";
import SolutionDetail from "./pages/SolutionDetail.jsx";
import Pricing from "./pages/Pricing.jsx";
import Governance from "./pages/Governance.jsx";
import Analytics from "./pages/Analytics.jsx";
import Security from "./pages/Security.jsx";
import WhyEncodeCampus from "./pages/WhyEncodeCampus.jsx";
import ProductTour from "./pages/ProductTour.jsx";
import Resources from "./pages/Resources.jsx";
import Faq from "./pages/Faq.jsx";
import Insights from "./pages/Insights.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Demo from "./pages/Demo.jsx";
import NotFound from "./pages/NotFound.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/platform" element={<Platform />} />
          <Route path="/features" element={<Features />} />
          <Route path="/features/:slug" element={<FeatureDetail />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/solutions/:slug" element={<SolutionDetail />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/governance" element={<Governance />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/security" element={<Security />} />
          <Route path="/why-encode-campus" element={<WhyEncodeCampus />} />
          <Route path="/product-tour" element={<ProductTour />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
