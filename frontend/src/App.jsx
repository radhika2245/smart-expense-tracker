import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Expenses from './pages/Expenses';
import Insights from './pages/Insights';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Layout from './components/Layout';

function App() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <Layout onAddRecord={() => setShowAddModal(true)}>
              <Dashboard showAddModal={showAddModal} onCloseModal={() => setShowAddModal(false)} />
            </Layout>
          }
        />
        <Route
          path="/expenses"
          element={
            <Layout onAddRecord={() => setShowAddModal(true)}>
              <Expenses />
            </Layout>
          }
        />
        <Route
          path="/insights"
          element={
            <Layout onAddRecord={() => setShowAddModal(true)}>
              <Insights />
            </Layout>
          }
        />
        <Route
          path="/settings"
          element={
            <Layout onAddRecord={() => setShowAddModal(true)}>
              <Settings />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
