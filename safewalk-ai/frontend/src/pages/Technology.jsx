import { Network, Database, Cpu, Layout, Camera, Activity } from 'lucide-react';

export default function Technology() {
  return (
    <div className="pt-20 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Built for Scale & Speed</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            SafeWalk AI leverages a cutting-edge technological stack to process video streams in real-time, delivering microsecond response times when it matters most.
          </p>
        </div>

        {/* Architecture Diagram Idea */}
        <div className="bg-dark-lighter border border-white/5 rounded-2xl p-8 mb-24 relative overflow-hidden">
          <h2 className="text-2xl font-bold mb-8 text-center">System Architecture</h2>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center relative z-10">
            
            <div className="glass-panel p-6 rounded-xl w-full md:w-1/4">
              <Camera className="w-8 h-8 text-slate-400 mx-auto mb-3" />
              <div className="font-semibold text-white">City Cameras</div>
              <div className="text-xs text-slate-400 mt-1">Video Streams input via RTSP</div>
            </div>

            <div className="hidden md:block w-8 h-1 bg-gradient-to-r from-slate-600 to-primary-500 rounded-full"></div>

            <div className="glass-panel p-6 rounded-xl w-full md:w-1/4">
              <Cpu className="w-8 h-8 text-primary-400 mx-auto mb-3" />
              <div className="font-semibold text-white">AI Inference Engine</div>
              <div className="text-xs text-slate-400 mt-1">Python, OpenCV, YOLO</div>
            </div>

            <div className="hidden md:block w-8 h-1 bg-gradient-to-r from-primary-500 to-rose-500 rounded-full"></div>

            <div className="glass-panel p-6 rounded-xl w-full md:w-1/4">
              <Network className="w-8 h-8 text-rose-400 mx-auto mb-3" />
              <div className="font-semibold text-white">Alert Pipeline</div>
              <div className="text-xs text-slate-400 mt-1">Node.js, Express, WebSockets</div>
            </div>

            <div className="hidden md:block w-8 h-1 bg-gradient-to-r from-rose-500 to-slate-600 rounded-full"></div>

            <div className="glass-panel p-6 rounded-xl w-full md:w-1/4">
              <Layout className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
              <div className="font-semibold text-white">Command Center</div>
              <div className="text-xs text-slate-400 mt-1">React, Mapbox, Live Dashboard</div>
            </div>

          </div>
        </div>

        {/* Tech Stack grid */}
        <h2 className="text-3xl font-bold mb-10 text-center">Core AI Modules</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-dark-lighter p-8 rounded-xl border border-white/5 hover:border-white/10 transition-all">
             <div className="text-primary-400 mb-4"><Database className="w-8 h-8" /></div>
             <h3 className="text-xl font-bold mb-2 text-white">Computer Vision (YOLO/OpenCV)</h3>
             <p className="text-slate-400 text-sm">Real-time object detection capable of identifying weapons, unattended bags, and aggressive physical interactions at 60 FPS.</p>
          </div>
          <div className="bg-dark-lighter p-8 rounded-xl border border-white/5 hover:border-white/10 transition-all">
             <div className="text-purple-400 mb-4"><Activity className="w-8 h-8" /></div>
             <h3 className="text-xl font-bold mb-2 text-white">Crowd Behavior Analysis</h3>
             <p className="text-slate-400 text-sm">Identifying stampedes, unusual loitering, or density anomalies in public squares through spatial tracking.</p>
          </div>
          <div className="bg-dark-lighter p-8 rounded-xl border border-white/5 hover:border-white/10 transition-all">
             <div className="text-rose-400 mb-4"><Network className="w-8 h-8" /></div>
             <h3 className="text-xl font-bold mb-2 text-white">Predictive ML Modeling</h3>
             <p className="text-slate-400 text-sm">Historical crime data merged with time/location variables to predict and map risk scores in real-time.</p>
          </div>
          <div className="bg-dark-lighter p-8 rounded-xl border border-white/5 hover:border-white/10 transition-all">
             <div className="text-emerald-400 mb-4"><Layout className="w-8 h-8" /></div>
             <h3 className="text-xl font-bold mb-2 text-white">Real-time WebSocket Bus</h3>
             <p className="text-slate-400 text-sm">Socket.io connections ensure that from the moment a threat is seen, it appears on the dashboard in under 50ms.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

