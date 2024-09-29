import * as Notifications from 'expo-notifications';

async function cancelNotificationsGroup(notificationIds) {
  try {
    // Loop through the array and cancel each notification by ID
    for (let id of notificationIds) {
      await Notifications.cancelScheduledNotificationAsync(id);
    }
    console.log("All notifications canceled successfully.");
  } catch (error) {
    console.error("Error canceling notifications:", error);
  }
}

export default cancelNotificationsGroup;