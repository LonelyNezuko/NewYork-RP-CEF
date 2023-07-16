import React from 'react';
import ReactDOM from 'react-dom/client';

import $ from 'jquery'

import './index.css'

import ragemp from './_modules/ragemp'
import audio from './_modules/audio'

import Registration from './components/registration/Registration'
import Choicechar from './components/choicechar/Choicechar'
import Createchar from './components/createchar/Createchar'
import Hud from './components/hud/Hud'
import Notf from './components/notf/Notf'
import Menu from './components/menu/Menu'
import Admin from './components/admin/Admin'
import Npcdialog from './components/npcdialog/Npcdialog'
import Inventory from './components/inventory/Inventory'
import Dialog from './components/dialog/Dialog'
import Death from './components/death/Death'
import Phone from './components/phone/Phone'
import Shop from './components/shop/Shop'

let keyPressed = []
$(document).on('keydown', event =>
{
    if(!$('*').is(':focus')
        && keyPressed.indexOf(event.keyCode) === -1)
    {
        keyPressed.push(event.keyCode)
        ragemp.send('ui::keypressed', {
            keyCode: keyPressed,
            up: false
        })
    }
})
$(document).on('keyup', event => {
    if(!$('*').is(':focus'))
    {
        ragemp.send('ui::keypressed', {
            keyCode: event.keyCode,
            up: keyPressed.indexOf(event.keyCode) !== -1 ? true : false
        })
    }
    if(keyPressed.indexOf(event.keyCode) !== -1) keyPressed.splice(keyPressed.indexOf(event.keyCode), 1)
})

$(document).on('keydown', 'e+a', event => {
    console.log('event')
})

$('body').on('click', '.btn', e =>
{
    $(e.target).addClass('btn-clicked')
    setTimeout(() =>
    {
        $(e.target).removeClass('btn-clicked')
    }, 200)
})

$('body').on('mousewheel', '.left-auto-scroll', (e, delta) =>
{
    console.log(e.offsetX)

    $(e.currentTarget).scrollLeft(e.offsetX)
    console.log($(e.currentTarget).scrollLeft())
    // e.preventDefault()
})

ragemp.eventCreate('client::audio', (cmd, data) =>
{
    switch(cmd)
    {
        case 'play':
        {
            audio.play(data.url, data.settings)
            break
        }
    }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Registration />
    <Choicechar />
    <Createchar />
    <Hud />
    <Notf />
    <Menu />
    <Admin />
    <Npcdialog />
    <Inventory />
    <Dialog />
    <Death />
    <Phone />
    <Shop />
  </React.StrictMode>
);

export { keyPressed }
