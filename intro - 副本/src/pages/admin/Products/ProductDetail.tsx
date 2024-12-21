import React from 'react';
import { Modal, Descriptions, Image, Tag, Typography } from 'antd';
import { Cigarette } from '../../../types';
import styles from './ProductDetail.module.scss';

const { Title } = Typography;

interface ProductDetailProps {
  cigarette: Cigarette | null;
  visible: boolean;
  onClose: () => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  cigarette,
  visible,
  onClose,
}) => {
  if (!cigarette) return null;

  return (
    <Modal
      title={<Title level={4}>Product Details / 商品详情</Title>}
      open={visible}
      onCancel={onClose}
      width={800}
      footer={null}
    >
      <div className={styles.detailContent}>
        <div className={styles.imageSection}>
          <Image.PreviewGroup>
            {cigarette.images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`${cigarette.name}-${index}`}
                className={styles.productImage}
              />
            ))}
          </Image.PreviewGroup>
        </div>

        <Descriptions bordered column={2}>
          <Descriptions.Item label="Name / 名称" span={2}>
            {cigarette.name}
          </Descriptions.Item>
          <Descriptions.Item label="Brand / 品牌">
            {cigarette.brand}
          </Descriptions.Item>
          <Descriptions.Item label="Category / 分类">
            {cigarette.category}
          </Descriptions.Item>
          <Descriptions.Item label="Price / 价格">
            ¥{cigarette.price.toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="Stock / 库存">
            <Tag color={cigarette.stock < 10 ? 'red' : cigarette.stock < 50 ? 'orange' : 'green'}>
              {cigarette.stock}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Origin / 产地" span={2}>
            {cigarette.origin}
          </Descriptions.Item>
          <Descriptions.Item label="Nicotine / 尼古丁">
            {cigarette.nicotineContent}
          </Descriptions.Item>
          <Descriptions.Item label="Tar / 焦油">
            {cigarette.tarContent}
          </Descriptions.Item>
          <Descriptions.Item label="Package Size / 包装数量">
            {cigarette.packageSize}支/包
          </Descriptions.Item>
          <Descriptions.Item label="Created / 创建时间">
            {new Date(cigarette.createdAt).toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="Description / 描述" span={2}>
            {cigarette.description}
          </Descriptions.Item>
        </Descriptions>
      </div>
    </Modal>
  );
};

export default ProductDetail; 