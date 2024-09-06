import { useState, useEffect, useRef } from 'react';
import { ClassicEditor, Bold, Essentials, Italic, Link, Font, Paragraph, Underline, Undo } from 'ckeditor5';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import 'ckeditor5/ckeditor5.css';
import BlockQuoteCustom from '../plugins/BlockQuoteCustom';

const CustomEditor = () => {
  const [editorData, setEditorData] = useState<string>('');
  const editorContainerRef = useRef(null);
	const editorRef = useRef(null);
	const [isLayoutReady, setIsLayoutReady] = useState(false);

	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);

  return (
    <div>
      <h2>Editor com Citação Destacada</h2>
      <div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
        <div className="editor-container__editor">
          <div ref={editorRef}>{isLayoutReady && 
            <CKEditor 
              editor={ClassicEditor} 
              config={{
                toolbar: [ 'undo', 'redo','|','bold','italic','underline','link','|', 'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor','|','blockQuoteCustom'],
                plugins: [ Bold,Essentials,Italic,Font,Link,Paragraph,Underline,Undo, BlockQuoteCustom ],
                initialData: 'Show de pelota',
                placeholder: 'Digite seu texto aqui!',
              }}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              onChange={(_event:any, editor:any) => {
                const data = editor.getData();
                setEditorData(data);
              }}
            />}
          </div>
        </div>
      </div>
      <div>
        <h3>Conteúdo Atual:</h3>
        <div dangerouslySetInnerHTML={{ __html: editorData }} />
      </div>
    </div>
  );
};

export default CustomEditor;