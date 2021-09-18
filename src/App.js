import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Notify from "./components/Notify";
import Section from "./components/Section";
import { DataProvider } from "./store/GlobalState";
import "./styles/global.css";

function App() {
  return (
    <DataProvider>
      <div className="app">
        <Router>
          <Navbar />
          <Notify />
          <Section />
          <Footer />
        </Router>
      </div>
    </DataProvider>
  );
}

export default App;
