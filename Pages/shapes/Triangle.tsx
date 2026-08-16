import { useState } from "react";
import './Triangle.css';

export function Triangle() {

    const [isFlipped, setIsFlipped] = useState(false);
    const [baseInput, setBaseInput] = useState('b');
    const [heightInput, setHeightInput] = useState('h');
    const [errorMessage, setErrorMesssage] = useState('');
    const [calculatedArea, setCalculatedArea] = useState(0);
    const [isCalculated, setIsCalculated] = useState(false);


    const toggleFlipped = () => {
        setIsFlipped(!isFlipped)
    }

    const showErrorAlert = (message: string) => {
        setErrorMesssage(message);
    }



    const calculateArea = () => {

        if (baseInput.length > 4 && heightInput.length > 4) {
            showErrorAlert('✖ Please enter a number with a maximum of 4 digits for both the base and height.');
            return;
        }
        else if (baseInput.length > 4) {
            showErrorAlert('✖ Please enter a number with a maximum of 4 digits for the base.');
            return;
        }
        else if (heightInput.length > 4) {
            showErrorAlert('✖ Please enter a number with a maximum of 4 digits for the height.');
            return;
        }
        else {
            const baseValue = Number(baseInput);
            const heightValue = Number(heightInput);

            if (isNaN(baseValue) && isNaN(heightValue)) {
                showErrorAlert('Please enter a number for both the base and height.');
                return;
            }

            if (isNaN(baseValue)) {
                showErrorAlert('✖ Please enter a number for the length.');
                return;
            }

            if (isNaN(heightValue)) {
                showErrorAlert('✖ Please enter a number for the width.');
                return;
            }
            else {
                const area = 0.5 * baseValue * heightValue;
                setCalculatedArea(area);
                setIsCalculated(true);
            }


        }


    }

    const handleBaseInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setIsCalculated(false);
        if (isNaN(Number(value))) {
            showErrorAlert('✖ Please enter a number for the base.');
            setBaseInput('b');
            return;
        }
        else {
            if (value.length > 4) {
                showErrorAlert('✖ Please enter a number with a maximum of 4 digits for the base.');
                setBaseInput('b');
                return;
            }
            else {
                setErrorMesssage('');
            }
        }

        setBaseInput(value === '' ? 'b' : value);
    }

    const handleHeightInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setIsCalculated(false);
        if (isNaN(Number(value))) {
            showErrorAlert('✖ Please enter a number for the height.');
            setHeightInput('h');
            return;
        }
        else {
            if (value.length > 4) {
                showErrorAlert('✖ Please enter a number with a maximum of 4 digits for the height.');
                setHeightInput('h');
                return;
            }
            else {
                setErrorMesssage('');
            }

        }

        setHeightInput(value === '' ? 'h' : value);
    }

    return (
        <div className="shapeContainer">
            <div className="imgDescrip" onClick={toggleFlipped}>
                <div id='imgHolder' className="imgHolderTriangle"
                    style={{
                        zIndex: isFlipped ? 1 : 10,
                        opacity: isFlipped ? 0 : 1
                    }}>
                    <div className="line left-slant"></div>
                    <div className="line right-slant"></div>
                    <div className="line bottom-base"></div>
                </div>
                <div id='descripHolder' className="descripHolder"
                    style={{
                        zIndex: isFlipped ? 10 : 1,
                        opacity: isFlipped ? 1 : 0
                    }}>
                    <h1>Triangle</h1>
                    <p>A three-sided polygon. To find the area, you measure
                        the base <span>b</span> and the perpendicular height <span>h</span> from
                        that base to the opposite peak.</p>
                </div>
            </div>
            <div className="calculationFormula">
                <div className="calculationHolder">
                    <p className='showAreaTri'>{
                        isCalculated ? `A = ${calculatedArea}` : <>A = ½ {baseInput} × {heightInput}</>
                    }</p>
                    <p style={{
                        opacity: errorMessage.length > 0 ? 1 : 0
                    }} className='errorAlert'> {errorMessage}</p>
                </div>
                <div className="formulaHolder">
                    <label htmlFor="widthSide">b:</label>
                    <input onChange={handleBaseInputChange} type="text" className="baseSide" placeholder="Base" />
                    <label htmlFor="lengthSide">h:</label>
                    <input onChange={handleHeightInputChange} type="text" className="heightSide" placeholder="Height" />
                    <button onClick={calculateArea} className="calculateBtn">✓</button>
                </div>
            </div>
        </div>
    )

}
