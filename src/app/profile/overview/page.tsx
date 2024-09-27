"use client";
import { useEffect, useState } from "react";
import SkillCard from "@/app/components/SkillsCard";
import { useProfile } from "@/context/profileContext";
import GeneralInfoCard from "@/app/components/GeneralInfoCard";
import AdditionalInfoCard from "@/app/components/AdditionalInfoCard";
import ProjectHistoryCard from "@/app/components/ProjectHistoryCard";
import ProfileHeader from "@/app/components/ProfileHeader";
import Menu from "@/app/components/Menu";
import ProfileActions from "@/app/components/ProfileActions";
import { PROFILE_HEADER_ITEMS } from "@/constants/header";

interface GeneralInfo {
  email: string;
  phone: string;
  status: string;
  startdate: string;
  current_project: string;
  sfia_level: string;
  reported_to: string;
}
const initialGeneralInfo: GeneralInfo = {
  email: "",
  phone: "",
  status: "",
  startdate: "",
  current_project: "",
  sfia_level: "",
  reported_to: "",
};

const OverviewPage = () => {
  const { data, loading, error } = useProfile();
  console.log(data, loading, error, "errorloadingdata");
  const [general_info, setGeneralInfo] =
    useState<GeneralInfo>(initialGeneralInfo);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let general_info = {
          email: data?.email || "",
          phone: data?.phone || "",
          status: data?.status || "",
          startdate: data?.startdate || "",
          current_project: data?.current_project || "",
          sfia_level: data?.sfia_level || "",
          reported_to: data?.reported_to || "",
        };

        console.log(general_info, "general_info");
        setGeneralInfo(general_info);
        setSkills(data?.skills);
      } catch (error) {
      } finally {
      }
    };
    fetchData();
  }, [data]);

  if (loading) {
    return "...loading";
  }

  return (
    <div>
      <ProfileHeader />

      {/* Profile Actions and Menu */}
      <div className='container-fixed'>
        <div className='dark:border-b-coal-100 mb-5 flex flex-nowrap items-center justify-between gap-6 border-b border-b-gray-200 lg:mb-10 lg:items-end'>
          <Menu items={PROFILE_HEADER_ITEMS} />
          <ProfileActions />
        </div>
      </div>
      <div className='w-[100%]'>
        <div className='container mx-auto p-4'>
          <div className='lg:gap-7.5 grid grid-cols-1 gap-5 lg:grid-cols-3'>
            <div className='col-span-1 grid gap-5'>
              {/* General Info */}
              <GeneralInfoCard data={general_info} />

              {/* Additional Info */}
              <AdditionalInfoCard
                additional_info={data?.additional_info ?? null}
              />
            </div>

            <div className='col-span-2 grid grid-cols-1 gap-5'>
              <SkillCard skills={skills ?? []} />
              {/* Project History */}
              <ProjectHistoryCard
                current_project={data?.projects?.current_project ?? null}
                previous_projects={data?.projects?.previous_projects || []}
                employment_history={
                  data?.projects?.employment_history ?? {
                    company: "Unknown",
                    joined_date: "N/A",
                  }
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewPage;
