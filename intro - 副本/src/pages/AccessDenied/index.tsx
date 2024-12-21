import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const AccessDenied: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="403"
      title="Access Denied / 访问被拒绝"
      subTitle="Please access through our partner sites / 请通过我们的合作网站访问"
      extra={
        <Button type="primary" onClick={() => navigate('/')}>
          Back / 返回
        </Button>
      }
    />
  );
};

export default AccessDenied; 