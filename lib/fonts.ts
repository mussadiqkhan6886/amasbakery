import {Raleway, Playfair_Display_SC} from "next/font/google"

export const raleway = Raleway({
    weight: ["100", "200", "400", "600", "800"],
    style: ["normal", "italic"],
    subsets: ["latin"]
})

export const playFair = Playfair_Display_SC({
    weight: ["400", "700", "900"],
    style: ["italic", "normal"],
    subsets: ["latin"]
})