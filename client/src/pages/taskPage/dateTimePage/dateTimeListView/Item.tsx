import React from 'react';
import styles from './DateTimeListView.module.css';

interface ItemProp {
  id: string;
  time: number;
  date: string;
  onClick: () => void;
}

const Item: React.FC<ItemProp> = ({ id, time, date, onClick }) => (
  <div className={styles.content} key={id} onClick={onClick} data-testid="DateTimeItem">
    <input type="hidden" value={id} name="id" />
    <div className={styles.date}>Date: {date}</div>
    <div className={styles.time}>Minutes: {time}</div>
  </div>
);

export default Item;