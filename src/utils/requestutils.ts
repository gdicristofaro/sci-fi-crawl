import CrawlSettings from "@/model/CrawlSettings";
import { Base64 } from "js-base64";

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
        let base64decode = Base64.decode(requestStr);
        if (base64decode) {
            json = JSON.parse(base64decode);
        }
    }

    return json as CrawlSettings;
}

export function stringifyData(obj: CrawlSettings): string {
    let newObj : any = {};
    for (let key of (Object.keys(obj) as Array<keyof CrawlSettings>)) {
        let objVal = obj[key];
        if (objVal !== undefined && ((typeof(objVal) !== 'string') || (objVal as string).length)) {
            newObj[key] = objVal;
        }
    }
    return Base64.encode(JSON.stringify(newObj));
}

export function setData(obj: CrawlSettings) {
    let urlString = window.location.href;
    let url = new URL(urlString);
    url.searchParams.set(DATA_KEY, stringifyData(obj));
    window.location.href = url.toString();
}


