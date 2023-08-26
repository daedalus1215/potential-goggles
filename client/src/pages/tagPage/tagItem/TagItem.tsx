import useRippleEffectById from '@/components/button/useRippleEffect/useRippleEffectById';
import React from 'react';
import { Link } from 'react-router-dom';

interface props {
    _id: string;
    name: string;
    classNames: string;
}

const TagItem: React.FC<props> = ({ _id, name, classNames }) => {
    const rippleClick = useRippleEffectById(_id, () => {});

    return <Link
        to={`/tag/${_id}`}
        id={_id}
        className={classNames}
        key={_id}
        onClick={rippleClick}
        data-testid="DateTimeItem">
        <span>{name}</span>
    </Link>
}

export default TagItem;