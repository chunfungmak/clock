import React, {useEffect, useState} from 'react';
import './App.css';

const DOUBLE_CLICK_TIMEOUT_MS = 200

interface Time {
    h: number
    m: number
    s: number
    ms: number
}

function getEndTime (): Date {
    const target = new Date()
    target.setHours(18)
    target.setMinutes(0)
    target.setSeconds(0)
    target.setMilliseconds(0)
    return target
}

function App() {

    const [time, setTime] = useState<Time>()
    const [countDownTime, setCountDownTime] = useState<Time>()
    const [isNormalMode, setIsNormalMode] = useState<boolean>(true)

    const [extraTime, setExtraTime] = useState<number>(0)

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
            setCountDownTime(() => {
                const timeLeft = getEndTime().getTime() + extraTime - new Date().getTime()
                if (timeLeft <= 0) {
                    const payload: Time = {
                        h: 0,
                        m: 0,
                        ms: 0,
                        s: 0
                    }
                    return payload
                }

                const payload: Time = {
                    h: Math.floor(timeLeft % (1000 * 60 * 60 * 60) / 1000 / 60 / 60),
                    m: Math.floor(timeLeft % (1000 * 60 * 60) / 1000 / 60),
                    s: Math.floor(timeLeft % (1000 * 60) / 1000),
                    ms: Math.floor(timeLeft % 1000)
                }
                return payload
            })
        }, 1)

        return () => clearInterval(interval)
    })

    const [doubleClickTimeout, setDoubleClickTimeout] = useState<NodeJS.Timeout | null>()

    const onClick = (e: any) => {
        if (doubleClickTimeout == null) {
            setDoubleClickTimeout(setTimeout(() => {
                setDoubleClickTimeout(null)
                onSingleClick()
            }, DOUBLE_CLICK_TIMEOUT_MS))
        } else {
            clearTimeout(doubleClickTimeout)
            setDoubleClickTimeout(null)
            onDoubleClick(e.pageX / e.view.innerWidth > 0.5)
        }
    }

    const onSingleClick = () => {
        setIsNormalMode(e => !e)
    }

    const onDoubleClick = (isRight: boolean) => {
        setExtraTime(extraTime => extraTime + (isRight ? 10 : -10) * 1000)
    }

    return <div onClick={onClick}>
        {
            (time != null && countDownTime != null) ?
                (() => {
                    const {h, m, s, ms} = isNormalMode ? time : countDownTime
                    return <div className={`container ${!isNormalMode ? 'dark' : ''}`}>
                        <div className='time'>
                            {h.toString().padStart(2, '0')}:{m.toString().padStart(2, '0')}:{s.toString().padStart(2, '0')}
                            <span className='ms'>
                                .{ms.toString().padStart(3, '0')}
                            </span>
                            <div style={{display: 'contents'}}>
                                <span style={{fontSize: '1rem'}}>
                                    {
                                        !isNormalMode ? (()=>{
                                            return new Date(getEndTime().getTime() + extraTime).toLocaleTimeString('en-US')
                                        })() : <>&nbsp;</>
                                    }
                                </span>
                            </div>

                        </div>
                    </div>
                })() : <></>
        }
    </div>
}

export default App;
