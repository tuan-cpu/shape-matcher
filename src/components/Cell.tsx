import React from 'react';
import './Cell.css';

interface CellProps {
  // Your code here
  color: String,
  shape: String
}

const Cell: React.FC<CellProps> = (props: CellProps) => {
  // Render cell with shape and color, use CSS to style based on shape and color.
  const cellStyle = {
    backgroundColor: props.color.toString(),
  };
  return(
    <div className='cell' style={cellStyle}>
      {props.shape}
    </div>
  )
};

export default Cell;
