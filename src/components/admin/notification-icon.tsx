import { Bell } from "lucide-react";

const NotificationIcon = () => {
  return (
    <div className="p-3 rounded-full hover:bg-gray-100 cursor-pointer transition-colors">
      <Bell className="h-5 w-5" />
    </div>
  );
};

export default NotificationIcon;
