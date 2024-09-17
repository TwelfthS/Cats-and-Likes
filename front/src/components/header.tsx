import * as React from 'react'
import { useNavigate } from 'react-router-dom'

function Header() {
    const navigate = useNavigate()

    const path = window.location.pathname

    const onClickMain = (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate('/')
    }
    const onClickFavs = (e: React.MouseEvent<HTMLButtonElement>) => {
        navigate('/favourites')
    }


    return <div className='header'>
        <button id='btn-all' className={'header-button-common button-all ' + (path === '/' ? 'selected' : '')} onClick={onClickMain}>Main page</button>
        <button id='btn-favs' className={'header-button-common button-favs ' + (path === '/favourites' ? 'selected' : '')} onClick={onClickFavs}>Favourites</button>
    </div>
}

export default Header