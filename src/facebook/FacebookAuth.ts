import {
  AccessToken,
  // eslint-disable-line @typescript-eslint/no-unused-vars
  AccessTokenMap,
  LoginManager,
} from 'react-native-fbsdk-next';
import { BaseAuth } from '../common';

interface FacebookAuthInitParams {}

export class FacebookAuth extends BaseAuth<FacebookAuthInitParams> {
  constructor(arg: FacebookAuthInitParams) {
    super(arg);
  }

  configuration() {
    try {
      LoginManager.setLoginBehavior('native_only');
    } catch (error) {
      throw new Error('Method configuration not working.');
    }
  }

  async signIn(): Promise<AccessTokenMap | null> {
    try {
      const currentAccessToken = await AccessToken.getCurrentAccessToken();

      if (currentAccessToken) {
        return currentAccessToken;
      }

      const userInfo = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      // @ts-ignore
      if (userInfo.isCancelled) {
        throw new Error('Cancelled login Twitter');
      } else {
        const accessTokenObject = await AccessToken.getCurrentAccessToken();

        if (accessTokenObject) {
          return accessTokenObject;
        }
      }

      return null;
    } catch (error: any) {
      throw new Error('Method signIn not working.');
    }
  }

  async signOut() {
    try {
      await LoginManager.logOut();
    } catch (error: any) {
      console.log(error);
      throw new Error('Method signIn not working.');
    }
  }
}
