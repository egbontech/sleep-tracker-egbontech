import { supabase } from "../../../lib/supabase";

export default function LogoutButton() {
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("LogoutError:", error.message);
    }
  };
  return (
    <button
      onClick={signOut}
      className="bg-slate-700 hover:bg-fuchsia-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
    >
      Logout
    </button>
  );
}
