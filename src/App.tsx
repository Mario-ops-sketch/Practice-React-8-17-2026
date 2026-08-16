import './App.css'
import { GeometryCal } from '../Pages/Geometry_page'
import { PokemonPage } from '../Pages/Pokemon_page'
import { WeatherPage } from '../Pages/Weather_page'
import { TaskPage } from '../Pages/Task_page'
import { ChatBox } from '../Pages/ChatBox_page'

function App() {

  return (
    <>
      <GeometryCal />
      <PokemonPage />
      <WeatherPage />
      <TaskPage />
      <ChatBox />
    </>
  )
}

export default App
