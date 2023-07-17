import React, {useState, useEffect} from 'react';
import images from '../cards';

import { Card } from '../components/Card';
import GuitarHouse from '../assets/background.mp3';
import correct from '../assets/correct.mp3';
import incorrect from '../assets/incorrect.mp3';
import tiking from '../assets/ticking.mp3';

import Swal from 'sweetalert2';


const SecondScreen = () => {
  const [cards, setCards] = useState([]);
  const [firstCard,setFirstcard]=useState({});
  const [secondCard, setSecondcard]=useState({});
  const [counter, setCounter]=useState(0);
  const [second, setSecond] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [winner,setWinner]=useState(false);
  const [loser, setLoser]=useState(false);
  const [begin,setBegin]=useState(false);
  
  const [unFlippedCard, setUnFlippedCard]=useState([]);
  const [disabledCards, setDisabledCards]=useState([]);

  let tik = new Audio(tiking);

  useEffect( ()=>{
    shuffleArray(images);
    setCards(images); //Cuando se renderice el componente se van a colocar las cartas
  },[]);

  useEffect( ()=>{
    checkingMatch();
  },[secondCard] );

  useEffect( ()=>{
    let interval;
    if(isActive && winner === false){
      interval=setInterval( ()=>{
        if(counter === 4 && second > 0){
          setWinner(true);
          clearInterval(interval);
          winnerFunction();
        }else if(counter < 4 && second === 0){
          setLoser(true);
          clearInterval(interval);
          loserFunction();
        }
        if(second > 0){
          setSecond(second - 1);
        }
        if(second < 10 && second > 0){
          let tik = new Audio(tiking);
          tik.play()
        }
      },1000 );
    }
    return ()=>{clearInterval(interval)}
  },[isActive,second] );


  // Function to get random card order
  const shuffleArray = (array) =>{
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  //Avoid flip the same card twelve times in a row
  const flipcard=(name,number)=>{
    if(firstCard.name === name && firstCard.number === number){
      return 0;
    }
    if(!firstCard.name){
      setFirstcard({name,number});
    }else if(!secondCard.name){
      setSecondcard({name,number});
    }
    return 1;
  }

  //Check the match of the cards
  const checkingMatch=()=>{
    let match=null;
    if(firstCard.name && secondCard.name){
      match=firstCard.name === secondCard.name;
      match ? disabledCard() : unflipCards();
      if(match){
        setCounter(counter + 1);
        setTimeout( ()=>{
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Nice! its a match',
            showConfirmButton: false,
            timer: 1500,
            didOpen: ()=>{
              let autoplay = new Audio(correct);
              autoplay.play();
            }
          });
        }, 500 );
      }else{
        setTimeout( ()=>{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Sorry, but is not a match ',
            showConfirmButton: false,
            timer: 1500,
            didOpen: ()=>{
              let autoplay = new Audio(incorrect);
              autoplay.play();
            }
          });
        }, 500 );
      }
    }
  }

  const winnerFunction = () =>{
    Swal.fire({
      icon:'success',
      title: 'You did it!',
      confirmButtonText: 'Play again',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        resetWinner();
      }
    })
  }

  const loserFunction = () =>{
    Swal.fire({
      icon:'error',
      title: 'Oops! you didnt find them all',
      confirmButtonText: 'Play again',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        resetLoser();
      }
    })
  }

  const disabledCard=()=>{
    setDisabledCards([firstCard.number, secondCard.number]);
    resetCard();
  }

  const unflipCards=()=>{
    setUnFlippedCard([firstCard.number, secondCard.number]);
    resetCard();
  }

  const resetCard=()=>{
    setFirstcard({});
    setSecondcard({});
  }


  const resetLoser=()=>{
    setCounter(0);
    setSecond(30);
    setIsActive(false);
    setLoser(false);
    setBegin(false);
  }

  const resetWinner=()=>{
    setCounter(0);
    setSecond(30);
    setIsActive(false);
    setWinner(false);
    setBegin(false);
  }

  const start=()=>{
    setIsActive(true);
    setBegin(true);
  }


  return (
    <>
      <div className="w-full lg:h-screen sm:h-screen min-[280px]:h-screen relative bg-[url('assets/squart.jpg')] bg-no-repeat bg-cover bg-center bg-cr flex justify-center items-center">
        <div className='w-3/4 h-3/4 flex justify-center items-center flex-col'>
          <audio className='absolute top-2 right-5 max-[390px]:w-28' autoPlay controls loop>
            <source src={GuitarHouse} type='audio/mpeg' />
          </audio>
          <div className='text-white lg:text-6xl mb-1 sm:text-2xl max-[]'>
            {
              second >=10 ?
              <div>
                {second} seconds left
              </div>
              :
              <div>
                you have {second} seconds
              </div>
            }
          </div>
          {
            begin &&
            <div className='w-full flex flex-wrap justify-around lg:mt-2 md:mt-2 sm:mt-4'>
              {
                cards.map( (card, index)=>{
                  return(<Card name={card.name} number={index} frontFace={card.img} key={index} flipcard={flipcard}  unflippedcard={unFlippedCard} disabledcard={disabledCards}/>)
                } )
              }
            </div>
          }
          {
            !begin ? <button className='w-1/5 mt-4 p-1 bg-teal-100 rounded-full max-[376px]:w-3/5 max-[414px]:w-3/5' onClick={()=>{start()}}>Empezar</button> : ''
          }
        </div>
      </div>
    </>
  )
}

export default SecondScreen;