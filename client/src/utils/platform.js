import {
    faPlaystation,
    faXbox,
    faSteam
} from "@fortawesome/free-brands-svg-icons"

import {
    faGamepad,
    faMobileScreen
} from "@fortawesome/free-solid-svg-icons"

export const getPlatformIcon = (platform) => {
    switch(platform){
        case "playstation":
            return faPlaystation;
        case "xbox":
            return faXbox;
        case "nintendo":
            return faGamepad;
        case "pc":
            return faSteam;
        case "mobile":
            return faMobileScreen;
        default:
            return null;
    }
}


export const getPlatformColor = (platform)=>{
    switch(platform){
        case "playstation":
            return "bg-blue";

        case "xbox":
            return "bg-green";

        case "nintendo":
            return "bg-red";

        case "pc":
            return "bg-purple";

        case "mobile":
            return "bg-orange";

        default:
            return "";
    }
}

