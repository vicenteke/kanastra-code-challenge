import React from "react";

interface BadgeProps {
  error?: boolean;
  children?: React.ReactNode;
}

function Badge({ error, children }: BadgeProps) {
  const classNames = error ?
    "inline-flex items-center rounded bg-red-50 px-2 py-1 text-sm font-medium text-red-700 ring-1 ring-inset ring-red-600/20"
    : "inline-flex items-center rounded bg-green-50 px-2 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
  return (
    <span className={classNames}>
      {children}
    </span>
  );
}

export default Badge;
