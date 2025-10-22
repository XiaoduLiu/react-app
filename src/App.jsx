import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ModuleRegistry } from 'ag-grid-community';
import { LicenseManager, AllEnterpriseModule } from 'ag-grid-enterprise';
import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Deal from './pages/Deal';
import './App.css';

// Register all AG-Grid Enterprise modules
ModuleRegistry.registerModules([AllEnterpriseModule]);

// Set AG-Grid Enterprise license key - must be called before creating any grid
LicenseManager.setLicenseKey('[TRIAL]_this_{AG_Charts_and_AG_Grid}_Enterprise_key_{AG-104792}_is_granted_for_evaluation_only___Use_in_production_is_not_permitted___Please_report_misuse_to_legal@ag-grid.com___For_help_with_purchasing_a_production_key_please_contact_info@ag-grid.com___You_are_granted_a_{Single_Application}_Developer_License_for_one_application_only___All_Front-End_JavaScript_developers_working_on_the_application_would_need_to_be_licensed___This_key_will_deactivate_on_{14 November 2025}____[v3]_[0102]_MTc2MzA3ODQwMDAwMA==4ecc55839c14ac311390c0d41b27422a');

function App() {
  return (
    <Router>
      <div className="app">
        <MenuBar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/deal" element={<Deal />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
