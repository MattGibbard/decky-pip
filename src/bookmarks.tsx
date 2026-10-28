export interface Bookmark {
    name: string
    url: string
}

export const DEFAULT_BOOKMARKS: Bookmark[] = [
    { name: 'Netflix', url: 'https://netflix.com' },
    { name: 'YouTube', url: 'https://youtube.com' },
    { name: 'Twitch', url: 'https://twitch.tv' },
];

export const bookmarkName = (url: string) => {
    try {
        return new URL(url).hostname.replace(/^www\./, '') || url;
    } catch {
        return url;
    }
};
