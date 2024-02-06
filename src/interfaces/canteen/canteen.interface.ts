interface createCanteen {
    factory_name: string;
    description: string;

}

interface updateCanteen {
    factory_name?: string;
    description?: string;

}

export { createCanteen, updateCanteen };