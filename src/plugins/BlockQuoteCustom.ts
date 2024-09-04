/* eslint-disable @typescript-eslint/no-unused-vars */
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';

export default class BlockQuoteCustom extends Plugin {
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add('blockQuoteCustom', locale => {
            const view = new ButtonView(locale);

            view.set({
                label: 'Citação destacada',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 270" fill="#FF1123"><path d="M191.21 228.73c12.08 0 22.6-8.22 25.53-19.93l29.12-116.46c6.48-25.94-13.13-51.06-39.87-51.06-22.7 0-41.1 18.4-41.1 41.1v120.05c0 14.52 11.79 26.3 26.32 26.3zm-142 0c12.08 0 22.6-8.22 25.53-19.93l29.12-116.46c6.48-25.94-13.13-51.06-39.87-51.06-22.7 0-41.1 18.4-41.1 41.1v120.05c0 14.52 11.79 26.3 26.32 26.3z"></path></svg>', 
                tooltip: true
            });

            view.on('execute', () => {
                editor.model.change(writer => {
                    const blockQuote = writer.createElement('blockQuoteCustom');
                    editor.model.insertContent(blockQuote);
                    writer.setSelection(blockQuote, 'on');
                });
            });

            return view;
        });

        // Conversões para o modelo e a visualização
        editor.conversion.for('upcast').elementToElement({
            model: 'blockQuoteCustom',
            view: {
                name: 'blockquote',
                classes: 'custom-blockquote'
            }
        });

        editor.conversion.for('dataDowncast').elementToElement({
            model: 'blockQuoteCustom',
            view: {
                name: 'blockquote',
                classes: 'custom-blockquote'
            }
        });

        editor.conversion.for('editingDowncast').elementToElement({
            model: 'blockQuoteCustom',
            view: (modelElement, { writer: viewWriter }) => {
                const blockQuote = viewWriter.createEditableElement('blockquote', {
                    class: 'custom-blockquote'
                });
                return toWidgetEditable(blockQuote, viewWriter);
            }
        });
    }
}
