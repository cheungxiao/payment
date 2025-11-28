import React from 'react';
import { Clock, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface DateTimeDisplayProps {
  label: string;
  date: string | null;
}

export const DateTimeDisplay: React.FC<DateTimeDisplayProps> = ({ label, date }) => {
  // 格式化日期
  const formatDate = (dateString: string | null): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' });
  };

  // 判断日期状态
  const hasDate = !!date;
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center"
    >
      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{label}</div>
      <div className={`flex items-center justify-center w-full h-6 rounded ${
        hasDate ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-gray-50 text-gray-400 dark:bg-gray-750 dark:text-gray-500'
      }`}>
        {hasDate ? (
          <>
            <Calendar className="w-3 h-3 mr-1" />
            <span className="text-xs">{formatDate(date)}</span>
          </>
        ) : (
          <>
            <Clock className="w-3 h-3 mr-1" />
            <span className="text-xs">未设定</span>
          </>
        )}
      </div>
    </motion.div>
  );
};