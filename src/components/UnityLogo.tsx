import React from "react";

export const UnityLogo = ({ className }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 50 10 
           L 90 40 
           L 80 75 
           L 50 55 
           L 20 75 
           L 10 40 
           Z"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="round"
      />
    </svg>
  );
};
