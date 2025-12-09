import { BarChart3 } from "lucide-react";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { SleepRecord } from "./SleepHistory";

interface SleepChartProps {
  sleepRecords: SleepRecord[];
}

//register chartjs components
ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const getBarColor = (duration: number) => {
  if (duration < 3) {
    // Red for insufficient sleep (< 3 hours)
    return {
      background: "rgba(239, 68, 68, 0.8)", // Red-500
      border: "rgb(220, 38, 38)", // Red-600
    };
  } else if (duration >= 7) {
    // Green for optimal sleep (≥ 7 hours)
    return {
      background: "rgba(34, 197, 94, 0.8)", // Green-500
      border: "rgb(22, 163, 74)", // Green-600
    };
  } else {
    // Normal color for moderate sleep (3-7 hours)
    return {
      background: "rgba(216, 70, 239, 0.8)", // Fuchsia-500
      border: "rgb(168, 85, 247)", // Purple-500
    };
  }
};

const getQualityEmoji = (quality: string) => {
  const emojis: Record<string, string> = {
    excellent: "😊",
    good: "🙂",
    average: "😐",
    poor: "😔",
    terrible: "😫",
  };
  return emojis[quality] || "";
};

export default function SleepChart({ sleepRecords }: SleepChartProps) {
  //prepare chart data
  const recentRecords = [...sleepRecords]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(-7);

   const labels = recentRecords.map(record => 
    new Date(record.date).toLocaleDateString('en-US', { 
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  );

    // ============================================================
 // CREATE DATASET WITH CONDITIONAL COLORS
  // ============================================================
  const data = {
    labels,
    datasets: [
      {
        label: 'Sleep Duration (hours)',
        data: recentRecords.map(record => record.duration),
        // Use individual colors for each bar based on duration
        backgroundColor: recentRecords.map(record => 
          getBarColor(record.duration).background
        ),
        borderColor: recentRecords.map(record => 
          getBarColor(record.duration).border
        ),
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      }
    ]
  };

   // ============================================================
  // SUBSECTION 4.3: CONFIGURE CHART OPTIONS
  // ============================================================
  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: true, // Show legend to explain colors
        labels: {
          color: '#94a3b8',
          padding: 20,
          usePointStyle: true,
          pointStyle: 'rect',
       
        }
      },
      
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#cbd5e1',
        bodyColor: '#f1f5f9',
        borderColor: '#475569',
        borderWidth: 1,
        
        callbacks: {
          label: (context) => {
            const record = recentRecords[context.dataIndex];
            const emoji = getQualityEmoji(record.quality);
            
            
            return [
              `${emoji} ${record.quality.charAt(0).toUpperCase() + record.quality.slice(1)}`,
              `Duration: ${record.duration}h`,
              `Recommendation: ${getRecommendation(record.duration)}`
            ];
          },
          
         
        
        }
      }
    },

    scales: {
      x: {
        grid: {
          color: '#334155',
         
        },
        ticks: {
          color: '#94a3b8',
        }
      },
      
      y: {
        beginAtZero: true,
        max: 12,
        grid: {
          color: '#334155',
        },
        ticks: {
          color: '#94a3b8',
          callback: (value) => `${value}h`,
          stepSize: 2
        },
        // Add reference lines for sleep zones
        afterDataLimits: (scale) => {
          scale.min = 0;
          scale.max = 12;
        }
      }
    }
  };

   const getRecommendation = (duration: number): string => {
    if (duration < 3) return 'Aim for at least 3 hours';
    if (duration >= 3 && duration < 7) return 'Try to reach 7+ hours';
    return 'Excellent! Keep it up';
  };

    if (sleepRecords.length === 0) {
    return (
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BarChart3 size={20} className="text-fuchsia-500" />
          Sleep Duration Trend
        </h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          Add sleep records to see your trends
        </div>
      </div>
    );
  }
   return (
    <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <BarChart3 size={20} className="text-fuchsia-500" />
        Sleep Duration Trend
      </h3>
      
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>

      {/* Color Legend (Simplified) */}
      <div className="flex flex-wrap justify-center gap-4 mt-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded"></div>
          <span className="text-gray-400">Optimal (7+ hours)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-fuchsia-500 rounded"></div>
          <span className="text-gray-400">Moderate (3-7 hours)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded"></div>
          <span className="text-gray-400">Low (&lt; 3 hours)</span>
        </div>
      </div>
    </div>
  );
}
