export const LocaleNumber = ({ t, value }: any) => {
    const stringedNumber = String(value)
    if (stringedNumber) {
        const stringArray = stringedNumber.split("")
        const newNumber = stringArray.map((item) => {
            return t(item)
        }).join('')
        return newNumber
    }
    return value
}