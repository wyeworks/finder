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

  const positionClass = `tooltip-${tooltipPosition}`;
  const maxWidthClass = 'tooltip-max-width';
  const widthClass = 'tooltip-width';

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
          className={`absolute z-10 rounded bg-gray-900 px-2 py-1 text-sm font-medium text-gray-50 shadow transition-opacity ${positionClass} ${maxWidthClass} ${widthClass}`}
        >
          {paragraphsJSX}
        </div>
      )}
    </div>
  );
}
