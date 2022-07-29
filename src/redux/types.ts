export type rootState = {
    board: {
        enteredLetters: string[],
        nextLetterIndex: number,
        currentRowIndex: number,
        correctWord: string,
        key: string
    }    
}