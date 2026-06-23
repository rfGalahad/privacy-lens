const BASE = import.meta.env.VITE_CLOUDINARY_BASE;

const cloudinary = (publicId: string, transforms = "") =>
  `${BASE}/${transforms}${publicId}`;

const assets = {
  pdgBackground: cloudinary(
    "pdg-background_babmmc", 
    "w_1920,q_auto,f_auto/"
  ),
  logoPdg1: cloudinary(
    "logo-pdg-1_gojiba",     
    "w_200,q_auto,f_auto/"
  ),
} as const;

export default assets;