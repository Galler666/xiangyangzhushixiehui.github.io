import React from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/authSlice';
import styles from './LoginForm.module.scss';

interface LoginFormData {
  username: string;
  password: string;
  remember: boolean;
}

const LoginForm: React.FC = () => {
  const dispatch = useDispatch();

  const onFinish = async (values: LoginFormData) => {
    try {
      // TODO: 实际项目中这里需要调用API
      const mockUser = {
        id: '1',
        username: values.username,
        email: 'user@example.com',
        role: 'user' as const,
        dateOfBirth: '1990-01-01',
        isAgeVerified: true,
        createdAt: new Date().toISOString(),
      };
      
      dispatch(setUser(mockUser));
      message.success('Login successful / 登录成功');
    } catch (error) {
      message.error('Login failed / 登录失败');
    }
  };

  return (
    <div className={styles.loginForm}>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        size="large"
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please enter username / 请输入用户名' }]}
        >
          <Input 
            prefix={<UserOutlined />} 
            placeholder="Username / 用户名" 
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please enter password / 请输入密码' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password / 密码"
          />
        </Form.Item>

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me / 记住我</Checkbox>
          </Form.Item>

          <a className={styles.forgotPassword} href="/forgot-password">
            Forgot password? / 忘记密码？
          </a>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Login / 登录
          </Button>
        </Form.Item>

        <div className={styles.register}>
          <span>Don't have an account? / 还没有账号？</span>
          <a href="/register">Register / 注册</a>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm; 