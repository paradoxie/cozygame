import React, { useRef, useEffect } from 'react';

/**
 * 无限滚动组件
 * 使用IntersectionObserver监测底部元素是否可见，触发加载更多
 */
const InfiniteScroll = ({ onLoadMore, hasMore, children, loading }) => {
  const loaderRef = useRef(null);
  
  useEffect(() => {
    // 创建观察者实例
    const observer = new IntersectionObserver(
      (entries) => {
        // 当底部元素进入视图且有更多数据可加载且当前不在加载中时，触发加载
        if (entries[0].isIntersecting && hasMore && !loading) {
          onLoadMore();
        }
      },
      { threshold: 0.1, rootMargin: '100px 0px' } // 提前100px触发加载
    );
    
    // 观察底部元素
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    
    // 清理函数
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
      observer.disconnect();
    };
  }, [onLoadMore, hasMore, loading]);
  
  return (
    <>
      {children}
      
      <div ref={loaderRef} className="py-6 flex justify-center items-center">
        {loading && (
          <div className="flex flex-col items-center">
            <svg className="animate-spin h-8 w-8 text-primary-blue mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <div className="text-neutral-medium text-sm">加载中...</div>
          </div>
        )}
        
        {!loading && !hasMore && (
          <div className="text-center text-neutral-medium text-sm py-2">
            已经到底啦 ~
          </div>
        )}
      </div>
    </>
  );
};

export default InfiniteScroll; 