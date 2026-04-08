import { Shield, Twitter, Linkedin, Github } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-dark-lighter border-t border-white/5 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary-500" />
              <span className="text-lg font-bold text-white">SafeWalk AI</span>
            </div>
            <p className="text-slate-400 text-sm">
              Predicting crime before it happens. Building safer, smarter cities through AI and proactive monitoring.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-slate-400 hover:text-primary-400 transition-colors"><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-slate-400 hover:text-primary-400 transition-colors"><Linkedin className="h-5 w-5" /></a>
              <a href="#" className="text-slate-400 hover:text-primary-400 transition-colors"><Github className="h-5 w-5" /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/technology" className="hover:text-primary-400 transition-colors">Technology</Link></li>
              <li><Link to="/about" className="hover:text-primary-400 transition-colors">How it works</Link></li>
              <li><Link to="/demo" className="hover:text-primary-400 transition-colors">Live Simulation</Link></li>
              <li><Link to="/dashboard" className="hover:text-primary-400 transition-colors">Admin Dashboard</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-primary-400 transition-colors">Smart Cities (B2G)</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Security Firms (B2B)</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Citizen App</a></li>
              <li><a href="#" className="hover:text-primary-400 transition-colors">Drone Dispatch</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>hello@safewalkai.com</li>
              <li>+1 (555) 123-4567</li>
              <li>100 Innovation Drive</li>
              <li>Tech City, TC 90210</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 border-opacity-20 gap-4">
          <p>© {new Date().getFullYear()} SafeWalk AI. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
