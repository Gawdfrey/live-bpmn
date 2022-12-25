import React from "react";

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button"> & { isLoading?: boolean }
>(({ children, className = "", isLoading = false, ...props }, ref) => {
  return (
    <button ref={ref} {...props} className={`rounded-md ${className}`}>
      {children}
      {isLoading && <span>Loading ...</span>}
    </button>
  );
});

export function PrimaryButton({
  children,
  ...props
}: {
  children: React.ReactNode;
  props: HTMLButtonElement;
}) {
  return (
    <Button
      className="bg-purple-700 hover:bg-purple-600 px-4 py-2 text-white"
      {...props}
    >
      {children}
    </Button>
  );
}

export function SecondaryButton() {
  return <button>hello</button>;
}

export function DangerButton({
  children,
  ...props
}: {
  children: React.ReactNode;
  props: HTMLButtonElement;
}) {
  return (
    <Button
      className="bg-red-700 hover:bg-red-600 px-4 py-2 text-white"
      {...props}
    >
      {children}
    </Button>
  );
}
