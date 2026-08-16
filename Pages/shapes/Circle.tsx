import { useState } from "react";
import './Circle.css';

export function Circle() {

    const [isFlipped, setIsFlipped] = useState(false);
    const [radiusInput, setRadiusInput] = useState('r');
    const [showError, setShowError] = useState('');
    const [area, setArea] = useState('');
    const [calculatedArea, setCalculatedArea] = useState(0);
    const [isCalculated, setIsCalculated] = useState(false);


    const toggleFlipped = () => {
        setIsFlipped(!isFlipped)
    }

    const showErrorAlert = (message: string) => {
        setShowError(message);
    }



    const calculateArea = () => {
        const sideLength = Number(radiusInput);
        const pi = 3.14;

        if (isNaN(sideLength)) {
            showErrorAlert('Please enter a valid number for the radius.');
            return;
        }

        let area = pi * sideLength * sideLength;

        setCalculatedArea(area);
        setIsCalculated(true);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;


        setIsCalculated(false);
        if (isNaN(Number(value))) {
            showErrorAlert('Please enter a valid number for the radius.');
            setRadiusInput('r');
            return;
        }
        else {
            if (value.length > 4) {
                showErrorAlert('Please enter a number with a maximum of 4 digits for the radius.');
                setRadiusInput('r');
                return;
            }
            else {
                setShowError('');
            }
        }

        setRadiusInput(value === '' ? 'r' : value);
    }

    return (
        <div className="shapeContainer">
            <div className="imgDescrip" onClick={toggleFlipped}>
                <div id='imgHolder' className="imgHolderCircle"
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
                    <h1>Circle</h1>
                    <p>A perfectly round shape where every point on the edge is the same distance
                        from the center. This distance is the radius <span>r</span>. The area is calculated
                        using the constant <span>π</span> (approximately 3.14).</p>
                </div>
            </div>
            <div className="calculationFormula">
                <div className="calculationHolder">
                    <p className='showAreaCircle'>{
                        isCalculated ? `A = ${calculatedArea}` : <>A = π {radiusInput} <sup>2</sup></>
                    }</p>
                    <p style={{
                        opacity: showError ? 1 : 0
                    }} className='errorAlert'>✖ {showError}</p>
                </div>
                <div className="formulaHolder">
                    <label htmlFor="radiusSide">r:</label>
                    <input onChange={handleInputChange} type="text" id="radiusSide" className="radiusSide" placeholder="Radius" />
                    <button onClick={calculateArea} className="calculateBtn">✓</button>
                </div>
            </div>
        </div>
    )

}
