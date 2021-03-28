import React from 'react';
import ScrollUp from 'react-scroll-up';
import { ChevronUpIcon } from '@primer/octicons-react';

const ScrollToTop = () => {
  const customStyle = {
    backgroundColor: '#f7f7f7',
    borderRadius: '50%'
  };

  return (
    <ScrollUp showUnder={160} style={{ bottom: 4, right: 9, zIndex: 1049 }}>
      <div style={customStyle}>
        <ChevronUpIcon size="medium" />
      </div>
    </ScrollUp>
  );
};

export default ScrollToTop;
