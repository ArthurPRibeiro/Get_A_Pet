import {useState, useEffect} from 'react'
import bus from '../../utils/bus'

import style from './Message.module.css'

function Message(){
    const [visibility, setVibility] = useState(false)
    const [message, setMessage] = useState("")
    const [type, setType] = useState("")

    useEffect(() => {
        bus.addListener('flash',({message, type}) => {
            setVibility(true)
            setMessage(message)
            setType(type)

            setTimeout(() => {
                setVibility(false)
            }, 3000)
        })
    },[])

    return(
        visibility &&
        <div className={`${style.message} ${style[type]}`}>{message}</div>
    )
}

export default Message