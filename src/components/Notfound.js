import { useNavigate } from "react-router-dom";
import not from '../asset/404.svg';

function NotFound() {
    const history = useNavigate();

    const goBack = () => history(-1);

    return (
        <section className="bg-light d-flex justify-content-center align-items-center vh-100 text-center">
            <div>
                <h1>How did you land here?!!..🤔</h1>
                <p>This page doese not exist  </p>
                <img src={not} alt='404' />

                <div className="m-2">
                    <button className="btn btn-primary" onClick={goBack}>Go Back</button>
                </div>
            </div>
        </section>
    )
}

export default NotFound;