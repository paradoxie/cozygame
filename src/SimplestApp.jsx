import React from 'react';

const SimplestApp = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-primary-blue">最简单的React应用</h1>
      <p className="mb-4">如果你能看到这个页面，说明React基本渲染正常。</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">基本组件</h2>
          <p className="text-neutral-medium">这是一个不依赖于任何复杂组件或路由的基本React组件。</p>
        </div>
        <div className="bg-primary-blue text-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-3">Tailwind样式</h2>
          <p>这个组件使用了Tailwind CSS样式，如果你能看到样式正确应用，说明Tailwind配置正常。</p>
        </div>
      </div>
    </div>
  );
};

export default SimplestApp; 