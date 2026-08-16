import './pokeball.css';

export function Pokeball() {
  return (
    <div className="pokeball-wrapper">
      <div className="pokeball">
        {/* The top red half */}
        <div className="pokeball-top"></div>
        
        {/* The center black line and circle */}
        <div className="pokeball-center">
          <div className="pokeball-button">
            <div className="pokeball-inner-button"></div>
          </div>
        </div>
        
        {/* The bottom white half */}
        <div className="pokeball-bottom"></div>
        
      </div>
    </div>
  );
}