import * as Notifications from 'expo-notifications';
import { getTwelveOr24Time } from '@constants';
import { Platform } from 'react-native';

async function notificationsHandler(frequency, hour, minute, name, desc) {
  let notificationIds = [];
  let userTime = getTwelveOr24Time(hour + ":" + (minute < 10 ? ("0" + minute) : minute)) + " ";
  
  if(Platform.OS === "web") {
    console.warn("Used Notifications.scheduleNotificationAsync in Web. Returning empty array.");
    return []
  }

  switch (frequency) {
    case 'every-day':
      notificationIds.push(
        await Notifications.scheduleNotificationAsync({
          content: {
            title: name,
            body: desc ? (userTime + desc) : userTime,
          },
          trigger: {
            hour: hour,
            minute: minute,
            repeats: true, // Repeats every day
          },
        })
      );
      break;

    case 'every-week':
      // scheduling on Monday (weekday = 2)
      notificationIds.push(
        await Notifications.scheduleNotificationAsync({
          content: {
            title: name,
            body: desc ? (userTime + desc) : userTime,
          },
          trigger: {
            weekday: 2, // monday (1 = Sunday, 7 = Saturday)
            hour: hour,
            minute: minute,
            repeats: true, // repeats every week
          },
        })
      );
      break;

    case '3-times-week':
      const threeDays = [2, 4, 6]; // Monday, Wednesday, Friday
      for (let day of threeDays) {
        notificationIds.push(
          await Notifications.scheduleNotificationAsync({
            content: {
              title: name,
              body: desc ? (userTime + desc) : userTime,
            },
            trigger: {
              weekday: day,
              hour: hour,
              minute: minute,
              repeats: true, // repeats on 2.4.6
            },
          })
        );
      }
      break;

    case '5-times-week':
      const fiveDays = [2, 3, 4, 5, 6]; // Monday to Friday
      for (let day of fiveDays) {
        notificationIds.push(
          await Notifications.scheduleNotificationAsync({
            content: {
              title: name,
              body: desc ? (userTime + desc) : userTime,
            },
            trigger: {
              weekday: day,
              hour: hour,
              minute: minute,
              repeats: true, // repeats on these days
            },
          })
        );
      }
      break;

    default:
      throw new Error("Invalid frequency type");
  }

  return notificationIds;
}


export default notificationsHandler;