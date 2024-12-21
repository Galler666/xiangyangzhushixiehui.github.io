import React from 'react';
import { Row, Col, Card, Statistic, Typography } from 'antd';
import {
  ShoppingCartOutlined,
  UserOutlined,
  DollarOutlined,
  ShopOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import styles from './Dashboard.module.scss';

const { Title } = Typography;

const Dashboard: React.FC = () => {
  const { orders } = useSelector((state: RootState) => state.order);
  const { users } = useSelector((state: RootState) => state.user);
  const { cigarettes } = useSelector((state: RootState) => state.cigarette);

  // 计算统计数据
  const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
  const totalOrders = orders.length;
  const totalUsers = users.length;
  const lowStockProducts = cigarettes.filter(c => c.stock < 10).length;

  return (
    <div className={styles.dashboard}>
      <Title level={2}>Dashboard / 仪表盘</Title>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Sales / 总销售额"
              value={totalSales}
              prefix="¥"
              valueStyle={{ color: '#3f8600' }}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Orders / 总订单数"
              value={totalOrders}
              valueStyle={{ color: '#cf1322' }}
              prefix={<ShoppingCartOutlined />}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Users / 用户数量"
              value={totalUsers}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Low Stock / 库存不足"
              value={lowStockProducts}
              valueStyle={{ color: '#faad14' }}
              prefix={<ShopOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* 可以添加图表等其他统计信息 */}
    </div>
  );
};

export default Dashboard; 