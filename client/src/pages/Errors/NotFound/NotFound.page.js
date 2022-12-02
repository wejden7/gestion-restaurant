import React from 'react'
import './NotFound.style.scss'
import { useNavigate } from 'react-router-dom'
import imageNotFound from 'utils/assets/images/404.jpg'
function NotFound() {
  const navigate = useNavigate()
  return (
    <>
    <img className='not-found' src={imageNotFound} alt="not found" />
    <button onClick={()=>navigate('/',{replace:true})} className='button-retour'>Retour</button>
    </>
  )
}

export default NotFound