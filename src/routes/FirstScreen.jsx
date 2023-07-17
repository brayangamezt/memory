import React from 'react';
import memoryNew from '../assets/memory.png';
import { Outlet, Link } from 'react-router-dom';

const FirstScreen = () => {

  return (
    <>
      <div className="w-full h-screen p-5 bg-[url('assets/squart2.jpg')] bg-no-repeat bg-cover bg-center flex justify-center items-center">
        <div className='glass-container max-[500px]:w-3/4'>
          <img className='w-3/4 h-3/4 max-[500px]:w-4/5 drop-shadow animate-[logoAnimation_2s_linear]' src={memoryNew} alt="logo" />
          <p className='text-slate-50' >Welcom to memory game</p>
          <Link to={`/memory/game`}  className='linkMemory rounded-full font-bold animate-[buttonAnimation_2s_linear] hover:animate-[bounce_1s_infinite]'> 
            Start 
          </Link>
        </div>
      </div>
    </>
  )
}

export default FirstScreen