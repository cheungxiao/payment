import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, DollarSign, BarChart3, Settings, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const features = [
    {
      title: "代收系统管理",
      description: "实时监控和管理所有代收项目的关键时间节点与进度",
      icon: <DollarSign className="w-6 h-6" />,
      route: "/"
    },
    {
      title: "数据分析报表",
      description: "生成详细的数据分析报表，助力业务决策",
      icon: <BarChart3 className="w-6 h-6" />,
      route: "/analytics"
    },
    {
      title: "客户关系管理",
      description: "管理代收客户信息，维护良好的合作关系",
      icon: <Users className="w-6 h-6" />,
      route: "/customers"
    },
    {
      title: "系统设置",
      description: "自定义系统参数，优化工作流程",
      icon: <Settings className="w-6 h-6" />,
      route: "/settings"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            企业代收管理系统
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            高效管理您的代收业务流程，实时监控关键时间节点与进度
          </p>
        </motion.div>

        {/* 主要功能区域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{feature.description}</p>
              <Link 
                to={feature.route}
                className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
              >
                前往查看
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* 快速操作 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">快速操作</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-200">
              <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">查看今日日程</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">查看和管理今日代收任务</p>
              </div>
            </button>
            <button className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-200">
              <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">新增代收项目</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">创建新的代收任务</p>
              </div>
            </button>
            <button className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-200">
              <BarChart3 className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-3" />
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">生成月度报表</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">查看当月代收业务统计</p>
              </div>
            </button>
          </div>
        </motion.div>

        {/* 底部 */}
        <footer className="text-center text-gray-500 dark:text-gray-400 text-sm">
          <p>© 2025 企业代收管理系统. 保留所有权利.</p>
        </footer>
      </div>
    </div>
  );
}