import React from 'react';

function CheckeredNotebook({ children }: React.ComponentProps<any>) {
  return (
    <div
      style={{
        backgroundImage: 'url(/images/svg/HorizontalRule.svg)',
        backgroundSize: '1px 1px',
        backgroundPosition: 'right 24px top 0',
        backgroundRepeat: 'repeat-y',
      }}
    >
      <div
        className="min-h-screen min-w-full"
        style={{
          backgroundImage: 'url(/images/svg/Square.svg)',
          backgroundSize: '6px 6px',
          backgroundPosition: '100% 100%',
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default CheckeredNotebook;
