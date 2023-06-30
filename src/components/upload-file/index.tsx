import React from "react";
import "./index.css";

const UploadFile = ({ setInvoiceData }: any) => {
  const [isDragActive, setDragActive] = React.useState(false);

  const handleDrag = function (e: any) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const fileReader = new FileReader();
      fileReader.readAsText(e.dataTransfer.files[0], "UTF-8");
      fileReader.onloadend = (e) => {
        if (e.target && e.target.result) {
          setInvoiceData(JSON.parse(e.target.result as string));
        }
      };
    }
  };

  return (
    <form
      id="form-file-upload"
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
    >
      <label
        id="label-file-upload"
        className={isDragActive ? "drag-active" : ""}
      >
        <div>
          <p>Drag and drop your JSON file here</p>
          <i className="fas fa-upload fa-2x"></i>
        </div>
      </label>
      {isDragActive && (
        <div
          id="drag-file-element"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
    </form>
  );
};

export default UploadFile;
