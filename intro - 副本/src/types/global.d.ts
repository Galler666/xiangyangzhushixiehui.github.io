declare module 'react';
declare module 'react-router-dom';
declare module '@reduxjs/toolkit';
declare module 'antd';
declare module 'moment';
declare module '@ant-design/icons';
declare module 'axios';

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg'; 