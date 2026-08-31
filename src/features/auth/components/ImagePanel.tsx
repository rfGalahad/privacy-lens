const ImagePanel = () => (
  <section className="relative overflow-hidden group max-[900px]:hidden" aria-hidden="true">
    <img
      className="w-full h-full object-cover object-center block scale-[1.03] transition-transform duration-[8000ms] ease-in-out group-hover:scale-100"
      src="https://res.cloudinary.com/diuruuyas/image/upload/f_auto,q_auto/pia-service_xdwbze"
      alt="Login visual"
      loading="eager"
    />
    <div className="absolute inset-0 flex items-end p-12 bg-[linear-gradient(to_top,rgba(2,13,28,0.85)_0%,rgba(2,13,28,0.35)_50%,rgba(2,13,28,0.15)_100%)]">
      <blockquote className="max-w-[36ch] animate-[fadeUp_1s_ease_both_0.4s]">
        <p className="font-[var(--font-display)] italic text-[clamp(1.1rem,1.8vw,1.45rem)] leading-normal text-[#e8f0fb] mb-3">
          "Privacy is not an option, and it shouldn't be the price we accept for just getting on the Internet."
        </p>
        <footer className="text-[0.8rem] tracking-[0.08em] uppercase text-[#7a9cc4]">
          — Gary Kovacs
        </footer>
      </blockquote>
    </div>
  </section>
);

export default ImagePanel;