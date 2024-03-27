import React, { RefObject } from 'react';
import cn from 'classnames';
import { useSmallScreenSize } from '@/hooks/useSmallScreenSize';
import styles from './TextAreaAdapter.module.css';

type AdapterProps = {
  setValue: (e: any) => void;
  value: string;
};

const TextAreaAdapter: React.FC<AdapterProps> = ({ value, setValue }) => {
  const isSmall = useSmallScreenSize();
  return <textarea
    className={cn(styles.TextAreaAdapter, { [styles.TextAreaAdapterSmall]: isSmall })}
    value={value}
    onChange={e => setValue(e.target.value)}
    name="description"
  />;
}

export default TextAreaAdapter;
