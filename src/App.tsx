import { useState } from 'react'
import './App.css'

import LikeDisLike from './components/Unit1'
import RunningClock from './components/Unit2'

function App() {
  const [view, setView] = useState<'unit1' | 'unit2'>('unit1')  
  return (
    <>
      <ul>
        <li>unit 1 : <button onClick={setView.bind(null, 'unit1')}>ReactLikeDislikeTypescript</button></li>
        <li>unit 2 : <button onClick={setView.bind(null, 'unit2')}>RunningClock</button></li>
      </ul>
      <div className="card">
        {view === 'unit1' && <LikeDisLike />}
        {view === 'unit2' && <RunningClock />}
      </div>
    </>
  )
}

export default App
