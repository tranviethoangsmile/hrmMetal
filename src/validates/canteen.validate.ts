import Joi from '@hapi/joi';
import { createCanteen, updateCanteen } from '../interfaces/canteen.interface';
const schema_create_canteen = Joi.object({
    factory_name: Joi.string().min(4).max(255).required(),
    description: Joi.string().min(4).max(255).required(),
});

const validate_create_canteen = (data: createCanteen) => {
    return schema_create_canteen.validate(data);
};

const schema_update_canteen = Joi.object({
    factory_name: Joi.string().min(10).max(255),
    description: Joi.string().min(10).max(255),
});

const validate_update_canteen = (data: createCanteen) => {
    return schema_update_canteen.validate(data);
};

export { validate_create_canteen, validate_update_canteen };
