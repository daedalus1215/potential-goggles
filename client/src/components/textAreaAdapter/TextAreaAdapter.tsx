import React, { ChangeEvent, MutableRefObject, RefObject } from 'react';
import { Editor } from '@tinymce/tinymce-react';
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

  const [screenWidth] = React.useState(window.innerWidth);

  // const adapterChange = onChange as unknown as (a: string, editor: any) => void;

  const init = screenWidth < 600
    ? {
      height: '95vw',
      width: '100vw',
      menubar: true,
      plugins,
      toolbar,
    }
    : {
      height: '50vw',
      width: '100%',
      menubar: true,
      plugins,
      toolbar,
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
