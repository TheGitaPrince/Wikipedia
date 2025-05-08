import React,{useId} from 'react'

const Select  = React.forwardRef(
function Select({
    options,
    label,
    className,
    ...props
},ref) {
    const id = useId()
  return (
    <div className='w-full'>
        { label && <label htmlFor={id} className="inline-block mb-1 pl-1">{label}</label> }
        <select
          {...props}
          id = {id}
          ref = {ref}
         className = {`px-3 py-2 rounded-lg hover:border-neutral-400 [&_option]:bg-neutral-950  [&_option]:text-white     transition-all duration-300 bg-transparent  outline-none border shadow-lg border-neutral-700 w-full ${className}`}
         >
          {
            options?.map((option)=>(
                <option
                key={option}
                value = {option}
                ref={ref}
                >
                 {option}
                </option>
            ))
          }
        </select>
    </div>
  )
})

export default Select