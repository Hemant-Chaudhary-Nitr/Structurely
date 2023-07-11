import React from "react"
import { Handle } from "react-flow-renderer"

const RectangleNode = () => {

  const data = {
    id: `${Date.now()}`,
    data: { label: `Module` },
    type: "rectangle",
    position: {
        x: 250,
        y: 250
    }   
}
  return (
    <div style={{ 
      borderRadius: "3px", 
      fontSize: "12px", 
      width: "150px", 
      textAlign: "center", 
      border: "1px solid #1a192b", 
      padding: "18px",
      borderLeft: "6px double black",
      borderRight: "6px double black"
      // boxShadow: "-5px 0px 0px 0px black, 5px 0px 0px 0px black",
      // outlineStyle: "double"
       }}>
      <Handle
        type="target"
        position="top"
        id={`${data.id}.top`}
        style={{ borderRadius: 0 }}
      />
      <div id={data.id} data-id={data.id}>{data.data.label}</div>
      <Handle
        type="source"
        position="bottom"
        id={`${data.id}.right1`}
        style={{ borderRadius: 0 }}
      />
    </div>
  )
}

const CircleNode = ( module ) => {

  console.log(module); 
  return (
    <div
      style={{
        textAlign: "center", 
        border: "1px solid #1a192b", 
        boxShadow: "0 0 0 0.5px #1a192b",
        padding: "14px",
        borderRadius: "50px"
      }}
    >
      <Handle
        type="target"
        position="left"
        id={`${module.id}.left`}
        style={{ borderRadius: "0" }}
      />
      <div id={module.id}>{module.data.label}</div>
      <Handle
        type="source"
        position="bottom"
        id={`${module.id}.bottom1`}
        style={{ borderRadius: 0 }}
      />
      <Handle
        type="source"
        position="right"
        id={`${module.id}.right2`}
        style={{ top: "50%", borderRadius: 0 }}
      />

<Handle
        type="target"
        position="top"
        id={`${module.id}.right2`}
        style={{ borderRadius: 0 }}
      />
    </div>
  )
}

const TriangleNode = ({ data }) => {
  return (
    <div className="triangle-node">
      <Handle
        type="target"
        position="top"
        id={`${data.id}.top`}
        style={{ borderRadius: 0 }}
      />
      <div id={data.id} className="triangle-node-text">
        {data.label}
      </div>
      <Handle
        type="source"
        position="bottom"
        id={`${data.id}.bottom1`}
        style={{ left: "30%", borderRadius: 0 }}
      />
      <Handle
        type="source"
        position="bottom"
        id={`${data.id}.bottom2`}
        style={{ left: "70%", borderRadius: 0 }}
      />
    </div>
  )
}

export const TextNode = ({ data }) => {
  return (
    <div style={{ background: "transparent", padding: "14px" }}>
      <div id={data.id}>{data.label}</div>
    </div>
  )
}

export const nodeTypes = {
  circle: CircleNode,
  rectangle: RectangleNode,
  triangle: TriangleNode,
  text: TextNode
}
