import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  Upload,
  message,
  Tag,
  Popconfirm,
  Menu,
  Dropdown,
  DownOutlined,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UploadOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import {
  addCigarette,
  updateCigarette,
  deleteCigarette,
  setLoading,
  setError,
} from '../../../store/slices/cigaretteSlice';
import { Cigarette } from '../../../types';
import styles from './Products.module.scss';
import ProductDetail from './ProductDetail';

const { Option } = Select;

const Products: React.FC = () => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [detailVisible, setDetailVisible] = useState(false);
  const [currentCigarette, setCurrentCigarette] = useState<Cigarette | null>(null);

  const dispatch = useDispatch();
  const { cigarettes, loading } = useSelector((state: RootState) => state.cigarette);

  // 批量操作菜单
  const batchActionMenu = (
    <Menu>
      <Menu.Item 
        key="delete" 
        icon={<DeleteOutlined />}
        onClick={() => handleBatchDelete()}
        danger
      >
        Batch Delete / 批量删除
      </Menu.Item>
      <Menu.Item 
        key="updateStock" 
        icon={<EditOutlined />}
        onClick={() => handleBatchUpdateStock()}
      >
        Update Stock / 更新库存
      </Menu.Item>
    </Menu>
  );

  // 批量删除
  const handleBatchDelete = () => {
    Modal.confirm({
      title: 'Batch Delete / 批量删除',
      content: `Are you sure to delete ${selectedRows.length} items? / 确定要删除${selectedRows.length}个商品吗？`,
      okText: 'Yes / 是',
      cancelText: 'No / 否',
      onOk: async () => {
        try {
          await Promise.all(selectedRows.map(id => dispatch(deleteCigarette(id))));
          message.success('Batch delete successful / 批量删除成功');
          setSelectedRows([]);
        } catch (error) {
          message.error('Batch delete failed / 批量删除失败');
        }
      },
    });
  };

  // 批量更新库存
  const handleBatchUpdateStock = () => {
    Modal.confirm({
      title: 'Update Stock / 更新库存',
      content: (
        <div>
          <InputNumber
            min={0}
            placeholder="Enter stock quantity / 输入库存数量"
            onChange={value => setStockValue(value)}
          />
        </div>
      ),
      onOk: async () => {
        try {
          await Promise.all(
            selectedRows.map(id =>
              dispatch(updateCigarette({ 
                id, 
                formData: new FormData().append('stock', stockValue) 
              }))
            )
          );
          message.success('Stock updated successfully / 库存更新成功');
          setSelectedRows([]);
        } catch (error) {
          message.error('Failed to update stock / 库存更新失败');
        }
      },
    });
  };

  // 查看详情
  const handleViewDetail = (record: Cigarette) => {
    setCurrentCigarette(record);
    setDetailVisible(true);
  };

  // 表格选择配置
  const rowSelection = {
    selectedRowKeys: selectedRows,
    onChange: (selectedRowKeys: string[]) => {
      setSelectedRows(selectedRowKeys);
    },
  };

  // 表格列定义
  const columns = [
    {
      title: 'Product / 商品',
      dataIndex: 'name',
      render: (text: string, record: Cigarette) => (
        <div className={styles.productCell}>
          <img src={record.images[0]} alt={text} className={styles.productImage} />
          <div>
            <div className={styles.productName}>{text}</div>
            <div className={styles.productBrand}>{record.brand}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Price / 价格',
      dataIndex: 'price',
      render: (price: number) => `¥${price.toLocaleString()}`,
      sorter: (a: Cigarette, b: Cigarette) => a.price - b.price,
    },
    {
      title: 'Stock / 库存',
      dataIndex: 'stock',
      render: (stock: number) => (
        <Tag color={stock < 10 ? 'red' : stock < 50 ? 'orange' : 'green'}>
          {stock}
        </Tag>
      ),
      sorter: (a: Cigarette, b: Cigarette) => a.stock - b.stock,
    },
    {
      title: 'Category / 分类',
      dataIndex: 'category',
      filters: [
        { text: 'Regular / 常规', value: 'regular' },
        { text: 'Menthol / 薄荷', value: 'menthol' },
        { text: 'Light / 轻型', value: 'light' },
        { text: 'Premium / 高级', value: 'premium' },
      ],
      onFilter: (value: string, record: Cigarette) => record.category === value,
    },
    {
      title: 'Action / 操作',
      key: 'action',
      render: (record: Cigarette) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
          >
            View / 查看
          </Button>
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit / 编辑
          </Button>
          <Popconfirm
            title="Are you sure to delete? / 确定要删除吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes / 是"
            cancelText="No / 否"
          >
            <Button
              danger
              icon={<DeleteOutlined />}
            >
              Delete / 删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // 处理图片上传
  const handleImageUpload = (file: File) => {
    setImageFiles(prev => [...prev, file]);
    return false; // 阻止自动上传
  };

  // 处理编辑
  const handleEdit = (record: Cigarette) => {
    setEditingId(record.id);
    form.setFieldsValue(record);
    setModalVisible(true);
  };

  // 处理删除
  const handleDelete = async (id: string) => {
    try {
      dispatch(setLoading(true));
      // TODO: 调用删除API
      dispatch(deleteCigarette(id));
      message.success('Product deleted successfully / 商品删除成功');
    } catch (error) {
      dispatch(setError(error.message));
      message.error('Failed to delete product / 删除商品失败');
    } finally {
      dispatch(setLoading(false));
    }
  };

  // 处理表单提交
  const handleSubmit = async (values: any) => {
    try {
      dispatch(setLoading(true));
      const formData = new FormData();
      
      // 添加基本信息
      Object.keys(values).forEach(key => {
        formData.append(key, values[key]);
      });
      
      // 添加图片
      imageFiles.forEach(file => {
        formData.append('images', file);
      });

      if (editingId) {
        // 更新商品
        // TODO: 调用更新API
        dispatch(updateCigarette({ ...values, id: editingId }));
        message.success('Product updated successfully / 商品更新成功');
      } else {
        // 创建商品
        // TODO: 调用创建API
        dispatch(addCigarette({ ...values, id: Date.now().toString() }));
        message.success('Product created successfully / 商品创建成功');
      }

      setModalVisible(false);
      form.resetFields();
      setImageFiles([]);
      setEditingId(null);
    } catch (error) {
      dispatch(setError(error.message));
      message.error('Operation failed / 操作失败');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className={styles.productsPage}>
      <div className={styles.header}>
        <h2>Products Management / 商品管理</h2>
        <Space>
          {selectedRows.length > 0 && (
            <Dropdown overlay={batchActionMenu}>
              <Button>
                Batch Actions / 批量操作 <DownOutlined />
              </Button>
            </Dropdown>
          )}
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingId(null);
              form.resetFields();
              setModalVisible(true);
            }}
          >
            Add Product / 添加商品
          </Button>
        </Space>
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={cigarettes}
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={editingId ? 'Edit Product / 编辑商品' : 'Add Product / 添加商品'}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
          setImageFiles([]);
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label="Name / 名称"
            rules={[{ required: true, message: 'Please input product name / 请输入商品名称' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="brand"
            label="Brand / 品牌"
            rules={[{ required: true, message: 'Please input brand / 请输入品牌' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price / 价格"
            rules={[{ required: true, message: 'Please input price / 请输入价格' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
              precision={2}
            />
          </Form.Item>

          <Form.Item
            name="stock"
            label="Stock / 库存"
            rules={[{ required: true, message: 'Please input stock / 请输入库存' }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0}
            />
          </Form.Item>

          <Form.Item
            name="category"
            label="Category / 分类"
            rules={[{ required: true, message: 'Please select category / 请选择分类' }]}
          >
            <Select>
              <Option value="regular">Regular / 常规</Option>
              <Option value="menthol">Menthol / 薄荷</Option>
              <Option value="light">Light / 轻型</Option>
              <Option value="premium">Premium / 高级</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Images / 图片"
          >
            <Upload
              beforeUpload={handleImageUpload}
              listType="picture-card"
              showUploadList={true}
              multiple
            >
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload / 上传</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              {editingId ? 'Update / 更新' : 'Create / 创建'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <ProductDetail
        cigarette={currentCigarette}
        visible={detailVisible}
        onClose={() => {
          setDetailVisible(false);
          setCurrentCigarette(null);
        }}
      />
    </div>
  );
};

export default Products; 