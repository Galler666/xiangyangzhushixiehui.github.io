import React from 'react';
import { Form, DatePicker, Button, Alert, Typography, Card, message } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { verifyAge } from '../../store/slices/authSlice';

const { Title, Text } = Typography;

const AgeVerification: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    const birthDate = moment(values.dateOfBirth);
    const age = moment().diff(birthDate, 'years');
    
    if (age >= 18) {
      dispatch(verifyAge(true));
      navigate('/', { replace: true });
    } else {
      message.error('Must be 18 or older to access this site');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '50px auto', padding: '0 20px' }}>
      <Card>
        <Title level={2}>Age Verification / 年龄验证</Title>
        <Text>
          This website sells tobacco products and requires age verification.
          You must be 18 or older to continue.
          <br />
          本网站销售烟草制品，需要进行年龄验证。
          您必须年满18岁才能继续访问。
        </Text>
        
        <Form onFinish={onFinish} layout="vertical" style={{ marginTop: 24 }}>
          <Form.Item
            name="dateOfBirth"
            label="Date of Birth / 出生日期"
            rules={[{ required: true, message: 'Please enter your date of birth / 请输入出生日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Verify / 验证
            </Button>
          </Form.Item>
        </Form>
        
        <Alert
          message="Warning / 警告"
          description="Purchase by minors is strictly prohibited by law / 法律严禁未成年人购买"
          type="warning"
          showIcon
        />
      </Card>
    </div>
  );
};

export default AgeVerification; 