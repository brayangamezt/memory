import React, {useState, useEffect} from 'react';
import ReactCardFlip from 'react-card-flip';
import cardFlipped from '../assets/cardInterrogation.jpg';

export const Card = ({name, number, frontFace, flipcard,unflippedcard,disabledcard}) => {
    const [isFlipped, setIsflipped]=useState(false);
    const [hasEvent, setHasEvent]=useState(true);

    useEffect( ()=>{
        if(unflippedcard.includes(number)){
          setTimeout( ()=>{setIsflipped(false)},700 );
        }
      },[unflippedcard] );
    
      useEffect( ()=>{
        if(disabledcard.includes(number)){
          setHasEvent(false)
        }
      },[disabledcard] );
      
    
      const handleClick=()=>{
        const value=flipcard(name,number);
        if(value !== 0){
          setIsflipped(!isFlipped);
        }
      }

  return (
    <div className='card'>
      <ReactCardFlip isFlipped={isFlipped} >
        <img className='card-image' src={cardFlipped} alt="frontface" onClick={hasEvent ? handleClick : null} />
        <img className='card-image' src={frontFace} alt="backface" onClick={hasEvent ? handleClick : null}/>
      </ReactCardFlip>
    </div>
  )
}
