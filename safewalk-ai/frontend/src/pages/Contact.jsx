import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-20 pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact the SafeWalk Team</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Interested in bringing predictive AI safety to your city or enterprise? Let's talk about integration.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
        
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-dark-lighter p-8 rounded-2xl border border-white/5">
             <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
             
             <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-500/20 p-3 rounded-xl"><Mail className="text-primary-400" /></div>
                  <div>
                    <h4 className="font-semibold text-white">Email Us</h4>
                    <p className="text-slate-400 text-sm mt-1">hello@safewalkai.com</p>
                    <p className="text-slate-400 text-sm">support@safewalkai.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary-500/20 p-3 rounded-xl"><Phone className="text-primary-400" /></div>
                  <div>
                    <h4 className="font-semibold text-white">Call Us</h4>
                    <p className="text-slate-400 text-sm mt-1">+1 (800) 123-SAFE</p>
                    <p className="text-slate-400 text-sm">Mon-Fri from 8am to 5pm.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary-500/20 p-3 rounded-xl"><MapPin className="text-primary-400" /></div>
                  <div>
                    <h4 className="font-semibold text-white">Headquarters</h4>
                    <p className="text-slate-400 text-sm mt-1">100 Innovation Drive</p>
                    <p className="text-slate-400 text-sm">Tech City, TC 90210</p>
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-dark-lighter p-8 rounded-2xl border border-white/5 relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-[80px]"></div>
          
          <form className="relative z-10 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">First Name</label>
                <input type="text" className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="John" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">Last Name</label>
                <input type="text" className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="Doe" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Work Email</label>
              <input type="email" className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors" placeholder="john@citygov.org" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Interested In</label>
              <select className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors appearance-none">
                <option>Smart City Integration (B2G)</option>
                <option>Enterprise Security (B2B)</option>
                <option>Citizen App Inquiry</option>
                <option>Other</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Message</label>
              <textarea rows="4" className="w-full bg-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary-500 transition-colors resize-none" placeholder="Tell us about your needs..."></textarea>
            </div>
            
            <button type="button" onClick={(e) => { e.preventDefault(); alert("Message sent successfully!"); }} className="w-full btn-primary flex items-center justify-center gap-2">
              Send Message <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
        
      </div>
    </div>
  );
}
