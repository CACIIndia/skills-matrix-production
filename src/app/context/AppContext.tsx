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

};

// Create the context
const AppContext = createContext<State | undefined>(undefined);

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const { data: session } = useSession();
  const { data: profileData, isLoading } = useGetProfile(session?.user?.id ?? "");
  

  const [profile, setProfile] = useState<any>();
  const [viewedProfile, setViewedProfile] = useState<any>();
  const user = session?.user;


  
  
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
        isLoading
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
