export interface Country {
  id: string;      // "CO"
  name: string;    // "Colombia"
  flagUrl: string; // "https://flagcdn.com/24x18/co.png"
}


export interface User {
  id: string;
  name: string;
  lastName: string;
  password: string;
  email: string;
  country: Country;
}

