import { useState } from "react";
import './Rectangle.css';

export function Rectangle() {

    const [isFlipped, setIsFlipped] = useState(false);
    const [widthInput, setWidthInput] = useState('w');
    const [lengthInput, setLengthInput] = useState('l');
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
        const lengthValue = Number(lengthInput);
        const widthValue = Number(widthInput);

        if (isNaN(lengthValue) && isNaN(widthValue)) {
            showErrorAlert('Please enter a number for both the length and width.');
            return;
        }

        if (isNaN(lengthValue)) {
            showErrorAlert('✖ Please enter a number for the length.');
            return;
        }

        if (isNaN(widthValue)) {
            showErrorAlert('✖ Please enter a number for the width.');
            return;
        }

        const area = lengthValue * widthValue;
        setCalculatedArea(area);
        setIsCalculated(true);
    }

    const handleWidthInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setIsCalculated(false);
        if (isNaN(Number(value))) {
            showErrorAlert('✖ Please enter a number for the width.');
            setWidthInput('w');
            return;
        }
        else{
            if(value.length > 4){
                showErrorAlert('✖ Please enter a number with a maximum of 4 digits for the width.');
                setWidthInput('w');
                return;
            }
            else{
                setErrorMesssage('');
            }
        }

        setWidthInput(value === '' ? 'w' : value);
    }

    const handleLengthInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;

        setIsCalculated(false);
        if (isNaN(Number(value))) {
            showErrorAlert('✖ Please enter a number for the length.');
            setLengthInput('l');
            return;
        }
        else{
            if(value.length > 4){
                showErrorAlert('✖ Please enter a number with a maximum of 4 digits for the length.');
                setLengthInput('l');
                return;
            }
            else{
                setErrorMesssage('');
            }
        }

        setLengthInput(value === '' ? 'l' : value);
    }

    return (
        <div className="shapeContainer">
            <div className="imgDescrip" onClick={toggleFlipped}>
                <div id='imgHolder' className="imgHolderRectangle"
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
                    <h1>Rectangle</h1>
                    <p>A four-sided polygon with four right angles. It has two pairs
                        of equal, opposite sides: the length <span>l</span> and the width <span>w</span>.
                        The area is the product of these two dimensions.</p>
                </div>
            </div>
            <div className="calculationFormula">
                <div className="calculationHolder">
                    <div className='showAreaRec'>{
                        isCalculated ? `A = ${calculatedArea}` : <>A = {widthInput} × {lengthInput}</>
                    }</div>
                    <p style={{
                        opacity: errorMessage.length > 0 ? 1 : 0
                    }} className='errorAlert'> {errorMessage}</p>
                </div>
                <div className="formulaHolder">
                    <label htmlFor="widthSide">w:</label>
                    <input onChange={handleWidthInputChange} type="text"  className="widthSide" placeholder="Width" />
                    <label htmlFor="lengthSide">l:</label>
                    <input onChange={handleLengthInputChange} type="text"  className="lengthSide" placeholder="Length" />
                    <button onClick={calculateArea} className="calculateBtn">✓</button>
                </div>
            </div>
        </div>
    )

}
