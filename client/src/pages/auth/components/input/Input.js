import React from 'react'
import { BsFillPersonFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { HiLockClosed } from "react-icons/hi";
import './input.scss'

export const TextInputName = ()=>{
    return(
        <label htmlFor="form-name">
        <input id="form-name" type="text" placeholder="Name" />
        <BsFillPersonFill className="form-icon" />
      </label>
    )
}

export const EmailInput = () =>{
 return(
    <label htmlFor="form-email">
            <input id="form-email" type="text" placeholder="Email" />
            <MdEmail className="form-icon" />
          </label>
 )
}

export const PasswordInput = ()=>{
    return(
        <label htmlFor="form-password">
            <input id="form-password" type="password" placeholder="Password" />
            <HiLockClosed className="form-icon" />
          </label>
    )
}

export const SubmitInput = ()=>{
    return(
        <input type="submit" value="Sign Up" />
    )
}