import './modal.css';
import ReactDOM from 'react-dom'

const modal = document.getElementById('modal')

export const Modal = ({active, setActive, Children}) => {

    return(
        ReactDOM.createPortal(            
                <div className = {active ? "modal active" : "modal"} onClick={() => setActive(false)}>
                <div className = 'modal__content' onClick={el => el.stopPropagation()}>
                    {Children}
                </div>
            </div>,modal)


    )
}