import { ArrowRight, Activity, Camera, ShieldAlert, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/80 to-dark"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            Live Monitoring Active
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 animate-slide-up">
            Predict Crime Before It Happens
          </h1>
          
          <p className="text-xl text-slate-400 max-w-3xl mb-10 animate-slide-up" style={{animationDelay: '0.1s'}}>
            SafeWalk AI is a next-generation smart city security platform that uses computer vision and real-time data to proactively identify and neutralize threats.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <Link to="/demo" className="btn-primary flex items-center justify-center gap-2">
              Watch Live Demo <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/about" className="btn-outline flex items-center justify-center">
              Learn How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-dark-lighter relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How SafeWalk Proactively Secures Cities</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">A seamless 3-step pipeline from visual detection to automated responsive action.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-primary-500/0 via-primary-500/50 to-primary-500/0 -translate-y-1/2"></div>
            
            <div className="glass-panel p-8 rounded-2xl relative z-10 flex flex-col items-center text-center">
              <div className="bg-dark p-4 rounded-full border border-primary-500/30 mb-6 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                <Camera className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. AI Vision Capture</h3>
              <p className="text-slate-400 text-sm">Smart municipal cameras feed massive video data continuously to the edge-processing nodes.</p>
            </div>

            <div className="glass-panel p-8 rounded-2xl relative z-10 flex flex-col items-center text-center">
              <div className="bg-dark p-4 rounded-full border border-primary-500/30 mb-6 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                <Cpu className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Predictive Engine</h3>
              <p className="text-slate-400 text-sm">Our ML models instantly analyze crowd anomalies and suspicious behavior patterns.</p>
            </div>

            <div className="glass-panel p-8 rounded-2xl relative z-10 flex flex-col items-center text-center">
              <div className="bg-dark p-4 rounded-full border border-primary-500/30 mb-6 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                <ShieldAlert className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Automated Response</h3>
              <p className="text-slate-400 text-sm">Immediate dispatch of drone units and alerts sent natively directly to law enforcement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 border-r border-b md:border-b-0 border-white/10">
              <div className="text-4xl md:text-5xl font-bold text-primary-400 mb-2">99.9%</div>
              <div className="text-slate-400 font-medium">Uptime Monitoring</div>
            </div>
            <div className="text-center p-6 md:border-r border-white/10">
              <div className="text-4xl md:text-5xl font-bold text-primary-400 mb-2">~14s</div>
              <div className="text-slate-400 font-medium">Avg Response Time</div>
            </div>
            <div className="text-center p-6 border-r border-white/10">
              <div className="text-4xl md:text-5xl font-bold text-primary-400 mb-2">2M+</div>
              <div className="text-slate-400 font-medium">Hours Analyzed</div>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl md:text-5xl font-bold text-primary-400 mb-2">55%</div>
              <div className="text-slate-400 font-medium">Crime Reduction</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Target Audience / Business Model Section */}
      <section className="py-24 bg-dark-lighter border-y border-white/5">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-12">Who is SafeWalk For?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-panel p-8 rounded-xl text-left border-t-2 border-t-primary-500">
                <h3 className="text-xl font-bold mb-2">Smart Cities (B2G)</h3>
                <p className="text-slate-400 mb-4 text-sm">Government infrastructure subscriptions for automated city-wide public safety networks.</p>
              </div>
              <div className="glass-panel p-8 rounded-xl text-left border-t-2 border-t-purple-500">
                <h3 className="text-xl font-bold mb-2">Private Security (B2B)</h3>
                <p className="text-slate-400 mb-4 text-sm">API integration into existing enterprise camera systems to empower security firms.</p>
              </div>
              <div className="glass-panel p-8 rounded-xl text-left border-t-2 border-t-emerald-500">
                <h3 className="text-xl font-bold mb-2">Citizen App (B2C)</h3>
                <p className="text-slate-400 mb-4 text-sm">Freemium mobile application offering panic buttons and safe-route navigation.</p>
              </div>
            </div>
         </div>
      </section>
    </div>
  );
}
