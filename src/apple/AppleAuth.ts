import {
  appleAuth,
  appleAuthAndroid,
  AndroidConfig,
  AppleRequestResponse,
  AndroidSigninResponse,
} from '@invertase/react-native-apple-authentication';
export { AndroidConfig } from '@invertase/react-native-apple-authentication';

import { BaseAuth } from '../common';

type AppleLoginResponse = AppleRequestResponse | AndroidSigninResponse;

interface AppleAuthInitParams {}

export class AppleAuth extends BaseAuth<AppleAuthInitParams> {
  constructor(arg: AppleAuthInitParams) {
    super(arg);
  }

  configuration(androidConfig: AndroidConfig) {
    try {
      if (appleAuthAndroid.isSupported) {
        appleAuthAndroid.configure(androidConfig);
      }
    } catch (error) {
      throw new Error('Method configuration not working.');
    }
  }

  async signIn(): Promise<AppleLoginResponse> {
    try {
      if (appleAuthAndroid.isSupported) {
        //android
        const appleAuthRequestResponse = await appleAuthAndroid.signIn();
        return appleAuthRequestResponse;
      } else {
        //   ios
        // performs login request
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: appleAuth.Operation.LOGIN,
          // Note: it appears putting FULL_NAME first is important, see issue #293
          requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
        });
        return appleAuthRequestResponse;
      }
    } catch (error) {
      throw new Error('Method signIn not working.');
    }
  }
  async signOut() {
    try {
      // do some stuff
    } catch (error) {
      throw new Error('Method signOut not working.');
    }
  }
}
