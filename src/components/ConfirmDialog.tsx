import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = '确认',
  cancelText = '取消',
  danger = false
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden"
        >
          {/* 对话框头部 */}
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-start">
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
              danger ? 'bg-red-100 text-red-500 dark:bg-red-900/30 dark:text-red-400' : 'bg-blue-100 text-blue-500 dark:bg-blue-900/30 dark:text-blue-400'
            }`}>
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="ml-3 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          </div>
          
          {/* 对话框内容 */}
          <div className="px-6 py-4">
            <p className="text-gray-600 dark:text-gray-300">{message}</p>
          </div>
          
          {/* 对话框底部按钮 */}
          <div className="px-6 py-3 bg-gray-50 dark:bg-gray-750 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                danger 
                  ? 'text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600' 
                  : 'text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};