"use client";
import AdvanceSearchResult from "@/components/views/advance-search/AdvanceSearchResult";
import useGetUsers from "@/lib/hooks/useGetUsers";

function AdvanceSearch (){
  const { data: users }  = useGetUsers();
    return (
        <div className=" ">
          <div className="container-fixed flex gap-4">
            <AdvanceSearchResult/>
          </div>
        </div>
      );
}
export default AdvanceSearch