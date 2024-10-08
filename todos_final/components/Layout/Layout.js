"use client"
import classes from './Layout.module.css';

function Layout(props) {
  return (
    <div>
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
