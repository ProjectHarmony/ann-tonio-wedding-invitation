import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Countdown from './components/Countdown';
import StorySection from './components/StorySection';
import EventDetails from './components/EventDetails';
import AttireGuide from './components/AttireGuide';
import Entourage from './components/Entourage';
import Gallery from './components/Gallery';
import RSVP from './components/RSVP';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="font-body">
      <Navbar />
      <Hero />
      <Countdown />
      <StorySection />
      <EventDetails />
      <AttireGuide />
      <Entourage />
      <Gallery />
      <RSVP />
      <Footer />
    </div>
  );
}
