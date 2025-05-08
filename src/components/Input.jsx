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
                   className = {`px-3 py-2 rounded-lg hover:border-neutral-400 transition-all duration-300 bg-transparent  outline-none border shadow-lg border-neutral-700 w-full ${className}`}
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