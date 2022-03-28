import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import IndexPage from '@/pages/IndexPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
      </Routes>
    </Router>
  );
}
