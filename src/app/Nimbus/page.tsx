'use client'
import './style.css'
import UsersAvatarsInCircle from './UsersVatarsInCircle';

function Page() {
   

    return (<div className="bg-gray-900">
        {/* <div className='fadeOut w-screen h-screen  absolute z-20 top-0 left-0' /> */}
        <div className="fixed  z-[9] backdrop-blur-2xl  h-screen w-screen flex items-center justify-center ">
            <UsersAvatarsInCircle />
        </div>
        <div className=" relative z-[9]  h-screen w-screen flex items-center justify-center ">
        </div>
        <div className=" relative z-[9]  h-screen w-screen flex items-center justify-center ">
        </div>
    </div>);
}

export default Page;