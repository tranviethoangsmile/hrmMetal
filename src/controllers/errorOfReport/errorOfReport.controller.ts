import { find_error_of_report } from '../../useCases/codeError/codeError.useCase';

const find_err_of_report = async (data: any) => {
    return await find_error_of_report(data);
};

export { find_err_of_report };
