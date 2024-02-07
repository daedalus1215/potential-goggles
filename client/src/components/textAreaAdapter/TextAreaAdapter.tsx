import React, { RefObject } from 'react';
import { useSmallScreenSize } from '@/hooks/useSmallScreenSize';
import styles from './TextAreaAdapter.module.css';
import cn from 'classnames';

type AdapterProps = {
  // reference: RefObject<string>;
  value: string;
};

const TextAreaAdapter: React.FC<AdapterProps> = ({ value }) => {
  const isSmall = useSmallScreenSize();
  return <textarea
    className={cn(styles.TextAreaAdapter, { [styles.TextAreaAdapterSmall]: isSmall})}
    defaultValue={value}
    name="description"
  />;
}

export default TextAreaAdapter;
