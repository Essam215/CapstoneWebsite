import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { Card } from "../components/Card";
import { Link } from "react-router-dom";
import {
  Trophy,
  ClipboardList,
  Calendar,
  Bell,
  TrendingUp,
  Award,
} from "lucide-react";
import { mockTasks, mockEvents, mockNotifications } from "../data/mockData";
import { getTasks } from "../services/taskService";
import { getEvents } from "../services/eventService";
import { getNotifications } from "../services/notificationService";

export const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [tasksData, eventsData, notificationsData] = await Promise.all([
        getTasks(),
        getEvents(),
        getNotifications()
      ]);
      setTasks(tasksData);
      setEvents(eventsData);
      setNotifications(notificationsData.notifications || []);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      // Fallback to mock data
      setTasks(mockTasks);
      setEvents(mockEvents);
      setNotifications(mockNotifications);
    }
  };

  const stats = [
    {
      label: "Total Points",
      value: user?.points || 0,
      icon: Trophy,
      color: "text-yellow-500",
      bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
    },
    {
      label: "Current Rank",
      value: `#${user?.rank || 0}`,
      icon: TrendingUp,
      color: "text-blue-500",
      bgColor: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      label: "Active Tasks",
      value: tasks.filter((t) => t.status === "in-progress").length,
      icon: ClipboardList,
      color: "text-green-500",
      bgColor: "bg-green-100 dark:bg-green-900/20",
    },
    {
      label: "Upcoming Events",
      value: events.filter((e) => e.status === "upcoming").length,
      icon: Calendar,
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
  ];

  const recentTasks = tasks.slice(0, 3);
  const upcomingEvents = events.slice(0, 3);
  const recentNotifications = notifications.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome back, {user?.firstName}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Here's what's happening with your Peer Helpers activities
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.bgColor} p-3 rounded-lg`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tasks */}
        <div className="lg:col-span-2">
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Recent Tasks
              </h2>
              <Link
                to="/tasks"
                className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium"
              >
                View all
              </Link>
            </div>
            <div className="space-y-3">
              {recentTasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {task.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {task.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                        <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded">
                          {task.category}
                        </span>
                        <span>{task.points} points</span>
                        <span
                          className={`px-2 py-1 rounded ${
                            task.status === "completed"
                              ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                              : task.status === "in-progress"
                              ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                              : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                          }`}
                        >
                          {task.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>

        {/* Notifications */}
        <div>
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Notifications
              </h2>
              <Bell className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {recentNotifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`p-3 rounded-lg border-l-4 ${
                    notification.type === "success"
                      ? "bg-green-50 dark:bg-green-900/10 border-green-500"
                      : notification.type === "error"
                      ? "bg-red-50 dark:bg-red-900/10 border-red-500"
                      : notification.type === "warning"
                      ? "bg-yellow-50 dark:bg-yellow-900/10 border-yellow-500"
                      : "bg-blue-50 dark:bg-blue-900/10 border-blue-500"
                  } ${!notification.read ? "font-semibold" : ""}`}
                >
                  <p className="text-sm text-gray-900 dark:text-white mb-1">
                    {notification.title}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {notification.message}
                  </p>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Upcoming Events */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Upcoming Events
          </h2>
          <Link
            to="/events"
            className="text-primary-600 dark:text-primary-400 hover:underline text-sm font-medium"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {event.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {event.description}
              </p>
              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>{new Date(event.date).toLocaleDateString()}</span>
                <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded">
                  {event.points} points
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
};

