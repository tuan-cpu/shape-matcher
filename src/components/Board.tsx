import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import './Board.css';

const Board: React.FC = () => {
  // states...
  interface CellStruct{
    color: String,
    shape: String
  }
  interface RevealedCell{
    first: number,
    second: number
  }
  const [initialCell,setInitialCell] = useState<Array<CellStruct>>([]);
  const [revealedCell, setRevealedCell] = useState<Array<RevealedCell>>([]);
  const [firstOpenCell, setFirstOpenCell] = useState<number>(-1);
  const [secondOpenCell, setSecondOpenCell] = useState<number>(-1);

  function shuffle(array: CellStruct[]) {
    let currentIndex = array.length, randomIndex;
  
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  useEffect(() => {
    // Initialize the game board with random shapes and colors
    const shapes_array = ["triangle","circle","square"];
    const color_array = ["red","green","blue"];
    let initial_array: CellStruct[] = [];
    let chosen_shape : String;
    let chosen_color : String;
    while(initial_array.length < 8){
      chosen_shape = shapes_array[Math.floor(Math.random()*shapes_array.length)];
      chosen_color = color_array[Math.floor(Math.random()*color_array.length)];
      if(!initial_array.filter(cell => cell.color === chosen_color && cell.shape === chosen_shape)){
        initial_array.push({
          color: chosen_color,
          shape: chosen_shape
        })
      }
      chosen_color = "";
      chosen_shape = "";
    }
    let final_array: CellStruct[] = [];
    for(let i=0;i<8;i++){
      final_array.push(initial_array[i]);
      final_array.push(initial_array[i]);
    }
    setInitialCell(shuffle(final_array));
  }, []);

  const handleCellClick = (index: number) => {
    // Reveal cell, check for matches, update game state, and handle game completion
    if(firstOpenCell === -1){
      setFirstOpenCell(index);
    }else{
      setSecondOpenCell(index)
    }
  };
  useEffect(()=>{
    if(secondOpenCell !== -1){
      if(JSON.stringify(initialCell[firstOpenCell]) === JSON.stringify(initialCell[secondOpenCell])){
        setRevealedCell((prev)=>[...prev,{
          first: firstOpenCell,
          second: secondOpenCell
        }])
      }
    }
  },[secondOpenCell])

  return (
    <div className="board">
      {/* Render each cell in the board */}
      {initialCell.map((cell, index)=>(
        <div onClick={()=>handleCellClick(index)} className={revealedCell.filter(res => res.first === index || res.second === index)?'hidden':''}>
          <Cell key={index} shape={cell.shape} color={cell.color}/>
        </div>
      ))}
    </div>
  );
};

export default Board;

