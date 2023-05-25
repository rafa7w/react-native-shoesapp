import OneSignal from "react-native-onesignal";

/* export function tagUserEmailCreate(email: string) {
  OneSignal.sendTag('user_email', email)
  OneSignal.deleteTag('user_email')
} */

export function tagUserInfoCreate(email: string) {
  OneSignal.sendTags({
    'user_name': 'Rafael',
    'user_email': 'rafael@email.com'
  })
}

export function tagCartUpdate(itemsCount: string) {
  OneSignal.sendTag('cart_items_count', itemsCount)
}