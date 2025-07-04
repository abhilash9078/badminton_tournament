import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Rules from './components/Rules';
import Location from './components/Location';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PoolsAndPoints from './components/PoolsAndPoints';

function App() {
  return (
    <div className="font-sans">
      <Header />
      <Hero />
      <About />
      <Rules />
      <PoolsAndPoints />
      <Location />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;