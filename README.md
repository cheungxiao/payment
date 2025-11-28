# 代收系统进度管理

一个基于React + TypeScript + Tailwind CSS + Vite的代收项目管理系统，用于实时监控和管理所有代收项目的关键时间节点与进度。

## 技术栈

- React 18+
- TypeScript
- Tailwind CSS
- Vite
- React Router
- Framer Motion
- Recharts

## 部署指南

### Vercel 部署

当在Vercel上部署此项目时，建议选择以下设置：

1. **Framework Preset**: 选择 `Vite`
2. **Root Directory**: 保持默认 (通常为 `/`)
3. **Build Command**: 保持默认或设置为 `npm run build`
4. **Output Directory**: 保持默认或设置为 `dist`

Vite预设将自动识别项目结构并应用适当的构建配置，确保项目能够正确构建和部署。

## 功能特性

- 代收项目的CRUD操作
- 项目状态实时监控
- 关键流程时间线可视化
- 数据筛选和排序
- 数据导出功能
- 响应式设计，支持移动端和桌面端

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 构建

```bash
# 构建生产版本
npm run build
```
