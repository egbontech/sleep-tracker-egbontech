import { Calendar, Plus } from "lucide-react";
import { useState } from "react";
import { supabase } from "../../../lib/supabase";

export const sleepQualityOptions = [
  { value: "excellent", label: "😊 Excellent", color: "text-green-500" },
  { value: "good", label: "🙂 Good", color: "text-blue-500" },
  { value: "average", label: "😐 Average", color: "text-yellow-500" },
  { value: "poor", label: "😔 Poor", color: "text-orange-500" },
  { value: "terrible", label: "😫 Terrible", color: "text-red-500" },
];

interface AddSleepProps {
  userId: string | undefined;
  onCancel: () => void;
}

export default function AddSleepRecord({ onCancel, userId }: AddSleepProps) {
  const [duration, setDuration] = useState(7);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if(!userId) return;

    try {
      const formData = new FormData(e.currentTarget as HTMLFormElement);

      const sleepData = {
        date: formData.get("date") as string,
        duration: formData.get("duration") as string,
        quality: formData.get("quality") as string,
      };

      //send data to supabase
      const { error } = await supabase.from("sleep_records").insert([
        {
          user_id: userId,
          quality: sleepData.quality,
          date: sleepData.date,
          duration: sleepData.duration,
        },
      ]);

      if (error) {
        throw error;
      }
      setDuration(7);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.error("Error adding sleep record:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-slate-800 rounded-2xl p-6 border border-slate-800">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Plus size={20} className="text-fuchsia-500" />
        Add Sleep Record
      </h3>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* date input */}
        <div>
          <label
            htmlFor="date"
            className="block text-gray-300 text-sm font-medium mb-2"
          >
            <Calendar size={16} className="inline mr-2" />
          </label>
          <input
            name="date"
            type="date"
            id="date"
            required
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500 transition-colors"
          />
        </div>

        {/* sleep duration range */}
        <div>
          <label
            htmlFor="date"
            className="block text-gray-300 text-sm font-medium mb-2"
          >
            <Calendar size={16} className="inline mr-2" />
            Sleep Duration: <span>{duration}</span> hours
          </label>
          <input
            name="duration"
            type="range"
            min="1"
            max="12"
            step="0.5"
            defaultValue="7"
            onChange={(e) => setDuration(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-700 appearance-none  [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-fuchsia-500 cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>1hr</span>
            <span>12hr</span>
          </div>
        </div>

        {/* select for sleep quality */}
        <div>
          <label
            htmlFor="quality"
            className="block text-gray-300 text-sm font-medium mb-2"
          >
            Sleep Quality
          </label>
          <select
            name="quality"
            id="quality"
            defaultValue="good"
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-fuchsia-500 transition-colors"
          >
            {sleepQualityOptions.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </select>
        </div>

        {/* action buttons */}
        <div className="flex gap-3 pt-4">
          <button
            disabled={loading}
            className="flex-1 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors cursor-pointer"
          >
            {loading ? "Saving..." : "Save Record"}
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
