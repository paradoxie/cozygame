import React from 'react';
import GameCard from './GameCard';

/**
 * 游戏列表组件
 * 使用CSS Grid布局显示游戏卡片
 */
const GameList = ({ games, title, emptyMessage, showTitle = true }) => {
  // 没有游戏时显示提示信息
  if (!games || games.length === 0) {
    return emptyMessage ? (
      <div className="text-center py-8 text-neutral-medium">
        {emptyMessage}
      </div>
    ) : null;
  }

  return (
    <div className="mb-8">
      {showTitle && title && <h2 className="text-xl md:text-2xl font-semibold mb-4">{title}</h2>}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default GameList; 