import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GanttChart } from '@/components/GanttChart';
import { DateTimeDisplay } from '@/components/DateTimeDisplay';
import { Modal } from '@/components/Modal';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { CollectionForm } from '@/components/CollectionForm';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { 
  Calendar, 
  ChevronDown, 
  Search, 
  Download,
  ArrowUpDown,
  CheckCircle,
  Clock,
  AlertCircle,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal
} from 'lucide-react';
// 从mockData导入类型定义
import { CollectionItem } from '@/lib/mockData';

// 定义筛选选项类型
interface FilterOptions {
  status: string;
  searchTerm: string;
}

// 生成随机ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const STORAGE_KEY = 'collection_system_data';

// 真实业务数据 - 作为数据库初始化数据
const INITIAL_REAL_DATA: CollectionItem[] = [
  {
    id: "1001",
    projectName: "企业代收款项目A",
    clientName: "阿里巴巴集团",
    amount: 500000,
    serviceFeeAmount: 25000,
    deductionAmount: 5000,
    bankFeeAmount: 1000,
    payableAmount: 469000,
    duration: 14, // 耗时（天）
    status: "completed",
    dates: {
      notificationDate: "2025-10-01",
      actualAmountDate: "2025-10-03",
      confirmedReceiptDate: "2025-10-05",
      calculatedAmountDate: "2025-10-07",
      scheduledPaymentDate: "2025-10-10",
      actualPaymentDate: "2025-10-10",
      actualArrivalDate: "2025-10-15"
    },
  },
  {
    id: "1002",
    projectName: "商户代收结算B",
    clientName: "腾讯科技有限公司",
    amount: 800000,
    serviceFeeAmount: 32000,
    deductionAmount: 8000,
    bankFeeAmount: 1500,
    payableAmount: 758500,
    duration: 10, // 耗时（天）
    status: "inProgress",
    dates: {
      notificationDate: "2025-10-05",
      actualAmountDate: "2025-10-08",
      confirmedReceiptDate: "2025-10-10",
      calculatedAmountDate: "2025-10-12",
      scheduledPaymentDate: "2025-10-15",
      actualPaymentDate: null,
      actualArrivalDate: null
    },
  },
  {
    id: "1003",
    projectName: "平台代收货款C",
    clientName: "京东集团",
    amount: 300000,
    serviceFeeAmount: 12000,
    deductionAmount: 3000,
    bankFeeAmount: 800,
    payableAmount: 284200,
    duration: 10, // 耗时（天）
    status: "inProgress",
    dates: {
      notificationDate: "2025-10-10",
      actualAmountDate: "2025-10-12",
      confirmedReceiptDate: "2025-10-15",
      calculatedAmountDate: "2025-10-17",
      scheduledPaymentDate: "2025-10-20",
      actualPaymentDate: "2025-10-20",
      actualArrivalDate: null
    },
  },
  {
    id: "1004",
    projectName: "服务费用代收D",
    clientName: "字节跳动有限公司",
    amount: 200000,
    serviceFeeAmount: 8000,
    deductionAmount: 2000,
    bankFeeAmount: 600,
    payableAmount: 189400,
    duration: 0, // 耗时（天）
    status: "pending",
    dates: {
      notificationDate: "2025-10-15",
      actualAmountDate: null,
      confirmedReceiptDate: null,
      calculatedAmountDate: null,
      scheduledPaymentDate: null,
      actualPaymentDate: null,
      actualArrivalDate: null
    },
  },
  {
    id: "1005",
    projectName: "会员会费代收E",
    clientName: "美团点评",
    amount: 150000,
    serviceFeeAmount: 6000,
    deductionAmount: 1500,
    bankFeeAmount: 500,
    payableAmount: 142000,
    duration: 14, // 耗时（天）
    status: "delayed",
    dates: {
      notificationDate: "2025-10-01",
      actualAmountDate: "2025-10-03",
      confirmedReceiptDate: "2025-10-05",
      calculatedAmountDate: "2025-10-07",
      scheduledPaymentDate: "2025-10-10",
      actualPaymentDate: null,
      actualArrivalDate: null
    },
  },
  {
    id: "1006",
    projectName: "供应商货款代收F",
    clientName: "拼多多",
    amount: 600000,
    serviceFeeAmount: 24000,
    deductionAmount: 6000,
    bankFeeAmount: 1200,
    payableAmount: 568800,
    duration: 15, // 耗时（天）
    status: "completed",
    dates: {
      notificationDate: "2025-09-20",
      actualAmountDate: "2025-09-22",
      confirmedReceiptDate: "2025-09-25",
      calculatedAmountDate: "2025-09-28",
      scheduledPaymentDate: "2025-10-01",
      actualPaymentDate: "2025-10-01",
      actualArrivalDate: "2025-10-05"
    },
  },
  {
    id: "1007",
    projectName: "渠道佣金代收G",
    clientName: "小米科技有限责任公司",
    amount: 250000,
    serviceFeeAmount: 10000,
    deductionAmount: 2500,
    bankFeeAmount: 700,
    payableAmount: 236800,
    duration: 5, // 耗时（天）
    status: "inProgress",
    dates: {
      notificationDate: "2025-10-18",
      actualAmountDate: "2025-10-20",
      confirmedReceiptDate: null,
      calculatedAmountDate: null,
      scheduledPaymentDate: null,
      actualPaymentDate: null,
      actualArrivalDate: null
    },
  },
  {
    id: "1008",
    projectName: "代理费用代收H",
    clientName: "网易公司",
    amount: 400000,
    serviceFeeAmount: 16000,
    deductionAmount: 4000,
    bankFeeAmount: 900,
    payableAmount: 379100,
    duration: 0, // 耗时（天）
    status: "pending",
    dates: {
      notificationDate: null,
      actualAmountDate: null,
      confirmedReceiptDate: null,
      calculatedAmountDate: null,
      scheduledPaymentDate: null,
      actualPaymentDate: null,
      actualArrivalDate: null
    },
  }
];

const CollectionSystem: React.FC = () => {
  // 状态管理
  const [collectionItems, setCollectionItems] = useState<CollectionItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<CollectionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);
  const [sortField, setSortField] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    status: 'all',
    searchTerm: ''
  });
  
  // CRUD相关状态
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<CollectionItem | null>(null);
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  // 初始化数据加载
  useEffect(() => {
    loadData();
  }, []);

  // 筛选和排序数据
  useEffect(() => {
    applyFiltersAndSorting();
  }, [collectionItems, filterOptions, sortField, sortOrder]);

  // 数据库操作 - 加载数据
  const loadData = () => {
    setLoading(true);
    // 尝试从localStorage数据库加载数据
    const savedData = localStorage.getItem(STORAGE_KEY);
    
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        // 验证数据结构的完整性
        if (Array.isArray(parsedData) && parsedData.every(item => 
          item.id && item.projectName && item.clientName !== undefined)) {
          setCollectionItems(parsedData);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error('Failed to parse database data:', error);
      }
    }
    
    // 如果数据库为空或数据无效，初始化数据库并填充真实业务数据
    setTimeout(() => {
      setCollectionItems(INITIAL_REAL_DATA);
      // 保存到数据库
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REAL_DATA));
      setLoading(false);
    }, 800);
  };

  // 数据库操作 - 保存数据
  const saveDataToStorage = (data: CollectionItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      console.log('数据已成功保存到数据库');
    } catch (error) {
      console.error('保存数据到数据库失败:', error);
      toast.error('数据保存失败，请稍后重试');
    }
  };
  
  // 导出数据功能
  const handleExportData = () => {
    try {
      // 获取当前筛选后的数据
      const dataToExport = filteredItems.length > 0 ? filteredItems : collectionItems;
      
      // 转换为CSV格式
      const csvHeaders = '项目名称,客户名称,总金额,服务费,扣除额,银行手续费,应付金额,耗时(天),状态,进度,预通知汇款日期,通知实际金额日期,确认收到汇款日期,核算应付金额日期,安排支付日期,实际支付日期,实际到账日期\n';
      
      const csvRows = dataToExport.map(item => {
        const dateValues = Object.values(item.dates).map(date => date || '');
        const values = [
          `"${item.projectName}"`,
          `"${item.clientName}"`,
          item.amount,
          item.serviceFeeAmount,
          item.deductionAmount,
          item.bankFeeAmount,
          item.payableAmount,
          item.duration,
          item.status,
          item.progress,
          ...dateValues
        ];
        return values.join(',');
      }).join('\n');
      
      const csvContent = csvHeaders + csvRows;
      
      // 创建并下载CSV文件
      const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      
      link.setAttribute('href', url);
      link.setAttribute('download', `代收项目数据_${new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')}.csv`);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('数据导出成功');
    } catch (error) {
      console.error('导出数据失败:', error);
      toast.error('数据导出失败，请稍后重试');
    }
  };
  // 应用筛选和排序
  const applyFiltersAndSorting = () => {
    let result = [...collectionItems];

    // 应用筛选
    if (filterOptions.status !== 'all') {
      result = result.filter(item => item.status === filterOptions.status);
    }

    if (filterOptions.searchTerm) {
      const searchTermLower = filterOptions.searchTerm.toLowerCase();
      result = result.filter(
        item => 
          item.projectName.toLowerCase().includes(searchTermLower) || 
          item.clientName.toLowerCase().includes(searchTermLower)
      );
    }

    // 应用排序
    if (sortField) {
      result.sort((a, b) => {
        let aValue: any;
        let bValue: any;
        
        if (sortField === 'projectName' || sortField === 'clientName') {
          aValue = a[sortField as keyof CollectionItem]?.toString().toLowerCase();
          bValue = b[sortField as keyof CollectionItem]?.toString().toLowerCase();
        } else if (sortField === 'amount' || sortField === 'serviceFeeAmount' || sortField === 'deductionAmount' || sortField === 'bankFeeAmount' || sortField === 'payableAmount' || sortField === 'duration') {
          aValue = a[sortField as keyof CollectionItem];
          bValue = b[sortField as keyof CollectionItem];
        } else if (sortField === 'status') {
           aValue = a.status;
           bValue = b.status;
         } else {
           // 默认按日期排序
           aValue = Object.values(a.dates).find(date => date !== null) || '';
           bValue = Object.values(b.dates).find(date => date !== null) || '';
         }
        
        if (aValue < bValue) {
          return sortOrder === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredItems(result);
  };

  // 处理筛选选项变更
  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilterOptions(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  // 处理排序请求
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // 处理分页
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // 渲染状态徽章
  const renderStatusBadge = (status: string) => {
    const statusMap: Record<string, { color: string, text: string, icon: React.ReactNode }> = {
      pending: { 
        color: 'bg-amber-100 text-amber-800 border-amber-200', 
        text: '待处理',
        icon: <Clock className="w-3 h-3 mr-1" />
      },
  inProgress: { 
    color: 'bg-blue-100 text-blue-800 border-blue-200', 
    text: '进行中',
    icon: <Clock className="w-3 h-3 mr-1" />
  },
      completed: { 
        color: 'bg-green-100 text-green-800 border-green-200', 
        text: '已完成',
        icon: <CheckCircle className="w-3 h-3 mr-1" />
      },
      delayed: {color: 'bg-red-100 text-red-800 border-red-200', 
        text: '已延迟',
        icon: <AlertCircle className="w-3 h-3 mr-1" />
      }
    };
    
    const statusInfo = statusMap[status] || statusMap.pending;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusInfo.color}`}>
        {statusInfo.icon}
        {statusInfo.text}
      </span>
    );
  };



  // 处理新增项目

  // 数据库操作 - 处理新增项目
  const handleAddItem = (data: Omit<CollectionItem, 'id'>) => {
    const newItem: CollectionItem = {
      ...data,
      id: generateId()
    };
    
    const updatedItems = [newItem, ...collectionItems];
    setCollectionItems(updatedItems);
    saveDataToStorage(updatedItems);
    setIsAddModalOpen(false);
    toast.success('项目添加成功，已保存到数据库');
  };

  // 数据库操作 - 处理编辑项目
  const handleEditItem = (data: Omit<CollectionItem, 'id'>) => {
    if (!selectedItem) return;
    
    const updatedItems = collectionItems.map(item => 
      item.id === selectedItem.id ? { ...data, id: selectedItem.id } : item
    );
    
    setCollectionItems(updatedItems);
    saveDataToStorage(updatedItems);
    setIsEditModalOpen(false);
    setSelectedItem(null);
    toast.success('项目更新成功，数据库已更新');
  };

  // 数据库操作 - 处理删除项目
  const handleDeleteItem = () => {
    if (!selectedItem) return;
    
    const updatedItems = collectionItems.filter(item => item.id !== selectedItem.id);
    setCollectionItems(updatedItems);
    saveDataToStorage(updatedItems);
    setIsDeleteConfirmOpen(false);
    setSelectedItem(null);
    // 如果删除的是当前页的最后一项，回到上一页
    if (currentItems.length === 1 && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
    toast.success('项目已从数据库中删除');
  };

  // 打开编辑模态框
  const openEditModal = (item: CollectionItem) => {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  };

  // 打开删除确认对话框
  const openDeleteConfirm = (item: CollectionItem) => {
    setSelectedItem(item);
    setIsDeleteConfirmOpen(true);
  };

  // 切换行展开状态
  const toggleRowExpand = (itemId: string) => {
    setExpandedRow(expandedRow === itemId ? null : itemId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            代收系统进度管理
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            实时监控和管理所有代收项目的关键时间节点与进度
          </p>
        </motion.div>

        {/* 控制面板 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 搜索框 */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="搜索项目名称或客户..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={filterOptions.searchTerm}
                onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
              />
            </div>
            
            {/* 状态筛选 */}
            <div className="relative">
              <select
                className="w-full pl-3 pr-10 py-2 border border-gray-300 dark:border-gray-600 rounded-lg appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={filterOptions.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
              >
                <option value="all">所有状态</option>
                <option value="pending">待处理</option>
                <option value="inProgress">进行中</option>
                <option value="completed">已完成</option>
                <option value="delayed">已延迟</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
            

          </div>
          
          {/* 操作按钮 */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center">
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                新增项目
              </button>
              
               <button 
              className="ml-3 flex items-center px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              onClick={handleExportData}
            >
              <Download className="w-4 h-4 mr-2" />
              导出数据
            </button>
            </div>
            
            <div className="text-sm text-gray-500 dark:text-gray-400">
              共 {filteredItems.length} 条记录
            </div>
          </div>
        </motion.div>

        {/* 数据展示区域 */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
            >
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-500 dark:text-gray-400">加载数据中...</p>
              </div>
            </motion.div>
          ) : filteredItems.length === 0 ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
            >
              <div className="text-center">
                <div className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600">
                  <AlertCircle className="w-full h-full" />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">暂无数据</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">没有符合条件的代收项目记录</p>
                <button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="mt-4 px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
                >
                  <Plus className="w-4 h-4 inline mr-2" />
                  新增项目
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="table"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              {/* 表格头部 */}
                  <div className="hidden md:block">
                          <div className="grid grid-cols-12 gap-3 px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750 font-medium text-gray-700 dark:text-gray-300 text-sm text-center">
                            <div className="col-span-1">#</div>
                            <div 
                              className="col-span-2 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-center"
                              onClick={() => handleSort('projectName')}
                            >
                              项目名称
                              {sortField === 'projectName' && (
                                <ArrowUpDown className={`ml-1 w-4 h-4 transition-transform ${sortOrder === 'desc' ? 'transform rotate-180' : ''}`} />
                              )}
                            </div>
                            <div className="col-span-1">客户名称</div>
                            <div 
                              className="col-span-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-center"
                              onClick={() => handleSort('amount')}
                            >
                              总金额
                              {sortField === 'amount' && (
                                <ArrowUpDown className={`ml-1 w-4 h-4 transition-transform ${sortOrder === 'desc' ? 'transform rotate-180' : ''}`} />
                              )}
                            </div>
                            <div className="col-span-1">服务费</div>
                            <div className="col-span-1">扣除额</div>
                            <div className="col-span-1">手续费</div>
                            <div 
                              className="col-span-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-center"
                              onClick={() => handleSort('payableAmount')}
                            >
                              应付金额
                              {sortField === 'payableAmount' && (
                                <ArrowUpDown className={`ml-1 w-4 h-4 transition-transform ${sortOrder === 'desc' ? 'transform rotate-180' : ''}`} />
                              )}
                            </div>
                            <div 
                              className="col-span-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-center"
                              onClick={() => handleSort('duration')}
                            >
                              耗时(天)
                              {sortField === 'duration' && (
                                <ArrowUpDown className={`ml-1 w-4 h-4 transition-transform ${sortOrder === 'desc' ? 'transform rotate-180' : ''}`} />
                              )}
                            </div>
                            <div 
                              className="col-span-1 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-center"
                              onClick={() => handleSort('status')}
                            >
                              状态
                              {sortField === 'status' && (
                                <ArrowUpDown className={`ml-1 w-4 h-4 transition-transform ${sortOrder === 'desc' ? 'transform rotate-180' : ''}`} />
                              )}
                            </div>
                            <div className="col-span-1">操作</div>
                          </div>
                  </div>

              {/* 表格内容 */}
              <div className="max-h-[calc(100vh-350px)] overflow-y-auto">
                {currentItems.map((item, index) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b border-gray-200 dark:border-gray-700 last:border-0"
                  >
                    {/* 移动设备视图 */}
                    <div className="md:hidden">
                      <div className="p-4 flex justify-between items-center">
                        <h3 className="font-medium text-gray-900 dark:text-white">{item.projectName}</h3>
                        <div className="flex items-center space-x-2">
                          {renderStatusBadge(item.status)}
                          <button
                            onClick={() => toggleRowExpand(item.id)}
                            className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 p-1"
                          >
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      
                      {/* 移动端展开的内容 */}
                      {expandedRow === item.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-4 pb-4 space-y-2 text-sm"
                        >
                           <p className="text-gray-600 dark:text-gray-300">
                             <span className="text-gray-500 dark:text-gray-400">客户:</span> {item.clientName}
                           </p>
                            <p className="text-gray-600 dark:text-gray-300">
                              <span className="text-gray-500 dark:text-gray-400">总金额:</span> {(item.amount || 0).toLocaleString()}
                            </p>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <p className="text-gray-600 dark:text-gray-300">
                                <span className="text-gray-500 dark:text-gray-400">服务费:</span> {(item.serviceFeeAmount || 0).toLocaleString()}
                              </p>
                              <p className="text-gray-600 dark:text-gray-300">
                                <span className="text-gray-500 dark:text-gray-400">扣除额:</span> {(item.deductionAmount || 0).toLocaleString()}
                              </p>
                              <p className="text-gray-600 dark:text-gray-300">
                                <span className="text-gray-500 dark:text-gray-400">手续费:</span> {(item.bankFeeAmount || 0).toLocaleString()}
                              </p>
                              <p className="text-gray-600 dark:text-gray-300 font-medium">
                                <span className="text-gray-500 dark:text-gray-400">应付金额:</span> {(item.payableAmount || 0).toLocaleString()}
                              </p>
                            </div>
                           <div className="mt-3"></div>
                          
                           {/* 移动端操作按钮 - 优化为不换行的紧凑布局 */}
                           <div className="flex space-x-2 mt-3">
                             <button
                               onClick={() => {
                                 openEditModal(item);
                                 setExpandedRow(null);
                               }}
                               className="flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                             >
                               <Edit className="w-3.5 h-3.5 mr-1" />
                               编辑
                             </button>
                             <button
                               onClick={() => {
                                 openDeleteConfirm(item);
                                 setExpandedRow(null);
                               }}
                               className="flex items-center justify-center px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
                             >
                               <Trash2 className="w-3.5 h-3.5 mr-1" />
                               删除
                             </button>
                           </div>
                        </motion.div>
                      )}
                    </div>
                     
                             {/* 桌面设备视图 - 确保所有数据除了关键流程时间线外都在同一行 */}
                             <div className="hidden md:grid md:grid-cols-12 md:gap-3 md:px-6 md:py-4 md:items-center transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-850">
                                {/* 序号 */}
                                <div className="col-span-1 text-center text-gray-500 dark:text-gray-400 font-medium whitespace-nowrap">{(currentPage - 1) * itemsPerPage + index + 1}</div>
                                
                                {/* 项目信息 */}
                                <div className="col-span-2 text-center font-medium text-gray-900 dark:text-white whitespace-nowrap truncate max-w-[120px]">{item.projectName}</div>
                                <div className="col-span-1 text-center text-gray-600 dark:text-gray-300 whitespace-nowrap truncate max-w-[100px]">{item.clientName}</div>
                                
                                {/* 金额信息 */}
                                <div className="col-span-1 text-center font-medium text-gray-900 dark:text-white whitespace-nowrap">{(item.amount || 0).toLocaleString()}</div>
                                <div className="col-span-1 text-center text-gray-900 dark:text-white whitespace-nowrap">{(item.serviceFeeAmount || 0).toLocaleString()}</div>
                                <div className="col-span-1 text-center text-gray-900 dark:text-white whitespace-nowrap">{(item.deductionAmount || 0).toLocaleString()}</div>
                                <div className="col-span-1 text-center text-gray-900 dark:text-white whitespace-nowrap">{(item.bankFeeAmount || 0).toLocaleString()}</div>
                                
                                {/* 关键信息 */}
                                <div className="col-span-1 text-center font-medium text-blue-600 dark:text-blue-400 whitespace-nowrap">{(item.payableAmount || 0).toLocaleString()}</div>
                                <div className="col-span-1 text-center font-medium text-purple-600 dark:text-purple-400 whitespace-nowrap">{item.duration || 0}天</div>
                                
                                {/* 状态 */}
                                <div className="col-span-1 flex justify-center items-center whitespace-nowrap">
                                  {renderStatusBadge(item.status)}
                                </div>
                                
                                {/* 操作按钮 */}
                                <div className="col-span-1 flex justify-center items-center space-x-1 whitespace-nowrap">
                                  <button
                                    onClick={() => openEditModal(item)}
                                    className="flex items-center justify-center w-7 h-7 rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-750 dark:hover:bg-gray-700 transition-colors duration-200"
                                    aria-label="编辑"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => openDeleteConfirm(item)}
                                    className="flex items-center justify-center w-7 h-7 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 dark:text-red-400 dark:bg-red-900/20 dark:hover:bg-red-900/30 transition-colors duration-200"
                                    aria-label="删除"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                             </div>
                     
                     {/* 关键流程时间线 - 单独一行显示 */}
                     <div className="hidden md:block px-6 pb-4">
                       <GanttChart item={item} />
                     </div>
                  </motion.div>
                ))}
              </div>

              {/* 分页控制 */}
              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750 flex justify-between items-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    显示 {(currentPage - 1) * itemsPerPage + 1} 到 {Math.min(indexOfLastItem, filteredItems.length)} 项，共 {filteredItems.length} 项
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`px-3 py-1 rounded border ${
                        currentPage === 1 
                          ? 'border-gray-200 bg-white text-gray-400 cursor-not-allowed dark:border-gray-600 dark:bg-gray-800' 
                          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                    >
                      上一页
                    </button>
                    
                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                      // 简单的分页逻辑，显示当前页及前后几页
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className={`px-3 py-1 rounded border ${
                            currentPage === pageNum 
                              ? 'border-blue-500 bg-blue-50 text-blue-600 dark:border-blue-400 dark:bg-blue-900 dark:text-blue-300' 
                              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                    
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1 rounded border transition-all duration-200 ${
                        currentPage === totalPages 
                          ? 'border-gray-200 bg-white text-gray-400 cursor-not-allowed dark:border-gray-600 dark:bg-gray-800' 
                          : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                      }`}
                    >
                      下一页
                    </button>
                 </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* 新增项目模态框 */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="新增代收项目"
      >
        <CollectionForm
          initialData={null}
          onSubmit={handleAddItem}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>
      
      {/* 编辑项目模态框 */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedItem(null);
        }}
        title="编辑代收项目"
      >
        <CollectionForm
          initialData={selectedItem || null}
          onSubmit={handleEditItem}
          onCancel={() => {
            setIsEditModalOpen(false);
            setSelectedItem(null);
          }}
        />
      </Modal>
      
      {/* 删除确认对话框 */}
      <ConfirmDialog
        isOpen={isDeleteConfirmOpen}
        onClose={() => {
          setIsDeleteConfirmOpen(false);
          setSelectedItem(null);
        }}
        onConfirm={handleDeleteItem}
        title="确认删除"
        message={`确定要删除项目"${selectedItem?.projectName || ''}"吗？此操作将从数据库中永久删除该记录。`}
        confirmText="删除"
        cancelText="取消"
        danger={true}
      />
    </div>
  );
}

export default CollectionSystem;