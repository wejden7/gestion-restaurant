import React, { useEffect, useState } from "react";
import { NavBar, SideBar, Loder } from "components";
import { Outlet, useNavigate } from "react-router-dom";
import "./Dashboard.style.scss";
import { UseStateDashboardContext } from "context/contextDaschboard";
import withAuthentification from "components/Protected/withAuthentification";
import withAutorization from "components/Protected/withAutorization";
import { DashboardSettingPath } from "utils/router/pathRouter.util";
import { fetchTeam } from "state/TeamSlice";
import { findAutorization } from "state/AutorizationSlice";
import { findBranche, findEtablissement, findPoste } from "state/SettingSlice";
import { store } from "state/store";
let ButtonSeeting  =()=>{
  const navigate = useNavigate();
  const onClick = () => {
    navigate(DashboardSettingPath);
  };
  return <button onClick={onClick} className="btn-setting"></button>

}
ButtonSeeting = withAutorization(ButtonSeeting,"seeting")
function Dashboard(props) {
  const { open, mode } = UseStateDashboardContext();

  const [fetch, setFetche] = useState(false);

  useEffect(() => {
    setFetche(false);
    const fetchedata = async () =>
      await Promise.all([
        store.dispatch(findBranche()),
        store.dispatch(findEtablissement()),
        store.dispatch(findPoste()),
        store.dispatch(fetchTeam()),
        store.dispatch(findAutorization()),
      ]);

    fetchedata().then(() => {
      setTimeout(() => setFetche(true), 3000);
    });
  }, []);

  
  return fetch ? (
    <div className={`dashboard ${mode} ${open && "side-bar-open"} `}>
      <NavBar />
      <Outlet />
      <ButtonSeeting/>
   
      <SideBar />
    </div>
  ) : (
    <Loder />
  );
}

export default withAuthentification(Dashboard);
