import "../styles/ImagePanel.css";

const ImagePanel = () => (
  <section className="image-panel" aria-hidden="true">
    <img
      className="hero-image"
      src="https://res.cloudinary.com/diuruuyas/image/upload/f_auto,q_auto/pia-service_xdwbze"
      alt="Login visual"
      loading="eager"
    />
    <div className="image-overlay">
      <blockquote className="tagline">
        <p>"Privacy is not an option, and it shouldn't be the price we accept for just getting on the Internet."</p>
        <footer>— Gary Kovacs</footer>
      </blockquote>
    </div>
  </section>
);

export default ImagePanel;