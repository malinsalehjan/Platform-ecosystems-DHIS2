import React from 'react';

export default function ArrowLeft(props) {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
  <div className={props.className} onClick={handleClick} style={{ cursor: 'pointer', fill: '#0d47a1' }}>
    <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512">
      <path d="M512 256A256 256 0 1 0 0 256a256 256 0 1 0 512 0zM231 127c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-71 71L376 232c13.3 0 24 10.7 24 24s-10.7 24-24 24l-182.1 0 71 71c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L119 273c-9.4-9.4-9.4-24.6 0-33.9L231 127z"/>
    </svg>
  </div>
  );
}
