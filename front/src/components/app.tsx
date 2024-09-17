import * as React from 'react'
import {Route, Routes} from 'react-router-dom'
import All from './all'
import Favs from './favs'
import Header from './header'

function App() {
    return <>
    <Header />
        <Routes>
            <Route path='/' element={<All />} />
            <Route path='/favourites' element={<Favs />} />
        </Routes>
    </>
}

export default App