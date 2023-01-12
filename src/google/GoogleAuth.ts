import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
  SignInParams,
  ConfigureParams,
  User,
} from '@react-native-google-signin/google-signin';
export { ConfigureParams } from '@react-native-google-signin/google-signin';

import { BaseAuth } from '../common';

interface GoogleAuthInitParams {
  showPlayServicesUpdateDialog: boolean;
}

export class GoogleAuth extends BaseAuth<GoogleAuthInitParams> {
  private config: GoogleAuthInitParams;

  constructor(arg: GoogleAuthInitParams) {
    super(arg);
    this.config = arg;
  }

  configuration(params: ConfigureParams) {
    try {
      GoogleSignin.configure(params);
    } catch (error) {
      throw new Error('Method configuration not working.');
    }
  }

  async signIn(): Promise<User> {
    try {
      const hasPlayService = await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: this.config.showPlayServicesUpdateDialog,
      });
      if (hasPlayService) {
        const userInfo = await GoogleSignin.signIn();
        console.log('[Login with Google info]:', userInfo);
        return userInfo;
      } else {
        throw new Error('Play Service not supported!');
      }
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        throw new Error('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        throw new Error('Operation is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        throw new Error('Play Service not supported!');
      } else {
        // some other error happened
        throw new Error('Method signIn not working.');
      }
    }
  }

  async signOut() {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      throw new Error('Method signOut not working.');
    }
  }
}
