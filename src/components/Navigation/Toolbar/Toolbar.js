import React from 'react';
import classes from './Toolbar.module.scss';
import Logo from "../../Logo/Logo";

const toolbar = () => {
  return (
      <header className={classes.Toolbar}>
        <div>MENU</div>
        <Logo/>
        <nav>
          ...
        </nav>
      </header>
  );
};

export default toolbar;
