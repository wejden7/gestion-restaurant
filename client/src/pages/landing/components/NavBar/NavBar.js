import React,{useState} from "react";
import "./NavBar.style.scss";
import {Link, useNavigate } from "react-router-dom";
import {AiOutlineSetting,AiOutlineMessage} from  "react-icons/ai";
import{HiAdjustmentsHorizontal} from 'react-icons/hi2';
import {getUser} from 'state/AuthSlice'
import { useSelector } from "react-redux";
const profileUrl =
  "https://img.freepik.com/photos-gratuite/gros-plan-jeune-homme-reussi-souriant-camera-debout-tenue-decontractee-fond-bleu_1258-66609.jpg?w=740&t=st=1669907779~exp=1669908379~hmac=71618393f862154bc196c47013b61589bfb20722c9e285a1954f5cc4f9454f0a";
function NavBar() {
  const [open,setOpen] = useState(false)
  const user= useSelector(getUser)
  console.log(user)
  const navigate = useNavigate();

  const signIn = () => {
    navigate("/login");
  };
  const signUp = () => {
    navigate("/register");
  };
  const onClickDrop =()=>{
    setOpen(l=>!l)
  }
  return (
    <div className="nav-bar">
      <div className="logo" data-text="TecPro">
        TecPro
      </div>

      <div className="nav-auth">
        <button onClick={signIn} className="button-in">
          Sign In
        </button>
        <button onClick={signUp} className="button-up">
          Sign Up For Free
        </button>
       { user&&<div className="nav-user">
          <img onClick={onClickDrop} src={profileUrl} alt="Profil url" />
          {open&&
          <div className="nav-user-dropdown">
            <h1>wejden chneti</h1>
            <h3>wejdenchneti@gmail.com</h3>
            <h2>admin</h2>
            <div className="divider"/>
            <Link className="link"><HiAdjustmentsHorizontal/>Parametre</Link>
            <Link className="link"><AiOutlineMessage/>Messagerie </Link>
            <Link className="link"><AiOutlineSetting/> Setting</Link>
            <div className="divider"/>
            <Link className="dashboard">Dashboard</Link>
          </div>}
        </div>}
      </div>
    </div>
  );
}

export default NavBar;
