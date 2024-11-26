import Menu from "@/components/common/Menu";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex flex-nowrap items-center lg:items-end justify-between border-b border-b-gray-200 dark:border-b-coal-100 gap-6 mb-5 lg:mb-10">
          <div className="grid container-fixed">
            <div className="scrollable-x-auto">
              <Menu items={[{name:"My Team",path:"/line-manager/my-team"},
                {name:"Certifications",path:"/line-manager/certifications"},
                {name:"Training",path:"/line-manager/training"}]} />
            </div>
          </div>
        </div>
      {children}
    </>
  );
}
