export abstract class BaseAuth<T> {
  constructor(arg: T) {}

  /**
   * Configuration Auth service
   */
  abstract configuration(arg: any): any;
  /**
   * SignIn with Auth service
   */
  abstract signIn(arg: any): any;
  /**
   * SignOut with Auth service
   */
  abstract signOut(arg: any): any;
}
