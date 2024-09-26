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
                data-reparent='true'
                data-reparent-mode='prepend|lg:prepend'
                data-reparent-target='body|lg:#megamenu_container'
              >
                <div
                  className='hidden lg:flex lg:items-stretch'
                  data-drawer='true'
                  data-drawer-className='drawer drawer-start fixed z-10 top-0 bottom-0 w-full mr-5 max-w-[250px] p-5 lg:p-0 overflow-auto'
                  data-drawer-enable='true|lg:false'
                  id='megamenu_wrapper'
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
