import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/MainLayout';
import Home from './pages/Home';
import Admin from './pages/Admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
