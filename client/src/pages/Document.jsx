import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import axios from 'axios';

const Document = () => {
  const chartRef = useRef(null);
  const [stats, setStats] = useState({
    approved: 0,
    pending: 0,
    rejected: 0,
    archived: 0
  });

  useEffect(() => {
    fetchDocumentStats();
  }, []);

  const fetchDocumentStats = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/documents');
      const documents = response.data;
      
      // Calculate document statistics
      const newStats = documents.reduce((acc, doc) => {
        acc[doc.status] = (acc[doc.status] || 0) + 1;
        return acc;
      }, {});

      setStats(newStats);

      // Update chart with new data
      if (chartRef.current) {
        const chart = echarts.init(chartRef.current);
        const option = {
          tooltip: {
            trigger: 'item',
            formatter: '{b}: {c} ({d}%)'
          },
          series: [
            {
              name: 'Document Status',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: '20',
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { 
                  value: newStats.approved || 0, 
                  name: 'Approved',
                  itemStyle: { color: '#10B981' }
                },
                { 
                  value: newStats.pending || 0, 
                  name: 'Pending',
                  itemStyle: { color: '#F59E0B' }
                },
                { 
                  value: newStats.rejected || 0, 
                  name: 'Rejected',
                  itemStyle: { color: '#EF4444' }
                },
                { 
                  value: newStats.archived || 0, 
                  name: 'Archived',
                  itemStyle: { color: '#6B7280' }
                }
              ]
            }
          ]
        };
        
        chart.setOption(option);
      }
    } catch (error) {
      console.error('Failed to fetch document statistics:', error);
    }
  };

  // Add resize handler
  useEffect(() => {
    const chart = echarts.init(chartRef.current);
    
    const handleResize = () => {
      chart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, []);

  return (
    <>
      <div ref={chartRef} style={{ height: '300px' }} />
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="text-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-[#10B981] mr-2"></span>
              Approved
            </span>
            <span className="font-semibold">{stats.approved || 0}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-[#F59E0B] mr-2"></span>
              Pending
            </span>
            <span className="font-semibold">{stats.pending || 0}</span>
          </div>
        </div>
        <div className="text-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-[#EF4444] mr-2"></span>
              Rejected
            </span>
            <span className="font-semibold">{stats.rejected || 0}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-[#6B7280] mr-2"></span>
              Archived
            </span>
            <span className="font-semibold">{stats.archived || 0}</span>
          </div>
        </div>
      </div>
      </>
  );
};

export default Document;