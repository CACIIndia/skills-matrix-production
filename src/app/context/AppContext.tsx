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
  categoryskills: any;

};

// Create the context
const AppContext = createContext<State | undefined>(undefined);

type AppProviderProps = {
  children: ReactNode;
};


export const AppProvider = ({ children }: AppProviderProps) => {
  const { data: session } = useSession();
  const { data: profileData, isLoading } = useGetProfile(session?.user?.id ?? "");
  const [selectedItems, setSelectedItems] = useState<SkillCategory[]>([]);
  const { data: categoryskills } = useGetSkills();
  

  const [profile, setProfile] = useState<any>();
  const [viewedProfile, setViewedProfile] = useState<any>();
  const user = session?.user;

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
  
  
  useEffect(() => {
    if (profileData) {
      setProfile(profileData?.user);
    }
  }, [profileData]);




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
        categoryskills
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
