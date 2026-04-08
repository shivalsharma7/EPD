import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { io } from 'socket.io-client';
import { 
  ShieldAlert, 
  Camera, 
  Navigation, 
  CheckCircle,
  Clock,
  MapPin,
  MoreVertical
} from 'lucide-react';
import L from 'leaflet';

// Fix Leaflet icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Mock Data
const MOCK_CAMERAS = [
  { id: 'CAM-01', lat: 40.7128, lng: -74.0060, name: 'Downtown Square' },
  { id: 'CAM-02', lat: 40.7138, lng: -74.0080, name: 'Subway Entrance' },
  { id: 'CAM-03', lat: 40.7118, lng: -74.0040, name: 'Central Park South' },
];

export default function Dashboard() {
  const [stats, setStats] = useState({ cameras: 24, drones: 5, activeAlerts: 0, resolvedIncidents: 142 });
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Fetch initial stats
    fetch('http://localhost:5000/api/stats')
      .then(res => res.json())
      .then(data => setStats(prev => ({ ...prev, ...data })))
      .catch(console.error);

    // Setup Socket
    const socket = io('http://localhost:5000');
    socket.on('new_alert', (alertData) => {
      setAlerts(prev => [alertData, ...prev]);
      setStats(prev => ({ ...prev, activeAlerts: prev.activeAlerts + 1 }));
    });

    socket.on('drone_dispatched', (data) => {
      setAlerts(prev => prev.map(a => 
        a._id === data.alertId ? { ...a, status: 'resolved' } : a
      ));
      setStats(prev => ({ 
        ...prev, 
        activeAlerts: Math.max(0, prev.activeAlerts - 1),
        resolvedIncidents: prev.resolvedIncidents + 1
      }));
    });

    return () => socket.close();
  }, []);

  return (
    <div className="flex h-[calc(100vh-80px)] overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-lighter border-r border-white/5 flex flex-col">
        <div className="p-6">
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Command Center</h2>
          <nav className="space-y-2">
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-primary-500/10 text-primary-400 rounded-xl font-medium border border-primary-500/20">
              <ShieldAlert size={20} /> Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-colors">
              <Camera size={20} /> Cameras
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-colors">
              <Navigation size={20} /> Drone Fleet
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl font-medium transition-colors">
              <Clock size={20} /> Incident Logs
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Stats Bar */}
        <div className="p-6 grid grid-cols-4 gap-6 border-b border-white/5">
          <div className="bg-dark p-6 rounded-2xl border border-white/5 flex items-center gap-4">
            <div className="bg-emerald-500/20 p-3 rounded-xl"><Camera className="text-emerald-400" /></div>
            <div>
              <div className="text-2xl font-bold">{stats.cameras}</div>
              <div className="text-sm text-slate-400">Active Cameras</div>
            </div>
          </div>
          <div className="bg-dark p-6 rounded-2xl border border-white/5 flex items-center gap-4">
            <div className="bg-purple-500/20 p-3 rounded-xl"><Navigation className="text-purple-400" /></div>
            <div>
              <div className="text-2xl font-bold">{stats.drones}</div>
              <div className="text-sm text-slate-400">Drones Available</div>
            </div>
          </div>
          <div className="bg-dark p-6 rounded-2xl border border-rose-500/30 flex items-center gap-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/10 rounded-bl-full"></div>
            <div className="bg-rose-500/20 p-3 rounded-xl"><ShieldAlert className="text-rose-400" /></div>
            <div>
              <div className="text-2xl font-bold text-rose-400">{stats.activeAlerts}</div>
              <div className="text-sm text-slate-400">Active Alerts</div>
            </div>
          </div>
          <div className="bg-dark p-6 rounded-2xl border border-white/5 flex items-center gap-4">
            <div className="bg-primary-500/20 p-3 rounded-xl"><CheckCircle className="text-primary-400" /></div>
            <div>
              <div className="text-2xl font-bold">{stats.resolvedIncidents}</div>
              <div className="text-sm text-slate-400">Incidents Resolved</div>
            </div>
          </div>
        </div>

        <div className="flex-1 flex overflow-hidden">
          {/* Map Area */}
          <div className="flex-1 relative z-0">
            <MapContainer 
               center={[40.7128, -74.0060]} 
               zoom={15} 
               className="h-full w-full custom-map-style"
               zoomControl={false}
               attributionControl={false}
            >
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              />
              {MOCK_CAMERAS.map(cam => (
                 <Marker key={cam.id} position={[cam.lat, cam.lng]}>
                    <Popup className="custom-popup">
                       <div className="font-bold">{cam.name}</div>
                       <div className="text-xs">ID: {cam.id}</div>
                       <div className="text-xs text-emerald-500 mt-1">Status: Online</div>
                    </Popup>
                 </Marker>
              ))}
              
              {/* Highlight active alert on map */}
              {alerts.filter(a => a.status === 'active').map((alert, i) => (
                 <Circle 
                   key={alert._id || i}
                   center={[40.7128, -74.0060]} 
                   pathOptions={{ color: '#f43f5e', fillColor: '#f43f5e', fillOpacity: 0.2 }} 
                   radius={150} 
                 />
              ))}
            </MapContainer>
            
            {/* Overlay Map UI */}
            <div className="absolute top-4 left-4 z-10 bg-dark/80 backdrop-blur p-4 rounded-xl border border-white/10">
               <h3 className="font-bold text-sm mb-2">Predictive Hotspots</h3>
               <div className="flex items-center gap-2 text-xs text-slate-400"><span className="w-3 h-3 rounded-full bg-rose-500 opacity-60"></span> High Risk (80-100%)</div>
               <div className="flex items-center gap-2 text-xs text-slate-400 mt-1"><span className="w-3 h-3 rounded-full bg-amber-500 opacity-60"></span> Medium Risk (50-79%)</div>
            </div>
          </div>

          {/* Alerts List */}
          <div className="w-96 bg-dark-lighter border-l border-white/5 flex flex-col">
            <div className="p-4 border-b border-white/5 flex justify-between items-center bg-dark/50">
               <h3 className="font-bold">Incident Log</h3>
               <button className="text-slate-400 hover:text-white"><MoreVertical size={16}/></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {alerts.length === 0 ? (
                <div className="text-center text-slate-500 text-sm mt-10">No recent incidents logged.</div>
              ) : (
                alerts.map((alert, i) => (
                  <div key={alert._id || i} className="bg-dark p-4 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        {alert.status === 'active' ? (
                          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        )}
                        <span className="text-sm font-bold capitalize">
                          {alert.type.replace('_', ' ')}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">Just now</span>
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-1 mb-2">
                      <MapPin size={12} /> CAM-01 Downtown
                    </div>
                    {alert.status === 'active' ? (
                      <div className="text-xs text-rose-400 font-medium">Action Required</div>
                    ) : (
                      <div className="text-xs text-emerald-400 font-medium">Resolved</div>
                    )}
                  </div>
                ))
              )}
              
              {/* Dummy Historical Data */}
               <div className="bg-dark p-4 rounded-xl border border-white/5 opacity-60">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span className="text-sm font-bold capitalize">
                        Crowd Anomaly
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">2h ago</span>
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-1 mb-2">
                    <MapPin size={12} /> CAM-03 Central Park
                  </div>
                  <div className="text-xs text-emerald-400 font-medium">Police Unit Dispatched</div>
                </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
