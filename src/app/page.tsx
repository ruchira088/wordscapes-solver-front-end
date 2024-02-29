"use client"

import {useEffect, useState} from "react"
import {getWords} from "@/app/WordscapesSolver"
import Keyboard from "react-simple-keyboard"

import styles from "./page.module.css"
import "react-simple-keyboard/build/css/index.css"

export default function Home() {
    const [characters, setCharacters] = useState<string[]>([])
    const [words, setWords] = useState<[number, string[]][]>([])

    const onKeyPress = async (key: string) => {
        if (key === "Backspace") {
            setWords([])
            setCharacters(chars => {
                if (chars.length !== 0) {
                    const [first, ...rest] = chars
                    return rest
                } else {
                    return chars
                }
            })
        } else if (key === "Enter") {
            const words = await getWords(characters.join(""))
            setWords(words)
        } else if (key.length === 1 && key.match(/[a-z]/i)) {
            setWords([])
            setCharacters(chars => [key.toUpperCase(), ...chars])
        }
    }

    const clear = () => {
        setWords([])
        setCharacters([])
    }

    useEffect(() => {
        const keyDownHandler = (event: KeyboardEvent) => onKeyPress(event.key)
        document.addEventListener("keydown", keyDownHandler)
        return () => document.removeEventListener("keydown", keyDownHandler)
    }, [characters.join()])

    return (
        <main>
            <CharacterDisplay characters={characters}/>
            <WordsDisplay words={words}/>
            <div className={styles.keyboard}>
                <Keyboard
                    onKeyPress={onKeyPress}
                    physicalKeyboardHighlight={true}
                    layout={keyboardLayout}
                    display={keyboardDisplay}
                />
            </div>
        </main>
    )
}

function reverse<T>(values: T[]): T[] {
    if (values.length === 0) {
        return values
    } else {
        const [first, ...rest] = values
        return reverse(rest).concat([first])
    }
}

const CharacterDisplay =
    (props: { characters: string[] }) => (
        <div className={styles.characterDisplay}>
            {
                reverse(props.characters)
                    .map((char, key) => <span className={styles.character} key={key}>{char}</span>)
            }
        </div>
    )

const WordsDisplay =
    (props: { words: [number, string[]][] }) => (
        <div className={styles.wordsDisplay}>
            {props.words
                .map(
                    ([count, words]) =>
                        <div className={styles.words} key={count}>
                            <div className={styles.wordsTitle}>{count} letters</div>
                            <div>
                                {
                                    words.map(((word, index) =>
                                        <div className={styles.word} key={index}>{word}</div>)
                                    )
                                }
                            </div>
                        </div>
                )
            }
        </div>
    )

const keyboardLayout = {
    default: [
        "Q W E R T Y U I O P Backspace",
        "A S D F G H J K L",
        "Z X C V B N M Enter"
    ]
}

const keyboardDisplay = {
    Enter: "⏎",
    Backspace: "⌫"
}