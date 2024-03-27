import React, { RefObject } from 'react';
import { DefaultEditor } from 'react-simple-wysiwyg';

type AdapterProps = {
  setValue: (e: any) => void;
  value: string;
};

const TextAreaAdapter: React.FC<AdapterProps> = ({ value, setValue }) => {
  return <>
    <input type="hidden" name="description" value={value} />
    <DefaultEditor
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  </>
}

export default TextAreaAdapter;
