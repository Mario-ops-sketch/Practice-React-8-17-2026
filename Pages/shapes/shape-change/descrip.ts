export function DescriptionShape(shape: string): string {
    switch(shape){
        case 'shape-square':
            return `The most symmetrical of all quadrilaterals. 
            It is defined by absolute equality: every side is
            the same length, and every corner is a perfect 90°
            right angle. It represents stability and balance.`;
        case 'shape-circle':
            return `The only shape in your list without corners or straight lines. 
            It is a continuous curve where every single point on the edge is exactly 
            the same distance from the center. It is the symbol of infinity and perfect rotation.`;
        case 'shape-rectangle':
            return `A cousin to the square, but with more "stretch." It still maintains four
            perfect 90° right angles, but it pairs its sides: the top and bottom are equal,
            while the left and right are equal. It is the standard shape for screens, doors, and bricks.`;
        case 'shape-triangle':
            return `The simplest possible polygon, made of only three sides and three angles.
            In geometry, it is the most rigid and strongest shape because its angles cannot
            change without changing the length of its sides—which is why it’s used in
            bridges and roof trusses.`;
        case 'shape-trapezoid':
            return `A quadrilateral that feels like a "clipped" triangle. Its defining feature
            is that it has one pair of parallel sides (usually the top and bottom) while the
            other two sides slant inward or outward. It’s often seen in the shape of popcorn
            buckets or standard handbags.`;
        case 'shape-cube':
            return `The only 3D shape in your set. While a square is flat, a cube has volume.
            It is made of six identical square faces. No matter which way you rotate a perfect
            cube, it looks exactly the same, making it the primary shape for dice and building blocks.`;
        default:
            return `No shape selected`;
    }
}