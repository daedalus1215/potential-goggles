import useRippleEffectById from '@/components/button/useRippleEffect/useRippleEffectById';
import React from 'react';
import { Link } from 'react-router-dom';

interface props {
    taskId: string;
    name: string;
    classNames: string;
}

const TagItem: React.FC<props> = ({ taskId, name, classNames }) => {
    const rippleClick = useRippleEffectById(taskId, () => {});

    return <Link
        to={`/tag/${taskId}`}
        id={taskId}
        className={classNames}
        key={taskId}
        onClick={rippleClick}
        data-testid="DateTimeItem">
        <span>{name}</span>
    </Link>
}

export default TagItem;