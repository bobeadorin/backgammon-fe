import { Color } from '../../enums/PieceColor'
import BarPiece from '../barPiece/BarPiece'
import './BarStyles.css'

export default function Bar() {
    const pieceCount = {
        white: 3,
        black: 3
    }

  return (
    <section className='bar-container'>
        <div className='bar-container-piece-holder'>
            {Array.from({ length: pieceCount.white }).map((_, index) => (
                <BarPiece key={index} color={Color.WHITE} />
            ))}
        </div>
        <div className='bar-container-piece-holder'>
            {Array.from({ length: pieceCount.black }).map((_, index) => (
                <BarPiece key={index} color={Color.BLACK} />
            ))}
        </div>
    </section>
  )
}
