import { useState } from "react";
import './Square.css';

export function Square() {

    const [isFlipped, setIsFlipped] = useState(false);
    const [sideInput, setSideInput] = useState('s');
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
        const sideLength = Number(sideInput);
        if (isNaN(sideLength)) {
            showErrorAlert('✖ Please enter a number for the side length.');
            return;
        }
        let area = sideLength * sideLength;
        setCalculatedArea(area);
        setIsCalculated(true);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;



        setIsCalculated(false);
        if (isNaN(Number(value))) {
            showErrorAlert('✖ Please enter a number for the side length.');
            setSideInput('s');
            return;
        }
        else {
            if (value.length > 4) {
                showErrorAlert('✖ Please enter a number with a maximum of 4 digits.');
                setSideInput('s');
                return;
            }
            else {
                showErrorAlert('');
            }
        }

        setSideInput(value === '' ? 's' : value);
    }

    return (
        <div className="shapeContainer">
            <div className="imgDescrip" onClick={toggleFlipped}>
                <div id='imgHolder' className="imgHolderSquare"
                    style={{
                        zIndex: isFlipped ? 1 : 10,
                        opacity: isFlipped ? 0 : 1
                    }}>

                </div>
                <div id='descripHolder' className="descripHolder"
                    style={{
                        zIndex: isFlipped ? 10 : 1,
                        opacity: isFlipped ? 1 : 0
                    }}>
                    <h1>Square</h1>
                    <p>A four-sided polygon where all sides are of equal length <span>s</span> and all angles are 90 degrees. Its area is found by squaring the length of one side.</p>
                </div>
            </div>
            <div className="calculationFormula">
                <div className="calculationHolder">
                    <p className='showArea'>{
                        isCalculated ? `A = ${calculatedArea}` : <>A =  {sideInput} <sup>2</sup></>
                    }</p>
                    <p style={{
                        opacity: showError ? 1 : 0
                    }} className='errorAlert'>{showError}</p>
                </div>
                <div className="formulaHolder">
                    <label htmlFor="squareSide">S:</label>
                    <input onChange={handleInputChange} type="text" id="squareSide" className="squareSide" placeholder="Side" />
                    <button onClick={calculateArea} className="calculateBtn">✓</button>
                </div>
            </div>
        </div>
    );

}