import { useEffect, useState } from 'react';

import { useTheme } from 'native-base';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

import OneSignal, { NotificationReceivedEvent, OSNotification } from 'react-native-onesignal'

import { Notification } from '../components/Notification'; 

import { AppRoutes } from './app.routes';

const linking = {
  // schemes que a estrutura de navegação vai reconhecer
  prefixes: ['com.rocketseat.igniteshoes://', 'igniteshoesapp://', 'exp+igniteshoesapp://'],
  config: {
    screens: {
      // rota
      details: {
        // é com os : que conseguimos dizer à estrutura de navegação que o productId não é um texto simples, mas um parâmetro, ou seja, algum valor será passado pelo deep linking
        path: 'details/:productId',
        parse: {
          productId: (productId: string) => productId
        }
      }
    }
  }
}

export function Routes() {
  const [notification, setNotification] = useState<OSNotification>()
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationWillShowInForegroundHandler((notificationReceivedEvent: NotificationReceivedEvent) => {
      // devolve o conteúdo da notificação
      const response = notificationReceivedEvent.getNotification()

      setNotification(response)
    })

    return () => unsubscribe
  }, [])

  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />

      {
        notification?.title &&
        <Notification 
          data={notification}
          onClose={() => {
            setNotification(undefined)
          }}
        />
      }
    </NavigationContainer>
  );
}