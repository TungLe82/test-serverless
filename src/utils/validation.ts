import { ValidatorOptions, validate } from "class-validator";

export const validateModel = async (model: any, options?: ValidatorOptions) => {
  let result = await _validateModel(model, options);
  if (!result.isValid) {
    const keys = Object.keys(result.errors);
    const string = keys
      .map((key) => {
        const error = result.errors[key];
        const errorKey = Object.keys(error);
        return errorKey.map((errorKeys) => error[errorKeys]).join(", \n");
      })
      .join(", \n");
    throw Error(string);
  }
};

export const validateArrayModel = async (
  models: Array<any>,
  options?: ValidatorOptions
) => {
  let validateArray = Array();
  models.forEach((model) => {
    validateArray.push(_validateModel(model, options));
  });
  validateArray = await Promise.all(validateArray);
  validateArray = validateArray.filter((result) => !result.isValid);
  if (validateArray.length > 0) {
    let string = validateArray
      .map((result) => {
        const keys = Object.keys(result.errors);
        return keys
          .map((key) => {
            const error = result.errors[key];
            const errorKey = Object.keys(error);
            return errorKey.map((errorKeys) => error[errorKeys]).join(", \n");
          })
          .join(", \n");
      })
      .join(", \n");

    throw Error(string);
  }
};

const _validateModel = async (
  model: any,
  options?: ValidatorOptions
): Promise<any> => {
  const errors = await validate(model, { ...options });
  return errors.reduce(
    (acc, err): any => {
      acc["isValid"] = false;
      const { constraints, property } = err;
      acc["errors"][property] = constraints;
      return acc;
    },
    { isValid: true, errors: {} }
  );
};
