import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/Home';
import SearchPage from '../pages/SearchPage';
import ProductPage from '../pages/ProductPage';
import AdminPage from '../pages/AdminPage';
import BarcodeScanner from '../components/BarcodeScanner';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <nav style={{ backgroundColor: '#f0f0f0', padding: '1rem', borderBottom: '1px solid #ccc' }}>
          <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem', margin: 0, padding: 0 }}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/scanner">Scanner</Link></li>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/admin">Admin</Link></li>
          </ul>
        </nav>
        <main style={{ flex: 1, padding: '2rem' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scanner" element={
              <div>
                <h1>Scanner App</h1>
                <BarcodeScanner />
              </div>
            } />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default AppRoutes;
