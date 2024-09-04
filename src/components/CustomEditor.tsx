/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import BlockQuoteCustom from '../plugins/BlockQuoteCustom';


const CustomEditor: React.FC = () => {
    const [editorData, setEditorData] = useState<string>('');

    return (
        <div>
            <h2>Editor com Citação Destacada</h2>
            <CKEditor
                editor={ClassicEditor}
                data={editorData}
                config={{
                    plugins: [ BlockQuoteCustom, ...ClassicEditor.builtinPlugins ],
                    toolbar: [ 'blockQuoteCustom', 'bold', 'italic', 'undo', 'redo' ]
                }}
                onChange={(event: any, editor: any) => {
                    const data = editor.getData();
                    setEditorData(data);
                }}
            />
            <div>
                <h3>Conteúdo Atual:</h3>
                <div dangerouslySetInnerHTML={{ __html: editorData }} />
            </div>
        </div>
    );
};

export default CustomEditor;
