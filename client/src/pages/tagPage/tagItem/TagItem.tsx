import React from 'react';

import styles from './TagItem.module.css';

interface props {
    _id:string;
    name:string;
}
const TagItem:React.FC<props> = ({_id, name}) => {
    return (<div className={styles.content}>
        <span className={styles.name}>{name}</span>
    </div>);
}

export default TagItem;