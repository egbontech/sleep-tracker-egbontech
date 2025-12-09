import { Calendar, MoreVertical, Trash2 } from "lucide-react";
import { sleepQualityOptions } from "./AddSleepRecord";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  deleteSleepRecord,
  fetchSleepRecords,
} from "../../../services/sleepRecords";
import { supabase } from "../../../lib/supabase";
import SleepChart from "./SleepChart";
import DashboardLoadingScreen from "./DashboardLoadingScreen";

interface SleepHistoryProps {
  userId: string | undefined;
}

export interface SleepRecord {
  id: string;
  user_id: string;
  date: string;
  duration: number;
  quality: "excellent" | "good" | "avarage" | "poor" | "terrible";
}

export default function SleepHistory({ userId }: SleepHistoryProps) {
  const [sleepRecords, setSleepRecords] = useState<SleepRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [showMenuId, setShowMenuId] = useState<null | string>(null);
  const [deletingId, setDeletingId] = useState<null | string>(null);
  const stableUserId = useMemo(() => userId || "", [userId]);

  const fetchSleepData = useCallback(async () => {
    try {
      if (!stableUserId) return;
    setLoading(true);
    const records = await fetchSleepRecords(stableUserId);
    setSleepRecords(records);      
    } catch (error) {
      console.log("Error fetching sleep records:",error)      
    } finally {
      setLoading(false);
    }
    
  }, [stableUserId]);

  useEffect(() => {
    fetchSleepData();

    const subscribtion = supabase
      .channel("sleep-record-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          table: "sleep_records",
          filter: `user_id=eq.${stableUserId}`,
          schema: "public",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setSleepRecords((prev) => [payload.new as SleepRecord, ...prev]);
          }
        }
      )
      .subscribe();

    return () => {
      subscribtion.unsubscribe();
    };
  }, [fetchSleepData, stableUserId]);

  //calculate stats
  const averageSleep =
    sleepRecords.length > 0
      ? sleepRecords.reduce((acc, curr) => acc + curr.duration, 0) /
        sleepRecords.length
      : 0;

  const bestSleep =
    sleepRecords.length > 0
      ? Math.max(...sleepRecords.map((record) => record.duration))
      : 0;

  const totalRecords = sleepRecords.length;

  const handleDeleteRecord = async (recordId: string) => {
    setDeletingId(recordId);
    await deleteSleepRecord(recordId);
    setSleepRecords((prev) => prev.filter((record) => record.id !== recordId));
    setShowMenuId(null);
    setDeletingId(null);
  };

  if (loading) return <DashboardLoadingScreen/>
  return (
    <>
      {/* sleep statistics               */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 text-center">
          <p className="text-3xl font-bold text-green-500">
            {averageSleep.toFixed(1)}h
          </p>
          <p className="text-gray-400">Average Sleep</p>
        </div>
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 text-center">
          <p className="text-3xl font-bold text-fuchsia-500">
            {bestSleep.toFixed(1)}h
          </p>
          <p className="text-gray-400">Best Sleep</p>
        </div>
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 text-center">
          <p className="text-3xl font-bold text-blue-500">{totalRecords}</p>
          <p className="text-gray-400">Records</p>
        </div>
      </div>
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Calendar size={20} className="text-fuchsia-500" />
          Sleep History
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <td className="text-left py-3 text-gray-400 font-medium">
                  Date
                </td>
                <td className="text-left py-3 text-gray-400 font-medium">
                  Duration
                </td>
                <td className="text-left py-3 text-gray-400 font-medium">
                  Quality
                </td>
                <td>Actions</td>
              </tr>
            </thead>
            <tbody>
              {sleepRecords.map((record, index) => {
                const qualityOption = sleepQualityOptions.find(
                  (option) => option.value === record.quality
                );
                return (
                  <tr
                    key={index}
                    className="border-b border-slate-700/50 last:border-0"
                  >
                    <td className="py-3">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="py-3">{record.duration}h</td>
                    <td className={`py-3 ${qualityOption?.color}`}>
                      {qualityOption?.label}
                    </td>
                    <td className="py-3">
                      <div className="relative">
                        <button
                          disabled={deletingId === record.id}
                          onClick={() =>
                            setShowMenuId(
                              showMenuId === record.id ? null : record.id
                            )
                          }
                          className="p-1 rounded hover:bg-slate-600 transition-colors cursor-pointer"
                        >
                          <MoreVertical size={16} className="text-gray-400" />
                        </button>
                        {showMenuId === record.id && (
                          <div className="absolute right-0 bottom-8 bg-slate-700 border border-slate-600 rounded-lg shadow-lg z-10 min-w-32">
                            <button
                              onClick={() => handleDeleteRecord(record.id)}
                              disabled={deletingId === record.id}
                              className="w-full px-4 py-2 text-red-400 hover:bg-slate-600 flex items-center gap-2 disabled:opacity-50 transition-colors cursor-pointer"
                            >
                              {deletingId === record.id ? (
                                <>
                                  <div className="w-3 h-3 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                                  Deleting...
                                </>
                              ) : (
                                <>
                                  <Trash2 size={14} />
                                  Delete
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <SleepChart sleepRecords={sleepRecords}/>
    </>
  );
}
