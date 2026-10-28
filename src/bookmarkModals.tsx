import {
    Field,
    Focusable,
    TextField,
    DialogButton,
    ConfirmModal,
    ModalRootProps
} from "@decky/ui";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

import { modalWithState } from "./modal";
import { useGlobalState } from "./globalState";
import { Bookmark, bookmarkName } from "./bookmarks";

// The picture sits above modals, so hide it while one is open
const useHidePicture = () => {
    const [, setGlobalState] = useGlobalState();

    useEffect(() => {
        setGlobalState(state => ({ ...state, visible: false }));
        return () => setGlobalState(state => ({ ...state, visible: true }));
    }, []);
};

export const AddBookmarkModal = (props: ModalRootProps) => {
    const [{ url }, setGlobalState] = useGlobalState();
    const [name, setName] = useState(bookmarkName(url));

    useHidePicture();

    return <ConfirmModal
        {...props}
        strTitle='Bookmark this page'
        strDescription={url}
        onOK={() => setGlobalState(state => ({
            ...state,
            bookmarks: [
                ...state.bookmarks,
                { name: name.trim() || bookmarkName(url), url }
            ]
        }))}>
        <TextField
            label='Name'
            value={name}
            onChange={e => setName(e.target.value)} />
    </ConfirmModal>;
}

export const ManageBookmarksModal = (props: ModalRootProps) => {
    const [{ bookmarks }, setGlobalState] = useGlobalState();
    const [draft, setDraft] = useState<Bookmark[]>(bookmarks);

    useHidePicture();

    return <ConfirmModal
        {...props}
        strTitle='Bookmarks'
        strOKButtonText='Save'
        onOK={() => setGlobalState(state => ({
            ...state,
            bookmarks: draft.map(bookmark => ({
                ...bookmark,
                name: bookmark.name.trim() || bookmarkName(bookmark.url)
            }))
        }))}>
        {draft.length == 0 && <div>No bookmarks yet.</div>}
        {draft.map((bookmark, index) =>
            <Field
                key={index}
                description={bookmark.url}
                childrenLayout="inline"
                childrenContainerWidth="max">
                <Focusable style={{ display: 'flex', gap: 8, width: '100%' }} flow-children="horizontal">
                    <div style={{ flexGrow: 1 }}>
                        <TextField
                            value={bookmark.name}
                            onChange={e => setDraft(draft.map((b, i) =>
                                i == index ? { ...b, name: e.target.value } : b))} />
                    </div>
                    <DialogButton
                        style={{ minWidth: 0, width: 48, padding: 0 }}
                        onClick={() => setDraft(draft.filter((_, i) => i != index))}>
                        <FaTrash />
                    </DialogButton>
                </Focusable>
            </Field>)}
    </ConfirmModal>;
}

export const AddBookmarkModalWithState = modalWithState(AddBookmarkModal);
export const ManageBookmarksModalWithState = modalWithState(ManageBookmarksModal);
