// 定义代收项目的类型
export interface CollectionItem {
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
    actualArrivalDate: string | null;
  };
}