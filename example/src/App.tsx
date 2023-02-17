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
});

export default function App() {
  const [result, setResult] = React.useState();

  const signInGoogle = React.useCallback(async () => {
    const user = await authManager.google.signIn();
    console.log('[user]', user);
    //@ts-ignore
    setResult(JSON.stringify(user, null, 2));
  }, []);

  const signInApple = React.useCallback(async () => {
    const res = await authManager.apple.signIn();
    console.log('[signInApple]', res);
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={signInGoogle}>
        <Text>signInGoogle: {result}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={signInApple}>
        <Text>signInApple</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
