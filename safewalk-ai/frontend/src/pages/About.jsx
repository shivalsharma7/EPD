import { Target, EyeOff, Zap } from 'lucide-react';

export default function About() {
  return (
    <div className="pt-20 pb-32">
      {/* Header */}
      <div className="bg-dark-lighter py-16 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About SafeWalk AI</h1>
          <p className="text-xl text-slate-400">
            Shifting the paradigm from reactive police work to predictive crisis intervention using state-of-the-art vision models.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        
        {/* Problem Statement */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <EyeOff className="text-red-500" /> The Problem
            </h2>
            <div className="space-y-4 text-slate-300 text-lg">
              <p>
                Current city surveillance networks are fundamentally broken. They are <strong>passive recording devices</strong>, useful only for post-incident investigations.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Crimes are detected too late, well after victims are harmed.</li>
                <li>Authorities react to 911 calls, missing critical intervention windows.</li>
                <li>Human monitors suffer from severe fatigue when watching dozens of feeds.</li>
              </ul>
            </div>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden border border-white/10">
            <img 
              src="https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Passive Surveillance" 
              className="w-full h-full object-cover grayscale opacity-60"
            />
          </div>
        </div>

        {/* The Solution */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative h-[400px] rounded-2xl overflow-hidden border border-white/10 group">
            <div className="absolute inset-0 bg-primary-500/20 mix-blend-overlay z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Active AI Surveillance" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
              <Zap className="text-primary-400" /> The SafeWalk Solution
            </h2>
            <div className="space-y-4 text-slate-300 text-lg">
              <p>
                We inject intelligence directly into the camera stream. SafeWalk AI doesn't just watch; it understands context, movement, and human behavior.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Proactive AI + CV:</strong> Instantly detect weapons, aggressive postures, or unusual loitering.</li>
                <li><strong>Real-time alerts:</strong> Command centers are notified the exact second a risk threshold is breached.</li>
                <li><strong>Drone dispatch:</strong> Autonomous drones launch immediately as first-first responders to secure visual confirmation.</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
