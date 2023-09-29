import React, { useState, useEffect } from "react";
import Cell from "./Cell";
import "./Board.css";

const Board: React.FC = () => {
  // states...
  interface CellStruct {
    color: String;
    shape: String;
  }
  const [initialCell, setInitialCell] = useState<Array<CellStruct>>([]);
  const [revealedCell, setRevealedCell] = useState<Array<number>>([]);
  const [foundCell,setFoundCell] = useState<Array<number>>([]);
  const [firstOpenCell, setFirstOpenCell] = useState<number>(-1);
  const [secondOpenCell, setSecondOpenCell] = useState<number>(-1);
  const [delay,setDelay] = useState<boolean>(false);

  function shuffle(array: CellStruct[]) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }
  useEffect(() => {
    // Initialize the game board with random shapes and colors
    const shapes_array = ["triangle", "circle", "square"];
    const color_array = ["red", "green", "blue"];
    let initial_array: CellStruct[] = [];
    let chosen_shape: String;
    let chosen_color: String;
    chosen_shape =
      shapes_array[Math.floor(Math.random() * shapes_array.length)];
    chosen_color = color_array[Math.floor(Math.random() * color_array.length)];
    for (let i = 0; i < 3; i++) {
      if (shapes_array[i] === chosen_shape) {
        for (let j = 0; j < 3; j++) {
          if (color_array[j] !== chosen_color) {
            initial_array.push({
              shape: shapes_array[i],
              color: color_array[j],
            });
          }
        }
      } else {
        for (let j = 0; j < 3; j++) {
          initial_array.push({
            shape: shapes_array[i],
            color: color_array[j],
          });
        }
      }
    }
    let final_array: CellStruct[] = [];
    for (let i = 0; i < 8; i++) {
      final_array.push(initial_array[i]);
      final_array.push(initial_array[i]);
    }
    setInitialCell(shuffle(final_array));
  }, []);

  const handleCellClick = (index: number) => {
    // Reveal cell, check for matches, update game state, and handle game completion
    if (firstOpenCell === -1) {
      setFirstOpenCell(index);
      setRevealedCell([...revealedCell,index]);
      setSecondOpenCell(-1);
    } else {
      setDelay(true);
      setSecondOpenCell(index);
    }
  };
  useEffect(() => {
    const removeLastNumberAfterDelay = () => {
      setTimeout(() => {
        setRevealedCell([]);
        setDelay(false);
      }, 1000);
    };
    if (secondOpenCell !== -1) {
      setRevealedCell([...revealedCell,secondOpenCell]);
      if (
        JSON.stringify(initialCell[firstOpenCell]) ===
        JSON.stringify(initialCell[secondOpenCell])
      ) {
        setFoundCell([...foundCell,...[firstOpenCell,secondOpenCell]]);
        setFirstOpenCell(-1);
        setSecondOpenCell(-1);
        setDelay(false);
      }else{
        removeLastNumberAfterDelay();
        setFirstOpenCell(-1);
        setSecondOpenCell(-1);
      }
    }
  }, [secondOpenCell]);

  return (
    <div className="board">
      {/* Render each cell in the board */}
      <div className="grid">
        {initialCell.map((cell, index) => {
          let check: boolean;
          for(let i=0;i<foundCell.length;i++){
            if(foundCell[i]===index) check = true;
          }
          for(let i=0;i<revealedCell.length;i++){
            if(revealedCell[i]===index) check = true;
          }
          return(
            <div onClick={() =>{
              if(check) return;
              else if(delay) return;
              else handleCellClick(index);
            }}>
              {
                !revealedCell.includes(index) && !foundCell.includes(index)?
                (<Cell shape={"Click me"} color={"White"}/>):(<Cell shape={cell.shape} color={cell.color}/>)
              }
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Board;
