import React, { useState, useEffect } from 'react';
import { Calendar, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

// 定义代收项目的类型
interface CollectionItem {
  id: string;
  projectName: string;
  clientName: string;
  amount: number;
  serviceFeeAmount: number;
  deductionAmount: number;
  bankFeeAmount: number;
  payableAmount: number;
  duration: number; // 耗时（天）
  status: 'pending' | 'inProgress' | 'completed' | 'delayed';
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
}

interface CollectionFormProps {
  initialData: Partial<CollectionItem> | null;
  onSubmit: (data: Omit<CollectionItem, 'id'>) => void;
  onCancel: () => void;
}

// 生成随机ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const CollectionForm: React.FC<CollectionFormProps> = ({ 
  initialData, 
  onSubmit, 
  onCancel 
}) => {
  // 状态管理表单数据 - 金额字段默认设为空字符串
  const [formData, setFormData] = useState<Omit<CollectionItem, 'id'>>({
    projectName: '',
    clientName: '',
    amount: 0,
    serviceFeeAmount: 0,
    deductionAmount: 0,
    bankFeeAmount: 0,
    payableAmount: 0,
    duration: 0, // 耗时（天）
    status: 'pending',
    dates: {
      notificationDate: null,
      actualAmountDate: null,
      confirmedReceiptDate: null,
      calculatedAmountDate: null,
      scheduledPaymentDate: null,
      actualPaymentDate: null,
      estimatedArrivalDate: null,
      actualArrivalDate: null
    }
  });
  
  // 当initialData变化时，更新表单数据
  useEffect(() => {
      if (initialData) {
      setFormData({
        projectName: initialData.projectName || '',
        clientName: initialData.clientName || '',
        amount: initialData.amount || 0,
        serviceFeeAmount: initialData.serviceFeeAmount || 0,
        deductionAmount: initialData.deductionAmount || 0,
        bankFeeAmount: initialData.bankFeeAmount || 0,
        payableAmount: initialData.payableAmount || 0,
        duration: initialData.duration || 0, // 耗时（天）
        status: initialData.status || 'pending',
        dates: initialData.dates || {
          notificationDate: null,
          actualAmountDate: null,
          confirmedReceiptDate: null,
          calculatedAmountDate: null,
          scheduledPaymentDate: null,
          actualPaymentDate: null,
          estimatedArrivalDate: null,
          actualArrivalDate: null
        }
      });
      } else {
      // 重置表单 - 金额字段设为空字符串
      setFormData({
        projectName: '',
        clientName: '',
        amount: 0,
        serviceFeeAmount: 0,
        deductionAmount: 0,
        bankFeeAmount: 0,
        payableAmount: 0,
        duration: 0, // 耗时（天）
        status: 'pending',
        dates: {
          notificationDate: null,
          actualAmountDate: null,
          confirmedReceiptDate: null,
          calculatedAmountDate: null,
          scheduledPaymentDate: null,
          actualPaymentDate: null,
          estimatedArrivalDate: null,
          actualArrivalDate: null
        }
      });
    }
  }, [initialData]);
  
  // 处理表单输入变化
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('dates.')) {
      // 处理日期字段
      const dateField = name.replace('dates.', '');
      setFormData(prev => ({
        ...prev,
        dates: {
          ...prev.dates,
          [dateField]: value || null
        }
      }));
    } else if (['amount', 'serviceFeeAmount', 'deductionAmount', 'bankFeeAmount', 'payableAmount', 'duration'].includes(name)) {
      // 处理金额和耗时字段，支持空值
      setFormData(prev => ({
        ...prev,
        [name]: value === '' ? 0 : parseFloat(value) || 0
      }));
    } else {
      // 处理其他字段
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // 简化的表单验证（不再检查必填项）
  const validateForm = (): boolean => {
    // 移除所有必填项验证
    return true;
  };
  
  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 基本信息 */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white">基本信息</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 项目名称 */}
          <div className="space-y-2">
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              项目名称
            </label>
            <input
              type="text"
              id="projectName"
              name="projectName"
              value={formData.projectName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="请输入项目名称"
            />
          </div>
          
          {/* 客户名称 */}
          <div className="space-y-2">
            <label htmlFor="clientName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              客户名称
            </label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="请输入客户名称"
            />
          </div>
          
          {/* 金额 */}
          <div className="space-y-2">
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              金额
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount || ''}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
          </div>
          
          {/* 服务费金额 */}
          <div className="space-y-2">
            <label htmlFor="serviceFeeAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              服务费金额
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="number"
                id="serviceFeeAmount"
                name="serviceFeeAmount"
                value={formData.serviceFeeAmount || ''}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
          </div>
          
          {/* 扣除金额 */}
          <div className="space-y-2">
            <label htmlFor="deductionAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              扣除金额
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="number"
                id="deductionAmount"
                name="deductionAmount"
                value={formData.deductionAmount || ''}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
          </div>
          
          {/* 银行手续费 */}
          <div className="space-y-2">
            <label htmlFor="bankFeeAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              银行手续费
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="number"
                id="bankFeeAmount"
                name="bankFeeAmount"
                value={formData.bankFeeAmount || ''}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
          </div>
          
           {/* 应付金额 */}
           <div className="space-y-2">
             <label htmlFor="payableAmount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
               应付金额
             </label>
             <div className="relative">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <DollarSign className="h-4 w-4 text-gray-400" />
               </div>
               <input
                 type="number"
                 id="payableAmount"
                 name="payableAmount"
                 value={formData.payableAmount || ''}
                 onChange={handleChange}
                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                 placeholder="0.00"
                 min="0"
                 step="0.01"
               />
             </div>
           </div>
           
           {/* 耗时 */}
           <div className="space-y-2">
             <label htmlFor="duration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
               耗时（天）
             </label>
             <input
               type="number"
               id="duration"
               name="duration"
               value={formData.duration || ''}
               onChange={handleChange}
               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
               placeholder="0"
               min="0"
               step="1"
             />
           </div>
          
          {/* 状态 */}
          <div className="space-y-2">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              状态
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="pending">待处理</option>
              <option value="inProgress">进行中</option>
              <option value="completed">已完成</option>
              <option value="delayed">已延迟</option>
            </select>
          </div>
          </div>
          </div>
      
      {/* 时间节点 */}
      <div className="space-y-4">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white">关键时间节点</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 预通知汇款日期 */}
          <div className="space-y-2">
            <label htmlFor="dates.notificationDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              预通知汇款日期
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="date"
                id="dates.notificationDate"
                name="dates.notificationDate"
                value={formData.dates.notificationDate || ''}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          
          {/* 通知实际金额日期 */}
          <div className="space-y-2">
            <label htmlFor="dates.actualAmountDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              通知实际金额日期
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="date"
                id="dates.actualAmountDate"
                name="dates.actualAmountDate"
                value={formData.dates.actualAmountDate || ''}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          
          {/* 确认收到汇款日期 */}
          <div className="space-y-2">
            <label htmlFor="dates.confirmedReceiptDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              确认收到汇款日期
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="date"
                id="dates.confirmedReceiptDate"
                name="dates.confirmedReceiptDate"
                value={formData.dates.confirmedReceiptDate || ''}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          
          {/* 核算应付金额日期 */}
          <div className="space-y-2">
            <label htmlFor="dates.calculatedAmountDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              核算应付金额日期
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="date"
                id="dates.calculatedAmountDate"
                name="dates.calculatedAmountDate"
                value={formData.dates.calculatedAmountDate || ''}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          
          {/* 安排支付日期 */}
          <div className="space-y-2">
            <label htmlFor="dates.scheduledPaymentDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              安排支付日期
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="date"
                id="dates.scheduledPaymentDate"
                name="dates.scheduledPaymentDate"
                value={formData.dates.scheduledPaymentDate || ''}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          
          {/* 实际支付日期 */}
          <div className="space-y-2">
            <label htmlFor="dates.actualPaymentDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              实际支付日期
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="date"
                id="dates.actualPaymentDate"
                name="dates.actualPaymentDate"
                value={formData.dates.actualPaymentDate || ''}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          
          {/* 实际到账日期 */}
          <div className="space-y-2">
            <label htmlFor="dates.actualArrivalDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              实际到账日期
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="date"
                id="dates.actualArrivalDate"
                name="dates.actualArrivalDate"
                value={formData.dates.actualArrivalDate || ''}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* 操作按钮 */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
        >
          取消
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          保存
        </button>
      </div>
    </form>
  );
};