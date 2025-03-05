import { CardData } from "./types";

export const cards:CardData[]=[
    {
        title:"Hide Desktop Icons",
        description:"Hide all icons on your desktop when sharing your screen.",
        events:["screen-share-ended","screen-share-started"],
        icon:"/images/glareCards/hide-desktop-icons.png",
        contributors:[
            '/images/glareCards/saidfatah.jpeg',
            '/images/glareCards/saidfatah.jpeg',
        ]
    },
    {
        title:"Pause Spotify",
        description:"Automatically pause Spotify when a call starts.",
        events:["call-connected"],
        icon:"/images/glareCards/pause-spotify.png",
        contributors:[
            '/images/glareCards/saidfatah.jpeg',
        ]
    },
    {
        title:"iTerm Command",
        description:"Run any command via iTerm when joining a room.",
        events:["room-joined"],
        icon:"/images/glareCards/iterm-command.png",
        contributors:[
            '/images/glareCards/saidfatah.jpeg',
        ]
    },
    {
        title:"Git Coauthors",
        description:"Automatically add git coauthors when pairing on a call",
        events:["participant-joined","participant-left"],
        icon:"/images/glareCards/git-coauthors.png",
        contributors:[
            '/images/glareCards/saidfatah.jpeg',
        ]
    },
    {
        title:"Open Figma",
        description:"Automatically opens Figma when a call starts.",
        events:["call-connected"],
        icon:"/images/glareCards/open-figma.png",
        contributors:[
            '/images/glareCards/saidfatah.jpeg',
        ]
    },
    {
        title:"Google Calendar Update",
        description:"Add an event to Google Calendar after ending a call with a title.",
        events:["call-ended"],
        icon:"/images/glareCards/update-google-calendar.png",
        contributors:[
            '/images/glareCards/saidfatah.jpeg',
        ]
    },
]