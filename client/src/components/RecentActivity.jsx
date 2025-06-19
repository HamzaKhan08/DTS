import { useState, useEffect } from 'react';
import axios from 'axios';

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchRecentActivities();
  }, []);

  const fetchRecentActivities = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/documents');
      const documents = response.data;
      
      // Sort documents by createdAt date and take the 5 most recent
      const recentDocs = documents
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);

      setActivities(recentDocs);
    } catch (error) {
      console.error('Failed to fetch recent activities:', error);
    }
  };

  const getActivityIcon = (status) => {
    switch (status) {
      case 'approved':
        return { icon: 'check', bgColor: 'bg-green-500' };
      case 'rejected':
        return { icon: 'times', bgColor: 'bg-red-500' };
      case 'archived':
        return { icon: 'archive', bgColor: 'bg-gray-500' };
      default:
        return { icon: 'upload', bgColor: 'bg-orange-400' };
    }
  };

  const formatTimeAgo = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' years ago';
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    
    return Math.floor(seconds) + ' seconds ago';
  };

  return (
    <div className="max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-orange-300 scrollbar-track-gray-100">
      {activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6">
          <i className="fas fa-history text-black text-3xl mb-2"></i>
          <p className="text-white text-sm">No recent activities</p>
        </div>
      ) : (
        <ul className="space-y-4">
          {activities.map((activity, index) => (
            <li key={activity._id} className="relative">
              <div className="flex items-start py-3 px-3 space-x-3">
                {/* Activity Icon */}
                <div className="flex-shrink-0">
                  <span className={`h-8 w-8 rounded-full ${getActivityIcon(activity.status).bgColor} flex items-center justify-center ring-4 ring-white shadow`}>
                    <i className={`fas fa-${getActivityIcon(activity.status).icon} text-white text-sm`}></i>
                  </span>
                </div>

                {/* Activity Content */}
                <div className="min-w-0 flex-1 bg-white rounded-lg p-2 shadow-sm border">
                  {/* Document Name and User */}
                  <div className="text-sm">
                    <span className="font-medium text-orange-400 hover:text-orange-600 transition-colors">
                      {activity.uploadedBy.name}
                    </span>
                    <span className="text-green-600">
                      {' '}{activity.status === 'pending' ? 'uploaded' : activity.status}{' '}
                    </span>
                    <span className="font-medium text-black break-all">
                      {activity.originalName}
                    </span>
                  </div>

                  {/* User Details */}
                  <div className="mt-1 text-xs text-orange-500">
                    {activity.uploadedBy.designation} - {activity.uploadedBy.department}
                  </div>

                  {/* Time and Priority */}
                  <div className="mt-2 flex items-center justify-between">
                    <div className="text-xs text-black">
                      <i className="far fa-clock mr-1"></i>
                      {formatTimeAgo(activity.createdAt)}
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      activity.priority === 'High' 
                        ? 'bg-red-100 text-red-800'
                        : activity.priority === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      <i className={`fas fa-flag mr-1 ${
                        activity.priority === 'High' 
                          ? 'text-red-800'
                          : activity.priority === 'Medium'
                          ? 'text-yellow-800'
                          : 'text-blue-800'
                      }`}></i>
                      {activity.priority}
                    </span>
                  </div>
                </div>
              </div>

              {/* Connector Line */}
              {index < activities.length - 1 && (
                <div className="absolute left-7 top-10 -ml-px h-36 w-0.5 bg-black" aria-hidden="true" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentActivity;