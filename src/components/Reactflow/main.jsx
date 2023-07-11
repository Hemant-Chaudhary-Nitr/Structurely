import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Controls } from 'react-flow-renderer';
import { updateEdge} from 'react-flow-renderer';
import 'reactflow/dist/style.css';
import { useNodesState } from 'react-flow-renderer';
import { useEdgesState, addEdge } from 'react-flow-renderer';
import ReactFlow from 'react-flow-renderer';
import { MarkerType } from 'react-flow-renderer';
import { nodeTypes } from "./Nodes";

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Node A' },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    data: { label: 'Node B' },
    position: { x: 100, y: 200 },
  },
  {
    id: '3',
    data: { label: 'Node C' },
    position: { x: 350, y: 200 },
  },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2', markerEnd: { type: MarkerType.ArrowClosed},  label: 'updatable edge' }];


const ReactFlowGridComponent = () => {
  const edgeUpdateSuccessful = useRef(true);
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [name, setName] = useState(""); 
  const [newName, setNewName] = useState("");
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [activeNode, setActiveNode] = useState(
    {
        id: '1',
        type: 'input',
        data: { label: 'Node A' },
        position: { x: 250, y: 0 },
      }
  ); 

  const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);

  useEffect(() => {
    if(activeNode) setNewName(activeNode.data.label); 
  }, [activeNode]); 

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          const type = event.dataTransfer.getData('application/reactflow');
    
          // check if the dropped element is valid
          if (typeof type === 'undefined' || !type) {
            return;
          }
    
          const position = reactFlowInstance.project({
            x: event.clientX - reactFlowBounds.left,
            y: event.clientY - reactFlowBounds.top,
          });
          const newNode = {
            id: `${Date.now()}`,
            type,
            position,
            data: { label: `${type} node` },
          };
    
          setNodes((nodes) => nodes.concat(newNode));
        },
        [reactFlowInstance]
      );

      console.log(edges); 

    const addRectangleHandler = () => {
        
        const newNode = {
            id: `${Date.now()}`,
            data: { label: `${name}` },
            type: "rectangle",
            position: {
                x: 250,
                y: 250
            }   
        }

        newNode.data = { ...newNode.data, id: `${newNode.id}` };

        setNodes((nodes) => nodes.concat(newNode)); 

        setName(""); 
    } 
    const addCircleHandler = () => {
        const newNode = {
            id: `${Date.now()}`,
            data: { label: `${name}` },
            type: "circle",
            position: {
                x: 250,
                y: 250
            }   
        }

        newNode.data = { ...newNode.data, id: `${newNode.id}` };

        setNodes((nodes) => nodes.concat(newNode)); 

        setName("");
    }
    const saveChangesHandler = () => {} 
    
  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  const getIdStringIndex = (inputData) => {
    var index = inputData.indexOf(`data-id="`); 
    return index; 
  }
  const getIdString = (data, index) => {
    let res = ""; 
    let pos = index; 
    while(data[pos] != '"') {
        res += data[pos]; 
        pos++; 
    }
    return res; 
  }
  const handleDoubleClick = (e) => {
    // console.log(nodes); 
    var htmlString = e.target.outerHTML.toString();
    console.log(htmlString); 
    let index = getIdStringIndex(htmlString); 
    index += 9; 
    // console.log(index); 
    const currentId = getIdString(htmlString, index); 

    // console.log(currentId)
    nodes.forEach((_current) => {
      if (_current.id === currentId) {
        setActiveNode(_current);
      }
    });
    setNewName(activeNode.data.label)
  };

  const updateNodeHandler = () => {
    if (!activeNode) return;
    setNodes(
      nodes.map((_current) => {
        if (_current.id === activeNode.id) {
          return {
            ..._current,
            data: { label: newName, id: _current.data.id }
          };
        }

        return _current;
      })
    );
  };

  return (

    <div className="reactflow-wrapper" ref={reactFlowWrapper}> 
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      snapToGrid
      onEdgeUpdate={onEdgeUpdate}
      onEdgeUpdateStart={onEdgeUpdateStart}
      onEdgeUpdateEnd={onEdgeUpdateEnd}
      onConnect={onConnect}
      nodeTypes = {nodeTypes}
      onInit={setReactFlowInstance}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onDoubleClick={handleDoubleClick}
    //   fitView
      attributionPosition="top-right"
      className='h-[500px] w-[500px]'
    >
      <Controls />
    </ReactFlow>

<div className='mb-2'>
<input
className='outline p-1 text-xs border-slate-700'
  value={name}
  onChange={(e) => setName(e.target.value)}
  type="text"
  placeholder="Enter new node name"
/>

<button className="ml-4" type="button" onClick={addRectangleHandler}>
  Create Rectangle
</button>
</div>

<div>
<input
className='outline p-1 text-xs border-slate-700'
  value={newName}
  onChange={(e) => setNewName(e.target.value)}
  type="text"
/>

<button className="ml-4" type="button" onClick={updateNodeHandler}>
  Update
</button>
</div>

<button type="button" onClick={saveChangesHandler}>
Save changes
</button>

</div>
  );
};

export default ReactFlowGridComponent;
