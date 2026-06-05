import './BrandLogo.css'

const BrandLogo = () => {
  return (
    <header className="brand">
      <img
        className="logo"
        src="https://res.cloudinary.com/diuruuyas/image/upload/f_auto,q_auto/logo-pdg-1_gojiba"
        alt="Philippine Data Guardians logo"
      />
      <div className="brand-text">
        <span className="brand-name">Privacy Lens</span>
        <span className="brand-sub">by Philippine Data Guardians</span>
      </div>
    </header>
  )
}

export default BrandLogo;