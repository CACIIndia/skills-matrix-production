import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  children: React.ReactNode;
  buttonText?: string;
  handler?: () => void;
  customWidth?: string;
};

const Modal = ({
  isOpen,
  setIsOpen,
  title,
  children,
  buttonText,
  handler,
  customWidth,
}: ModalProps) => {
  const onClose = () => setIsOpen(!isOpen);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className='relative z-10 focus:outline-none'
    >
      <DialogBackdrop className='fixed inset-0 bg-black/30' />

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-center justify-center p-4'>
          <DialogPanel
            className={` ${customWidth ? customWidth : "w-full max-w-4xl"} rounded bg-white p-6`}
          >
            <div className='mb-4 flex items-center justify-between'>
              {title && (
                <DialogTitle className='text-2xl font-medium'>
                  {title}
                </DialogTitle>
              )}
              <button
                className='btn btn-sm btn-icon btn-light btn-clear shrink-0'
                onClick={onClose}
              >
                <i className='ki-filled ki-cross'></i>
              </button>
            </div>

            {children}

            <div className='mx-4 mt-10 flex justify-end space-x-3'>
              <button onClick={onClose} className='btn btn-md btn-light'>
                Close
              </button>

              {buttonText && handler && (
                <button
                  className='btn btn-md btn-primary'
                  onClick={() => {
                    handler && handler();
                    onClose();
                  }}
                >
                  Update
                </button>
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
