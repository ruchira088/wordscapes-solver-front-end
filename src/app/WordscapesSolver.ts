const apiUrl: string = process.env.NEXT_PUBLIC_API_URL || "https://api.wordscapes-solver.home.ruchij.com"

export const getWords = async (word: string): Promise<[number, string[]][]> => {
    const response = await fetch(`${apiUrl}/solver/${word}`)
    const json: string[] = await response.json()

    const words: Map<number, string[]> =
        json.reduce(
            (acc: Map<number, string[]>, current: string) => {
                const size = current.length
                const values = acc.get(size) || []

                acc.set(size, [current.toUpperCase(), ...values])

                return acc
            },
            new Map<number, string[]>()
        )

    const values =
        Array.from(words.entries())
            .filter(([x, xs]) => x > 2)
            .map(([x, xs]) => [x, xs.sort()] as [number, string[]])
            .sort(([x, xs], [y, ys]) => y - x)

    return values
}