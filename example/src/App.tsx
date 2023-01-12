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
});

export default function App() {
  const [result, setResult] = React.useState();

  const signIn = React.useCallback(async () => {
    const user = await authManager.google.signIn();
    console.log('[user]', user);
    setResult(JSON.stringify(user, null, 2));
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={signIn}>
        <Text>Result: {result}</Text>
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
