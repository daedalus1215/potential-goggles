import React, { RefObject } from 'react';
import cn from 'classnames';
import { DefaultEditor } from 'react-simple-wysiwyg';
import { useSmallScreenSize } from '@/hooks/useSmallScreenSize';
import styles from './TextAreaAdapter.module.css';

type AdapterProps = {
  // reference: RefObject<HTMLTextAreaElement>;
  id:string;
  setDescription: (e:any) => void;
  value: string;
};

const TextAreaAdapter: React.FC<AdapterProps> = ({ value, setDescription, id }) => {
  const isSmall = useSmallScreenSize();

  return <DefaultEditor
    className={cn(styles.TextAreaAdapter, { [styles.TextAreaAdapterSmall]: isSmall })}
    name={id}
    id={id}
    value={value}
    onChange={(e) => setDescription( e.target.value)}
  />

  return <textarea
    // ref={reference}
    className={cn(styles.TextAreaAdapter, { [styles.TextAreaAdapterSmall]: isSmall })}
    defaultValue={value}
    name="description"
  />;
}

export default TextAreaAdapter;
