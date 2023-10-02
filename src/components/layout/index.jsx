import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./layout.css"

const Layout = () => {
  return (
    <div className="container contan-bacgraund">
      <header>
     
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="nav-footer">
        <NavLink className="nav-link"  to="/debts">Debts</NavLink>
        <NavLink className="nav-link" to="/transactions">Transactions</NavLink>
      </footer>
    </div>
  );
};

export default Layout;
