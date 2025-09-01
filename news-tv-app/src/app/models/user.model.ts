export interface Country {
  id: string;     
  name: string;    
  flagUrl: string; 
}


export interface User {
  id: string;
  name: string;
  lastName: string;
  password: string;
  email: string;
  country: Country;
  passwordHash: string;
  passwordCipher: string;

}

