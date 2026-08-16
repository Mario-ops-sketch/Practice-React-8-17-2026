import { useState } from "react";
import './Cube.css';

export function Cube() {

    const [isFlipped, setIsFlipped] = useState(false);
    const [sideLengthInput, setSideLengthInput] = useState('s');
    const [showError, setShowError] = useState('');
    const [calculatedArea, setCalculatedArea] = useState(0);
    const [isCalculated, setIsCalculated] = useState(false);


    const toggleFlipped = () => {
        setIsFlipped(!isFlipped)
    }

    const showErrorAlert = (message: string) => {
        setShowError(message);
    }



    const calculateArea = () => {
        const sideLength = Number(sideLengthInput);

        if (isNaN(sideLength)) {
            showErrorAlert('✖ Please enter a number for the side length.');
            return;
        }

        let area = 6 * sideLength * sideLength;

        setCalculatedArea(area);
        setIsCalculated(true);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setIsCalculated(false);
        if (isNaN(Number(value))) {
            showErrorAlert('✖ Please enter a number for the side length.');
            setSideLengthInput('s');
            return;
        }
        else{
            if (value.length > 4) {
                showErrorAlert('✖ Please enter a number with a maximum of 4 digits for the side length.');
                setSideLengthInput('s');
                return;
            }
            else{
                showErrorAlert('');
            }
        }

        setSideLengthInput(value === '' ? 's' : value);
    }

    return (
        <div className="shapeContainer">
            <div className="imgDescrip" onClick={toggleFlipped}>
                <div id='imgHolder' className="imgHolderCube"
                    style={{
                        zIndex: isFlipped ? 1 : 10,
                        opacity: isFlipped ? 0 : 1
                    }}>
                    <div className="line square-top"></div>
                    <div className="line square-left"></div>
                    <div className="line square-right"></div>
                    <div className="line square-bottom"></div>

                    <div className="line top-square"></div>
                    <div className="line left-slant-square"></div>
                    <div className="line right-slant-square"></div>
                    <div className="line right-square"></div>
                    <div className="line bottom-slant-square"></div>
                    <div className="line left-bottom-slant-square"></div>
                    <div className="line left-square"></div>
                    <div className="line bottom-square"></div>

                </div>
                <div id='descripHolder' className="descripHolder"
                    style={{
                        zIndex: isFlipped ? 10 : 1,
                        opacity: isFlipped ? 1 : 0
                    }}>
                    <h1>Cube</h1>
                    <p> A 3D solid bounded by six equal square faces. Since all edges
                        are the same length <span>s</span>, the surface area is six times the
                        area of one face.</p>
                </div>
            </div>
            <div className="calculationFormula">
                <div className="calculationHolder">
                    <p className='showAreaCube'>{
                        isCalculated ? `A = ${calculatedArea}` : <>A = 6 × {sideLengthInput} <sup>2</sup></>
                    }</p>
                    <p style={{
                        opacity: showError ? 1 : 0
                    }} className='errorAlert'>{showError}</p>
                </div>
                <div className="formulaHolder">
                    <label htmlFor="inputSide">s:</label>
                    <input onChange={handleInputChange} type="text" className="inputSide" placeholder="Side Length" />
                    <button onClick={calculateArea} className="calculateBtn">✓</button>
                </div>
            </div>
        </div>
    )

}
