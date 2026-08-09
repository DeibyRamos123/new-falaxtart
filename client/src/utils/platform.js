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

export const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();

    const difference = now - date;

    const seconds = Math.floor(difference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) {
        return 'just now';
    }

    if (minutes < 60) {
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    }

    if (hours < 24) {
        return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }

    if (days < 30) {
        return `${days} day${days !== 1 ? 's' : ''} ago`;
    }

    if (months < 12) {
        return `${months} month${months !== 1 ? 's' : ''} ago`;
    }

    return `${years} year${years !== 1 ? 's' : ''} ago`;
};