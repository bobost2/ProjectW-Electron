import React, { FC } from 'react';
import styles from './WindowComponent.module.scss';

interface WindowComponentProps {
  title:string,
  height:any,
  padding:any
}

const WindowComponent: FC<WindowComponentProps> = (props) => (
  <div className={styles.WindowComponent} style={{ height: props.height}}>
    <div className={styles.WindowComponent_title}>
      <div style={{marginLeft: '0.5rem'}}>{props.title}</div>
    </div>
    <div className={styles.WindowComponent_contents} style={{padding: props.padding}}>
      {props.children}
    </div>
  </div>
);

export default WindowComponent;
