import RNTwitterSignIn from '@react-native-twitter-signin/twitter-signin';
import { BaseAuth } from '../common';

interface TwitterAuthInitParams {}

export interface InitTwitterParams {
  consumerKey: string;
  consumerSecret: string;
}

export class TwitterAuth extends BaseAuth<TwitterAuthInitParams> {
  constructor(arg: TwitterAuthInitParams) {
    super(arg);
  }

  configuration(params: InitTwitterParams) {
    try {
      RNTwitterSignIn.init(params.consumerKey, params.consumerSecret);
    } catch (error) {
      throw new Error('Method configuration not working.');
    }
  }

  async signIn(): Promise<unknown> {
    try {
      const userInfo = await RNTwitterSignIn.logIn();
      return userInfo;
    } catch (error: any) {
      console.log(error);
      throw new Error('Method signIn not working.');
    }
  }

  async signOut() {
    try {
      await RNTwitterSignIn.logOut();
    } catch (error: any) {
      console.log(error);
      throw new Error('Method signIn not working.');
    }
  }
}
