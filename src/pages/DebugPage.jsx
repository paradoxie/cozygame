import React from 'react';

const DebugPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">调试页面</h1>
      <p className="mb-2">如果你能看到这个页面，说明基本的React渲染是正常的。</p>
      <div className="p-4 bg-primary-blue text-white rounded">
        这是一个使用Tailwind样式的测试元素
      </div>
    </div>
  );
};

export default DebugPage; 