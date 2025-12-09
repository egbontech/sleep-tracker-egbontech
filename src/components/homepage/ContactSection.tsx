import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";

const contactMethods = [
  {
    icon: <Mail size={24} />,
    title: "Email Us",
    details: "support@restmetrics.com",
    description: "Send us an email anytime",
  },
  {
    icon: <Phone size={24} />,
    title: "Call Us",
    details: "+1 (555) 123-4567",
    description: "Mon-Fri from 9am to 6pm",
  },
  {
    icon: <MapPin size={24} />,
    title: "Visit Us",
    details: "123 Sleep Street, Dream City",
    description: "Feel free to visit our office",
  },
  {
    icon: <Clock size={24} />,
    title: "Support Hours",
    details: "24/7 Available",
    description: "We're here to help anytime",
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-6">
        {/* header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Get In <span className="text-fuchsia-500">Touch</span>{" "}
          </h2>
          <p className="text-md text-gray-300 max-w-3xl mx-auto">
            {" "}
            Have questions about RestMetrics? We&apos;re here to help you get the
            best sleep experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* contact information */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">
              Contact Information
            </h3>

            {/* contact methods */}
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {contactMethods.map((method, index) => {
                return (
                  <div
                    key={index}
                    className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700 transition-colors"
                  >
                    <div className="text-fuchsia-500 mb-4">{method.icon}</div>
                    <h4 className="text-white font-semibold mb-2">
                      {method.title}
                    </h4>
                    <p className="font-medium text-fuchsia-400 mb-1">
                      {method.details}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {method.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="bg-linear-to-r from-slate-800 to-purple-900/30 rounded-3xl p-6">
            <h4 className="text-white font-semibold mb-3">Why Choose RestMetrics</h4>
            <ul className="text-gray-300 space-y-2">
                <li>24/7 Customer Support</li>                
                <li>Sleep Experts Available</li>                
                <li> Quick Response Time</li>                
                <li>Personalized Assistance</li>                
            </ul>
            </div>
          </div>

          {/* contact form */}
          <div className="bg-slate-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Send us a Message</h3>
            <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="name"className="text-gray-300 block mb-2">Full Name</label>
                        <input type="text" id="name" required placeholder="Your Name" className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-fuchsia-500 transition-colors"/>
                    </div>
                    <div>
                        <label htmlFor="email"className="text-gray-300 block mb-2">Full Name</label>
                        <input type="email" id="email" required placeholder="Your Email" className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-fuchsia-500 transition-colors"/>
                    </div>
                </div> 

                 <div>
                        <label htmlFor="subject"className="text-gray-300 block mb-2">Subject</label>
                        <input type="text" id="subject" required placeholder="What's this about?" className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-fuchsia-500 transition-colors"/>
                    </div>
                 <div>
                        <label htmlFor="message"className="text-gray-300 block mb-2">Message</label>
                        <textarea rows={5}  id="message" required placeholder="Tell us how we can help" className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-fuchsia-500 transition-colors resize-none"/>
                    </div>

                    <button className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-semibold py-4 rounded-lg transition-colors flex  items-center justify-center gap-2 cursor-pointer">
                        <Send size={20}/>
                        Send Message
                    </button>


            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
