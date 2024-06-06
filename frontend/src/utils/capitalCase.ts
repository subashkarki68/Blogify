const capitalCase = (input: string): string => {
    const words = input.split(' ')
    const capitalizedWords: string[] = []

    words.forEach((word) => {
        if (word.length > 0) {
            capitalizedWords.push(
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
            )
        }
    })

    return capitalizedWords.join(' ')
}

export default capitalCase
