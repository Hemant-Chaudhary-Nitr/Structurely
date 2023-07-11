import React, { useCallback, useState } from "react"
import Flowchart from "flowchart-react"

const Grid = () => {
  const [nodes, setNodes] = useState([
    {
      type: "start",
      title: "Start",
      x: 50,
      y: 240,
      id: 1604410569920
    },
    {
      type: "end",
      title: "End",
      x: 570,
      y: 240,
      id: 1604410572363
    },
    {
      x: 400,
      y: 240,
      id: 1604410575428,
      title: "Joyce",
      type: "operation"
    },
    {
      x: 230,
      y: 240,
      id: 1604410591865,
      title: () => {
        return "Is leader"
      },
      type: "decision"
    }
  ])
  const [conns, setConns] = useState([
    {
      source: { id: 1604410569920, position: "right" },
      destination: { id: 1604410591865, position: "left" },
      type: "success",
      title: "1"
    },
    {
      source: { id: 1604410575428, position: "right" },
      destination: { id: 1604410572363, position: "left" },
      type: "success",
      title: "3"
    },
    {
      source: { id: 1604410591865, position: "right" },
      destination: { id: 1604410575428, position: "left" },
      title: "2",
      type: "fail"
    },
    {
      source: { id: 1604410591865, position: "bottom" },
      destination: { id: 1604410572363, position: "bottom" },
      title: "2",
      type: "success"
    }
  ])

  const handleCreateNode = useCallback(
    (event, zoom) => {
      const point = {
        x: event.nativeEvent.offsetX / zoom,
        y: event.nativeEvent.offsetY / zoom,
        id: +new Date()
      }
      let nodeData
      if (!nodes.find(item => item.type === "start")) {
        nodeData = {
          type: "start",
          title: "Start",
          ...point
        }
      } else if (!nodes.find(item => item.type === "end")) {
        nodeData = {
          type: "end",
          title: "End",
          ...point
        }
      } else {
        nodeData = {
          ...point,
          title: "New",
          type: "operation"
        }
      }
      setNodes(prevState => [...prevState, nodeData])
    },
    [nodes]
  )

  return (
    <div>
      <Flowchart
        onChange={(nodes, connections) => {
          setNodes(nodes)
          setConns(connections)
        }}
        onDoubleClick={handleCreateNode}
        style={{ height: "500vh" }}
        nodes={nodes}
        connections={conns}
      />
    </div>
  )
}

export default Grid
