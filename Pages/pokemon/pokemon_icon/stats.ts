export function StatsIcon (stat: string) {
    const icon = ['⛨', '🗡️', '🛡', '⚔️', '🛡️', '➤'];
    
    switch(stat){
        case 'hp':
            return icon[0];
            break;
        case 'attack':
            return icon[1];
            break;
        case 'defense':
            return icon[2];
            break;
        case 'special-attack':
            return icon[3];
            break;
        case 'special-defense':
            return icon[4];
            break;
        case 'speed':
            return icon[5];
            break;
        default:
            return '⁴⁰⁴';
            break;

    }
                  
}