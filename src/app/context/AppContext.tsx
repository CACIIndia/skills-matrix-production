import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react'; 
import { getProfileDetails } from '@/lib/api/getProfileDetails';


interface AppContextType {
  profile: any | null; 
  setProfile: (profile: any | null) => void;
  loading: boolean;
}


const AppContext = createContext<AppContextType | undefined>(undefined);


interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const { data: session, status } = useSession(); 
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 
  const userId = session?.user?.id || "";

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (status === 'authenticated' && userId) { 
        try {
          
          setLoading(true);
          const profileData = await getProfileDetails(userId);
          setProfile(profileData);
        } catch (error) {
          console.error('Failed to fetch session or profile details', error);
        } finally {
          setLoading(false);
        }
      }
    };

    if (!profile) {
      fetchUserDetails(); 
    }
  }, [session, status, userId, profile]); 

  return (
    <AppContext.Provider value={{ profile, setProfile, loading }}>
      {children}
    </AppContext.Provider>
  );
};


export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
