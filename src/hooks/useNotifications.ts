import { useEffect, useState, useCallback } from "react";
import { type Notification, subscribeToNotifications, markNotificationAsRead, markAllNotificationsAsRead } from "@/lib/supabase/notifications";


export function useNotifications(userId: string | undefined) {
  
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = subscribeToNotifications(userId, (newNotification) => {
      setNotifications((prev) => [newNotification, ...prev]);
    });

    return unsubscribe;
  }, [userId]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = useCallback(async (id: string) => {
    // optimistic update
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    try {
      await markNotificationAsRead(id);
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
      // revert on failure
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: false } : n))
      );
    }
  }, []);

  const markAllAsRead = useCallback(async () => {
    if (!userId) return;
    const previous = notifications;
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    try {
      await markAllNotificationsAsRead(userId);
    } catch (err) {
      console.error("Failed to mark all notifications as read:", err);
      setNotifications(previous); // revert
    }
  }, [userId, notifications]);

  return { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead 
  };
}