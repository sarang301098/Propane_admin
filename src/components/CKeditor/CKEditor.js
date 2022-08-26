import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "ckeditor5-custom-build/build/ckeditor";

const CKEditorComponent = (props) => {
  return (
    <div>
      <CKEditor
        editor={ClassicEditor}
        data={props?.data || ""}
        onReady={(editor) => {}}
        onChange={(event, editor) => {
          let data = editor.getData();
          props?.setDescriptionError &&
            props?.setDescriptionError(data ? false : true);
          props?.setPageData(data);
        }}
        onBlur={(event, editor) => {}}
        onFocus={(event, editor) => {}}
      />
    </div>
  );
};

export default CKEditorComponent;
