import { GoogleAuth, ConfigureParams } from './google';
import { BaseAuth } from './common';

enum AuthType {
  google = 'google',
  apple = 'apple',
}

type AuthManagerInitParams = {
  google: ConfigureParams;
  apple?: ConfigureParams;
};

export class AuthManager {
  public google!: GoogleAuth;

  constructor(authInitParams: AuthManagerInitParams) {
    const { google, apple } = authInitParams;
    if (google) {
      this.google = new GoogleAuth({ showPlayServicesUpdateDialog: true });
      this.google.configuration(google);
    }
  }
}
