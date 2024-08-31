// import '@wangeditor/editor/dist/css/style.css' // import css
import "./style.css";
import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { DomEditor, IDomEditor, IEditorConfig, IModuleConf, IToolbarConfig, SlateTransforms } from '@wangeditor/editor'
import { i18nChangeLanguage, i18nGetResources, i18nAddResources } from '@wangeditor/editor'
import { Range, NodeEntry, Node } from 'slate';
// Switch language - 'en' or 'zh-CN'

i18nAddResources('ja', {
    "editor": {
        "more": "More",
        "justify": "Justify",
        "indent": "Indent",
        "image": "Image",
        "video": "Video"
    },
    "common": {
        "ok": "OK",
        "delete": "Delete",
        "enter": "Enter"
    },
    "blockQuote": {
        "title": "Quote"
    },
    "codeBlock": {
        "title": "Code block"
    },
    "color": {
        "color": "Font color",
        "bgColor": "Back color",
        "default": "Default color",
        "clear": "Clear back color"
    },
    "divider": {
        "title": "Divider"
    },
    "emotion": {
        "title": "Emotion"
    },
    "fontSize": {
        "title": "Font size",
        "default": "9px"
    },
    "fontFamily": {
        "title": "Font family",
        "default": "Regualr"
    },
    "fullScreen": {
        "title": "Full screen"
    },
    "header": {
        "title": "Header",
        "text": "Text"
    },
    "image": {
        "netImage": "image Link",
        "delete": "Delete image",
        "edit": "Edit image",
        "viewLink": "View link",
        "src": "Image src",
        "desc": "Description",
        "link": "Image link"
    },
    "indent": {
        "decrease": "Decrease",
        "increase": "Increase"
    },
    "justify": {
        "left": "Left",
        "right": "Right",
        "center": "Center",
        "justify": "Justify"
    },
    "lineHeight": {
        "title": "Line height",
        "default": "Line height"
    },
    "link": {
        "insert": "Insert link",
        "text": "Link text",
        "url": "Link source",
        "unLink": "Unlink",
        "edit": "Edit link",
        "view": "View link"
    },
    "textStyle": {
        "bold": "Bold",
        "clear": "Clear styles",
        "code": "Inline code",
        "italic": "Italic",
        "sub": "Sub",
        "sup": "Sup",
        "through": "Through",
        "underline": "Underline"
    },
    "undo": {
        "undo": "undo",
        "redo": "Redo"
    },
    "todo": {
        "todo": "Todo"
    },
    "listModule": {
        "unOrderedList": "Unordered list",
        "orderedList": "Ordered list"
    },
    "tableModule": {
        "deleteCol": "Delete column",
        "deleteRow": "Delete row",
        "deleteTable": "Delete table",
        "widthAuto": "Width auto",
        "insertCol": "Insert column",
        "insertRow": "Insert row",
        "insertTable": "Insert table",
        "header": "Header"
    },
    "videoModule": {
        "delete": "Delete",
        "uploadVideo": "Upload video",
        "insertVideo": "Insert video",
        "videoSrc": "Video source",
        "videoSrcPlaceHolder": "Video file url, or third-party <iframe>",
        "videoPoster": "Video poster",
        "videoPosterPlaceHolder": "Poster image url",
        "ok": "Ok",
        "editSize": "Edit size",
        "width": "Width",
        "height": "Height"
    },
    "uploadImgModule": {
        "uploadImage": "Upload Image",
        "uploadError": "{{fileName}} upload error"
    },
    "highLightModule": {
        "selectLang": "Language"
    }
});

// Switch language
i18nChangeLanguage('ja')


function MyEditor() {
    // editor instance
    const [editor, setEditor] = useState<IDomEditor | null>(null)
    const resources = i18nGetResources('en')
    console.log(JSON.stringify(resources))
    // TS syntax
    // const [editor, setEditor] = useState(null)                  // JS syntax

    // editor content
    const [html, setHtml] = useState('')

    // Simulate ajax async set html
    // useEffect(() => {
    //     setTimeout(() => {
    //         setHtml('<p>hello&nbsp;world</p>')
    //     }, 1500)
    // }, [])
    const svgIconColor = `<svg class="custom-menu" fill="#000000" width="800px" height="800px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 .5C3.58.5 0 3.86 0 8s3.58 7.5 8 7.5c4.69 0 1.04-2.83 2.79-4.55.76-.75 1.63-.87 2.44-.87.37 0 .73.03 1.06.03.99 0 1.72-.23 1.72-2.1C16 3.86 12.42.5 8 .5zm6.65 8.32c-.05.01-.16.02-.37.02-.14 0-.29 0-.45-.01-.19 0-.39-.01-.61-.01-.89 0-2.19.13-3.32 1.23-1.17 1.16-.9 2.6-.74 3.47.03.18.08.44.09.6-.16.05-.52.13-1.26.13-3.72 0-6.75-2.8-6.75-6.25S4.28 1.75 8 1.75s6.75 2.8 6.75 6.25c0 .5-.06.74-.1.82z"/><path d="M5.9 9.47c-1.03 0-1.86.8-1.86 1.79s.84 1.79 1.86 1.79 1.86-.8 1.86-1.79-.84-1.79-1.86-1.79zm0 2.35c-.35 0-.64-.25-.64-.56s.29-.56.64-.56.64.25.64.56-.29.56-.64.56zm-.2-4.59c0-.99-.84-1.79-1.86-1.79s-1.86.8-1.86 1.79.84 1.79 1.86 1.79 1.86-.8 1.86-1.79zm-1.86.56c-.35 0-.64-.25-.64-.56s.29-.56.64-.56.64.25.64.56-.29.56-.64.56zM7.37 2.5c-1.03 0-1.86.8-1.86 1.79s.84 1.79 1.86 1.79 1.86-.8 1.86-1.79S8.39 2.5 7.37 2.5zm0 2.35c-.35 0-.64-.25-.64-.56s.29-.56.64-.56.64.25.64.56-.29.56-.64.56zm2.47 1.31c0 .99.84 1.79 1.86 1.79s1.86-.8 1.86-1.79-.84-1.79-1.86-1.79-1.86.8-1.86 1.79zm2.5 0c0 .31-.29.56-.64.56s-.64-.25-.64-.56.29-.56.64-.56.64.25.64.56z"/></svg>`;
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
        modalAppendToBody: true, toolbarKeys: [
            'fontSize', 'fontFamily', 'lineHeight', {
                key: 'group-headerSelect', // required, must start with `group-`
                title: 'H', // required
                menuKeys: ['header1', 'header2', 'header3', 'header4', 'header5'] // required, children menu keys
            },
            'clearStyle',
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
                iconSvg: svgIconColor, // optional
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
                menuKeys: ['insertTable', 'divider', 'emotion', 'insertLink', 'blockquote', 'todo']
                // required, children menu keys

            }, 'redo', 'undo', 'fullScreen'
        ]
    }  // TS syntax
    // const toolbarConfig = { }                        // JS syntax

    const editorConfig: Partial<IEditorConfig> = {  // TS syntax
        placeholder: 'Type here...',
        MENU_CONF: {},
        hoverbarKeys: {}
    };

    // editor?.dangerouslyInsertHtml(`<h1>Header1</h1><p>Hello <b>word</b></p>`)
    console.log(editor?.getMenuConfig('fontFamily'))

    // Timely destroy editor, important!
    if (editorConfig.MENU_CONF) {
        editorConfig.MENU_CONF['fontFamily'] = {
            fontFamilyList: [
                'Arial',
                'Tahoma',
                'Verdana',
                'vazir'

            ]
        }
        editorConfig.MENU_CONF['uploadImage'] = {

            base64LimitSize: 10 * 1024 // 5kb
        }


    }

    const handle = () => {
        console.log(DomEditor.getToolbar(editor!))
        // editor?.on('fullScreen', () => { console.log('fullScreen') })
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
                    style={{ height: '500px', overflowY: 'hidden', direction: 'rtl' }}

                />
            </div>
            <button onClick={handle}>sslls</button>
            <button onClick={() => editor?.setHtml(`exportHtml <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title></title>
  
    <style type="text/css">
      @media only screen and (min-width: 520px) {
  .u-row {
    width: 500px !important;
  }
  .u-row .u-col {
    vertical-align: top;
  }

  .u-row .u-col-100 {
    width: 500px !important;
  }

}

@media (max-width: 520px) {
  .u-row-container {
    max-width: 100% !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .u-row .u-col {
    min-width: 320px !important;
    max-width: 100% !important;
    display: block !important;
  }
  .u-row {
    width: 100% !important;
  }
  .u-col {
    width: 100% !important;
  }
  .u-col > div {
    margin: 0 auto;
  }
}
body {
  margin: 0;
  padding: 0;
}

table,
tr,
td {
  vertical-align: top;
  border-collapse: collapse;
}

p {
  margin: 0;
}

.ie-container table,
.mso-container table {
  table-layout: fixed;
}

* {
  line-height: inherit;
}

a[x-apple-data-detectors='true'] {
  color: inherit !important;
  text-decoration: none !important;
}

table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; }
    </style>
  
  

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #F7F8F9;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #F7F8F9;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #F7F8F9;"><![endif]-->
    
  
  
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
<div align="center">
  <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:37px; v-text-anchor:middle; width:77px;" arcsize="11%"  stroke="f" fillcolor="#3AAEE0"><w:anchorlock/><center style="color:#FFFFFF;"><![endif]-->
    <a href="" target="_blank" class="v-button" style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #3AAEE0; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
      <span style="display:block;padding:10px 20px;line-height:120%;"><span style="line-height: 16.8px;">sajjad</span></span>
    </a>
    <!--[if mso]></center></v:roundrect><![endif]-->
</div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <!--[if mso]><table width="100%"><tr><td><![endif]-->
    <h1 style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 22px; font-weight: 400;"><span>Heading</span></h1>
  <!--[if mso]></td></tr></table><![endif]-->

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="line-height: 140%;">Hey there! You've just stepped into a brand new text area that's waiting for your creative touch. It's all yours to play with, go ahead and shape it the way you like. Think of this as a blank sheet of paper, your starting line to weave your own story. Be it sharing information, convincing someone, telling a tale, or painting a picture with words, it's totally up to you. Spruce up the text, give it your personal touch, and see your thoughts come alive.</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
  </div>
  


    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
    </td>
  </tr>
  </tbody>
  </table>
  <!--[if mso]></div><![endif]-->
  <!--[if IE]></div><![endif]-->
</body>

</html>
`)
            }>ssdfasdsfd</button>
            <div style={{ marginTop: '15px' }}>
                {html}
            </div>
            <div dangerouslySetInnerHTML={{
                __html: `exportHtml <!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<!--[if gte mso 9]>
<xml>
  <o:OfficeDocumentSettings>
    <o:AllowPNG/>
    <o:PixelsPerInch>96</o:PixelsPerInch>
  </o:OfficeDocumentSettings>
</xml>
<![endif]-->
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
  <title></title>
  
    <style type="text/css">
      @media only screen and (min-width: 520px) {
  .u-row {
    width: 500px !important;
  }
  .u-row .u-col {
    vertical-align: top;
  }

  .u-row .u-col-100 {
    width: 500px !important;
  }

}

@media (max-width: 520px) {
  .u-row-container {
    max-width: 100% !important;
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .u-row .u-col {
    min-width: 320px !important;
    max-width: 100% !important;
    display: block !important;
  }
  .u-row {
    width: 100% !important;
  }
  .u-col {
    width: 100% !important;
  }
  .u-col > div {
    margin: 0 auto;
  }
}
body {
  margin: 0;
  padding: 0;
}

table,
tr,
td {
  vertical-align: top;
  border-collapse: collapse;
}

p {
  margin: 0;
}

.ie-container table,
.mso-container table {
  table-layout: fixed;
}

* {
  line-height: inherit;
}

a[x-apple-data-detectors='true'] {
  color: inherit !important;
  text-decoration: none !important;
}

table, td { color: #000000; } #u_body a { color: #0000ee; text-decoration: underline; }
    </style>
  
  

</head>

<body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #F7F8F9;color: #000000">
  <!--[if IE]><div class="ie-container"><![endif]-->
  <!--[if mso]><div class="mso-container"><![endif]-->
  <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #F7F8F9;width:100%" cellpadding="0" cellspacing="0">
  <tbody>
  <tr style="vertical-align: top">
    <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #F7F8F9;"><![endif]-->
    
  
  
<div class="u-row-container" style="padding: 0px;background-color: transparent">
  <div class="u-row" style="margin: 0 auto;min-width: 320px;max-width: 500px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
    <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px;"><tr style="background-color: transparent;"><![endif]-->
      
<!--[if (mso)|(IE)]><td align="center" width="500" style="width: 500px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
<div class="u-col u-col-100" style="max-width: 320px;min-width: 500px;display: table-cell;vertical-align: top;">
  <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
  <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
  
<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
<div align="center">
  <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:37px; v-text-anchor:middle; width:77px;" arcsize="11%"  stroke="f" fillcolor="#3AAEE0"><w:anchorlock/><center style="color:#FFFFFF;"><![endif]-->
    <a href="" target="_blank" class="v-button" style="box-sizing: border-box;display: inline-block;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #3AAEE0; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-size: 14px;">
      <span style="display:block;padding:10px 20px;line-height:120%;"><span style="line-height: 16.8px;">sajjad</span></span>
    </a>
    <!--[if mso]></center></v:roundrect><![endif]-->
</div>

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <!--[if mso]><table width="100%"><tr><td><![endif]-->
    <h1 style="margin: 0px; line-height: 140%; text-align: left; word-wrap: break-word; font-size: 22px; font-weight: 400;"><span>Heading</span></h1>
  <!--[if mso]></td></tr></table><![endif]-->

      </td>
    </tr>
  </tbody>
</table>

<table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
  <tbody>
    <tr>
      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
        
  <div style="font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
    <p style="line-height: 140%;">Hey there! You've just stepped into a brand new text area that's waiting for your creative touch. It's all yours to play with, go ahead and shape it the way you like. Think of this as a blank sheet of paper, your starting line to weave your own story. Be it sharing information, convincing someone, telling a tale, or painting a picture with words, it's totally up to you. Spruce up the text, give it your personal touch, and see your thoughts come alive.</p>
  </div>

      </td>
    </tr>
  </tbody>
</table>

  <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
  </div>
</div>
<!--[if (mso)|(IE)]></td><![endif]-->
      <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
    </div>
  </div>
  </div>
  


    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
    </td>
  </tr>
  </tbody>
  </table>
  <!--[if mso]></div><![endif]-->
  <!--[if IE]></div><![endif]-->
</body>

</html>`,
            }} />

        </>
    )
}

export default MyEditor