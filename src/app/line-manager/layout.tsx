import Menu from "@/components/common/Menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='dark:border-b-coal-100 mb-5 flex flex-nowrap items-center justify-between gap-6 border-b border-b-gray-200 lg:mb-10 lg:items-end'>
        <div className='container-fixed grid'>
          <div className='scrollable-x-auto'>
            <div className='menu gap-3'>
                {/* <Menu items={[]} }/> */}
              {["My Team", "Certifications", "Training"].map((title, index) => (
                <div
                // style={{borderBottom:"2px solid #3b82f6"}}
                  key={index}
                  className={`menu-item  ${
                    title === "Training" ? "border-b-primary here" : " border-b-2 border-b-primary "
                  }`}
                >
                  <div
                    className='menu-link gap-1.5 px-2 pb-2 lg:pb-4'
                    tabIndex={0}
                  >
                    <span
                      className={`menu-title text-nowrap text-sm font-medium text-gray-700`}
                    >
                      {title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
