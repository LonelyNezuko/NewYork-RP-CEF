import React from 'react'
import {ReactSVG} from 'react-svg'
import $ from 'jquery'
import htmlReactParser from 'html-react-parser'

import './css.css'
import ragemp from '../../_modules/ragemp'

export default function Dialog()
{
    const [ dialog, setDialog ] = React.useState({
        status: false,

        title: 'Тест диалог',
        body: 'Это ебать тестовый диалог с {#0fa4d7} таким вот цветом {#ffffff}и такими инпутами',

        input: [
            { type: 'text', placeholder: "Введите свой пол" }
        ],
        btn: [ 'Да', 'Нет' ]
    })

    function click(id)
    {
        ragemp.send('ui::dialog', {
            id: id
        })
    }

    React.useMemo(() =>
    {
        ragemp.eventCreate('client::dialog', (cmd, data) =>
        {
            switch(cmd)
            {
                case 'dialog':
                {
                    setDialog(data)
                    break
                }
            }
        })
    }, [])

    React.useEffect(() =>
    {
        for(var i in dialog.body)
        {
            i = parseInt(i)
            if(dialog.body[i] === '{')
            {
                let color = dialog.body.substring(i + 1, i + 8)
                dialog.body = dialog.body.substring(0, i) + `<span style="color: ${color};" />` + dialog.body.substring(i + 8)
            }
            if(dialog.body[i] === '}') dialog.body = dialog.body.replace("}", "")
        }
    })

    return (
        <div className="dialog" style={!dialog.status ? {display: 'none'} : {}}>
            <h1 className="dialog-title">{dialog.title}</h1>
            <section className="dialog-body">
                {htmlReactParser(dialog.body)}
                {dialog.input.map((item, i) =>
                {
                    return (<input onClick={e => item.value = e.target.value} key={i} className="input" type={item.type} placeholder={item.placeholder} value={item.value || ''} />)
                })}
            </section>
            <section className="dialog-btn">
                {dialog.btn.map((item, i) =>
                {
                    return (<button onClick={() => click(i)} key={i} className={`btn ${i === 0 && 'btn-select'}`}>{item}</button>)
                })}

            </section>
        </div>
    )
}
