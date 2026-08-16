export function TypeIcon (type: string) {
    const icon = ['⚪', '💪🏼', '🪽', '🫧', '⛰️', '🪨', '🐛', '👻', 
                  '⚙️', '🔥', '💧', '🌿', '⚡', '🔮', '❄️', '🐉', '⬛', '🧚', '✴',
                  '❓', '👥'];
    
    switch(type){
        case 'normal':
            return icon[0];
            break;
        case 'fighting':
            return icon[1];
            break;
        case 'flying':
            return icon[2];
            break;
        case 'poison':
            return icon[3];
            break;
        case 'ground':
            return icon[4];
            break;
        case 'rock':
            return icon[5];
            break;
        case 'bug':
            return icon[6];
            break;
        case 'ghost':
            return icon[7];
            break;
        case 'steel':
            return icon[8];
            break;
        case 'fire':
            return icon[9];
            break;
        case 'water':
            return icon[10];
            break;
        case 'grass':
            return icon[11];
            break;
        case 'electric':
            return icon[12];
            break;
        case 'psychic':
            return icon[13];
            break;
        case 'ice':
            return icon[14];
            break;
        case 'dragon':
            return icon[15];
            break;
        case 'dark':
            return icon[16];
            break;
        case 'fairy':
            return icon[17];
            break;
        case 'stellar':
            return icon[18];
            break;
        case 'unknown':
            return icon[19];
            break;
        case 'shadow':
            return icon[20];
            break;
        default:
            return '⁴⁰⁴';
            break;

    }
                  
}