import './Pokemon_spider_graph.css'
import { useState } from 'react';

interface PokemonStat {
    base_stat: number;
    stat: {
        name: string;
    }
}


export function PokemonSpiderGraph({ pokemonData }: {pokemonData: any}) {

    const[isHovered, setIsHovered] = useState<number | null>(null);

    

    const centerX = 100;
    const centerY = 100;
    const maxRadius = 80; // This keeps the hexagon inside our 200x200 viewBox
    const maxStat = 255;

    const labelRadius = 85
    const statLabels = ["HP", "ATK", "DEF", "SPA", "SPD", "SPE"];
    const statFullNames = ["Health Points", "Attack", "Defense", "Special-Attack", "Special-Defense", "Speed"];

    

    const statPoints = pokemonData.stats.map((s: PokemonStat, i: number) => {
        // 1. Calculate the angle for this specific stat (i is 0 to 5)
        // We subtract Math.PI / 2 to make the first stat (HP) start at the top
        const angle = (Math.PI / 3) * i - Math.PI / 2; //pi = 180deg

        // 2. Calculate how far from the center this point should be
        const statsRadius = (s.base_stat / maxStat) * maxRadius;

        // 3. Convert that "distance and angle" into X and Y grid coordinates
        const x = centerX + statsRadius * Math.cos(angle);
        const y = centerY + statsRadius * Math.sin(angle);

        return `${x},${y}`;
    }).join(" "); // Joins them with a space: "x1,y1 x2,y2 ..."


    


    return (
        <div className="stats-hexagon-container">
            <svg width="250" height="250" viewBox="-30 20 250 250">
                {/* Background Grid: A perfect hexagon (Radius 80) */}
                <polygon
                    points="100,20 169,60 169,140 100,180 31,140 31,60"
                    fill="rgba(255, 255, 255, 0.05)"
                    stroke="#444"
                    strokeWidth="1"
                />

                {/* The Actual Stat Shape: Dynamic based on your calculation */}
                <polygon
                    points={statPoints}
                    fill="blue"  /* Charizard Orange! */
                    stroke="white"
                    strokeWidth="2"
                    style={{ transition: 'all 0.5s ease' }} /* Makes it animate when switching Pokemon! */
                />

                {/* The Labels */}
                {statLabels.map((label, i) => {
                    const angle = (Math.PI / 3) * i - Math.PI / 2;
                    const x = centerX + labelRadius * Math.cos(angle);
                    const y = centerY + labelRadius * Math.sin(angle);

                    const hoveredIndex = isHovered === i;

                    return (
                        <text
                            className='stat-label'
                            key={label}
                            x={x}
                            y={y}
                            fontSize={13}
                            onMouseEnter={()=>{setIsHovered(i)}}
                            onMouseLeave={()=>{setIsHovered(null)}}
                            textAnchor="middle" // Centers the text horizontally on the point
                            dominantBaseline="middle" // Centers the text vertically on the point
                            
                        >
                            {hoveredIndex ? statFullNames[i] : label}
                            <tspan x={x} dy="10" fontSize="11" fill="#aaa">
                                {pokemonData.stats[i].base_stat}
                            </tspan>
                        </text>
                    );
                })}
            </svg>
        </div>
    );
}