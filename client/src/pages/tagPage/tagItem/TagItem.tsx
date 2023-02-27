import useRippleEffectById from '@/components/button/useRippleEffect/useRippleEffectById';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './TagItem.module.css';

interface props {
    _id: string;
    name: string;
}

const TagItem: React.FC<props> = ({ _id, name }) => {
    const rippleClick = useRippleEffectById(_id, () => {});

    return <Link
        to={`/tag/${_id}`}
        id={_id}
        className={styles.content}
        key={_id}
        onClick={rippleClick}
        data-testid="DateTimeItem">
        <span className={styles.name}>{name}</span>
    </Link>
}

export default TagItem;