import React from 'react';
import { nodeTypes } from '../Nodes';

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };
  const onDragStartLibrary = (event, nodeType) => {
    // console.log(nodeType)

    // const newNode = {
    //     id: `${Date.now()}`,
    //     data: { label: `Module` },
    //     type: "rectangle",
    //     position: {
    //         x: 250,
    //         y: 250
    //     }   
    // }

    event.dataTransfer.setData('application/reactflow', 'rectangle'); 
    event.dataTransfer.effectAllowed = 'move'
  }

  return (
    <aside className='h-100 border-2 border-transparent p-4 border-r-slate-200 mr-8'>
      <div className="description border-2 border-transparent border-b-slate-500 mb-4 pb-2">Drag Shapes</div>
      <div className="dndnode input border-2 rounded-lg border-slate-700 text-center text-xs p-2 mb-2" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Root Module
      </div>
      <div className="dndnode border-2 rounded-lg border-slate-700 text-center text-xs p-2 mb-2" onDragStart={(event) => onDragStart(event, 'default')} draggable>
        Module
      </div>
      <div className="dndnode border-2 border-slate-700 text-center text-xs p-2 mb-2"
      style={{ borderLeft: "6px double black",
      borderRight: "6px double black" }} 
       onDragStart={(event) => onDragStartLibrary(event, 'rectangle')} draggable>
        Library Module
      </div>

      <div className="dndnode output border-2 rounded-lg border-slate-700 text-center text-xs p-2 mb-2" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        End Node
      </div>
    </aside>
  );
};