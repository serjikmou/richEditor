import Easymail, { EasymailLangType, EasymailRefProps, EasymailSkinType } from 'easy-mail-editor';
import { fileToBase64 } from 'file64';
import { useRef, useState } from 'react'
import EmailEditor from 'react-email-editor'

function EditorMail() {
    const refDiv = useRef<HTMLDivElement | null>(null)
    const [lang, setLang] = useState<EasymailLangType>("en_US");
    const [skin, setSkin] = useState<EasymailSkinType>("light");

    const ref = useRef<EasymailRefProps>(null);
    const rejectRef = useRef<any>(null);

    const getEditorMjmlJson = () => {
        console.log(ref.current?.getData())
    };
    return (
        <div ref={refDiv} style={{ display: 'flex', flexDirection: 'column', position: 'relative', height: '100%' }}>
            <button onClick={getEditorMjmlJson}>dsfd</button>
            <Easymail

                lang={lang}
                width="100vw"
                height="100vh"
                skin={skin}
                colorPrimary={""}
                ref={ref}
                // value={'mj-head'}
                tinymceLink={'tinymceLink'}
                onUpload={(file: File) => {
                    return new Promise((resolve, reject) => {
                        rejectRef.current = reject;
                        setTimeout(async () => {
                            try {
                                const url = await fileToBase64(file);
                                resolve({ url });
                            } catch (error) {
                                reject("upload error");
                            }
                        }, 5000);
                    });
                }}

            />

        </div>
    )
}

export default EditorMail