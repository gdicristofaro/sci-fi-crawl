import CrawlSettings from "@/model/CrawlSettings";

// taken from https://stackoverflow.com/a/831060
const getRequestParam = (key: string) => {
    let data = (new RegExp('[?&]' + encodeURIComponent(key) + '=([^&]*)')).exec(window.location.search);
    if (data) {
        return decodeURIComponent(data[1]);
    } else {
        return undefined;
    }
}

const DATA_KEY = "data";

export function getData(): CrawlSettings | undefined {
    let requestStr = getRequestParam(DATA_KEY);

    let json = {};
    if (requestStr) {
        let base64decode = atob(requestStr);
        if (base64decode) {
            json = JSON.parse(base64decode);
        }
    }

    return json as CrawlSettings;
}

export function stringifyData(obj: CrawlSettings): string {
    let newObj : any = {};
    for (let key of Object.keys(obj)) {
        if ((obj as any)[key]?.toString()?.length) {
            newObj[key] = (obj as any)[key];
        }
    }
    return btoa(JSON.stringify(newObj));
}

export function setData(obj: CrawlSettings) {
    let urlString = window.location.href;
    let url = new URL(urlString);
    url.searchParams.set(DATA_KEY, stringifyData(obj));
    window.location.href = url.toString();
}


