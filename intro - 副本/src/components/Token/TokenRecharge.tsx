import React, { useState } from 'react';
import { Card, InputNumber, Button, Upload, message, Tabs, Space, Typography, Radio } from 'antd';
import { QrcodeOutlined, UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addTransaction } from '../../store/slices/tokenSlice';
import styles from './TokenRecharge.module.scss';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const TokenRecharge: React.FC = () => {
  const [amount, setAmount] = useState<number>(100);
  const [paymentMethod, setPaymentMethod] = useState<'alipay' | 'wechat'>('alipay');
  const [paymentCode, setPaymentCode] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const { balance } = useSelector((state: RootState) => state.token);

  const handleGetPaymentCode = async () => {
    try {
      // TODO: 调用后端API获取支付二维码
      const mockPaymentCode = 'mock_qr_code_url';
      setPaymentCode(mockPaymentCode);
      
      // 创建充值交易记录
      dispatch(addTransaction({
        id: Date.now().toString(),
        userId: '1', // 应该从auth state获取
        amount,
        type: 'deposit',
        status: 'pending',
        createdAt: new Date().toISOString(),
      }));
    } catch (error) {
      message.error('Failed to generate payment code / 生成支付码失败');
    }
  };

  const handleUploadProof = async (file: File) => {
    try {
      setUploading(true);
      // TODO: 上传支付凭证到后端
      message.success('Payment proof uploaded successfully / 支付凭证上传成功');
    } catch (error) {
      message.error('Failed to upload payment proof / 上传支付凭证失败');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className={styles.rechargeCard}>
      <Title level={3}>Token Recharge / 代币充值</Title>
      <Text>Current Balance / 当前余额: {balance?.amount || 0} Tokens</Text>

      <div className={styles.rechargeForm}>
        <div className={styles.amountSection}>
          <Text>Amount / 充值金额</Text>
          <InputNumber
            min={10}
            max={10000}
            value={amount}
            onChange={value => setAmount(value || 0)}
            style={{ width: '100%' }}
            addonAfter="CNY"
          />
          <Text type="secondary">
            Will receive {amount} tokens / 将获得 {amount} 代币
          </Text>
        </div>

        <div className={styles.paymentSection}>
          <Text>Payment Method / 支付方式</Text>
          <Radio.Group
            value={paymentMethod}
            onChange={e => setPaymentMethod(e.target.value)}
          >
            <Radio.Button value="alipay">Alipay / 支付宝</Radio.Button>
            <Radio.Button value="wechat">WeChat Pay / 微信支付</Radio.Button>
          </Radio.Group>
        </div>

        <Button
          type="primary"
          icon={<QrcodeOutlined />}
          onClick={handleGetPaymentCode}
          block
        >
          Generate Payment Code / 生成支付码
        </Button>

        {paymentCode && (
          <div className={styles.qrCodeContainer}>
            <img src={paymentCode} alt="Payment QR Code" />
            <Text>Scan to Pay / 扫码支付</Text>
          </div>
        )}

        <Upload
          accept="image/*"
          beforeUpload={handleUploadProof}
          showUploadList={false}
        >
          <Button
            icon={<UploadOutlined />}
            loading={uploading}
            block
          >
            Upload Payment Proof / 上传支付凭证
          </Button>
        </Upload>
      </div>
    </Card>
  );
};

export default TokenRecharge; 