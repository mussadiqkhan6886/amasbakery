import {Roboto, Playfair_Display_SC, Dancing_Script} from "next/font/google"

export const roboto = Roboto({
    weight: ["100", "200", "400", "600", "800"],
    style: ["normal", "italic"],
    subsets: ["latin"]
})

export const playFair = Playfair_Display_SC({
    weight: ["400", "700", "900"],
    style: ["italic", "normal"],
    subsets: ["latin"]
})

export const dancing = Dancing_Script({
    weight: ["500"],
})