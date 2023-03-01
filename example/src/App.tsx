import * as React from 'react';

import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { AuthManager } from 'rn-social-login';

const authManager = new AuthManager({
  google: {
    iosClientId:
      '126613952157-vflcg9lsqoc8ms8ji67k5mbkk0ji87cb.apps.googleusercontent.com',
    webClientId:
      '126613952157-jsdjqq52e86d02sumui2f5m27nb4thh7.apps.googleusercontent.com',
  },
  apple: {
    android: {
      clientId: 'com.extracy.extracywallet.client',
      redirectUri: 'https://extracywallet.us.auth0.com/login/callback',
    },
  },
  twitter: {
    consumerKey: 'consumerKey',
    consumerSecret: 'consumerSecret',
  },
  facebook: {},
});

export default function App() {
  // const [result, setResult] = React.useState();

  const signInGoogle = React.useCallback(async () => {
    const user = await authManager.google.signIn();
    console.log('[user]', user);
    // setResult('nghia');
  }, []);

  const signInApple = React.useCallback(async () => {
    const res = await authManager.apple.signIn();
    console.log('[signInApple]', res);
  }, []);

  const signInTwitter = React.useCallback(async () => {
    const res = await authManager.twitter
      .signIn()
      .catch((e) => console.log('catch ', e));
    console.log('[signInApple]', res);
  }, []);

  const signOutTwitter = React.useCallback(async () => {
    const res = await authManager.twitter
      .signOut()
      .catch((e) => console.log('catch sign out ', e));

    console.log('[signOut]', res);
  }, []);

  const signInFacebook = React.useCallback(async () => {
    const res = await authManager.facebook
      .signIn()
      .catch((e) => console.log('catch ', e));

    console.log('[signInFacebook]', res);
  }, []);

  const signOutFacebook = React.useCallback(async () => {
    const res = await authManager.facebook
      .signOut()
      .catch((e) => console.log('catch ', e));

    console.log('[signOutFacebook]', res);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.box} onPress={signInGoogle}>
        <Text style={styles.text}>signInGoogle: </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box} onPress={signInApple}>
        <Text style={styles.text}>signInApple</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box} onPress={signInTwitter}>
        <Text style={styles.text}>signIn Twitter</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box} onPress={signOutTwitter}>
        <Text style={styles.text}>signOut Twitter</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box} onPress={signInFacebook}>
        <Text style={styles.text}>login Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.box} onPress={signOutFacebook}>
        <Text style={styles.text}>signout Facebook</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  box: {
    height: 60,
    marginVertical: 20,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
