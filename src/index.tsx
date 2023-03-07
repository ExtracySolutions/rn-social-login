import { GoogleAuth, ConfigureParams } from './google';
import { AndroidConfig, AppleAuth } from './apple';
import { InitTwitterParams, TwitterAuth } from './twitter';
import { FacebookAuth } from './facebook';
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
  twitter: InitTwitterParams;
  facebook: {};
};

export class AuthManager {
  public google!: GoogleAuth;
  public apple!: AppleAuth;
  public twitter!: TwitterAuth;
  public facebook!: FacebookAuth;

  constructor(authInitParams: AuthManagerInitParams) {
    const { google, apple, twitter, facebook } = authInitParams;
    if (google) {
      this.google = new GoogleAuth({ showPlayServicesUpdateDialog: true });
      this.google.configuration(google);
    }

    if (apple) {
      this.apple = new AppleAuth({});
      this.apple.configuration(apple.android);
    }

    if (twitter) {
      this.twitter = new TwitterAuth({});
      this.twitter.configuration(twitter);
    }

    if (facebook) {
      this.facebook = new FacebookAuth({});
      this.facebook.configuration();
    }
  }
}
