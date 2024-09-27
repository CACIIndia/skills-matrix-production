import Button from "@/components/common/Button";
import HeaderMenu from "@/components/common/Header/Menu";
import HeaderSearch from "@/components/common/Header/Search";
import MegaMenu from "@/components/common/Header/MegaMenu";

const Header = () => {
  return (
    <header className='flex h-full w-full items-center justify-between'>
      <div className='h-full w-full' id='header_container'>
       

        <div
          className='hidden h-full items-stretch justify-between p-5 lg:flex'
          id='megamenu_container'
        >
          <div className='flex items-stretch pl-10'>
            <div className='flex items-stretch' id='megamenu_container'>
              <div
                className='flex items-stretch'
              
              >
                <div
                  className='hidden lg:flex lg:items-stretch'
                
                >
                  <MegaMenu />
                </div>
              </div>
            </div>
          </div>

          <div className='flex items-start gap-2 lg:gap-3.5'>
            <HeaderSearch />

            <Button className='btn-1' size='9'>
              <i className='ki-filled ki-element-11'></i>
            </Button>

            <Button variant='btn-1' size='9'>
              <i className='ki-filled ki-notification-on'></i>
            </Button>

            <HeaderMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
