import { GoogleAuth, ConfigureParams } from './google';
import { AndroidConfig, AppleAuth } from './apple';
// import { BaseAuth } from './common';

// enum AuthType {
//   google = 'google',
//   apple = 'apple',
// }

type AuthManagerInitParams = {
  google: ConfigureParams;
  apple?: {
    // no need config for ios
    // ios?: {};
    android: AndroidConfig;
  };
};

export class AuthManager {
  public google!: GoogleAuth;
  public apple!: AppleAuth;

  constructor(authInitParams: AuthManagerInitParams) {
    const { google, apple } = authInitParams;
    if (google) {
      this.google = new GoogleAuth({ showPlayServicesUpdateDialog: true });
      this.google.configuration(google);
    }
    if (apple) {
      this.apple = new AppleAuth({});
      this.apple.configuration(apple.android);
    }
  }
}
