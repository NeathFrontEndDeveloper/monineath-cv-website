import { Bell } from "lucide-react";

const NotificationIcon = () => {
  return (
    <div className="p-2 rounded-full hover:bg-gray-100 cursor-pointer transition-colors">
      <Bell className="h-4 w-4" />
    </div>
  );
};

export default NotificationIcon;
