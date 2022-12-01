import { StatusBar } from 'expo-status-bar';
import { useEffect,useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function App() {
  
  const [isBiometricSupport,setBiometricSupport] = useState(false)
  const [isAuthenticated,setIsAuthenticated] = useState(false)


  useEffect(()=>{
    (async ()=>{
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setBiometricSupport(compatible);
    })();
  })

  const Authenticate = ()=>{
    const auth = LocalAuthentication.authenticateAsync({
      promptMessage:'Authenticate with touch id',
      fallbackLabel:'Enter Password'
    })

    auth.then(result=>{
      setIsAuthenticated(result.success);
    })
  }

  return (
    
    <View style={styles.container}>
      {
         isAuthenticated?<Text>Welcome to the Application</Text>:Authenticate()
      }
      {/* <Text>Welcome Akshay</Text> */}
      <StatusBar style="auto" />
    </View>
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
