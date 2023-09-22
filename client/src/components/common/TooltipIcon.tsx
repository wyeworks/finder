import React, { useState } from 'react';

type TooltipPosition =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight';

export default function TooltipIcon({
  tooltipText,
  tooltipPosition = 'top',
  children,
}: {
  tooltipText: string;
  tooltipPosition?: TooltipPosition;
  children: React.ReactNode;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  function onHoverIn() {
    setShowTooltip(true);
  }

  function onHoverOut() {
    setShowTooltip(false);
  }

  function handleIconClick() {
    setShowTooltip((prevState) => !prevState);
  }

  // We want to make paragraphs from the text, so we separate it by the \n
  const paragraphs = tooltipText.split('\n');
  const paragraphsJSX = paragraphs.map((paragraph, index) => (
    <p key={index}>{paragraph}</p>
  ));

  // Define a mapping object for class names based on the tooltip position
  const positionClassNames = {
    top: 'bottom-full left-1/2 -translate-x-1/2',
    bottom: 'left-1/2 top-full -translate-x-1/2',
    left: 'right-full top-1/2 -translate-y-1/2',
    right: 'left-full top-1/2 -translate-y-1/2',
    topLeft: 'bottom-full left-0',
    topRight: 'bottom-full right-0',
    bottomLeft: 'top-full left-0',
    bottomRight: 'top-full right-0',
  };

  const tooltipClass = positionClassNames[tooltipPosition] || '';

  return (
    <div className='relative inline-block'>
      <div
        className='inline-flex items-center'
        onMouseEnter={onHoverIn}
        onMouseLeave={onHoverOut}
        onClick={handleIconClick}
      >
        {children}
      </div>
      {showTooltip && (
        <div
          className={`absolute z-10 rounded bg-gray-900 px-2 py-1 text-sm font-medium text-gray-50 shadow transition-opacity ${tooltipClass}`}
          style={{ maxWidth: '250px', width: 'max-content' }}
        >
          {paragraphsJSX}
        </div>
      )}
    </div>
  );
}
