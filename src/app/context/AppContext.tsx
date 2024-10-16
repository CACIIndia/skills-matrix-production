import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession } from 'next-auth/react'; // Import useSession for client-side session management
import { getProfileDetails } from '@/lib/api/getProfileDetails';

// Define a type for the context value
interface AppContextType {
  user: string | null;
  userId: string;
  profile: any | null; // Adjust type as per your profile structure
  setUser: (user: string | null) => void;
  setProfile: (profile: any | null) => void;
  loading: boolean;
}

// Create the context with default value
const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a provider component
interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const { data: session, status } = useSession(); // useSession from next-auth/react
  const [user, setUser] = useState<string | null>(null);
  const [userId, setUserId] = useState<string>('');
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  // Fetch session and profile details
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (status === 'authenticated' && session?.user?.id && !userId) { // Ensure we fetch data only once
        try {
          setLoading(true); // Start loading when fetching data
          const fetchedUserId = session.user.id;
          setUserId(fetchedUserId); // Set userId in state
          
          const profileData = await getProfileDetails(fetchedUserId); // Fetch profile details
          setProfile(profileData);
          setUser(session.user.name || ''); // Optionally set the user's name
        } catch (error) {
          console.error('Failed to fetch session or profile details', error);
        } finally {
          setLoading(false); // End loading after data is fetched
        }
      }
    };

    if (!profile) {
      fetchUserDetails(); // Fetch data only when the profile is null
    }
  }, [session, status, userId, profile]); // Rerun when session or status changes, but only once after fetching

  return (
    <AppContext.Provider value={{ user, userId, profile, setUser, setProfile, loading }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
