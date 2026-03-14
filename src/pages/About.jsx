import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <div className="about-page">
      <Navbar />

      <main className="about-section">
        <div className="about-card">
          <span className="about-eyebrow">About</span>
          <h1>About Lucky&apos;s Gallery</h1>
          <p>
            Lucky&apos;s Gallery is a collection of fun and memorable moments.
            Each photo captures a special memory filled with laughter,
            adventure, and friendship. This gallery is a place to relive those
            happy moments forever.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default About;