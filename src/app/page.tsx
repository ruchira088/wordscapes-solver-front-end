"use client"

import {useEffect, useState} from "react"
import {getWords} from "@/app/WordscapesSolver"
import Keyboard from "react-simple-keyboard"

import "react-simple-keyboard/build/css/index.css"

export default function Home() {
    const [characters, setCharacters] = useState<string[]>([])

    const onKeyPress = (key: string) => {
        if (key === "Backspace") {
            setCharacters(chars => {
                if (chars.length !== 0) {
                    const [first, ...rest] = chars
                    return rest
                } else {
                    return chars
                }
            })
        } else if (key === "Enter") {

        } else if (key.length === 1 && key.match(/[a-z]/i)){
            setCharacters( chars => [key, ...chars])
        }
    }

    useEffect(() => {
        const keyDownHandler = (event: KeyboardEvent) => onKeyPress(event.key)
        document.addEventListener("keydown", keyDownHandler)
        return () => document.removeEventListener("keydown", keyDownHandler)
    }, [])

    const onSubmit =
        async () => {
            const result = await getWords("loang")
            console.log(JSON.stringify(result))
        }

    return (
        <main>
            <div>Hello World</div>
            <button onClick={onSubmit}>Click Me</button>
            { characters.map((character, index) => <div key={index}>{character}</div>)}
            <Keyboard onKeyPress={onKeyPress}
                      physicalKeyboardHighlight={true}
                      layout={keyboardLayout}
                      display={keyboardDisplay}
            />
        </main>
    )
}

const CharacterDisplay =
    (props: {characters: string[]}) => (
        <div>

        </div>
    )

const keyboardLayout = {
    default: [
        "Q W E R T Y U I O P",
        "A S D F G H J K L",
        "Enter Z X C V B N M Backspace"
    ]
}

const keyboardDisplay = {
    Enter: "⏎",
    Backspace: "⌫"
}