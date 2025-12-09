const faqs = [
  {
    question: "Do I need to wear any special devices?",
    answer:
      "No special devices required! RestMetrics works with your smartphone or tablet placed near your bed. For more advanced tracking, you can optionally connect compatible wearables like smartwatches.",
  },
  {
    question: "Is my sleep data private and secure?",
    answer:
      "Absolutely. All your sleep data is encrypted and stored securely on our servers. We never share your personal information with third parties, and you have full control over your data.",
  },
  {
    question: "Can I use RestMetrics with my smartwatch?",
    answer:
      "Yes! RestMetrics integrates with popular wearables including Apple Watch, Fitbit, Garmin, and Samsung Galaxy Watch. Simply connect your device in the app settings.",
  },
  {
    question: "Is there a free version available?",
    answer:
      "Yes, we offer a free version with basic sleep tracking and 7-day history. Our premium plans unlock advanced features like detailed sleep analysis, unlimited history, and personalized recommendations.",
  },
  {
    question: "Do you offer customer support?",
    answer:
      "Yes, we have a dedicated support team available 24/7. You can reach us through in-app chat, email, or our comprehensive help center with articles and tutorials.",
  },
  {
    question: "Can multiple people use the same account?",
    answer:
      "Each account is designed for individual use to ensure accurate personal insights. For family tracking, we offer family plans that allow separate profiles under one subscription.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Frequently Asked <span className="text-fuchsia-500">Questions</span>{" "}
          </h2>
          <p className="text-md text-gray-300 max-w-3xl mx-auto">
            {" "}
            Get answers to common questions about RestMetrics and how it can
            help you achieve better sleep.
          </p>
        </div>

        {/* FAQ grid */}
        <div className="space-y-6">
          {faqs.map((faq, index) => {
            return (
              <div
                key={index}
                className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700 transition-colors border border-slate-700"
              >
                <h3 className="text-xl font-semibold text-white mb-3 flex items-center">
                  <span className="text-fuchsia-500 mr-3 shrink-0">Q:</span>
                  {faq.question}
                </h3>
                <p className="text-gray-400 ml-8">
                  <span className="text-fuchsia-500 mr-2 font-semibold">A:</span>
                  {faq.answer}
                </p>
              </div>
            );
          })}
        </div>

        {/* still have questions */}
        <div className="text-center mt-16">
          <div className="bg-linear-to-r from-slate-800 to-purple-900/30 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-white mx-auto mb-6">
            Still have questions?
          </h3>
          <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
              Can&apos;t find the answer you&apos;re looking for? Please chat with our friendly team.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-8 py-3 rounded-full font-semibold transition-colors">
              Contact Support
            </button>
            <button className="border-2 border-gray-600 hover:border-fuchsia-500 hover:text-fuchsia-500 text-gray-300 px-8 py-3 rounded-full font-semibold transition-colors">
              Send Email
            </button>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
