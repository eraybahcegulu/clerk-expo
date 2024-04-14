import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { TokenCache } from '@clerk/clerk-expo/dist/cache';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';

const tokenCache: TokenCache = {
  async getToken(key: string): Promise<string | null | undefined> {
    try {
      const token = await SecureStore.getItemAsync(key);
      return token ?? undefined;
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (err) {
    }
  },
};

export default function App() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={'pk_test_YXBwYXJlbnQtdGFoci02My5jbGVyay5hY2NvdW50cy5kZXYk'}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <SignedIn>
          <HomeScreen />
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>
      </View>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
