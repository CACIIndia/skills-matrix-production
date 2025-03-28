import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import useGetProfile from "@/lib/hooks/profile/useGetProfile";
import useGetSkills from "@/lib/hooks/profile/useGetSkills";
import { SkillCategory } from "@/lib/types/profile";

type State = {
  profile: any;
  setProfile: Dispatch<SetStateAction<any>>;
  viewedProfile: any;
  setViewedProfile: Dispatch<SetStateAction<any>>;
  isLoading: boolean;
  user?: Session["user"];
  selectedItems: SkillCategory[];
  toggleSelectedItem: (item: SkillCategory) => void;
  removeSelectedItem: (id: SkillCategory["id"]) => void;
  categorySkills: any;
  setSelectedItems: Dispatch<SetStateAction<SkillCategory[]>>;
  removeAllSelectedSkills: () => void;
  addProject: (data: any) => void;
  replaceEditedProject: (data: any) => void;
  removeDeletedProject: (id: any) => void;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  searchQuery: string;
};

// Create the context
const AppContext = createContext<State | undefined>(undefined);

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const { data: session } = useSession();
  const { data: profileData, isLoading } = useGetProfile(
    session?.user?.id ?? "",
  );
  const [selectedItems, setSelectedItems] = useState<SkillCategory[]>([]);
  const { data: categorySkills } = useGetSkills();

  const [profile, setProfile] = useState<any>();
  const [viewedProfile, setViewedProfile] = useState<any>();
  const user = session?.user;
  const [searchQuery, setSearchQuery] = useState("");


  const toggleSelectedItem = (item: SkillCategory) => {
    setSelectedItems((prevSelected) => {
      const isAlreadySelected = prevSelected.some((i) => i.id === item.id);
      if (isAlreadySelected) {
        // If already selected, remove it
        return prevSelected.filter((i) => i.id !== item.id);
      } else {
        // If not selected, add it
        return [...prevSelected, item];
      }
    });
  };

  const removeSelectedItem = (id: SkillCategory["id"]) => {
    setSelectedItems((prevSelected) =>
      prevSelected.filter((item) => item.id !== id),
    );
  };

  const removeAllSelectedSkills = () => {
    setSelectedItems((prevSelected) => []);
  };

  useEffect(() => {
    if (profileData) {
      setProfile(profileData?.user);
    }
  }, [profileData]);

  const addProject = (projects: any) => {
    if (projects) {
      setProfile({ ...profile, projects: projects.sort((a: any, b: any) => (new Date(b.startDate) as any) - (new Date(a.startDate) as any)) });
    }
  };

  const replaceEditedProject = (editedProject: any) => {
    if (profile) {
      const newProjects = profile.projects.map((project: any) => {
        if (project.id === editedProject.id) {
          return { ...project, ...editedProject };
        }
        return project;
      });
      setProfile({
        ...profile,
        projects: newProjects.sort((a: any, b: any) =>
          (new Date(b.startDate) as any) - (new Date(a.startDate) as any)
        ),
      });

    }
  };

  const removeDeletedProject = (deletedProjectId: any) => {
    if (profile) {
      const newProjects = profile.projects.filter(
        (project: any) => project.id !== deletedProjectId,
      );
      setProfile({ ...profile, projects: newProjects });
    }
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        setProfile,
        viewedProfile,
        setViewedProfile,
        user,
        isLoading,
        selectedItems,
        toggleSelectedItem,
        categorySkills,
        removeSelectedItem,
        setSelectedItems,
        removeAllSelectedSkills,
        addProject,
        replaceEditedProject,
        removeDeletedProject,
        setSearchQuery,
        searchQuery
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
