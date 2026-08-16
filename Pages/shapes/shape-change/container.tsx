import './container.css';
import { useState } from 'react';
import { DescriptionShape } from './descrip';

export function ChangeShape() {

   const [activeShape, setActiveShape] = useState('shape-square');
   const [sizeShape, setSizeShape] = useState(1);
   const [sizeRange, setSizeRange] = useState(50);

   const shapeTitle = () => {
        const shapeString = activeShape.slice(6);
        const firstChar = shapeString.charAt(0).toUpperCase();
        const extraString = shapeString.slice(1);
        const titleShape = firstChar + extraString;
        return titleShape;

   }

    const activeClassShape = (shape: string) => {
        setActiveShape(`shape-${shape}`);
    }

    const changeSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        const size = Number(event.target.value);
        setSizeRange(size);
        const sizeValue = 0.5 + (size-  1) * 1/99;
        setSizeShape(sizeValue);
    }

    return (
        <div className="shapeChangeContainer">
            <div className="shapeHolder">
                <div className='shapeBox'>
                    <div className={activeShape} style={{
                        transform: `scale(${sizeShape})`
                    }}>
                        <div className='line top-square'></div>
                        <div className='line left-square'></div>
                        <div className='line right-square'></div>
                        <div className='line bottom-square'></div>
                        <div className='line square-top'></div>
                        <div className='line left-slant'></div>
                        <div className='line middle-slant'></div>
                        <div className='line right-slant'></div>
                        <div className='line square-right'></div>
                        <div className='line square-left'></div>
                        <div className='line square-bottom'></div>
                        <div className='line bottom-slant'></div>

                        <div className='line top-base'></div>
                        <div className='line bottom-base'></div>
                    </div>
                </div>
            </div>
            <div className='controlDescrip'>
                <div key={activeShape} className='descripHolder'>
                    <div className='titleShapeH1'>{shapeTitle()}</div>
                    <p>{`${DescriptionShape(activeShape)}`}</p>
                </div>
                <div className='control'>
                    <div className='infoControl'>Resize Control</div>
                    <div className='changeShape'>
                        <nav>
                            <button onClick={()=> {activeClassShape('square')}}><div className='square-icon'></div></button>
                            <button onClick={()=> {activeClassShape('circle')}}><div className='circle-icon'></div></button>
                            <button onClick={()=> {activeClassShape('rectangle')}}><div className='rectangle-icon'></div></button>
                            <button onClick={()=> {activeClassShape('triangle')}}><div className='triangle-icon'>
                                <div className='line left-slant'></div>
                                <div className='line right-slant'></div>
                                <div className='line bottom-base'></div>
                            </div></button>
                            <button onClick={()=> {activeClassShape('trapezoid')}}><div className='trapezoid-icon'>
                                <div className='line top-base'></div>
                                <div className='line left-slant'></div>
                                <div className='line right-slant'></div>
                                <div className='line bottom-base'></div>
                            </div></button>
                            <button onClick={()=> {activeClassShape('cube')}}><div className='cube-icon'>
                                <div className='line top-square'></div>
                                <div className='line left-square'></div>
                                <div className='line right-square'></div>
                                <div className='line bottom-square'></div>

                                <div className='line square-top'></div>
                                <div className='line left-slant'></div>
                                <div className='line middle-slant'></div>
                                <div className='line right-slant'></div>
                                <div className='line square-right'></div>

                                <div className='line square-left'></div>
                                <div className='line square-bottom'></div>
                                <div className='line bottom-slant'></div>


                            </div></button>
                        </nav>
                    </div>

                    <div className='changeSize'>
                        <label htmlFor="size"><i className="fa-solid fa-down-left-and-up-right-to-center"></i></label>
                        <input onChange={changeSize} type="range" name="size" id="size" min={1} max={100} value={sizeRange}/>
                        <p className='sizeNum'>{sizeRange}</p>
                    </div>
                </div>
            </div>

        </div>
    )

}