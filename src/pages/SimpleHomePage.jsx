import React from 'react';

const SimpleHomePage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">简化版首页</h1>
      <p className="mb-4">这是一个极简的首页组件，用于测试基本渲染。</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div key={item} className="bg-white shadow rounded p-4">
            <h2 className="text-lg font-semibold mb-2">测试卡片 {item}</h2>
            <p className="text-neutral-medium">这是一个简单的测试卡片，用于验证布局和样式。</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleHomePage; 