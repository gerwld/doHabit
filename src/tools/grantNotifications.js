import * as Notifications from 'expo-notifications';

async function requestNotificationPermissions() {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      await Notifications.requestPermissionsAsync();
    }
  }
  
  export default requestNotificationPermissions;

