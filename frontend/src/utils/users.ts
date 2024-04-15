export const findUserShortName = (fName: string, lName: string) => {
    return fName && lName
        ? fName[0].toUpperCase() + lName[0].toUpperCase()
        : fName
          ? fName[0].toUpperCase()
          : ''
}
