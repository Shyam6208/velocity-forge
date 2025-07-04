import React from 'react';

interface InfiniteScrollProps {
  items: string[];
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  items,
  speed = 50,
  direction = 'left',
  className = ''
}) => {
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className={`inline-block animate-scroll-${direction}`}
        style={{
          animationDuration: `${speed}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite'
        }}
      >
        {[...items, ...items].map((item, index) => (
          <span key={index} className="mx-8 text-2xl font-bold text-gray-400">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};