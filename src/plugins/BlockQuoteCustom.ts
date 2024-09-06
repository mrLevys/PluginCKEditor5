import { Plugin } from 'ckeditor5';
import { ButtonView } from 'ckeditor5';
import { toWidgetEditable } from 'ckeditor5';
import {Element, Writer} from 'ckeditor5'


export default class BlockQuoteCustom extends Plugin {
    init() {
        const editor = this.editor;

        editor.ui.componentFactory.add('blockQuoteCustom', locale => {
            const view = new ButtonView(locale);

            view.set({
                label: 'Citação destacada',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 270 270" fill="#000000"><path d="M191.21 228.73c12.08 0 22.6-8.22 25.53-19.93l29.12-116.46c6.48-25.94-13.13-51.06-39.87-51.06-22.7 0-41.1 18.4-41.1 41.1v120.05c0 14.52 11.79 26.3 26.32 26.3zm-142 0c12.08 0 22.6-8.22 25.53-19.93l29.12-116.46c6.48-25.94-13.13-51.06-39.87-51.06-22.7 0-41.1 18.4-41.1 41.1v120.05c0 14.52 11.79 26.3 26.32 26.3z"></path></svg>', 
                tooltip: true
            });

            view.on('execute', () => {
                editor.model.change((writer: Writer) => {
                    const blockQuote = writer.createElement('blockQuoteCustom');
                    const insertPosition = editor.model.document.selection.getFirstPosition();

                    if (insertPosition) {
                        writer.insert(blockQuote, insertPosition);

                        const paragraph = writer.createElement('paragraph');
                        writer.insert(paragraph, blockQuote);
                        writer.setSelection( blockQuote, 'in');
                    } else {
                        console.error('Erro: Não foi possível determinar a posição de inserção.');
                    }
                });
            });

            return view;
        });

        editor.model.schema.register('blockQuoteCustom', {
            isObject: true,
            allowWhere: '$block',
            allowIn: '$block',
            allowContentOf: '$block',
        });

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
            view: (modelElement: Element, { writer: viewWriter }) => {
                const blockQuote = viewWriter.createEditableElement('blockquote', {
                    class: 'custom-blockquote',
                    style: 'border-top: 1px solid #d1ac66; border-bottom: 1px solid #d1ac66; border-right: 1px solid #d1ac66; border-left: 15px solid #d1ac66; padding: 10px; font-style: italic;'
                });
                return toWidgetEditable(blockQuote, viewWriter);
            }
        });
    }
}