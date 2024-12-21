import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Steps, 
  Radio, 
  Typography, 
  Divider,
  message,
  Space,
  Alert
} from 'antd';
import { RootState } from '../../store';
import { clearCart } from '../../store/slices/cartSlice';
import { addTransaction } from '../../store/slices/tokenSlice';
import styles from './Checkout.module.scss';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;
const { Step } = Steps;

interface DeliveryInfo {
  fullName: string;
  phone: string;
  address: string;
  zipCode: string;
}

const Checkout: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { items } = useSelector((state: RootState) => state.cart);
  const { cigarettes } = useSelector((state: RootState) => state.cigarette);
  const { balance } = useSelector((state: RootState) => state.token);

  const cartItems = items.map(item => {
    const cigarette = cigarettes.find(c => c.id === item.cigaretteId);
    return {
      ...item,
      cigarette,
      total: (cigarette?.price || 0) * item.quantity,
    };
  });

  const totalAmount = cartItems.reduce((sum, item) => sum + item.total, 0);
  const tokenAmount = totalAmount; // 1元 = 1代币

  const handleDeliverySubmit = (values: DeliveryInfo) => {
    setDeliveryInfo(values);
    setCurrentStep(1);
  };

  const handleTokenPayment = async () => {
    if (!balance || balance.amount < tokenAmount) {
      message.error('Insufficient token balance / 代币余额不足');
      return;
    }

    try {
      // 创建订单
      dispatch(addTransaction({
        id: Date.now().toString(),
        userId: '1', // 应该从auth state获取
        amount: tokenAmount,
        type: 'purchase',
        status: 'completed',
        createdAt: new Date().toISOString(),
      }));
      
      message.success('Payment successful / 支付成功');
      dispatch(clearCart());
      navigate('/orders');
    } catch (error) {
      message.error('Payment failed / 支付失败');
    }
  };

  const steps = [
    {
      title: 'Delivery Info / 配送信息',
      content: (
        <Form layout="vertical" onFinish={handleDeliverySubmit}>
          <Form.Item
            label="Full Name / 姓名"
            name="fullName"
            rules={[{ required: true, message: 'Please enter your name / 请输入姓名' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone / 电话"
            name="phone"
            rules={[{ required: true, message: 'Please enter your phone number / 请输入电话号码' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="ZIP Code / 邮编"
            name="zipCode"
            rules={[{ required: true, message: 'Please enter ZIP code / 请输入邮编' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Address / 地址"
            name="address"
            rules={[{ required: true, message: 'Please enter your address / 请输入地址' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            Next / 下一步
          </Button>
        </Form>
      ),
    },
    {
      title: 'Confirm Order / 确认订单',
      content: (
        <div>
          <Card title="Order Details / 订单详情">
            {cartItems.map((item) => (
              <div key={item.cigaretteId} className={styles.orderItem}>
                <Text>{item.cigarette?.name}</Text>
                <Text>×{item.quantity}</Text>
                <Text>¥{item.total.toLocaleString()}</Text>
              </div>
            ))}
            <Divider />
            <div className={styles.totalAmount}>
              <div>
                <Text strong>Total Amount / 总金额：</Text>
                <Text strong>¥{totalAmount.toLocaleString()}</Text>
              </div>
              <div>
                <Text strong>Required Tokens / 所需代币：</Text>
                <Text strong>{tokenAmount}</Text>
              </div>
              <div>
                <Text>Current Balance / 当前余额：</Text>
                <Text>{balance?.amount || 0}</Text>
              </div>
            </div>
          </Card>
          
          {balance?.amount < tokenAmount ? (
            <Alert
              message="Insufficient balance / 余额不足"
              description={
                <Space>
                  <Text>Please recharge first / 请先充值</Text>
                  <Button type="primary" onClick={() => navigate('/recharge')}>
                    Recharge / 去充值
                  </Button>
                </Space>
              }
              type="warning"
              showIcon
              style={{ marginTop: 16 }}
            />
          ) : (
            <Button 
              type="primary" 
              block 
              onClick={handleTokenPayment}
              style={{ marginTop: 24 }}
            >
              Pay with Tokens / 使用代币支付
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className={styles.checkoutPage}>
      <Title level={2}>Checkout / 结算</Title>
      
      <Steps current={currentStep} className={styles.steps}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>

      <Card className={styles.content}>
        {steps[currentStep].content}
      </Card>
    </div>
  );
};

export default Checkout; 