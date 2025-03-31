import React from 'react'

// function Input({}) {
//     const id = userId()
//     return (
//         <div>Input </div>
//     )
// }

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className='',
    ...props
} , ref){
    const id = userId()
    return (
        <div className='w-full'>
            {label && 
            <label className='block mb-1' htmlFor={id}>
                {label}
            </label>}

            <input 
            type={text}
            className={`px-3 py-2 rounded-lg bg-white
                text-black outline-none focus:bg-grey-50
                duration-200 border border-grey-200 w-full  
                ${className}`}
                ref={ref}
                {...props}
                id={id}
            />

        </div>
    )
})

export default Input
               