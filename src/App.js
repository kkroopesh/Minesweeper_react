import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [blocks, setBlocks] = useState(Array.from(Array(16), () => new Array(30).fill({ hidden: true, visited: false, value: 0 })));
  const [mineAddr, setMineAddr] = useState([]);
  const colorPallet = ['black','blue', 'red', 'green', 'purple', 'yellow', 'voilet', 'orange' ];

useEffect(() => {
  let newBlocks = JSON.parse(JSON.stringify(blocks));
  let minAdd = [];
  for(let i=0; i< 99; i++){
    let x = Math.floor(Math.random()*16);
    let y = Math.floor(Math.random()*30);
    if(minAdd.includes(`${x}_${y}`)) {
      while(minAdd.includes(`${x}_${y}`)){
        x = Math.floor(Math.random()*16);
        y = Math.floor(Math.random()*30);
      }
    }
      minAdd.push(`${x}_${y}`)
      newBlocks[x][y] = { ...newBlocks[x][y], value: 'X' };
      if(x >= 1 && y >= 1 ) {
        newBlocks[x-1][y-1] = { ...newBlocks[x-1][y-1], value: newBlocks[x-1][y-1].value === "X"? "X" :++newBlocks[x-1][y-1].value };
      }
      if(x >= 1 && y >= 0 ) {
        newBlocks[x-1][y] = { ...newBlocks[x-1][y], value: newBlocks[x-1][y].value === "X"? "X" :++newBlocks[x-1][y].value };
      }
      if(x >= 1 && y <= 28 ) {
        newBlocks[x-1][y+1] = { ...newBlocks[x-1][y+1], value: newBlocks[x-1][y+1].value === "X"? "X" :++newBlocks[x-1][y+1].value };
      }
      if(x >= 0 && y >= 1 ) {
        newBlocks[x][y-1] = { ...newBlocks[x][y-1], value: newBlocks[x][y-1].value === "X"? "X" :++newBlocks[x][y-1].value };
      }
      if(x >= 0 && y <= 28 ) {
        newBlocks[x][y+1] = { ...newBlocks[x][y+1], value: newBlocks[x][y+1].value === "X"? "X" :++newBlocks[x][y+1].value };
      }
      if(x <= 14 && y >= 1 ) {
        newBlocks[x+1][y-1] = { ...newBlocks[x+1][y-1], value: newBlocks[x+1][y-1].value === "X"? "X" :++newBlocks[x+1][y-1].value };
      }
      if(x <= 14 && y >= 0 ) {
        newBlocks[x+1][y] = { ...newBlocks[x+1][y], value: newBlocks[x+1][y].value === "X"? "X" :++newBlocks[x+1][y].value };
      }
      if(x <= 14 && y <= 28 ) {
        newBlocks[x+1][y+1] = { ...newBlocks[x+1][y+1], value: newBlocks[x+1][y+1].value === "X"? "X" :++newBlocks[x+1][y+1].value };
      }
  }
  setBlocks(newBlocks)
  setMineAddr(minAdd);
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

const handleClick = (rowId, colId)=> {
  let newBlocks = JSON.parse(JSON.stringify(blocks));
  newBlocks[rowId][colId] = {...newBlocks[rowId][colId], hidden: false}
  if(newBlocks[rowId][colId].value === "X"){
    mineAddr.forEach(addr => {
      newBlocks[+addr.split('_')[0]][+addr.split('_')[1]] = {...newBlocks[rowId][colId], hidden: false}
    })
  }
  if(newBlocks[rowId][colId].value === 0){
    newBlocks = newBlocks.map((row,rowId) => row.map((col, colId) => ({...newBlocks[rowId][colId], visited: false})));
    // console.log(newBlocks)

    function openBlock(x,y) {
      console.log({x,y})
      newBlocks[x][y] = {...newBlocks[x][y], hidden: false, visited: true}
      if(newBlocks[x][y].value === 0){
        if(x >= 1 && y >= 1 && newBlocks[x-1][y-1].visited === false ) {
          openBlock(x-1, y-1);
        }
        if(x >= 1 && y >= 0 && newBlocks[x-1][y].visited === false ) {
          openBlock(x-1, y);
        }
        if(x >= 1 && y <= 28 && newBlocks[x-1][y+1].visited === false ) {
          openBlock(x-1, y+1);
        }
        if(x >= 0 && y >= 1 && newBlocks[x][y-1].visited === false ) {
          openBlock(x, y-1);
        }
        if(x >= 0 && y <= 28 && newBlocks[x][y+1].visited === false ) {
          openBlock(x, y+1);
        }
        if(x <= 14 && y >= 1 && newBlocks[x+1][y-1].visited === false ) {
          openBlock(x+1, y-1);
        }
        if(x <= 14 && y >= 0 && newBlocks[x+1][y].visited === false ) {
          openBlock(x+1, y);
        }
        if(x <= 14 && y <= 28 && newBlocks[x+1][y+1].visited === false ) {
          openBlock(x+1, y+1);
        }
      }
    };
  openBlock(rowId,colId);
}
  setBlocks(newBlocks)
}

  return (
    <div className="App">
      <div className="app-container">
        {
          blocks.map((row, rowInd) => (
            <div className="app-row">
              {row.map((col,colInd) => {
                if(col.hidden) {
                  return (
                    <div className="hidden-tile" key={`${row}_${colInd}`} onClick={() => handleClick(rowInd,colInd)}></div>
                  )
                } else {
                  return (
                    <div className="app-tile" key={`${row}_${colInd}`} style={{color: Number.isInteger(col.value)? colorPallet[col.value] : "" }}>
                      {col.value === 0 ? "" : col.value === "X" ? <b>X</b>: col.value}
                    </div>
                  )
                }
              })}
              <br />
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
