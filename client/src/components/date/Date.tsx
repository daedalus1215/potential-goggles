import cn from 'classnames';
import styles from './Date.module.css';

type DateInterface = ({ date?: string, setDate: (date: string) => void, classNames?: string });

export const Date: React.FC<DateInterface> = ({ date, setDate, classNames }) => <input
    className={cn(styles.date, classNames)}
    type='date'
    name='date'
    id='date'
    value={date}
    onChange={e => setDate(e?.target.value)}
/>

