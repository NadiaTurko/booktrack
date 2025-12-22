import React from "react";

const EmptyState = ({ title, message, icon = "📚" }) => {
  return (
    <div className="text-center py-20 text-gray-500">
      <p className="text-3xl mb-2">{icon}</p>
      <p className="text-xl font-semibold mb-2">{title}</p>
      <p>{message}</p>
    </div>
  );
};

export default EmptyState;
