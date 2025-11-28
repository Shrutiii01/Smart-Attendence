import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, FileText, FolderOpen, HelpCircle, LogOut, Bell, Moon, Sun } from 'lucide-react';
import { Link } from "react-router-dom";

const EmployeeDashboard: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    });
  };

  // Mock data
  const stats = [
    {
      title: 'Working Days',
      value: '20',
      subtitle: 'Total 26 days this month',
      icon: '📅',
      color: 'bg-blue-50'
    },
    {
      title: 'Attendance',
      value: '95%',
      subtitle: '95% over 10 days',
      icon: '✓',
      color: 'bg-green-50',
      iconBg: 'bg-green-100 text-green-600'
    },
    {
      title: 'Leave Balance',
      value: '12',
      subtitle: 'Annual leaves remaining',
      icon: '🔑',
      color: 'bg-orange-50'
    },
    {
      title: 'Next Holiday',
      value: 'Diwali',
      subtitle: 'Nov 12 - 5 days to go',
      icon: '🎉',
      color: 'bg-purple-50'
    }
  ];

  const announcements = [
    {
      title: 'Q4 All Hands Meeting',
      description: 'Join us for the quarterly review at 2:00 PM in the main hall or via Zoom.',
      date: 'Today',
      dateColor: 'bg-blue-100 text-blue-700'
    },
    {
      title: 'Office Maintenance',
      description: 'The 2nd-floor cafeteria will be closed for renovation this weekend.',
      date: 'Yesterday',
      dateColor: 'bg-gray-100 text-gray-600'
    },
    {
      title: 'New Health Benefits',
      description: 'We have updated our insurance policy to include dental coverage.',
      date: 'Oct 28',
      dateColor: 'bg-gray-100 text-gray-600'
    }
  ];

  const whosAway = [
    {
      name: 'Alex Morgan',
      leave: 'Sick Leave (1 Day)',
      avatar: 'AM',
      color: 'bg-purple-500'
    },
    {
      name: 'Justin Case',
      leave: 'Annual Leave (Till Oct 28)',
      avatar: 'JC',
      color: 'bg-blue-500'
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">HRMS Portal</h1>
              <p className="text-xs text-gray-500">EMPLOYEE</p>
            </div>
          </div>
        </div>

        {/* Main Menu */}
        <nav className="flex-1 p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Main Menu</p>
          <div className="space-y-1">
            <Link to="/employee-dashboard" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg bg-indigo-50 text-indigo-600 font-medium">
              <TrendingUp className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link to="/attendance-history" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
              <Calendar className="w-5 h-5" />
              <span>Attendance History</span>
            </Link>
            <Link
              to="/leave"
              className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 font-medium"
            >
              <FileText className="w-5 h-5" />
              <span>Leaves</span>
            </Link>

            <a href="#" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
              <FolderOpen className="w-5 h-5" />
              <span>Documents</span>
            </a>
          </div>

          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6 mb-3">Support</p>
          <a href="#" className="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">
            <HelpCircle className="w-5 h-5" />
            <span>Helpdesk</span>
          </a>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <Link to="/profile" className="flex items-center space-x-3 mb-3 ">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
              SJ
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">Sarah Johnson</p>
              <p className="text-xs text-gray-500">Senior Engineer</p>
            </div>
          </Link>
          <div className="flex items-center justify-between">
            <Link to="/profile" className="text-xs text-indigo-600 ">View profile</Link>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 text-sm font-medium">
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Good Morning, Sarah!</h2>
              <p className="text-gray-600 mt-1">Here's what's happening with your work today.</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                {darkMode ? <Sun className="w-5 h-5 text-gray-600" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </button>
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-600 font-medium mb-1">{stat.title}</p>
                    <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
                  </div>
                  <div className="text-2xl">{stat.icon}</div>
                </div>
                <p className="text-xs text-gray-500">{stat.subtitle}</p>
              </div>
            ))}
          </div>

          {/* Announcements and Who's Away */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Announcements */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900 flex items-center">
                  <span className="mr-2">📢</span>
                  Announcements
                </h3>
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {announcements.map((announcement, index) => (
                  <div key={index} className="border-l-4 border-indigo-500 bg-gray-50 p-4 rounded-r-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{announcement.title}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded ${announcement.dateColor}`}>
                        {announcement.date}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{announcement.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Who's Away */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Who's Away</h3>
              <div className="space-y-4">
                {whosAway.map((person, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${person.color} rounded-full flex items-center justify-center text-white font-semibold text-sm`}>
                      {person.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{person.name}</p>
                      <p className="text-xs text-gray-500">{person.leave}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-center text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                View Team Calendar
              </button>
            </div>
          </div>

          {/* Recent Attendance (summary) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Recent Attendance</h3>
                <p className="text-sm text-gray-500">A brief overview of your last few days.</p>
              </div>
              <Link to="/attendance-history" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">View full history</Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-gray-50 border border-gray-100 text-sm">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-xs text-gray-500">2023-10-26</div>
                  <div className="text-xs text-green-600 font-semibold">Present</div>
                </div>
                <div className="text-xs text-gray-600">09:02 AM — 06:00 PM (8h 58m)</div>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 border border-gray-100 text-sm">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-xs text-gray-500">2023-10-25</div>
                  <div className="text-xs text-yellow-600 font-semibold">Late</div>
                </div>
                <div className="text-xs text-gray-600">09:15 AM — 06:30 PM (9h 15m)</div>
              </div>

              <div className="p-3 rounded-lg bg-gray-50 border border-gray-100 text-sm">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-xs text-gray-500">2023-10-24</div>
                  <div className="text-xs text-green-600 font-semibold">Present</div>
                </div>
                <div className="text-xs text-gray-600">08:55 AM — 05:55 PM (9h 00m)</div>
              </div>
            </div>
          </div>

          {/* Mark Attendance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Mark Attendance</h3>
                <p className="text-sm text-gray-600">Don't forget to clock in before 9:30 AM to avoid late marking.</p>
              </div>
              <div className="text-center mr-8">
                <div className="text-4xl font-bold text-gray-900">{formatTime(currentTime)}</div>
                <div className="text-sm text-gray-500 mt-1">{formatDate(currentTime)}</div>
              </div>
              <div className="flex space-x-4">
                <button className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex flex-col items-center">
                  <span className="text-2xl mb-1">→</span>
                  <span>Clock In</span>
                  <span className="text-xs opacity-90 mt-1">Face Scan</span>
                </button>
                <button className="px-8 py-4 bg-gray-100 text-gray-400 rounded-xl font-semibold flex flex-col items-center cursor-not-allowed">
                  <span className="text-2xl mb-1">←</span>
                  <span>Clock Out</span>
                  <span className="text-xs mt-1">Face Scan</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeDashboard;
