import { Outlet, Route, Routes } from 'react-router';
import DarkVeil from './DarkVeil';
import Landing from './Landing';
import Todolist from './Todolist';

function App() {
  return (
    <>

      <div className='background'>
        <DarkVeil />
      </div>
      <div className='background2'></div>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/todolist' element={<Todolist/>}/>
      </Routes>
      <Outlet />
    </>

  )
}

export default App
