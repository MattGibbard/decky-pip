import {
    PanelSection,
    PanelSectionRow,
    DropdownItem,
    SliderField,
    showModal,
    ButtonItem,
    ToggleField
} from "@decky/ui";
import { useEffect } from "react";
import { FaEdit, FaRegStar, FaStar } from "react-icons/fa";

import { Position, ViewMode } from "./util";
import { useGlobalState } from "./globalState";
import { UrlModalWithState } from "./urlModal";
import { AddBookmarkModalWithState, ManageBookmarksModalWithState } from "./bookmarkModals";

export const Settings = () => {
    const [{ viewMode, position, margin, url, size, bookmarks }, setGlobalState, stateContext] = useGlobalState();
    const bookmarked = bookmarks.some(bookmark => bookmark.url == url);

    useEffect(() => {
        setGlobalState(state => ({
            ...state,
            visible: true,
            viewMode: state.viewMode == ViewMode.Closed
                ? ViewMode.Picture
                : state.viewMode
        }));
    }, []);

    const positionOptions = [
        { label: 'Top Left', data: Position.TopLeft },
        { label: 'Top', data: Position.Top },
        { label: 'Top Right', data: Position.TopRight },
        { label: 'Right', data: Position.Right },
        { label: 'Bottom Right', data: Position.BottomRight },
        { label: 'Bottom', data: Position.Bottom },
        { label: 'Bottom Left', data: Position.BottomLeft },
        { label: 'Left', data: Position.Left },
    ];

    return <>
        <PanelSection>
            {viewMode == ViewMode.Closed && <>
                <PanelSectionRow>
                    <ButtonItem
                        bottomSeparator="none"
                        layout="below"
                        onClick={() => setGlobalState(state => ({
                            ...state,
                            viewMode: ViewMode.Picture
                        }))}>
                        Open
                    </ButtonItem>
                </PanelSectionRow>
            </>}
            {viewMode != ViewMode.Closed && <>
                <PanelSectionRow>
                    <ButtonItem
                        label='Address'
                        layout="below"
                        onClick={() => showModal(<UrlModalWithState value={stateContext} />)}>
                        <div style={{ display: 'flex' }}>
                            <FaEdit />
                            &nbsp;&nbsp;
                            <div style={{ maxWidth: 180, textOverflow: 'ellipsis', overflow: 'hidden' }}>
                                {url}
                            </div>
                        </div>
                    </ButtonItem>
                </PanelSectionRow>
                {bookmarks.length > 0 && <>
                    <PanelSectionRow>
                        <DropdownItem
                            label='Bookmarks'
                            strDefaultLabel='Choose a bookmark'
                            selectedOption={bookmarked ? url : null}
                            rgOptions={bookmarks.map(bookmark => ({ label: bookmark.name, data: bookmark.url }))}
                            onMenuOpened={() =>
                                setGlobalState(state => ({
                                    ...state,
                                    visible: false
                                }))}
                            onChange={option =>
                                setGlobalState(state => ({
                                    ...state,
                                    visible: true,
                                    url: option.data
                                }))} />
                    </PanelSectionRow>
                </>}
                <PanelSectionRow>
                    <ButtonItem
                        layout="below"
                        onClick={() => bookmarked
                            ? setGlobalState(state => ({
                                ...state,
                                bookmarks: state.bookmarks.filter(bookmark => bookmark.url != state.url)
                            }))
                            : showModal(<AddBookmarkModalWithState value={stateContext} />)}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            {bookmarked ? <FaStar /> : <FaRegStar />}
                            &nbsp;&nbsp;
                            {bookmarked ? 'Remove bookmark' : 'Bookmark this page'}
                        </div>
                    </ButtonItem>
                </PanelSectionRow>
                {bookmarks.length > 0 && <>
                    <PanelSectionRow>
                        <ButtonItem
                            layout="below"
                            onClick={() => showModal(<ManageBookmarksModalWithState value={stateContext} />)}>
                            Edit bookmarks
                        </ButtonItem>
                    </PanelSectionRow>
                </>}
                <PanelSectionRow>
                    <ToggleField
                        label='Expand'
                        checked={viewMode == ViewMode.Expand}
                        onChange={checked => {
                            setGlobalState(state => ({
                                ...state,
                                viewMode: checked
                                    ? ViewMode.Expand
                                    : ViewMode.Picture
                            }))
                        }} />
                </PanelSectionRow>
            </>}
            {viewMode == ViewMode.Picture && <>
                <PanelSectionRow>
                    <DropdownItem
                        label='View'
                        selectedOption={position}
                        rgOptions={positionOptions}
                        onMenuOpened={() =>
                            setGlobalState(state => ({
                                ...state,
                                visible: false
                            }))}
                        onChange={option =>
                            setGlobalState(state => ({
                                ...state,
                                visible: true,
                                position: option.data,
                                viewMode: ViewMode.Picture
                            }))} />
                </PanelSectionRow>
                <PanelSectionRow>
                    <SliderField
                        label='Size'
                        value={size}
                        onChange={size =>
                            setGlobalState(state => ({
                                ...state,
                                size,
                                visible: true,
                                viewMode: ViewMode.Picture
                            }))}
                        min={0.70}
                        max={1.30}
                        step={0.15}
                        notchCount={3}
                        notchTicksVisible={true}
                        notchLabels={[
                            { label: "S", notchIndex: 0, value: 0.70 },
                            { label: "M", notchIndex: 1, value: 1 },
                            { label: "L", notchIndex: 2, value: 1.30 }
                        ]} />
                </PanelSectionRow>
                <PanelSectionRow>
                    <SliderField
                        label='Margin'
                        value={margin}
                        onChange={margin =>
                            setGlobalState(state => ({
                                ...state,
                                margin,
                                visible: true,
                                viewMode: ViewMode.Picture
                            }))}
                        min={0}
                        max={60}
                        step={15}
                        notchCount={3}
                        notchTicksVisible={true}
                        notchLabels={[
                            { label: "S", notchIndex: 0, value: 0 },
                            { label: "M", notchIndex: 1, value: 30 },
                            { label: "L", notchIndex: 2, value: 60 },
                        ]} />
                </PanelSectionRow>
            </>}
            {viewMode != ViewMode.Closed && <>
                <PanelSectionRow>
                    <ButtonItem
                        bottomSeparator="none"
                        layout="below"
                        onClick={() => setGlobalState(state => ({
                            ...state,
                            viewMode: ViewMode.Closed
                        }))}>
                        Close
                    </ButtonItem>
                </PanelSectionRow>
            </>}
        </PanelSection>
    </>;
};