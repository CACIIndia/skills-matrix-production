import { Dispatch, SetStateAction } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import Button from "@/components/common/Button";

type ModalProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  title?: string;
  children: React.ReactNode;
  primaryButton?: boolean;
  primaryButtonOnClick?: () => void;
};

const Modal = ({
  isOpen,
  setIsOpen,
  title,
  children,
  primaryButton,
  primaryButtonOnClick,
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
          <DialogPanel className='w-full max-w-6xl rounded bg-white p-6'>
            <div className='mb-4 flex items-center justify-between'>
              {title && (
                <DialogTitle className='text-2xl font-bold'>
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

            {primaryButton && (
              <div className='mx-4 mt-10 flex justify-end space-x-3'>
                <Button
                  variant='btn-1'
                  size='md'
                  onClick={() => {
                    primaryButtonOnClick && primaryButtonOnClick();
                    onClose();
                  }}
                >
                  Update
                </Button>
              </div>
            )}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
