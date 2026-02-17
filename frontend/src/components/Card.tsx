import QuestionMark from '../assets/QuestionMark.png'
//import Diamond from '../assets/Diamond.png'
//import Bomb from '../assets/Bomb.png'
//import RedBomb from '../assets/RedBomb.png'

export function Card(){
    return(
        <div className="w-18 h-18 bg-gray-800 items-center justify-center border-0 rounded-3xl ">
            <img src={QuestionMark} alt="" />
        </div>
    )
}