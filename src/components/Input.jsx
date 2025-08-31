import React,{useId} from 'react'

const Input = React.forwardRef(
    function Input({
        label,
        type= 'text',
        className= '',
         ...props
        },ref){
                const id = useId()  
        return (
              <div className='w-full'>
                  { label && <label
                    htmlFor={id}
                    className ='inline-block mb-1 pl-1'> {label} </label>}
                  <input
                   className = {`w-full pl-3 py-2 rounded-lg text-neutral-700 bg-blue-100 outline-none placeholder:text-neutral-500 focus:ring-1 focus:ring-blue-950/100 ${className}`}
                   type= {type}
                   ref = {ref}
                   {...props} 
                   id= {id}
                   />
              </div>
        )
    } 
)
export default Input