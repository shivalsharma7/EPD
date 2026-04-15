import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { AlertTriangle, MapPin, Navigation, Activity } from 'lucide-react';

const MOCK_VIDEO_URL = "http://localhost:8000/stream";

export default function LiveDemo() {
  const [alerts, setAlerts] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Connect to Node backend socket.io
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('new_alert', (alertData) => {
      setAlerts(prev => [alertData, ...prev].slice(0, 5));
    });
    
    newSocket.on('drone_dispatched', (data) => {
      // Update UI state for dispatched drone
      setAlerts(prev => prev.map(a => 
         a._id === data.alertId ? { ...a, status: 'resolved' } : a
      ));
    });

    return () => newSocket.close();
  }, []);

  const handleDispatchDrone = async (alertId) => {
    try {
      await fetch(`http://localhost:5000/api/alerts/${alertId}/dispatch`, {
        method: 'POST'
      });
      // The socket event will handle UI updates
    } catch (err) {
      console.error(err);
      alert('Simulation: Dispatch failed locally since backend might not be running.');
      // Local fallback for demo
      setAlerts(prev => prev.map(a => 
         a._id === alertId ? { ...a, status: 'resolved' } : a
      ));
    }
  };

  const handleNotifyPolice = (alertId) => {
    alert("Simulation: Local Authorities Notified");
  };

  return (
    <div className="pt-8 pb-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex justify-between items-end">
         <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              Live AI Simulation
            </h1>
            <p className="text-slate-400">Monitoring Camera Feed #CAM-84A (Downtown Square)</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Player (Mock) */}
        <div className="lg:col-span-2">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black aspect-video flex items-center justify-center">
             {/* Use an img tag for MJPEG streams instead of video tag */}
             <img 
               src={MOCK_VIDEO_URL} 
               alt="Live AI Feed"
               className="w-full h-full object-cover opacity-90"
             />
             {/* Mock AI Bounding Boxes overlay */}
             <div className="absolute top-[20%] left-[30%] w-32 h-48 border-2 border-primary-500 rounded relative group">
                <span className="absolute -top-6 left-0 bg-primary-500 text-xs px-2 py-0.5 rounded text-white font-mono">Person 98%</span>
             </div>
             <div className="absolute top-[30%] left-[60%] w-24 h-40 border-2 border-emerald-500 rounded">
                <span className="absolute -top-6 left-0 bg-emerald-500 text-xs px-2 py-0.5 rounded text-white font-mono">Person 92%</span>
             </div>
             
             {/* Status overlay */}
             <div className="absolute bottom-4 left-4 bg-dark/80 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10 text-xs font-mono text-white flex items-center gap-2">
               <Activity className="w-4 h-4 text-emerald-400" />
               AI Analysis Active (60fps)
             </div>
          </div>
        </div>

        {/* Real-time Alerts Panel */}
        <div className="bg-dark-lighter border border-white/5 rounded-2xl flex flex-col h-[500px] lg:h-auto">
          <div className="p-4 border-b border-white/5 flex justify-between items-center">
            <h2 className="font-semibold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" /> Recent Alerts
            </h2>
            <span className="bg-white/10 text-xs py-1 px-2 rounded-full">Real-time</span>
          </div>
          
          <div className="p-4 flex-grow overflow-y-auto space-y-4">
            {alerts.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-500 text-sm italic">
                Waiting for AI detections...
              </div>
            ) : (
              alerts.map((alert, i) => (
                <div key={alert._id || i} className="bg-white/5 border border-white/10 p-4 rounded-xl relative overflow-hidden">
                  {alert.status === 'active' && (
                    <div className="absolute top-0 left-0 w-1 h-full bg-rose-500"></div>
                  )}
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-bold capitalize text-rose-400">
                      {alert.type.replace('_', ' ')}
                    </span>
                    <span className="text-xs bg-dark px-2 py-0.5 rounded text-slate-300">
                      Risk: {alert.riskScore}%
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-1 mb-4">
                    <MapPin className="w-3 h-3" /> CAM-84A • Just now
                  </div>
                  
                  {alert.status === 'active' ? (
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleDispatchDrone(alert._id)}
                        className="flex-1 bg-white/10 hover:bg-white/20 text-white text-xs py-2 rounded transition-colors flex items-center justify-center gap-1"
                      >
                        <Navigation className="w-3 h-3" /> Drone Launch
                      </button>
                      <button 
                         onClick={() => handleNotifyPolice(alert._id)}
                        className="flex-1 bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 text-xs py-2 rounded transition-colors"
                      >
                        Notify Police
                      </button>
                    </div>
                  ) : (
                    <div className="bg-emerald-500/10 text-emerald-400 text-xs py-2 rounded text-center border border-emerald-500/20">
                      Resolved / Unit Dispatched
                    </div>
                  )}
                </div>
              ))
            )}
            
            {/* For simulation testing button if backend is down */}
            <div className="pt-4 border-t border-white/5 text-center mt-auto">
               <button 
                 onClick={() => {
                   setAlerts(prev => [{
                     _id: Math.random().toString(),
                     type: 'suspicious_activity',
                     riskScore: 88,
                     status: 'active'
                   }, ...prev].slice(0,5))
                 }}
                 className="text-xs text-slate-500 underline hover:text-white"
               >
                 Trigger Mock Alert (Test)
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
