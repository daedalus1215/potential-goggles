import React, { RefObject } from 'react';
import { useSmallScreenSize } from '@/hooks/useSmallScreenSize';
import styles from './TextAreaAdapter.module.css';
import cn from 'classnames';

type AdapterProps = {
  reference: RefObject<HTMLTextAreaElement>;
  value: string;
};

const TextAreaAdapter: React.FC<AdapterProps> = ({ value, reference }) => {
  const isSmall = useSmallScreenSize();
  return <textarea
    ref={reference}
    className={cn(styles.TextAreaAdapter, { [styles.TextAreaAdapterSmall]: isSmall })}
    defaultValue={value}
    name="description"
  />;
}

export default TextAreaAdapter;
