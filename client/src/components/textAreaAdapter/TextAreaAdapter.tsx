import React, { ChangeEvent, MutableRefObject, RefObject, useRef } from 'react';

import MDEditor  from "@uiw/react-md-editor";
// No import is required in the WebPack.
import "@uiw/react-md-editor/markdown-editor.css";
// No import is required in the WebPack.
import "@uiw/react-markdown-preview/markdown.css";

import { useSmallScreenSize } from '@/hooks/useSmallScreenSize';

const TextAreaAdapter = ({value, onChange, reference }: AdapterProps) => {
  return <MDEditor height={200} value={value} onChange={onChange} />
};

export default TextAreaAdapter;
