import React, { useState } from 'react';

export default function TooltipIcon({
  tooltipText,
  tooltipPosition = 'top',
  children,
}: {
  tooltipText: string;
  tooltipPosition?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  //We want to make paraghraps from the text so we separate it by the \n
  const paragraphs = tooltipText.split('\n');
  const paragraphsJSX = paragraphs.map((paragraph, index) => (
    <p key={index}>{paragraph}</p>
  ));

  return (
    <div className='relative inline-block'>
      <div
        className='inline-flex items-center'
        onMouseEnter={toggleTooltip}
        onMouseLeave={toggleTooltip}
      >
        {children}
      </div>
      {showTooltip && (
        <div
          className={`absolute z-10 rounded bg-gray-900 px-2 py-1 text-sm font-medium text-gray-50 shadow transition-opacity ${
            tooltipPosition === 'top'
              ? 'bottom-full left-1/2 -translate-x-1/2'
              : tooltipPosition === 'bottom'
              ? 'left-1/2 top-full -translate-x-1/2'
              : tooltipPosition === 'left'
              ? 'right-full top-1/2 -translate-y-1/2'
              : 'left-full top-1/2 -translate-y-1/2'
          }`}
          style={{ maxWidth: '250px', width: 'max-content' }}
        >
          {paragraphsJSX}
        </div>
      )}
    </div>
  );
}
