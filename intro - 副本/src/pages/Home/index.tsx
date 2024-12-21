import React from 'react';
import { Typography, Row, Col, Card, Button, Carousel } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Cigarette } from '../../types';
import LoginForm from '../../components/Auth/LoginForm';

const { Title, Text } = Typography;
const { Meta } = Card;

const Home: React.FC = () => {
  const { hotProducts } = useSelector((state: RootState) => state.cigarette);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <div className="home-container">
      {/* 欢迎横幅 */}
      <Carousel autoplay>
        <div>
          <div className="banner">
            <Title>向阳株式協会へようこそ</Title>
            <Text>厳選された高品質なタバコ製品を世界中からお届けします</Text>
          </div>
        </div>
      </Carousel>

      {/* 热门商品 */}
      <section className="hot-products">
        <Title level={2}>人気商品</Title>
        <Row gutter={[16, 16]}>
          {hotProducts.map((product: Cigarette) => (
            <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
              <Card
                hoverable
                cover={<img alt={product.name} src={product.images[0]} />}
                actions={[
                  <Button type="primary">カートに追加</Button>
                ]}
              >
                <Meta
                  title={product.name}
                  description={`¥${product.price.toLocaleString()}`}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      {/* 登录表单 */}
      {!isAuthenticated && (
        <section className="login-section">
          <Card title="ログイン">
            <LoginForm />
          </Card>
        </section>
      )}

      {/* 促销信息 */}
      <section className="promotions">
        <Title level={2}>キャンペーン情報</Title>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card>
              <Meta
                title="新規会員登録で10%オフ"
                description="新規会員登録で次回のお買い物が10%オフになります"
              />
            </Card>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default Home; 