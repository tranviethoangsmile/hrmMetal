const isValidEnumValue = <T extends Record<string, string>>(
    value: string,
    enumObject: T
): boolean =>{
    return Object.values(enumObject).includes(value as T[keyof T])
}

export {isValidEnumValue}