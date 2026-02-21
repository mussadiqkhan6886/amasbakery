import {Roboto, Lora} from "next/font/google"

export const roboto = Roboto({
    weight: ["100", "200", "400", "600", "800"],
    style: ["normal", "italic"],
    subsets: ["latin"]
})

export const playFair = Lora({
    weight: ["400", "700"],
    style: ["italic", "normal"],
    subsets: ["latin"]
})
