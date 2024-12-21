import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Button, InputNumber, Typography, Image, message } from 'antd';
import { addToCart } from '../../store/slices/cartSlice';
import { RootState } from '../../store';

const { Title, Text } = Typography;

const CigaretteDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const cigarette = useSelector((state: RootState) =>
    state.cigarette.cigarettes.find(c => c.id === id)
  );

  const handleAddToCart = () => {
    dispatch(addToCart({ cigaretteId: id, quantity }));
    message.success('Added to cart successfully / 已添加到购物车');
  };

  if (!cigarette) {
    return <div>Product not found / 商品未找到</div>;
  }

  return (
    <div className="cigarette-detail">
      <Row gutter={32}>
        <Col span={12}>
          <Image.PreviewGroup>
            <Row gutter={[16, 16]}>
              {cigarette.images.map((image, index) => (
                <Col span={index === 0 ? 24 : 8} key={image}>
                  <Image src={image} alt={`${cigarette.name}-${index}`} />
                </Col>
              ))}
            </Row>
          </Image.PreviewGroup>
        </Col>
        
        <Col span={12}>
          <Card>
            <Title level={2}>{cigarette.name}</Title>
            <Text strong>Brand / 品牌: {cigarette.brand}</Text>
            <div className="price">
              <Title level={3}>Price / 价格: ¥{cigarette.price.toLocaleString()}</Title>
            </div>
            
            <div className="description">
              <Title level={4}>Description / 商品描述</Title>
              <Text>{cigarette.description}</Text>
            </div>
            
            <div className="specifications">
              <Title level={4}>Specifications / 规格</Title>
              <Row>
                <Col span={12}>
                  <Text>Nicotine / 尼古丁: {cigarette.nicotineContent}</Text>
                </Col>
                <Col span={12}>
                  <Text>Tar / 焦油: {cigarette.tarContent}</Text>
                </Col>
              </Row>
              <Text>Origin / 产地: {cigarette.origin}</Text>
            </div>
            
            <div className="purchase-options">
              <div className="quantity">
                <Text>Quantity / 数量: </Text>
                <InputNumber
                  min={1}
                  max={cigarette.stock}
                  value={quantity}
                  onChange={value => setQuantity(value)}
                />
              </div>
              
              <Button
                type="primary"
                size="large"
                block
                onClick={handleAddToCart}
                disabled={cigarette.stock === 0}
              >
                {cigarette.stock > 0 ? 'Add to Cart / 加入购物车' : 'Out of Stock / 缺货'}
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CigaretteDetail; 