import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// 定义GanttChart组件的props类型
interface GanttChartProps {
  item: {
    id: string;
    dates: {
      notificationDate: string | null;
      actualAmountDate: string | null;
      confirmedReceiptDate: string | null;
      calculatedAmountDate: string | null;
      scheduledPaymentDate: string | null;
      actualPaymentDate: string | null;
      estimatedArrivalDate: string | null;
      actualArrivalDate: string | null;
    };
    status: 'pending' | 'inProgress' | 'completed' | 'delayed';
  };
}

// 定义时间节点的类型
interface TimelineEvent {
  id: string;
  label: string;
  date: string | null;
  completed: boolean;
  delayed: boolean;
  index: number;
}

export const GanttChart: React.FC<GanttChartProps> = ({ item }) => {
  // 定义所有时间节点
  const timelineEvents: TimelineEvent[] = [
    { 
      id: 'notificationDate', 
      label: '预通知汇款', 
      date: item.dates.notificationDate, 
      completed: item.dates.notificationDate !== null, 
      delayed: item.dates.notificationDate === null && item.status === 'delayed', 
      index: 0 
    },
    { 
      id: 'actualAmountDate', 
      label: '通知实际金额', 
      date: item.dates.actualAmountDate, 
      completed: item.dates.actualAmountDate !== null, 
      delayed: item.dates.actualAmountDate === null && item.dates.notificationDate !== null, 
      index: 1 
    },
    { 
      id: 'confirmedReceiptDate', 
      label: '确认收到汇款', 
      date: item.dates.confirmedReceiptDate, 
      completed: item.dates.confirmedReceiptDate !== null, 
      delayed: item.dates.confirmedReceiptDate === null && item.dates.actualAmountDate !== null, 
      index: 2 
    },
    { 
      id: 'calculatedAmountDate', 
      label: '核算应付金额', 
      date: item.dates.calculatedAmountDate, 
      completed: item.dates.calculatedAmountDate !== null, 
      delayed: item.dates.calculatedAmountDate === null && item.dates.confirmedReceiptDate !== null, 
      index: 3 
    },
    { 
      id: 'scheduledPaymentDate', 
      label: '安排支付日期', 
      date: item.dates.scheduledPaymentDate, 
      completed: item.dates.scheduledPaymentDate !== null, 
      delayed: item.dates.scheduledPaymentDate === null && item.dates.calculatedAmountDate !== null, 
      index: 4 
    },
    { 
      id: 'actualPaymentDate', 
      label: '实际支付日期', 
      date: item.dates.actualPaymentDate, 
      completed: item.dates.actualPaymentDate !== null, 
      delayed: item.dates.actualPaymentDate === null && item.dates.scheduledPaymentDate !== null, 
      index: 5 
    },

     { 
      id: 'actualArrivalDate', 
      label: '实际到账日期', 
      date: item.dates.actualArrivalDate, 
      completed: item.dates.actualArrivalDate !== null, 
      delayed: item.dates.actualArrivalDate === null && item.dates.actualPaymentDate !== null, 
      index: 6 
    }
  ];

  // 计算甘特图的宽度和间距
  const containerWidth = '100%';

  // 找到当前进行中的事件
  const activeEventIndex = timelineEvents.findIndex(event => !event.completed && timelineEvents[event.index - 1]?.completed);

  // 格式化日期
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' });
  };

   return (
    <div className="relative w-full bg-gray-50 dark:bg-gray-750 rounded-lg p-4 mt-2">
      {/* 甘特图标签 */}
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400">关键流程时间线</h4>
        <span className="text-xs text-gray-500 dark:text-gray-400">进度可视化</span>
      </div>
      
      {/* 甘特图时间轴 */}
      <div className="relative h-16 w-full">
        {/* 背景线 */}
        <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 dark:bg-gray-600"></div>
        
        {/* 进度线 */}
        <motion.div 
          initial={{ width: 0 }}
          animate={{ 
            width: activeEventIndex === -1 
              ? timelineEvents.every(event => event.completed) ? '100%' : '0%' 
              : `${(activeEventIndex / (timelineEvents.length - 1)) * 100}%` 
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="absolute top-6 left-0 h-0.5 bg-blue-500 dark:bg-blue-400 z-10"
        ></motion.div>
        
        {/* 事件节点 */}
        {timelineEvents.map((event, index) => (
           <div 
              key={event.id} 
              className="absolute top-0 transform -translate-x-1/2 w-24 text-center" 
              style={{ left: `${(index / (timelineEvents.length - 1)) * 100}%` }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={cn(
                  "w-4 h-4 rounded-full flex items-center justify-center z-20 mx-auto mb-12",
                  event.completed 
                    ? "bg-green-500 dark:bg-green-600 text-white" 
                    : event.delayed 
                      ? "bg-red-500 dark:bg-red-600 text-white" 
                      : activeEventIndex === index 
                        ? "bg-blue-500 dark:bg-blue-400 text-white ring-4 ring-blue-100 dark:ring-blue-900" 
                        : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
                )}
              >
                {event.completed ? (
                  <CheckCircle className="w-3 h-3" />
                ) : event.delayed ? (
                  <AlertCircle className="w-3 h-3" />
                ) : (
                  <Clock className="w-3 h-3" />
                )}
              </motion.div>
              
              {/* 日期和标签 */}
              <div className="text-center">
                <div className={`text-xs font-medium mb-1 whitespace-nowrap ${
                  event.completed 
                    ? "text-green-600 dark:text-green-400" 
                    : event.delayed 
                      ? "text-red-600 dark:text-red-400" 
                      : "text-gray-600 dark:text-gray-400"
                }`}>
                  {event.label}
                </div>
              <div className="text-xs text-gray-500 dark:text-gray-500 whitespace-nowrap">
                {formatDate(event.date)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};