import merge from 'lodash/merge'
import { FaTv } from "react-icons/fa";
import { StateManager } from "cotton-box";
import { quickAccessMenuClasses } from "@decky/ui";
import { definePlugin, routerHook, } from "@decky/api";

import { PipOuter } from "./pip";
import { Settings } from "./settings";
import { Position, ViewMode } from "./util";
import { State, GlobalContext } from "./globalState";
import { DEFAULT_BOOKMARKS } from "./bookmarks";

export default definePlugin(() => {
    const saved: Partial<State> = JSON.parse(localStorage.getItem('pip') ?? '{}');

    const state = new StateManager<State>(merge<Partial<State>, State, Partial<State>>(
        {},
        {
            viewMode: ViewMode.Closed,
            visible: true,
            position: Position.TopRight,
            margin: 30,
            size: 1,
            url: "https://netflix.com",
            // merge() combines arrays by index, so only fall back when nothing is saved
            bookmarks: saved.bookmarks ?? DEFAULT_BOOKMARKS
        },
        saved));

    state.watch(({ position, margin, size, url, bookmarks }) =>
        localStorage.setItem('pip', JSON.stringify({ position, margin, size, url, bookmarks })));

    routerHook.addGlobalComponent("PictureInPicture", () => {
        return <GlobalContext.Provider value={state}>
            <PipOuter />
        </GlobalContext.Provider>
    });

    return {
        name: "Picture in Picture",
        titleView: <div className={quickAccessMenuClasses.Title}>Picture in Picture</div>,
        icon: <FaTv />,
        content:
            <GlobalContext.Provider value={state}>
                <Settings />
            </GlobalContext.Provider>,
        onDismount() {
            routerHook.removeGlobalComponent("PictureInPicture");
        },
    };
});
