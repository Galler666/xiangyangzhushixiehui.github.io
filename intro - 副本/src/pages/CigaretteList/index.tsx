import React, { useState } from 'react';
import { Row, Col, Card, Button, Select, Input, Slider } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Cigarette } from '../../types';

const { Option } = Select;
const { Search } = Input;

const CigaretteList: React.FC = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  
  const { cigarettes, brands, categories } = useSelector(
    (state: RootState) => state.cigarette
  );

  const filteredCigarettes = cigarettes.filter((cig: Cigarette) => {
    return (
      (!selectedBrand || cig.brand === selectedBrand) &&
      (!selectedCategory || cig.category === selectedCategory) &&
      cig.price >= priceRange[0] &&
      cig.price <= priceRange[1]
    );
  });

  return (
    <div className="cigarette-list">
      {/* 筛选器 */}
      <div className="filters">
        <Row gutter={16}>
          <Col span={6}>
            <Select
              placeholder="Select Brand / 选择品牌"
              style={{ width: '100%' }}
              onChange={setSelectedBrand}
              allowClear
            >
              {brands.map(brand => (
                <Option key={brand} value={brand}>{brand}</Option>
              ))}
            </Select>
          </Col>
          <Col span={6}>
            <Select
              placeholder="Select Category / 选择类别"
              style={{ width: '100%' }}
              onChange={setSelectedCategory}
              allowClear
            >
              {categories.map(category => (
                <Option key={category} value={category}>
                  {category === 'regular' && 'Regular / 常规'}
                  {category === 'menthol' && 'Menthol / 薄荷'}
                  {category === 'light' && 'Light / 轻型'}
                  {category === 'premium' && 'Premium / 高级'}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={12}>
            <div>Price Range / 价格区间: ¥{priceRange[0]} - ¥{priceRange[1]}</div>
            <Slider
              range
              min={0}
              max={10000}
              value={priceRange}
              onChange={setPriceRange}
            />
          </Col>
        </Row>
      </div>

      {/* 商品列表 */}
      <Row gutter={[16, 16]}>
        {filteredCigarettes.map((cigarette: Cigarette) => (
          <Col xs={24} sm={12} md={8} lg={6} key={cigarette.id}>
            <Card
              hoverable
              cover={<img alt={cigarette.name} src={cigarette.images[0]} />}
              actions={[
                <Button type="primary">Add to Cart / 加入购物车</Button>
              ]}
            >
              <Card.Meta
                title={cigarette.name}
                description={
                  <>
                    <div>Price / 价格: ¥{cigarette.price.toLocaleString()}</div>
                    <div>Brand / 品牌: {cigarette.brand}</div>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CigaretteList; 