import React from 'react'

function Button(
    {
        children,
        type = 'Button',
        bgColor = 'bg-blue-950/90',
        textColor = 'text-white',
        className = '',
        ...props
    }) 
  {  
     return (
          <button
          className = {`px-4 py-2 rounded-lg hover:bg-blue-950/100 ${bgColor} ${textColor} ${className}`}
          {...props}
          >
            {children}
          </button>
     )
}

export default Button