import { useState } from 'react';

import './App.css';
import Navbar from './Components/Navbar';
import Manager from './Components/Manager';
import Footer from './Components/Footer';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <div className="min-h-[80.8vh] bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
        <Manager />
      </div>
      <Footer />
    </>
  );
}

export default App;
