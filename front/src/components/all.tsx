import * as React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '../hooks'
import { removeFavs, updateCats, updateFavs } from '../reducers/mainSlice'
import { heartAppear, heartDisappear, network } from './utils'
import { Cat } from '../types'

function All() {
    const [cats, setCats] = useState<Cat[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const dispatch = useAppDispatch()
    const catsStore = useAppSelector((state) => state.slice.cats)
    const favsStore = useAppSelector(store => store.slice.favs)

    const getAllCats = async () => {
        try {
            if (catsStore.length === 0) {
                setLoading(true)
                const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=15', {
                    headers: {
                        'x-api-key': 'live_P2t7docOAnfle6ARk45HmJpBE88kxCfmyrtJwmg7BfzDN2nNhQLnl9tZrJD9j4pN'
                    }
                })
                const data = response.data
                setCats(data)
                dispatch(updateCats(data))
                setLoading(false)
            } else {
                setCats(catsStore)
            }
        } catch (err) {
            console.log(err)
            setError('Error fetching data')
            setLoading(false)
        }
    }

    const addToFavs = async (id: string) => {
        setError('')
        const heartBtn = document.getElementById('heart-' + id)
        try {
            if (favsStore.some((elem) => elem.id === id)) {
                await axios.delete(network + 'likes/' + id)
                const deleted = favsStore.findIndex((elem) => elem.id === id)
                if (deleted !== -1) dispatch(removeFavs(deleted))
                heartBtn.classList.remove('heart-button-picked')
            } else {
                await axios.post(network + 'likes', {catId: id})
                heartBtn.classList.add('heart-button-picked')
                const nextFav = cats.find((elem) => elem.id === id)
                dispatch(updateFavs(nextFav))
            }
        } catch (err) {
            console.log(err)
            setError('An error occured while adding to favourites :(')
        }
    }

     useEffect(() => {
        getAllCats()
    }, [])

    document.addEventListener('scroll', async () => {
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight
    
        if (window.scrollY >= scrollableHeight && !loading) {
            try {
                setLoading(true)
                const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=5', {
                    headers: {
                        'x-api-key': 'live_P2t7docOAnfle6ARk45HmJpBE88kxCfmyrtJwmg7BfzDN2nNhQLnl9tZrJD9j4pN'
                    }
                })
                const data = response.data
                setCats((prev) => prev.concat(data))
                dispatch(updateCats(data))
                setLoading(false)
            } catch (err) {
                console.log(err)
                setError('Error fetching data')
                setLoading(false)
            }
        }
    })


    return <div className='cats-div'>
        {loading && <p>Loading...</p>}
        {error && <p className='error'>{error}</p>}
        {cats.map((cat) => {
            const favClass = favsStore.some((elem) => elem.id === cat.id) ? 'heart-button-picked' : ''
            return <div className='img-div' id={cat.id} key={cat.id} onMouseOver={() => heartAppear(cat.id)} onMouseOut={() => heartDisappear(cat.id)}>
                <img src={cat.url} alt={cat.id} className='cat-img'></img>
                <button id={'heart-' + cat.id} className={'heart-button hidden ' + favClass} onClick={() => addToFavs(cat.id)}></button>
            </div>
        })}
    </div>
}

export default All