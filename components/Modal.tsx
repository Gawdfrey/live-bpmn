import localFont from "@next/font/local";
import * as RadixDialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import CancelIcon from "./icons/CancelIcon";

const monaSans = localFont({
  src: "../pages/Mona-Sans.woff2",
  variable: "--font-mona-sans",
});

type DialogProps = {
  title: JSX.Element | string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: Function;
};

export default function Modal({
  title,
  children,
  isOpen,
  onClose,
}: DialogProps) {
  const [open, setOpen] = useState(false);

  const handleClose = (event: any) => {
    if (onClose) {
      onClose(event);
    }
    setOpen(false);
  };

  useEffect(() => {
    if (isOpen !== open) {
      setOpen(isOpen);
    }
  }, [isOpen]);

  return (
    <RadixDialog.Root open={open}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="bg-black bg-opacity-50 fixed z-50 top-0 left-0 right-0 bottom-0 grid place-items-center overflow-y-auto">
          <RadixDialog.Content
            onEscapeKeyDown={handleClose}
            onPointerDownOutside={handleClose}
            onInteractOutside={handleClose}
            className={`bg-white rounded-lg p-4 shadow-lg w-1/2 fixed ${monaSans.variable} font-sans`}
          >
            <RadixDialog.Title className="absolute top-3 w-36 mx-auto left-0 right-0">
              {title}
            </RadixDialog.Title>
            <div className="mt-8">{children}</div>
            <RadixDialog.Close
              asChild
              className="absolute right-3 top-3 text-red-800"
            >
              <button onClick={() => setOpen(!open)}>
                <CancelIcon />
              </button>
            </RadixDialog.Close>
          </RadixDialog.Content>
        </RadixDialog.Overlay>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
