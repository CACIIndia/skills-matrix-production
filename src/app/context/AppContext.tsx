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
  categoryskills: any;
  setSelectedItems: Dispatch<SetStateAction<SkillCategory[]>>;

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

  const removeSelectedItem = (id: SkillCategory["id"]) => {
    setSelectedItems((prevSelected) =>
      prevSelected.filter((item) => item.id !== id)
    );
  };
  
  
  useEffect(() => {
    if (profileData) {
      setProfile({
        "id": "da5124d1-8907-4a49-80d1-4d217f2e8505",
        "name": "Magendran VA",
        "email": "vmagendran@caci.co.uk",
        "emailVerified": "2024-12-11T06:08:24.605Z",
        "image": null,
        "phone": "9398451030",
        "location": "Hyderabad",
        "status": 1,
        "sfiaLevel": null,
        "reportedTo": null,
        "reportedToId": null,
        "role": "Software Developer",
        "createdAt": "2024-12-11T06:08:24.607Z",
        "joiningDate": null,
        "updatedAt": "2024-12-13T05:29:36.038Z",
        "additionalInfo": null,
        "userSkills": [
            {
                "id": "680c5bb3-22a2-44b5-9b56-776a9f819b73",
                "skillId": "73699e84-ece3-4357-a882-5e853716a44f",
                "level": 1,
                "createdAt": "2024-12-18T09:43:16.603Z",
                "createdById": "da5124d1-8907-4a49-80d1-4d217f2e8505",
                "status": 1,
                "updatedAt": "2024-12-18T09:43:16.603Z",
                "skill": {
                    "id": "73699e84-ece3-4357-a882-5e853716a44f",
                    "name": "Angular",
                    "categoryId": "7a368270-aa59-4f39-a5a4-6d041b5677a9",
                    "createdAt": "2024-11-01T16:55:38.342Z",
                    "updatedAt": "2024-11-01T16:55:38.342Z",
                    "status": 1
                }
            },
            {
                "id": "50eeba14-d7e9-4be0-a591-5a91d0951478",
                "skillId": "a419f961-da98-4355-863c-f33f6ac411cc",
                "level": 1,
                "createdAt": "2024-12-18T09:43:16.603Z",
                "createdById": "da5124d1-8907-4a49-80d1-4d217f2e8505",
                "status": 1,
                "updatedAt": "2024-12-18T09:43:16.603Z",
                "skill": {
                    "id": "a419f961-da98-4355-863c-f33f6ac411cc",
                    "name": "MySQL",
                    "categoryId": "7175f3a7-f378-46e4-9ddc-22cc05e79a6f",
                    "createdAt": "2024-11-01T16:49:13.518Z",
                    "updatedAt": "2024-11-01T16:49:13.518Z",
                    "status": 1
                }
            }
        ],
        "projects": [],
        "isLineManager": true,
        "trainingEmployees": []
    });
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
        categoryskills,
        removeSelectedItem,
        setSelectedItems
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
