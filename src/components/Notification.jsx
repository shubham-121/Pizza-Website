import { useState, useEffect } from "react";

export default function Notification({ message }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 3000); // Auto-hide after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 mt-4 px-6 py-3 bg-green-400 text-white rounded-lg shadow-lg transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      }`}
    >
      <p>{message}</p>
    </div>
  );
}
