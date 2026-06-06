const enumToArray = (enumObj: object): string[] =>
    Object.values(enumObj).filter((v) => typeof v === 'string') as string[];


export default enumToArray;