import './index.css';
import ReactDOM from 'react-dom'

export const Modal = ({active, setActive, children}) => {

    if (!active) return null

    return(
        ReactDOM.createPortal(            
                <div className = {active ? "modal active" : "modal"} onClick={() => setActive(false)}>
                <div className = 'modal__content' onClick={el => el.stopPropagation()}>
                    {children}
                </div>
            </div>, document.getElementById('modal'))


    )
}