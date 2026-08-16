import { useState } from "react";
import './Trapezoid.css';

export function Trapezoid() {

    const [isFlipped, setIsFlipped] = useState(false);
    const [aBaseInput, setABaseInput] = useState('a');
    const [bBaseInput, setBBaseInput] = useState('b');
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
        const aBaseValue = Number(aBaseInput);
        const bBaseValue = Number(bBaseInput);
        const heightValue = Number(heightInput);

        if (isNaN(aBaseValue) && isNaN(bBaseValue) && isNaN(heightValue)) {
            showErrorAlert('Please enter a number for all values.');
            return;
        }

        if (isNaN(aBaseValue)) {
            showErrorAlert('✖ Please enter a number for the first base.');
            return;
        }

        if (isNaN(bBaseValue)) {
            showErrorAlert('✖ Please enter a number for the second base.');
            return;
        }

        
        if (isNaN(heightValue)) {
            showErrorAlert('✖ Please enter a number for the height.');
            return;
        }

        const area = 0.5 * (aBaseValue + bBaseValue) * heightValue;
        setCalculatedArea(area);
        setIsCalculated(true);
    }

    const handleABaseInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setIsCalculated(false);
        if (isNaN(Number(value))) {
            showErrorAlert('✖ Please enter a number for the first base.');
            setABaseInput('b');
            return;
        }
        else{
            if (value.length > 4) {
                showErrorAlert('✖ Please enter a number with a maximum of 4 digits for the first base.');
                setABaseInput('a');
                return;
            }
            else{
                showErrorAlert('');
            }
        }

        setABaseInput(value === '' ? 'a' : value);
    }


     const handleBBaseInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setIsCalculated(false);
        if (isNaN(Number(value))) {
            showErrorAlert('✖ Please enter a number for the second base.');
            setBBaseInput('b');
            return;
        }
        else {
            if (value.length > 4) {
                showErrorAlert('✖ Please enter a number with a maximum of 4 digits for the second base.'); 
                setBBaseInput('b');
                return;
            }
            else{
                showErrorAlert('');
            }
        }

        setBBaseInput(value === '' ? 'b' : value);
    }


    const handleHeightInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setIsCalculated(false);
        if (isNaN(Number(value))) {
            showErrorAlert('✖ Please enter a number for the height.');
            setHeightInput('h');
            return;
        }
        else{
            if (value.length > 4) {
                showErrorAlert('✖ Please enter a number with a maximum of 4 digits for the height.');
                setHeightInput('h');
                return;
            }
            else{
                showErrorAlert('');
            }
        }

        setHeightInput(value === '' ? 'h' : value);
    }

    return (
        <div className="shapeContainer">
            <div className="imgDescrip" onClick={toggleFlipped}>
                <div id='imgHolder' className="imgHolderTrapezoid"
                    style={{
                        zIndex: isFlipped ? 1 : 10,
                        opacity: isFlipped ? 0 : 1
                    }}>
                    <div className="line top-base"></div>
                    <div className="line left-slant"></div>
                    <div className="line right-slant"></div>
                    <div className="line bottom-base"></div>
                </div>
                <div id='descripHolder' className="descripHolder"
                    style={{
                        zIndex: isFlipped ? 10 : 1,
                        opacity: isFlipped ? 1 : 0
                    }}>
                    <h1>Trapezoid</h1>
                    <p>A four-sided polygon with at least one pair of parallel sides
                        (the bases, <span>a</span> and <span>b</span>). The area is determined by the average of
                        the two bases multiplied by the vertical height (<span>h</span>).</p>
                </div>
            </div>
            <div className="calculationFormula">
                <div className="calculationHolder">
                    <p className='showAreaTrap'>{
                        isCalculated ? `A = ${calculatedArea}` : <>A = <sup>{aBaseInput}+{bBaseInput}</sup>&frasl;<sub>2</sub>  × {heightInput}</>
                    }</p>
                    <p style={{
                        opacity: errorMessage.length > 0 ? 1 : 0
                    }} className='errorAlert'> {errorMessage}</p>
                </div>
                <div className="formulaHolder">
                    <label htmlFor="aBase">a:</label>
                    <input onChange={handleABaseInputChange} type="text" className="aBase" placeholder="A" />
                    <label htmlFor="bBase">b:</label>
                    <input onChange={handleBBaseInputChange} type="text" className="bBase" placeholder="B" />
                    <label htmlFor="heightSide">h:</label>
                    <input onChange={handleHeightInputChange} type="text" className="heightSideTrapezoid" placeholder="H" />
                    <button onClick={calculateArea} className="calculateBtn">✓</button>
                </div>
            </div>
        </div>
    )

}
