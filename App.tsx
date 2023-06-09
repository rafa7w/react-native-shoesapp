import { useEffect } from 'react';
import { StatusBar } from 'react-native';
import OneSignal from 'react-native-onesignal'
import { NativeBaseProvider } from 'native-base';
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';

import { Routes } from './src/routes';

import { THEME } from './src/theme';
import { Loading } from './src/components/Loading';
import { tagUserInfoCreate } from './src/notifications/notificationsTags';

import { CartContextProvider } from './src/contexts/CartContext';

OneSignal.setAppId('ab007a19-72d1-413d-9927-3b4d0ee46522')

// mandar apenas para e-mails específicos:
OneSignal.setEmail('rafael@email.com')

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate('rafael@email.com')

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationOpenedHandler((response) => {
      const { actionId } = response.action as any

      switch (actionId) {
        case '1':
          return console.log('Ver todas')
        case '2':
          return console.log('Ver pedido')
        default:
          return console.log('Ver foi clicado em botão de ação')
      }
    })

    return () => unsubscribe
  }, [])

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>

      
    </NativeBaseProvider>
  );
}