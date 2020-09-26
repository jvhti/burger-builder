import React from 'react';
import classes from './Layout.module.scss';

const layout = (props) => {
  return (
      <React.Fragment>
        <div>
          Toolbar, SideDrawer, Backdrop
        </div>
        <main className={classes.Content}>
          {props.children}
        </main>
      </React.Fragment>
  );
};

export default layout;