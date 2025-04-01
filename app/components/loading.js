import styled from "styled-components";
import { AiOutlineSetting } from "react-icons/ai";

const StyledLoad = styled.section`
    width: 220vh;
    height: 100vh;
    background-color: blue ;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 45%;



    .circulo {
        margin: auto;
        text-align: center;
        width: 100%;
        height: 100%;
        display: flex;
        gap: 20px;
        align-items: center;
        
        /* border-radius: 50%; */
        overflow: visible;
        background-color: amber; /* Optional: Change color as needed */
    }

    .load{
        width: 20px;
        height: 20px;
        font-size: 20px;
        background-color: rgb(1, 251, 243);
        border-radius: 50%;
        overflow: visible;
        animation: rotateAnimation 1s linear infinite ;

    }


    @keyframes rotateAnimation {
        0% {
            transform: rotate(0deg) translateX(20px);
        }
        25% {
            transform: rotate(90deg) translateX(20px);
        }
        50% {
            transform: rotate(180deg) translateX(20px);
        }
        75% {
            transform: rotate(270deg) translateX(20px);
        }
        100% {
            transform: rotate(360deg) translateX(20px);
        }
    }

    .texto{
        display: flex;
        align-items: center;
        gap: 2px;
        font-size: 20px;
        color: cyan;
        text-shadow: 2px 2px 2px black;
    }

    .aparecer1{
        animation: aparecerprimero 1s linear infinite;
    }

    @keyframes aparecerprimero{
        0% {
            opacity: 0;
        }
        33%{
            opacity: 0.5;
        }
        66%{
            opacity: 0.8;
        }
        100%{
            opacity: 1;
        }
    }

    .aparecer2{
        animation: aparecersegundo 1s linear infinite;
    }

    @keyframes aparecersegundo{
        0% {
            opacity: 0;
        }
        33%{
            opacity: 0;
        }
        66%{
            opacity: 0.5;
        }
        100%{
            opacity: 1;
        }
    }

    .aparecer3{
        animation: aparecertercero 1s linear infinite;
    }

    @keyframes aparecertercero{
        0% {
            opacity: 0;
        }
        33%{
            opacity: 0;
        }
        66%{
            opacity: 0;
        }
        100%{
            opacity: 1;
        }
    }
`;

export const Loading = () => {
    return(
        // al poner user entre corchetes, lo estoy ingresando como un objeto, en preferencia, escribirlo sin corchetes
        <StyledLoad>
            <section className="circulo">
                
                <div className="load"></div>
                <div className="texto">
                    <h2>Loading</h2>
                    <h3 className="aparecer1"> .</h3>
                    <h3 className="aparecer2"> .</h3>
                    <h3 className="aparecer3"> .</h3>
                </div>
            </section>
        </StyledLoad>
    )
}