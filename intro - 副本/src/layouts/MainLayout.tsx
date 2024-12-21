import React from 'react';
import { Layout, ConfigProvider } from 'antd';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const { Content } = Layout;

const MainLayout: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#c41d7f', // Sunward Association theme color
        },
      }}
    >
      <Layout className="main-layout">
        <Header />
        <Content className="main-content">
          <div className="content-wrapper">
            <Outlet />
          </div>
        </Content>
        <Footer />
      </Layout>
    </ConfigProvider>
  );
};

export default MainLayout; 