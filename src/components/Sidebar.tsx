import React from 'react';
import { Home, PlusCircle, History, Settings, LogOut, Building2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-white border-r border-gray-200 px-4 py-6">
      <div className="flex items-center mb-8">
        <Building2 className="w-8 h-8 text-blue-600" />
        <span className="ml-2 text-xl font-bold text-gray-900">PropLister</span>
      </div>
      
      <nav className="space-y-1">
        <SidebarLink to="/" icon={<Home />} text="Dashboard" active={location.pathname === '/'} />
        <SidebarLink to="/new" icon={<PlusCircle />} text="New Listing" active={location.pathname === '/new'} />
        <SidebarLink to="/history" icon={<History />} text="History" active={location.pathname === '/history'} />
        <SidebarLink to="/settings" icon={<Settings />} text="Settings" active={location.pathname === '/settings'} />
      </nav>

      <div className="mt-auto pt-8">
        <button className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg w-full">
          <LogOut className="w-5 h-5 mr-3" />
          Sign Out
        </button>
      </div>
    </div>
  );
}

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  active?: boolean;
}

function SidebarLink({ to, icon, text, active = false }: SidebarLinkProps) {
  return (
    <Link
      to={to}
      className={`flex items-center px-4 py-2 text-gray-600 rounded-lg ${
        active
          ? 'bg-blue-50 text-blue-600'
          : 'hover:bg-gray-100'
      }`}
    >
      <span className="w-5 h-5 mr-3">{icon}</span>
      {text}
    </Link>
  );
}