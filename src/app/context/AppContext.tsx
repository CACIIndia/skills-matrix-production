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
import {  useIsLineManager } from "@/lib/hooks/common/useLineManager";
import { getLineManager } from "../actions/user/getLineManager";



// Define the state for the context
type State = {
  profile: any;
  setProfile: Dispatch<SetStateAction<any>>;
  viewedProfile: any;
  setViewedProfile: Dispatch<SetStateAction<any>>;
  isLoading: boolean;
  user?: Session["user"];
  isLineManager: boolean | null; // Line manager status
  setIsLineManager: Dispatch<SetStateAction<boolean | null>>; // Set function for line manager status
};

// Create the context
const AppContext = createContext<State | undefined>(undefined);

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const { data: session } = useSession();
  const { data: profileData, isLoading } = useGetProfile(session?.user?.id ?? "");
  const { data:line_manager } = useIsLineManager(session?.user?.id ?? "");



  // console.log(line_manager,"line_manager");
  
  // State variables
  const [profile, setProfile] = useState<any>();
  const [viewedProfile, setViewedProfile] = useState<any>();
  const [isLineManager, setIsLineManager] = useState<boolean | null>(null);

  const user = session?.user;


  
  
  useEffect(() => {
    if (profileData) {
      setProfile(profileData);
      setIsLineManager(line_manager || false);
    }
  }, [profileData,line_manager]);




  return (
    <AppContext.Provider
      value={{
        profile,
        setProfile,
        viewedProfile,
        setViewedProfile,
        user,
        isLoading,
        isLineManager, 
        setIsLineManager, 
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
