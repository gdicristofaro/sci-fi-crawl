import CrawlSettings from "@/model/CrawlSettings";

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


const DEFAULT_INTRO = " A long time ago in a galaxy far,\nfar away. . . ."
const DEFAULT_EPISODE = "EPISODE VI";
const DEFAULT_TITLE = "Return of the Jedi";

const DEFAULT_CONTENT = `It is a period of civil wars in the galaxy. A brave alliance of underground freedom fighters has challenged the tyranny and oppression of the awesome GALACTIC EMPIRE.
Striking from a fortress hidden among the billion stars of the galaxy, rebel spaceships have won their first victory in a battle with the powerful Imperial Starfleet. The EMPIRE fears that another defeat could bring a thousand more solar systems into the rebellion, and Imperial control over the galaxy would be lost forever.
To crush the rebellion once and for all, the EMPIRE is constructing a sinister new battle station. Powerful enough to destroy an entire planet, its completion spells certain doom for the champions of freedom.`

const DEFAULT_MUSIC = "https://github.com/marxspawn/Star_Wars_Intro/raw/refs/heads/master/media/Star.Wars.Intro.mp3";

const DEFAULT_CRAWL_SETTINGS: CrawlSettings = {
    crawl: DEFAULT_CONTENT,
    episode: DEFAULT_EPISODE,
    title: DEFAULT_TITLE,
    intro: DEFAULT_INTRO,
    music: DEFAULT_MUSIC
}


export function getData(): CrawlSettings | undefined {
    let requestStr = getRequestParam(DATA_KEY);

    let json = {};
    if (requestStr) {
        let base64decode = atob(requestStr);
        if (base64decode) {
            json = JSON.parse(base64decode);
        }
    }

    return  {...DEFAULT_CRAWL_SETTINGS, ...(json as CrawlSettings)};
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


