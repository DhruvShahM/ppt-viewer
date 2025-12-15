import React from 'react';
import { Bell, AlertCircle, Smartphone } from 'lucide-react';

const Slide6_Notifications = () => {
  const notifications = [
    { app: 'Social Media', frequency: 'Every 4-8 mins', severity: 'High' },
    { app: 'Messaging', frequency: 'Every 2-5 mins', severity: 'Very High' },
    { app: 'Work Email', frequency: 'Every 15-30 mins', severity: 'Critical' },
    { app: 'News', frequency: 'Every 10-15 mins', severity: 'High' },
  ];

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-12 py-16">
      <div className="mb-12">
        <h2 className="text-5xl font-bold text-white text-center mb-3">The Notification Trap</h2>
        <p className="text-xl text-gray-400 text-center">Fragmented sleep architecture through constant stimuli</p>
      </div>

      <div className="max-w-4xl w-full">
        <div className="mb-8">
          <p className="text-gray-400 mb-4 text-sm">Average night notifications (8 hours): 60-120 interruptions</p>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-red-600 to-red-500" style={{ width: '100%' }}></div>
          </div>
        </div>

        <div className="space-y-4 mb-12">
          {notifications.map((notif, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg">
              <Bell className="w-6 h-6 text-amber-400 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-white font-semibold">{notif.app}</p>
                <p className="text-gray-400 text-sm">{notif.frequency}</p>
              </div>
              <div className="px-3 py-1 rounded-full bg-red-500 bg-opacity-20 border border-red-500 border-opacity-50">
                <span className="text-red-400 text-xs font-semibold">{notif.severity}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-orange-500 bg-opacity-10 border border-orange-500 border-opacity-30 rounded-lg">
          <div className="flex gap-3">
            <AlertCircle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-orange-400 font-semibold mb-1">Fragmentation Effect</p>
              <p className="text-gray-300 text-sm">
                Even silent notifications (vibration) trigger cortisol spikes and arouse brain from sleep. Takes 15-20 minutes to return to deep sleep state.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slide6_Notifications;