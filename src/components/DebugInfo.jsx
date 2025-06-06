import React, { useState, useEffect } from 'react';

const DebugInfo = ({ isVisible, gameData }) => {
  const [expanded, setExpanded] = useState(false);
  const [fps, setFps] = useState(0);
  const [memoryUsage, setMemoryUsage] = useState(null);
  
  // 计算FPS
  useEffect(() => {
    if (!expanded || !isVisible) return;
    
    let frameCount = 0;
    let lastTime = performance.now();
    
    const calculateFps = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.round(frameCount * 1000 / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
        
        // 如果浏览器支持内存使用情况API
        if (window.performance && window.performance.memory) {
          const memory = window.performance.memory;
          setMemoryUsage({
            usedHeapSize: Math.round(memory.usedJSHeapSize / (1024 * 1024)),
            totalHeapSize: Math.round(memory.totalJSHeapSize / (1024 * 1024)),
            limit: Math.round(memory.jsHeapSizeLimit / (1024 * 1024))
          });
        }
      }
      
      requestAnimationFrame(calculateFps);
    };
    
    const frameId = requestAnimationFrame(calculateFps);
    
    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [expanded, isVisible]);
  
  if (!isVisible) return null;
  
  const { 
    games, 
    allGames, 
    loading, 
    initialLoading, 
    hasMore 
  } = gameData;
  
  return (
    <div className="fixed bottom-4 right-4 z-50 bg-neutral-dark text-white p-3 rounded-lg shadow-lg text-xs max-w-xs">
      <div className="flex justify-between items-center">
        <span className="font-medium">调试信息</span>
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => window.location.reload()} 
            className="text-white hover:text-primary-blue"
            title="刷新页面"
          >
            🔄
          </button>
          <button 
            onClick={() => localStorage.clear() || window.location.reload()} 
            className="text-white hover:text-error-red"
            title="清除缓存并刷新"
          >
            🗑️
          </button>
          <button 
            onClick={() => setExpanded(!expanded)} 
            className="text-white hover:text-primary-blue"
          >
            {expanded ? '收起' : '展开'}
          </button>
        </div>
      </div>
      
      {expanded && (
        <div className="mt-2 space-y-1">
          <div className="flex justify-between">
            <span>当前显示游戏:</span>
            <span className="text-primary-blue">{games.length}</span>
          </div>
          
          <div className="flex justify-between">
            <span>总游戏数量:</span>
            <span className="text-primary-blue">{allGames.length}</span>
          </div>
          
          <div className="flex justify-between">
            <span>初始加载:</span>
            <span className={initialLoading ? 'text-warning-orange' : 'text-success-green'}>
              {initialLoading ? '加载中...' : '完成'}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>加载更多:</span>
            <span className={loading ? 'text-warning-orange' : 'text-success-green'}>
              {loading ? '加载中...' : '空闲'}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>是否有更多:</span>
            <span className={hasMore ? 'text-success-green' : 'text-error-red'}>
              {hasMore ? '是' : '否'}
            </span>
          </div>
          
          <div className="flex justify-between">
            <span>FPS:</span>
            <span className={fps < 30 ? 'text-error-red' : fps < 50 ? 'text-warning-orange' : 'text-success-green'}>
              {fps}
            </span>
          </div>
          
          {memoryUsage && (
            <div className="flex justify-between">
              <span>内存使用:</span>
              <span className={
                memoryUsage.usedHeapSize / memoryUsage.totalHeapSize > 0.8 
                  ? 'text-error-red' 
                  : memoryUsage.usedHeapSize / memoryUsage.totalHeapSize > 0.6 
                    ? 'text-warning-orange' 
                    : 'text-success-green'
              }>
                {memoryUsage.usedHeapSize}MB / {memoryUsage.totalHeapSize}MB
              </span>
            </div>
          )}
          
          <div className="mt-2 text-center">
            <a 
              href="?debug=true" 
              className="text-primary-blue hover:underline"
              onClick={(e) => {
                e.preventDefault();
                const url = new URL(window.location.href);
                url.searchParams.set('debug', 'true');
                navigator.clipboard.writeText(url.toString());
                alert('调试URL已复制到剪贴板');
              }}
            >
              复制调试链接
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default DebugInfo; 