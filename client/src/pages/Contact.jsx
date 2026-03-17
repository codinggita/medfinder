import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Clock, Send, 
  MessageCircle, HelpCircle, ChevronDown, 
  CheckCircle, AlertCircle, MessageSquare,
  Globe, Shield, Zap
} from 'lucide-react';

const Contact = () => {
  const [activeFAQ, setActiveFAQ] = useState(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    mobile: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const faqs = [
    {
      question: "How do I search for a specific medicine?",
      answer: "Use our smart search bar on the homepage or the search page. Enter the medicine name, and MedFinder will instantly list nearby pharmacies that have it in stock."
    },
    {
      question: "How do I place an order?",
      answer: "Once you find your medicine, add it to your cart, select your quantity, and proceed to checkout. You can choose cash on delivery for a seamless experience."
    },
    {
      question: "What is the average delivery time?",
      answer: "MedFinder prioritizes speed. Most orders are delivered within 30 to 60 minutes from your local neighborhood pharmacies."
    },
    {
      question: "Is MedFinder available in my city?",
      answer: "Currently, we are extensively covering Ahmedabad, Gujarat, and rapidly expanding. Enter your location to see partner pharmacies near you."
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: '', email: '', mobile: '', subject: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors">
      {/* ─── Hero Section ─────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-gradient-to-b from-emerald-50/50 to-white dark:from-emerald-950/20 dark:to-gray-950">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-100/50 dark:bg-emerald-900/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-50/50 dark:bg-teal-900/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Contact Us
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 tracking-tight">
              Get in <span className="text-emerald-600 dark:text-emerald-400 underline decoration-emerald-200 decoration-8 underline-offset-8">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
              We’re here to help you find medicines easily. Have a question? Reach out to our dedicated support team.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          
          {/* ─── Contact Form ──────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-[40px] shadow-2xl shadow-emerald-900/5 border border-gray-100 dark:border-gray-800"
          >
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Send us a message</h2>
              <p className="text-gray-500 dark:text-gray-400">We typically respond within 2-4 hours.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div className="relative group">
                  <input
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    required
                    placeholder=" "
                    className="peer w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-2 border-transparent focus:border-emerald-500 rounded-2xl outline-none transition-all placeholder-transparent dark:text-white"
                  />
                  <label className="absolute left-6 top-4 text-gray-400 pointer-events-none transition-all peer-focus:-top-3 peer-focus:left-4 peer-focus:text-xs peer-focus:font-bold peer-focus:text-emerald-600 peer-focus:bg-white dark:peer-focus:bg-gray-900 peer-focus:px-2 peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:text-emerald-600 peer-[:not(:placeholder-shown)]:bg-white dark:peer-[:not(:placeholder-shown)]:bg-gray-900 peer-[:not(:placeholder-shown)]:px-2">
                    Full Name
                  </label>
                </div>

                {/* Email */}
                <div className="relative group">
                  <input
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleInputChange}
                    required
                    placeholder=" "
                    className="peer w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-2 border-transparent focus:border-emerald-500 rounded-2xl outline-none transition-all placeholder-transparent dark:text-white"
                  />
                  <label className="absolute left-6 top-4 text-gray-400 pointer-events-none transition-all peer-focus:-top-3 peer-focus:left-4 peer-focus:text-xs peer-focus:font-bold peer-focus:text-emerald-600 peer-focus:bg-white dark:peer-focus:bg-gray-900 peer-focus:px-2 peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:text-emerald-600 peer-[:not(:placeholder-shown)]:bg-white dark:peer-[:not(:placeholder-shown)]:bg-gray-900 peer-[:not(:placeholder-shown)]:px-2">
                    Email Address
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mobile */}
                <div className="relative group">
                  <input
                    type="tel"
                    name="mobile"
                    value={formState.mobile}
                    onChange={handleInputChange}
                    required
                    placeholder=" "
                    className="peer w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-2 border-transparent focus:border-emerald-500 rounded-2xl outline-none transition-all placeholder-transparent dark:text-white"
                  />
                  <label className="absolute left-6 top-4 text-gray-400 pointer-events-none transition-all peer-focus:-top-3 peer-focus:left-4 peer-focus:text-xs peer-focus:font-bold peer-focus:text-emerald-600 peer-focus:bg-white dark:peer-focus:bg-gray-900 peer-focus:px-2 peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:text-emerald-600 peer-[:not(:placeholder-shown)]:bg-white dark:peer-[:not(:placeholder-shown)]:bg-gray-900 peer-[:not(:placeholder-shown)]:px-2">
                    Mobile Number
                  </label>
                </div>

                {/* Subject */}
                <div className="relative group">
                  <select
                    name="subject"
                    value={formState.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-2 border-transparent focus:border-emerald-500 rounded-2xl outline-none transition-all dark:text-white appearance-none"
                  >
                    <option value="" disabled>Select Subject</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Order Issue">Order Issue</option>
                    <option value="Pharmacy Partnership">Pharmacy Partnership</option>
                    <option value="Feedback">Feedback</option>
                  </select>
                  <div className="absolute right-6 top-5 pointer-events-none text-gray-400">
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="relative group">
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  required
                  placeholder=" "
                  rows="4"
                  className="peer w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border-2 border-transparent focus:border-emerald-500 rounded-2xl outline-none transition-all placeholder-transparent dark:text-white resize-none"
                />
                <label className="absolute left-6 top-4 text-gray-400 pointer-events-none transition-all peer-focus:-top-3 peer-focus:left-4 peer-focus:text-xs peer-focus:font-bold peer-focus:text-emerald-600 peer-focus:bg-white dark:peer-focus:bg-gray-900 peer-focus:px-2 peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-bold peer-[:not(:placeholder-shown)]:text-emerald-600 peer-[:not(:placeholder-shown)]:bg-white dark:peer-[:not(:placeholder-shown)]:bg-gray-900 peer-[:not(:placeholder-shown)]:px-2">
                  How can we help?
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-3 disabled:opacity-70 disabled:grayscale"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>Send Message <Send className="w-5 h-5" /></>
                )}
              </button>

              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-2xl border border-emerald-100 dark:border-emerald-800 font-bold"
                  >
                    <CheckCircle className="w-6 h-6" />
                    Message sent successfully!
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>

          {/* ─── Contact Info Cards ────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10 lg:pl-10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: <MapPin />, title: 'Visit Us', value: 'Ahmedabad, Gujarat', sub: 'Paldi, 380007', color: 'emerald' },
                { icon: <Phone />, title: 'Call Support', value: '+91 98765 43210', sub: '24/7 Availability', color: 'blue' },
                { icon: <Mail />, title: 'Email Support', value: 'help@medfinder.in', sub: 'Quick Response', color: 'teal' },
                { icon: <Clock />, title: 'Working Hours', value: 'Mon - Sun', sub: '8:00 AM - 11:00 PM', color: 'orange' }
              ].map((card, i) => (
                <div key={i} className="bg-white dark:bg-gray-900 p-8 rounded-[32px] border-2 border-gray-100 dark:border-gray-800 hover:border-emerald-100 dark:hover:border-emerald-900/40 transition-all group">
                  <div className="w-12 h-12 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    {React.cloneElement(card.icon, { className: 'w-6 h-6' })}
                  </div>
                  <h3 className="text-gray-400 text-xs font-black uppercase tracking-widest mb-2">{card.title}</h3>
                  <p className="text-gray-900 dark:text-white font-bold text-lg mb-1">{card.value}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{card.sub}</p>
                </div>
              ))}
            </div>

            {/* Emergency CTA */}
            <div className="p-8 bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[40px] text-white shadow-2xl shadow-emerald-600/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/3 -translate-y-1/3 blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-black mb-2">Need Urgent Help?</h3>
                <p className="text-emerald-50 font-medium mb-8 opacity-90 leading-relaxed">
                  Our emergency team is ready. We can help you locate life-saving medications within minutes.
                </p>
                <div className="flex gap-4">
                  <a href="tel:+919876543210" className="px-8 py-3 bg-white text-emerald-700 rounded-xl font-black text-sm uppercase tracking-wider hover:bg-emerald-50 transition-colors">
                    Call Now
                  </a>
                  <button className="px-8 py-3 bg-emerald-500/30 text-white rounded-xl font-black text-sm uppercase tracking-wider hover:bg-white/20 transition-colors">
                    Live Chat
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── FAQ Section ─────────────────────────────────────────────────── */}
      <section className="py-32 bg-gray-50 dark:bg-gray-900/30">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold tracking-widest uppercase text-xs">Knowledge Base</span>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mt-2">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i}
                className={`bg-white dark:bg-gray-900 rounded-3xl border-2 transition-all cursor-pointer ${activeFAQ === i ? 'border-emerald-500 dark:border-emerald-500 shadow-xl' : 'border-gray-100 dark:border-gray-800'}`}
                onClick={() => setActiveFAQ(activeFAQ === i ? null : i)}
              >
                <div className="p-8 flex items-center justify-between">
                  <h3 className={`font-bold text-lg ${activeFAQ === i ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white'}`}>
                    {faq.question}
                  </h3>
                  <div className={`transition-transform duration-300 ${activeFAQ === i ? 'rotate-180 text-emerald-500' : 'text-gray-400'}`}>
                    <ChevronDown className="w-6 h-6" />
                  </div>
                </div>
                <AnimatePresence>
                  {activeFAQ === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-8 text-gray-500 dark:text-gray-400 flex gap-4">
                        <div className="w-1 h-12 bg-emerald-500/20 rounded-full flex-shrink-0" />
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Map Section ──────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto h-[500px] rounded-[60px] overflow-hidden border-8 border-white dark:border-gray-900 shadow-2xl relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117506.39867087858!2d72.5029965842857!3d23.020181514782977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e848aba5bd449%3A0x4fccd11674fd4850!2sAhmedabad%2C%20Gujarat!5e0!3m2!1sen!2sin!4v1715620000000!5m2!1sen!2sin"
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="filter grayscale transition-all duration-700 hover:grayscale-0 dark:brightness-90 dark:contrast-125 dark:grayscale-[0.8] dark:invert-[0.9] dark:hue-rotate-[180deg]"
          ></iframe>
          <div className="absolute top-10 left-10 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl max-w-xs">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-500" />
              Main Distribution Hub
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">Serving 300+ pharmacies across the Ahmedabad metropolitan area.</p>
          </div>
        </div>
      </section>

      {/* ─── Floating Bonus Features ─────────────────────────────────────── */}
      <div className="fixed bottom-10 right-10 z-[100] flex flex-col gap-4">
        {/* Chat Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/40 group relative"
        >
          <MessageSquare className="w-8 h-8" />
          <span className="absolute right-full mr-4 px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Chat with us
          </span>
        </motion.button>

        {/* WhatsApp Button */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl shadow-green-500/40 group relative"
        >
          <svg viewBox="0 0 24 24" className="w-10 h-10 fill-current">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.67-1.612-.916-2.207-.242-.579-.487-.5-.67-.504-.173-.004-.371-.005-.57-.005-.199 0-.523.074-.797.371-.273.301-1.042 1.017-1.042 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-4.821 4.754a8.117 8.117 0 01-3.837-.585c-.456-.234-.991-.354-2.142.11l-1.396.56c-.45.18-.888-.231-.767-.714l.435-1.739c.07-.282.02-.578-.142-.82a8.093 8.093 0 01-1.127-4.102c0-4.47 3.633-8.103 8.103-8.103s8.103 3.633 8.103 8.103-3.633 8.103-8.103 8.103m.002-19.231C7.304.05 2.376 4.978 2.376 11.05s4.928 11.001 11.001 11.001c1.944 0 3.763-.505 5.343-1.39l4.57 1.2c.49.128.986-.188 1.06-.688l-1.2-4.57a10.941 10.941 0 001.231-5.153c0-6.072-4.928-11.001-11.001-11.001z" />
          </svg>
          <span className="absolute right-full mr-4 px-4 py-2 bg-gray-900 text-white text-xs font-bold rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            WhatsApp us
          </span>
        </motion.button>
      </div>

    </div>
  );
};

export default Contact;
