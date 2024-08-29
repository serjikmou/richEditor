import { SlateDescendant, SlateElement, SlateText } from '@wangeditor/editor-for-react'

declare module '@wangeditor/editor-for-react' {
    // Extend Text
    interface SlateText {
        text: string
    }

    // Extend Element
    interface SlateElement {
        type: string
        children: SlateDescendant[]
    }
}