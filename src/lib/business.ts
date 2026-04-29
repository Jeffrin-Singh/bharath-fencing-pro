export const BUSINESS = {
  name: "Bharath Fencing",
  owner: "Ravi Kumar M",
  phone: "9944106978",
  phoneIntl: "+919944106978",
  whatsapp: "https://wa.me/919944106978",
  tel: "tel:9944106978",
  location: "Tamil Nadu, India",
  hours: "Monday–Saturday, 8:00 AM – 7:00 PM",
  areas: ["Salem", "Namakkal", "Erode", "Dharmapuri", "Krishnagiri", "Coimbatore", "Trichy"],
} as const;

export const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL as string) ?? "";
