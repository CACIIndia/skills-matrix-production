import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react'; 
import { getProfileDetails } from '@/lib/api/getProfileDetails';


interface AppContextType {
  user: string | null;
  userId: string;
  profile: any | null; 
  setUser: (user: string | null) => void;
  setProfile: (profile: any | null) => void;
  loading: boolean;
}


const AppContext = createContext<AppContextType | undefined>(undefined);


interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const { data: session, status } = useSession(); 
  const [user, setUser] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>('');
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (status === 'authenticated' && session?.user?.id && !userId) { 
        try {
          setLoading(true);
          const fetchedUserId = session.user.id;
          setUserId(fetchedUserId); 
          
          const profileData = await getProfileDetails(fetchedUserId);
          setProfile(profileData);
          setUser(session.user.name || ''); 
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
    <AppContext.Provider value={{ user, userId, profile, setUser, setProfile, loading }}>
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
