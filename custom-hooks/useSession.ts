import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export const useUserSession = () => {
  const [session, setSession] = useState<null | Session>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setLoading(false);

      if (!session) {
        router.replace("/login");
      }
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_e, newSession) => {
      setSession(newSession);

      if (!newSession) {
        router.replace("/login");
      }
    });

    fetchSession();

    return () => subscription.unsubscribe();
  }, [router]);

  return { session, loading };
};
