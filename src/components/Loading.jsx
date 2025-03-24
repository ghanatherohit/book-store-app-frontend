import React from 'react'
import { ThreeCircles, ThreeDots } from 'react-loader-spinner'

const Loading = () => {
  return (
    <div className='flex flex-row items-center justify-center h-[90vh] w-full'>
            <p className='text-3xl font-semibold text-center'>
                Loding
            </p>
            <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#2563EB"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
                className="inline-block m-7"
            />
        </div>
  )
}

export default Loading
