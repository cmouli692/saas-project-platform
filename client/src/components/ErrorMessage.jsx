import React from 'react'

const ErrorMessage = ({message}) => {

    if(!message) return null;

  return (
    <div className='mb-4 rounded border border-red-300 bg-red-50 px-3 py-2 text-red-700'>
      {message}
    </div>
  )
}

export default ErrorMessage
