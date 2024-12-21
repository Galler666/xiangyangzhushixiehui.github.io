import React, { useState } from 'react';
import { Layout, Menu, Typography, Avatar, Dropdown } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  DashboardOutlined,
  ShopOutlined,
  OrderedListOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
import styles from './AdminLayout.module.scss';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuItems = [
    {
      key: '/admin',
      icon: <DashboardOutlined />,
      label: 'Dashboard / 仪表盘',
    },
    {
      key: '/admin/cigarettes',
      icon: <ShopOutlined />,
      label: 'Products / 商品管理',
    },
    {
      key: '/admin/orders',
      icon: <OrderedListOutlined />,
      label: 'Orders / 订单管理',
    },
    {
      key: '/admin/users',
      icon: <UserOutlined />,
      label: 'Users / 用户管理',
    },
    {
      key: '/admin/settings',
      icon: <SettingOutlined />,
      label: 'Settings / 设置',
    },
  ];

  const handleMenuClick = (key: string) => {
    navigate(key);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className={styles.logo}>
          <Title level={4} style={{ color: 'white' }}>
            {collapsed ? 'SWA' : 'SWA Admin'}
          </Title>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['/admin']}
          items={menuItems}
          onClick={({ key }) => handleMenuClick(key)}
        />
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <div className={styles.headerRight}>
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'logout',
                    icon: <LogoutOutlined />,
                    label: 'Logout / 退出',
                    onClick: handleLogout,
                  },
                ],
              }}
            >
              <Avatar icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </Header>
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout; 