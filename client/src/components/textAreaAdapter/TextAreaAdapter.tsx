import React, { ChangeEvent, MutableRefObject, RefObject, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useSmallScreenSize } from '@/hooks/useSmallScreenSize';
// interface AdapterProp {
//   input: {
//     onChange: (event: any) => void;
//     value: string;
//   };
// }

type AdapterProps = {
  reference: RefObject<Editor>;
  value: string;
  // onChange: (value: string) => void | ((value: ChangeEvent<HTMLTextAreaElement>) => void);
};

export const Adapter: React.FC<AdapterProps> = ({ reference, value }) => {

  const toolbar =
    'fullscreen | undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help';

  const plugins = [
    'advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table paste code help wordcount',
  ];
    
  // const adapterChange = onChange as unknown as (a: string, editor: any) => void;

  const init = useSmallScreenSize()
    ? {
      height: '95vw',
      width: '100%',
      menubar: true,
      plugins,
      toolbar,
      skin: "oxide-dark",
      content_css: "dark"
    }
    : {
      height: '70vh',
      width: '95vw',
      menubar: true,
      plugins,
      toolbar,
      skin: "oxide-dark",
      content_css: "dark"
    };

  return (
    <Editor
      data-test-id="text-area-adapter"
      test-dataid="textAreaAdapter"
      initialValue={value}
      ref={reference}
      id="description"
      textareaName="description"
      init={init}
    />
  );
};

const TextAreaAdapter = ({ reference, value }: AdapterProps) => {
  // const comp = navigator.onLine ? (
  return <Adapter reference={reference} value={value} />
  // ) : (
  //   <textarea name="description" id="description" onChange={onChange} value={value} />
  // );

  // return comp;
};

export default TextAreaAdapter;
