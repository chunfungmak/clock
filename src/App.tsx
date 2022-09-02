import React, {useEffect, useState} from 'react';
import './App.css';

interface Time {
    h: number
    m: number
    s: number
    ms: number
}

function App() {

    const [time, setTime] = useState<Time>()

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(() => {
                const date = new Date()
                const payload: Time = {
                    h: date.getHours(),
                    m: date.getMinutes(),
                    s: date.getSeconds(),
                    ms: date.getMilliseconds()
                }
                return payload
            })
        }, 1)

        return () => clearInterval(interval)
    })

    return (
        time != null ?
            (() => {
                const {h, m, s, ms} = time
                return <div className='container'>
                    <div className='time'>{h.toString().padStart(2, '0')}:{m.toString().padStart(2, '0')}:{s.toString().padStart(2, '0')}<span className='ms'>.{ms.toString().padStart(3, '0')}</span></div>
                </div>
            })() : <></>
    )
}

export default App;
