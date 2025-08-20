export interface GoogleLoginResponse {
  message: string;
  status: boolean;
  data: GoogleLoginData;
}

export interface GoogleLoginData {
  user: User;
  token: string;
  userExists: true;
}

// export interface User {
//   id: number | null;
//   email: string | null;
//   password: any | null;
//   mobileNumber: any | null;
//   otp: any | null;
//   name: string | null;
//   surName: string | null;
//   pytroNym: any | null;
//   pin: any | null;
//   dob: any | null;
//   city: any | null;
//   district: any | null;
//   address: any | null;
//   authProvider: string | null;
//   googleId: string | null;
//   notificationEnabled: boolean | null;
//   accessToken: string | null;
//   accessApp: false;
// }

export interface UpdateUserResponse {
  message: string;
  status: boolean;
  data: User;
}

export interface User {
  id: number;
  email: string;
  password: any;
  authProvider: string;
  googleId: string;
  mobileNumber: string;
  otp: any;
  name: string;
  surName: string;
  pytroNym: any;
  dob: string;
  gender: string;
  country: string;
  address: string;
  lat: number;
  lng: number;
  notificationEnabled: boolean;
  accessToken: string | null;
  accessApp: false;
}
