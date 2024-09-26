import Spinner from "@/components/common/Spinner";

const Backdrop = () => (
  <div className='fixed bottom-0 left-0 right-0 top-0 z-[60] flex h-screen w-full items-center justify-center overflow-hidden bg-black/20'>
    <Spinner size='large' />
  </div>
);

export default Backdrop;
