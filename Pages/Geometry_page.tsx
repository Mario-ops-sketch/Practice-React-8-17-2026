import './Geometry_page.css'
import { Circle } from './shapes/Circle';
import { Rectangle } from './shapes/Rectangle';
import { Trapezoid } from './shapes/Trapezoid';
import { Triangle } from './shapes/Triangle';
import { Cube } from './shapes/Cube';
import { Square } from './shapes/Square';
import { useRef } from 'react';
import { ChangeShape } from './shapes/shape-change/container';

interface WrapperProps {
    children: React.ReactNode;
    sectionRef: React.RefObject<HTMLDivElement | null>;
}

function ShapeSection({ children, sectionRef }: WrapperProps) {
    return (
        <div
            ref={sectionRef}
            style={{
                height: '80vh',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                scrollMarginTop: '80px' // Adjust this to your navbar height
            }}
        >
            {children}
        </div>
    );
}

export function GeometryCal() {

    const squareRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<HTMLDivElement>(null);
    const rectangleRef = useRef<HTMLDivElement>(null);
    const triangleRef = useRef<HTMLDivElement>(null);
    const trapezoidRef = useRef<HTMLDivElement>(null);
    const cubeRef = useRef<HTMLDivElement>(null);
    const shapeRef = useRef<HTMLDivElement>(null);


    const scrollToSection = (elementRef: React.RefObject<HTMLDivElement | null>) => {
        elementRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }

    return (
        <div>

            <div className='navbar'>
                <nav>
                    <button onClick={() => { scrollToSection(shapeRef) }}>
                        <div className='info-icon'>
                            i
                        </div>
                    </button>
                    <button onClick={() => { scrollToSection(squareRef) }}><div className='square-icon'></div></button>
                    <button onClick={() => { scrollToSection(circleRef) }}><div className='circle-icon'></div></button>
                    <button onClick={() => { scrollToSection(rectangleRef) }}><div className='rectangle-icon'></div></button>
                    <button onClick={() => { scrollToSection(triangleRef) }}><div className='triangle-icon'>
                        <div className='line left-slant'></div>
                        <div className='line right-slant'></div>
                        <div className='line bottom-base'></div>
                    </div></button>
                    <button onClick={() => { scrollToSection(trapezoidRef) }}><div className='trapezoid-icon'>
                        <div className='line top-base'></div>
                        <div className='line left-slant'></div>
                        <div className='line right-slant'></div>
                        <div className='line bottom-base'></div>
                    </div></button>
                    <button onClick={() => { scrollToSection(cubeRef) }}><div className='cube-icon'>
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

            <ShapeSection sectionRef={shapeRef}>
                <ChangeShape />
            </ShapeSection>
            <ShapeSection sectionRef={squareRef}>
                <Square />
            </ShapeSection>
            <ShapeSection sectionRef={circleRef}>
                <Circle />
            </ShapeSection>
            <ShapeSection sectionRef={rectangleRef}>
                <Rectangle />
            </ShapeSection>

            <ShapeSection sectionRef={triangleRef}>
                <Triangle />
            </ShapeSection>
            <ShapeSection sectionRef={trapezoidRef}>
                <Trapezoid />
            </ShapeSection>
            <ShapeSection sectionRef={cubeRef}>
                <Cube />
            </ShapeSection>

        </div>
    );
}   