const BrandLogo = () => {
  return (
    <header className="flex items-center gap-2">
      <img
        className="h-6 w-auto object-contain"
        src="https://res.cloudinary.com/diuruuyas/image/upload/f_auto,q_auto/logo-pdg-1_gojiba"
        alt="Philippine Data Guardians logo"
      />
      <div className="flex flex-col leading-[1.2]">
        <span className="text-base font-bold text-text-primary tracking-[-0.01em]">
          Privacy Lens
        </span>
        <span className="text-[0.7rem] text-text-muted tracking-[0.03em]">
          by Philippine Data Guardians
        </span>
      </div>
    </header>
  )
}

export default BrandLogo;