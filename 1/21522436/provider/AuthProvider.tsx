import { Session, User } from "@supabase/supabase-js";
import React, {
  useState,
  useEffect,
  createContext,
  PropsWithChildren,
} from "react";

import { supabase } from "~/utils/supabase";

type Profile = {
  id: string;
  username: string;
  avatar_url?: string;
  [key: string]: any; // Bổ sung nếu profile có thêm trường khác
};

type AuthProps = {
  user: User | null;
  session: Session | null;
  profile: Profile | null; // Thêm thông tin profile
  initialized?: boolean;
  signOut?: () => void;
  setSession?: any;
};

export const AuthContext = createContext<Partial<AuthProps>>({});

// Custom hook to read the context values
export function useAuth() {
  return React.useContext(AuthContext);
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>();
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null); // Thêm state profile
  const [initialized, setInitialized] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfile = async (userId: string) => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("Error fetching profile:", error.message);
        setProfile(null);
      } else {
        setProfile(data);
      }
    };

    // Listen for changes to authentication state
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session ? session.user : null);

      if (session?.user) {
        await fetchProfile(session.user.id); // Fetch profile nếu user tồn tại
      } else {
        setProfile(null);
      }

      setInitialized(true);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  // Log out the user
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null); // Xoá profile khi đăng xuất
  };

  const value = {
    user,
    session,
    profile, // Bao gồm profile trong context
    initialized,
    signOut,
    setSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
