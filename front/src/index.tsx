import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import App from './components/app'
import { BrowserRouter } from 'react-router-dom'
import './styles.css'
import { Provider } from 'react-redux'
import store from './store'

const root = ReactDOM.createRoot(document.getElementById('root')!)
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)