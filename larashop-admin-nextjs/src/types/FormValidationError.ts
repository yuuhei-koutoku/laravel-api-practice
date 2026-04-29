class FormValidationError extends Error {

    public errors: { field: string, detail: string}[]
  
    constructor(message: string, errors: { field: string, detail: string}[]) {
      super(message);

      this.name = this.constructor.name;
      Error.captureStackTrace(this, this.constructor);
      this.errors = errors;
    }
  }

export default FormValidationError;

export const hasError = (error: FormValidationError, field: string): boolean => {
  return error.errors.some(error => error.field === field);
};
export const getErrors = (error: FormValidationError, field: string): string[] => {
  return error.errors.filter(error => error.field === field).map(error => error.detail)
};
  