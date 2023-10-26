import React from 'react';

export default function SortUp({ disabled }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512">
      <path
        fill={disabled ? '#a7a7a7' : undefined}
        d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
      />
    </svg>
  );
}
