import React from 'react';
import { Table, Tag, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { TokenTransaction } from '../../types';
import moment from 'moment';

const { Title } = Typography;

const TokenHistory: React.FC = () => {
  const { transactions } = useSelector((state: RootState) => state.token);

  const columns = [
    {
      title: 'Date / 日期',
      dataIndex: 'createdAt',
      render: (date: string) => moment(date).format('YYYY-MM-DD HH:mm'),
    },
    {
      title: 'Type / 类型',
      dataIndex: 'type',
      render: (type: TokenTransaction['type']) => (
        <Tag color={type === 'deposit' ? 'green' : 'blue'}>
          {type === 'deposit' ? 'Deposit / 充值' : 'Purchase / 消费'}
        </Tag>
      ),
    },
    {
      title: 'Amount / 金额',
      dataIndex: 'amount',
      render: (amount: number, record: TokenTransaction) => (
        <span style={{ color: record.type === 'deposit' ? 'green' : 'red' }}>
          {record.type === 'deposit' ? '+' : '-'}{amount}
        </span>
      ),
    },
    {
      title: 'Status / 状态',
      dataIndex: 'status',
      render: (status: TokenTransaction['status']) => (
        <Tag color={
          status === 'completed' ? 'green' :
          status === 'pending' ? 'orange' : 'red'
        }>
          {status === 'completed' ? 'Completed / 已完成' :
           status === 'pending' ? 'Pending / 处理中' : 'Failed / 失败'}
        </Tag>
      ),
    },
  ];

  return (
    <div>
      <Title level={3}>Token Transaction History / 代币交易记录</Title>
      <Table
        columns={columns}
        dataSource={transactions}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default TokenHistory; 