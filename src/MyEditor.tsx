import '@wangeditor/editor/dist/css/style.css' // import css

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { DomEditor, IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { i18nChangeLanguage } from '@wangeditor/editor'
import { Range, NodeEntry, Node } from 'slate';
// Switch language - 'en' or 'zh-CN'
i18nChangeLanguage('en')


function MyEditor() {
    // editor instance
    const [editor, setEditor] = useState<IDomEditor | null>(null)

    // TS syntax
    // const [editor, setEditor] = useState(null)                  // JS syntax

    // editor content
    const [html, setHtml] = useState('<p>Type...</p>')

    // Simulate ajax async set html
    // useEffect(() => {
    //     setTimeout(() => {
    //         setHtml('<p>hello&nbsp;world</p>')
    //     }, 1500)
    // }, [])
    const svgIconColor = `<svg fill="#000000" width="800px" height="800px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 .5C3.58.5 0 3.86 0 8s3.58 7.5 8 7.5c4.69 0 1.04-2.83 2.79-4.55.76-.75 1.63-.87 2.44-.87.37 0 .73.03 1.06.03.99 0 1.72-.23 1.72-2.1C16 3.86 12.42.5 8 .5zm6.65 8.32c-.05.01-.16.02-.37.02-.14 0-.29 0-.45-.01-.19 0-.39-.01-.61-.01-.89 0-2.19.13-3.32 1.23-1.17 1.16-.9 2.6-.74 3.47.03.18.08.44.09.6-.16.05-.52.13-1.26.13-3.72 0-6.75-2.8-6.75-6.25S4.28 1.75 8 1.75s6.75 2.8 6.75 6.25c0 .5-.06.74-.1.82z"/><path d="M5.9 9.47c-1.03 0-1.86.8-1.86 1.79s.84 1.79 1.86 1.79 1.86-.8 1.86-1.79-.84-1.79-1.86-1.79zm0 2.35c-.35 0-.64-.25-.64-.56s.29-.56.64-.56.64.25.64.56-.29.56-.64.56zm-.2-4.59c0-.99-.84-1.79-1.86-1.79s-1.86.8-1.86 1.79.84 1.79 1.86 1.79 1.86-.8 1.86-1.79zm-1.86.56c-.35 0-.64-.25-.64-.56s.29-.56.64-.56.64.25.64.56-.29.56-.64.56zM7.37 2.5c-1.03 0-1.86.8-1.86 1.79s.84 1.79 1.86 1.79 1.86-.8 1.86-1.79S8.39 2.5 7.37 2.5zm0 2.35c-.35 0-.64-.25-.64-.56s.29-.56.64-.56.64.25.64.56-.29.56-.64.56zm2.47 1.31c0 .99.84 1.79 1.86 1.79s1.86-.8 1.86-1.79-.84-1.79-1.86-1.79-1.86.8-1.86 1.79zm2.5 0c0 .31-.29.56-.64.56s-.64-.25-.64-.56.29-.56.64-.56.64.25.64.56z"/></svg>`;

    const svgIconList = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <rect x="2" y="2" width="20" height="20" rx="2" ry="2" fill="#FFFFFF" stroke="#000000" stroke-width="2"/>
  <circle cx="6" cy="8" r="2" fill="#000000"/>
  <circle cx="6" cy="14" r="2" fill="#000000"/>
  <circle cx="6" cy="20" r="2" fill="#000000"/>
  <line x1="10" y1="8" x2="22" y2="8" stroke="#000000" stroke-width="2"/>
  <line x1="10" y1="14" x2="22" y2="14" stroke="#000000" stroke-width="2"/>
  <line x1="10" y1="20" x2="22" y2="20" stroke="#000000" stroke-width="2"/>
</svg>`;

    const svgIconStyle = `<svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.14.93l-.07-.07A2.926 2.926 0 0 0 20.98 0a2.886 2.886 0 0 0-2.08.86L8.858 10.9a3.04 3.04 0 0 0-.53.72 7.793 7.793 0 0 0-4.1 1.621c-.191.144-.36.316-.5.51a6.08 6.08 0 0 0-.98 1.961c-.25.69-.59 1.631-1.22 3-.42.91-.75 1.541-.98 1.981a3.092 3.092 0 0 0-.54 1.631c.014.206.08.406.19.58a2.64 2.64 0 0 0 2.23 1.07 10.462 10.462 0 0 0 8.161-3.371c.378-.44.692-.932.93-1.461a7.882 7.882 0 0 0 .69-3.361.142.142 0 0 1 .02-.04c.325-.144.62-.347.87-.6L23.14 5.1A2.888 2.888 0 0 0 24 3.021 2.927 2.927 0 0 0 23.14.93zM9.7 18.317c-.17.368-.388.711-.65 1.02a8.393 8.393 0 0 1-6.891 2.6c.05-.1.11-.21.17-.32.24-.46.58-1.11 1.02-2.061a39.058 39.058 0 0 0 1.28-3.151c.14-.491.355-.957.64-1.381.062-.08.133-.154.21-.22a5.221 5.221 0 0 1 2.59-1.14c.121.537.396 1.027.79 1.411l.07.07c.35.357.788.616 1.27.75a5.614 5.614 0 0 1-.499 2.422zM21.73 3.691L11.678 13.735a.947.947 0 0 1-.67.28.983.983 0 0 1-.67-.28l-.07-.07a.948.948 0 0 1 0-1.34L20.309 2.271c.18-.173.42-.27.671-.271a.937.937 0 0 1 .67.27l.08.08c.36.374.36.967 0 1.341z" fill="#494c4e" fill-rule="evenodd"/>
</svg>`;

    const svgIconJustify = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
  <rect x="2" y="2" width="20" height="20" rx="2" ry="2" fill="#FFFFFF" stroke="#000000" stroke-width="2"/>
  <line x1="4" y1="8" x2="20" y2="8" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
  <line x1="4" y1="12" x2="20" y2="12" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
  <line x1="4" y1="16" x2="20" y2="16" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
</svg>`;

    const svgIconImage = `<svg fill="#000000" width="800px" height="800px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
    <path d="M1813.333 1557.195c-557.76 126.826-1148.48 126.826-1706.666 0V468.448c557.76-126.827 1148.48-126.933 1706.666 0v1088.747ZM1879.04 374.26c-600.32-143.573-1238.4-143.466-1838.08 0L0 384.075v1257.493l40.96 9.813c300.053 71.787 609.28 108.054 919.04 108.054 309.867 0 619.2-36.267 919.04-108.054l40.96-9.813V384.075l-40.96-9.814ZM853.333 786.987l376.32 225.813-376.32 225.813V786.987Zm-106.666 640 690.346-414.187-690.346-414.187v828.374Z" fill-rule="evenodd"/>
</svg>`;
    const svgIconInsert = `<svg width="800px" height="800px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<path fill="#444" d="M14 16v-11l-1 1v9h-12v-12h9l1-1h-11v14z"></path>
<path fill="#444" d="M16 1.4l-1.4-1.4-6.8 6.8-1.8-1.8v5h5l-1.8-1.8z"></path>
</svg>`;
    const toolbarConfig: Partial<IToolbarConfig> = {
        modalAppendToBody: false, toolbarKeys: [
            'fontSize', 'fontFamily', 'lineHeight', {
                key: 'group-headerSelect', // required, must start with `group-`
                title: 'H', // required
                // iconSvg: svgIcon, // optional
                menuKeys: ['header1', 'header2', 'header3', 'header4', 'header5'] // required, children menu keys
            },
            {
                key: 'group-style', // required, must start with `group-`
                title: 'Style', // required
                iconSvg: svgIconStyle, // optional
                menuKeys: ['bold', 'underline', 'italic', 'through'] // required, children menu keys

            },
            {
                key: 'group-Justify', // required, must start with `group-`
                title: 'Justify', // required
                iconSvg: svgIconJustify, // optional
                menuKeys: ['justifyLeft', 'justifyRight', 'justifyCenter', 'justifyJustify'] // required, children menu keys

            },
            {
                key: 'group-Color', // required, must start with `group-`
                title: 'Color', // required
                // iconSvg: svgIconColor, // optional
                menuKeys: ['color', 'bgColor'] // required, children menu keys

            },
            {
                key: 'group-List', // required, must start with `group-`
                title: 'List', // required
                iconSvg: svgIconList, // optional
                menuKeys: ['bulletedList', 'numberedList'] // required, children menu keys

            },

            {
                key: 'group-Mdia', // required, must start with `group-`
                title: 'Mediad', // required
                iconSvg: svgIconImage, // optional
                menuKeys: ['insertVideo', 'uploadImage', 'insertImage'] // required, children menu keys

            },
            {
                key: 'group-Insert', // required, must start with `group-`
                title: 'Insert', // required
                iconSvg: svgIconInsert, // optional
                menuKeys: ['insertTable', 'divider', 'emotion', 'insertLink', 'blockquote', 'todo'] // required, children menu keys

            }, 'clearStyle', 'redo', 'undo'
        ]
    }  // TS syntax
    // const toolbarConfig = { }                        // JS syntax

    const editorConfig: Partial<IEditorConfig> = {  // TS syntax
        placeholder: 'Type here...',
        MENU_CONF: {},
        hoverbarKeys: {}
    };



    // Timely destroy editor, important!
    if (editorConfig.MENU_CONF) {
        editorConfig.MENU_CONF['fontFamily'] = {
            fontFamilyList: [
                'Arial',
                'Tahoma',
                'Verdana',
                { name: 'Tahoma', value: 'Tahoma' },
            ]
        }
        editorConfig.MENU_CONF['uploadImage'] = {

            base64LimitSize: 10 * 1024 // 5kb
        }


    }

    useEffect(() => {

        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    return (
        <>
            <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
                <Toolbar
                    defaultConfig={toolbarConfig}
                    editor={editor}
                    mode="simple"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => setHtml(editor.getHtml())}
                    mode="simple"
                    style={{ height: '500px', overflowY: 'hidden' }}
                />
            </div>
            <div style={{ marginTop: '15px' }}>
                {html}
            </div>
        </>
    )
}

export default MyEditor