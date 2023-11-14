import React from 'react';

export default function ArrowRight(props) {
  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
  <div className={props.className} onClick={handleClick} style={{ cursor: 'pointer', fill:'#0d47a1' }}>
    <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 512 512">
      <path d="M0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM281 385c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l71-71L136 280c-13.3 0-24-10.7-24-24s10.7-24 24-24l182.1 0-71-71c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0L393 239c9.4 9.4 9.4 24.6 0 33.9L281 385z"/>
    </svg>
  </div>
  );
}
