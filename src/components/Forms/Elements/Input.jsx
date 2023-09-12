import React from 'react';
const fixedInputClass="rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
const Input = 
React.forwardRef(
    ({ onChange, 
       onBlur, 
       name, 
       labelText,
       labelFor,
       id,
       type,
       isRequired,
       placeholder,
       customClass,
       value,
       errors
     }, ref)=> {
    return (
        <div className="my-5">
            <label htmlFor={labelFor} className="sr-only">
                {labelText}
            </label>
            <input
                onChange={onChange}
                ref={ref}
                onBlur={onBlur}
                id={id}
                name={name}
                type={type}
                required={isRequired}
                className={fixedInputClass + customClass}
                placeholder={placeholder}
                value={value}
            /><span className='text-red-700'>
            {errors&&errors[name]?.message}</span>
        </div>
    );
});

export default Input;
