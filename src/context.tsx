import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
import { Session } from "@supabase/supabase-js";
import LoadingPage from "./components/Loading";
import Navbar from "./components/Navbar";
import SetKeyDialog from "./components/SetKeyDialog";

export type userData = {
  session: Session | null;
  encryptionKey: string | null;
  setKey: (key: string | null) => void;
};
type providerProps = {
  children: JSX.Element | JSX.Element[];
};

export const UserDataContext = createContext<userData | undefined>(undefined);

export const useUserData = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useUserData must be used within a UserDataProvider");
  }
  return context;
};

export const UserDataProvider = ({ children }: providerProps) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [encryptionKey, setEncryptionKey] = useState<string | null>(null);
  console.log(encryptionKey);
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Session:", session);
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth State Changed:", _event);
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const setKey = (key: string | null) => {
    setEncryptionKey(key);
  };

  const value = {
    session,
    encryptionKey,
    setKey,
  };

  return (
    <UserDataContext.Provider value={value}>
      {loading ? (
        <LoadingPage />
      ) : !session ? (
        children
      ) : !encryptionKey ? (
        <div className="flex h-[70vh] flex-col items-center justify-center">
          <SetKeyDialog trigger="page" />
        </div>
      ) : (
        <>
          <Navbar />
          {children}
        </>
      )}
    </UserDataContext.Provider>
  );
};
