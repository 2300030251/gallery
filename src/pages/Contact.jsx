import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Contact() {
  return (
    <div className="contact-page">
      <Navbar />

      <main className="contact-section">
        <div className="contact-card">
          <span className="contact-eyebrow">Contact</span>
          <h1>Contact</h1>
          <p>
            If you want to share crazy memories with Lucky, contact us!
          </p>

          <div className="contact-links">
            <p>
              <strong>Email:</strong> lucky@gmail.com
            </p>
            <p>
              <strong>Instagram:</strong> @luckymoments
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Contact;