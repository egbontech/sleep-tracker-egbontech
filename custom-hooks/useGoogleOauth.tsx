import { supabase } from "../lib/supabase";

export function useGoogleSignin() {
  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        console.error("Google sign in error:", error);
      }
    } catch (error) {
      console.error("Google sign in error:", error);
    }
  };

  return {signInWithGoogle}
}
