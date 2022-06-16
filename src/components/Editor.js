import React, { useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Editor = ({ text, setText }) => {
  const contentRef = useRef();

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const handleChange = (e) => {
    try {
      setText(contentRef.current.state.value);
    } catch {}
  };

  return (
    <ReactQuill
      theme="snow"
      modules={modules}
      formats={formats}
      value={text}
      onChange={handleChange}
      ref={contentRef}
    >
      <div className="my-editing-area" style={{ minHeight: "50vh" }} />
    </ReactQuill>
  );
};

export default Editor;
