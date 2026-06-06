import React from 'react'

const ResizeHandler: React.FC = () => {
  return (
    <>
      <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize" />
      <div className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize" />
      <div className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize" />
      <div className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize" />
    </>
  )
}

export default ResizeHandler
