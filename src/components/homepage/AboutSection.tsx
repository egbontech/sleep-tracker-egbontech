  const features = [
    {
      icon: "🌙",
      title: "Sleep Analysis",
      description: "Advanced tracking of your sleep cycles, including REM, deep, and light sleep stages."
    },
    {
      icon: "📊",
      title: "Smart Insights",
      description: "Personalized recommendations based on your sleep patterns and lifestyle factors."
    },
    {
      icon: "🎯",
      title: "Sleep Goals",
      description: "Set achievable targets and track your progress toward better sleep health."
    },
    {
      icon: "🔒",
      title: "Privacy First",
      description: "Your sleep data is encrypted and never shared with third parties."
    }
  ];


export default function AboutSection() {
  return (
    <section id='about' className='py-20'>
        <div className='container mx-auto px-6'>
            {/* header */}
           <div className='text-center mb-16'>
             <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>About <span className='text-fuchsia-500'>RestMetrics</span> </h2>
             <p className='text-md text-gray-300 max-w-3xl mx-auto'>     We believe that quality sleep is the foundation of a healthy, productive life. 
            Our mission is to help you understand and improve your sleep through intelligent tracking and actionable insights.</p>
           </div>

           {/* stats */}
           <div className='grid grid-cols-2 md:grid-cols-4 gap-8 mb-16'>
            <div className='text-center'>
                <p className='text-3xl font-bold text-fuchsia-500 mb-2'>10k+</p>
                <p className='text-gray-300'>Active Users</p>
            </div>
            <div className='text-center'>
                <p className='text-3xl font-bold text-fuchsia-500 mb-2'>500k+</p>
                <p className='text-gray-300'>Sleep Hours Tracked</p>
            </div>
            <div className='text-center'>
                <p className='text-3xl font-bold text-fuchsia-500 mb-2'>94%</p>
                <p className='text-gray-300'>User Satisfaction</p>
            </div>
            <div className='text-center'>
                <p className='text-3xl font-bold text-fuchsia-500 mb-2'>24/7</p>
                <p className='text-gray-300'>Support</p>
            </div>
           </div>

           {/* features */}
           <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16'>
            {features.map((feature,index) => {
                return (
                    <div key={index} className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700 transition-colors">
                        <div className="text-3xl mb-4">{feature.icon}</div>                      
                        <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>  
                        <p className="text-gray-400">{feature.description}</p>
                    </div>
                )
            })}            
           </div>

           {/* mission statement */}
           <div className="bg-linear-to-r from-slate-800 to-purple-900/30 rounded-2xl p-8 md:p-12 text-center">
           <h3 className="texy-2xl md:text-3xl font-bold text-white mb-6">Our Mission</h3>
           <p className="text-gray-300 text-lg mx-auto max-w-4xl">
              To empower individuals with the knowledge and tools they need to achieve 
            restful, restorative sleep. We combine cutting-edge technology with sleep 
            science to help you wake up feeling refreshed and ready to conquer your day.
           </p>
           </div>

        </div>
    </section>
  )
}
