import { Link } from 'react-router-dom';

export const StartPage = () => {
    return(
        <>
            <div>
                <h1>Start page</h1>
                <Link to='authentication'>Authentication</Link>
                <Link to='registration'>Registration</Link>
            </div>
        </>
    )
}