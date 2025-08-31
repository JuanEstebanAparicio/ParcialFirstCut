export interface Country {
  id: string;      // p.ej. "Colombia"
  value: string;   // p.ej. "🇨🇴 Colombia"
}


export interface User {
  id: string;
  name: string;
  lastName: string;
  password: string;
  email: string;
  country: Country;
}

