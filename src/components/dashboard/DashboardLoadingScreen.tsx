import { Cloud, Moon, Zap } from "lucide-react";


export default function DashboardLoadingScreen() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
        <div className="relative mb-8">
            <div className="w-24 h-24 bg-linear-to-br from-fuchsia-600 to bg-purple-600 rounded-2xl flex items-center justify-center animate-pulse">
                <Moon size={40}className="text-white"/>
            </div>
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-blue-500 rounded-full animate-bounce">
                <Zap size={16} className="text-white m-2"/>
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-cyan-500 rounded-full animate-bounce delay-75">
                <Cloud size={16} className="text-white m-2"/>
            </div>
        </div> 

        <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Loading your sleep data</h2>
            <p className="text-gray-400">Preparing your personalized dashboard</p>
        </div>       

        <div className="w-64 h-2 bg-slate-700 rounded-full overflow-hidden mb-6">
            <div className="h-full bg-linear-to-r from-fuchsia-500 to-purple-500 rounded-full animate-progress"></div>
        </div>

        <style jsx>
            {`
              @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
            `}            
        </style>
    </div>
  )
}
