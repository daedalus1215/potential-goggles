import React, { ChangeEvent } from 'react';
import { Editor } from '@tinymce/tinymce-react';
// interface AdapterProp {
//   input: {
//     onChange: (event: any) => void;
//     value: string;
//   };
// }

type AdapterProps = {
  value: string;
  onChange: (value: ChangeEvent<HTMLTextAreaElement>) => void;
};

export const Adapter: React.FC<AdapterProps> = ({ value, onChange }) => {

  const toolbar =
    'fullscreen | undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help';
  const plugins = [
    'advlist autolink lists link image charmap print preview anchor',
    'searchreplace visualblocks code fullscreen',
    'insertdatetime media table paste code help wordcount',
  ];

  const [screenWidth] = React.useState(window.innerWidth);

  const adapterChange = onChange as unknown as (a: string, editor: any) => void;

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
      value={value}
      id="description"
      init={init}
      onEditorChange={adapterChange}
    // {...rest}
    />
  );
};

const TextAreaAdapter = ({value, onChange}:AdapterProps) => {
  const comp = navigator.onLine ? (
    <Adapter onChange={onChange} value={value}/>
  ) : (
    <textarea name="description" id="description" onChange={onChange} value={value} />
  );

  return comp;
};

export default TextAreaAdapter;
