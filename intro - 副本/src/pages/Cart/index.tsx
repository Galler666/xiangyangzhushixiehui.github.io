import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Table, Button, InputNumber, Card, Typography, Space, message } from 'antd';
import { DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { RootState } from '../../store';
import { removeFromCart, updateQuantity } from '../../store/slices/cartSlice';
import styles from './Cart.module.scss';

const { Title, Text } = Typography;

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state: RootState) => state.cart);
  const { cigarettes } = useSelector((state: RootState) => state.cigarette);

  const cartItems = items.map(item => {
    const cigarette = cigarettes.find(c => c.id === item.cigaretteId);
    return {
      ...item,
      cigarette,
      total: (cigarette?.price || 0) * item.quantity,
    };
  });

  const totalAmount = cartItems.reduce((sum, item) => sum + item.total, 0);

  const columns = [
    {
      title: 'Product / 商品',
      dataIndex: 'cigarette',
      render: (cigarette: any) => (
        <div className={styles.productCell}>
          <img src={cigarette.images[0]} alt={cigarette.name} />
          <div className={styles.productInfo}>
            <div className={styles.productName}>{cigarette.name}</div>
            <div className={styles.productBrand}>{cigarette.brand}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Unit Price / 单价',
      dataIndex: 'cigarette',
      render: (cigarette: any) => `¥${cigarette.price.toLocaleString()}`,
    },
    {
      title: 'Quantity / 数量',
      dataIndex: 'quantity',
      render: (quantity: number, record: any) => (
        <InputNumber
          min={1}
          max={record.cigarette.stock}
          value={quantity}
          onChange={(value) => handleQuantityChange(record.cigaretteId, value)}
        />
      ),
    },
    {
      title: 'Subtotal / 小计',
      dataIndex: 'total',
      render: (total: number) => `¥${total.toLocaleString()}`,
    },
    {
      title: 'Action / 操作',
      key: 'action',
      render: (record: any) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleRemove(record.cigaretteId)}
        >
          Delete / 删除
        </Button>
      ),
    },
  ];

  const handleQuantityChange = (cigaretteId: string, quantity: number | null) => {
    if (quantity) {
      dispatch(updateQuantity({ cigaretteId, quantity }));
    }
  };

  const handleRemove = (cigaretteId: string) => {
    dispatch(removeFromCart(cigaretteId));
    message.success('Item removed successfully / 商品已删除');
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      message.warning('Cart is empty / 购物车为空');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className={styles.cartPage}>
      <Title level={2}>
        <ShoppingCartOutlined /> Shopping Cart / 购物车
      </Title>

      <Card className={styles.cartTable}>
        <Table
          columns={columns}
          dataSource={cartItems}
          rowKey="cigaretteId"
          pagination={false}
        />
      </Card>

      <Card className={styles.cartSummary}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div className={styles.totalAmount}>
            <Text>Total Amount / 总金额：</Text>
            <Text strong className={styles.amount}>
              ¥{totalAmount.toLocaleString()}
            </Text>
          </div>
          <Button
            type="primary"
            size="large"
            block
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout / 去结算 ({cartItems.length} items)
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default Cart; 