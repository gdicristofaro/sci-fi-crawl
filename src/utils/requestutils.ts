import CrawlSettings from "@/dto/CrawlSettings";

// taken from https://stackoverflow.com/a/831060
let getRequestParam = (key: string) => {
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
    if (!requestStr) {
        return undefined;
    }

    let base64decode = atob(requestStr);
    if (!base64decode) {
        return undefined;
    }

    let json = JSON.parse(base64decode);
    return json as CrawlSettings;
}

export function stringifyData(obj: CrawlSettings): string {
    return btoa(JSON.stringify(obj));
}

export function setData(obj: CrawlSettings) {
    let urlString = window.location.href;
    let url = new URL(urlString);
    url.searchParams.set(DATA_KEY, stringifyData(obj));
    window.location.href = url.toString();
}