import React from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './text-editor-fonts.css';

function TextEditor(props) {
  const {onChange,value} = props;
  // const [value, setValue] = useState('');
  const Font = ReactQuill.Quill.import('formats/font'); 
  Font.whitelist = ["Arial","Roboto", "Montserrat", "times-new-roman","Merriweather","lucida-console","Inconsolata","bebas-neue","Lobster","Caveat","dancing-script"] ; 
  ReactQuill.Quill.register(Font, true);
  
  const fontSizeArr = [false,'1px','4px','6px','8px','12px','14px','16px','20px','24px','32px','42px','54px','68px','84px','98px'];
  const Size = ReactQuill.Quill.import('attributors/style/size');
  Size.whitelist = fontSizeArr;
  ReactQuill.Quill.register(Size, true);
  
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] },{ font: Font.whitelist},{size: Size.whitelist}],
      ['bold', 'italic', 'underline', 'strike','blockquote','code-block'],
      [{ 'color': [] }, { 'background': [] },{ script: "sub" }, { script: "super" },],
      [{'list': 'ordered'}, {'list': 'bullet'},{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    }
  }
  return (
    <ReactQuill theme="snow" modules={modules} value={value || ''} onChange={(description,delta,source,editor)=>onChange(editor.getHTML())}/>
  );
}

export default TextEditor;