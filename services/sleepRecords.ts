import { SleepRecord } from "@/components/dashboard/SleepHistory";
import { supabase } from "../lib/supabase";

export async function fetchSleepRecords(
  userId: string
): Promise<SleepRecord[]> {
  try {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const { error, data } = await supabase
      .from("sleep_records")
      .select("*")
      .eq("user_id", userId)
      .order("date", { ascending: false })
      .limit(7);

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error("Error fetching sleep records:", error);
    return [];
  }
}

export async function deleteSleepRecord(recordId: string): Promise<boolean> {
  try {
    if (!recordId) throw new Error("Record Id is required");

    const { error } = await supabase
      .from("sleep_records")
      .delete()
      .eq("id", recordId);

      if(error){
        throw error;
      }

      return true;
  } catch (error) {
    console.error("Error deleting sleep record:", error);
    throw error;
  }
}
