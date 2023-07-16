import React from 'react'
import {ReactSVG} from 'react-svg'
import $ from 'jquery'

import './css.css'
import ragemp from '../../_modules/ragemp'

import IMG_SUCCESS from './images/success.png'
import IMG_ERROR from './images/error.png'
import IMG_WARNING from './images/warning.png'
import IMG_CASH from './images/cash.png'
import IMG_BANKCASH from './images/bankcash.png'

export default function Notf()
{
    const [ notf, setNotf ] = React.useState([])

    function addNotf(data)
    {
        let notfLength = notf.length
        data.timeout = setTimeout(() =>
        {
            data.id = notfLength
            setNotf(old => old.filter(item => item.id !== notfLength))
        }, data.time || 5000)

        setNotf(old => [...old, data])
    }

    React.useMemo(() =>
    {
        ragemp.eventCreate('client::notf', (cmd, data) =>
        {
            if(cmd === 'add') addNotf(data)
        })
    }, [])

    return (
        <div className="notf">
            {notf.map((item, i) =>
            {
                // <h1>{item.type === 'success' ? "Успешно" : item.type === 'error' ? "Ошибка" : "Предупреждение"}</h1>
                return (<section key={i} className={`notf-${item.type}`}>
                    <img style={item.type === 'donate' ? {display: 'none'} : {}} src={require(`./images/${item.type}.png`)} />
                    <div style={item.type === 'donate' ? {} : {display: 'none'}}></div>
                    <span>{item.text}</span>
                </section>)
            })}
        </div>
    )
}
