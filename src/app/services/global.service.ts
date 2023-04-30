export const baseUrlGlobal: string = 'http://center112001-001-site1.atempurl.com/api/v1/';

export const baseUrl: string = baseUrlGlobal;

export enum Account {
  postLogin = 'account/login',
  postRegister = 'account/register',
  postVerifyOtp = 'account/verify-otp',
  postsentOtp = 'account/send-otp',
}

export enum Users {
  get = 'users',
  post = 'users',
  delete = 'users/'
}

export enum Centers {
  get = 'centers',
  post = 'centers',
  delete = 'centers/'
}

export enum Subjects {
  get = 'subjects',
  post = 'subjects',
  delete = 'subjects/'
}
