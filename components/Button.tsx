import React from "react";
import LoadingIcon from "./icons/LoadingIcon";

export const PrimaryButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button"> & { isLoading?: boolean }
>(({ children, className = "", isLoading = false, ...props }, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      className="bg-purple-700 hover:bg-purple-600 px-4 py-2 text-white rounded-full flex gap-2"
    >
      {isLoading ? (
        <div className="flex gap-2">
          <div className="my-auto">
            <LoadingIcon />
          </div>
          <span>Loading ...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
});

export const DangerButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button"> & { isLoading?: boolean }
>(({ children, className = "", isLoading = false, ...props }, ref) => {
  return (
    <button
      ref={ref}
      {...props}
      className="bg-red-700 hover:bg-red-600 px-4 py-2 text-white rounded-full flex gap-1"
    >
      {isLoading ? (
        <div className="flex gap-2">
          <div className="my-auto">
            <LoadingIcon />
          </div>
          <span>Loading ...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
});
