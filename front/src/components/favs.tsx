import * as React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '../hooks'
import { removeFavs } from '../reducers/mainSlice'
import { heartAppear, heartDisappear, network } from './utils'
import { Cat } from '../types'

function Favs() {
    const [favs, setFavs] = useState<Cat[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const dispatch = useAppDispatch()
    const favsStore = useAppSelector(store => store.slice.favs)

    const getFavs = async () => {
        try {
            if (favsStore.length === 0) {
                setLoading(true)
                const response = await axios.get(network + 'likes')
                const data = response.data.data
                const favsTmp = []
                for (let i = 0; i < data.length; i++) {
                    const resp = await axios.get('https://api.thecatapi.com/v1/images/' + data[i].cat_id)
                    const cat = resp.data
                    favsTmp.push(cat)
                }
                setFavs(favsTmp)
                setLoading(false)
            } else {
                setFavs(favsStore)
            }
        } catch (err) {
            console.log(err)
            setLoading(false)
            setError('Error fetching data')
        }
    }

    const remove = async (id: string) => {
        setError('')
        try {
            await axios.delete(network + 'likes/' + id)
            const deleted = favsStore.findIndex((elem) => elem.id === id)
            if (deleted !== -1) dispatch(removeFavs(deleted))
            setFavs((prev) => prev.filter((elem) => elem.id !== id))
        } catch (err) {
            console.log(err)
            setError('Some error occured :(')
        }
    }

    useEffect(() => {
        getFavs()
    }, [])
    return <div className='cats-div'>
        {loading && <p>Loading...</p>}
        {error && <p className='error'>{error}</p>}
        {!loading && !error && favs.length === 0 && <p>Empty for now!</p>}
        {favs.map((cat) => {
            return <div className='img-div' id={cat.id} key={cat.id} onMouseOver={() => heartAppear(cat.id)} onMouseOut={() => heartDisappear(cat.id)}>
                <img src={cat.url} alt={cat.id} className='cat-img'></img>
                <button id={'heart-' + cat.id} className='heart-button heart-button-picked hidden' onClick={() => remove(cat.id)}></button>
            </div>
        })}
    </div>
}

export default Favs