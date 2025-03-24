import Validator from '../../../core/Validator';

export default class UserValidation {
    private static validator: Validator = new Validator();

    public static store(data: any): Validator {
        this.validator.make(data, [
            {
                name: 'name',
                label: 'Full Name',
                type: `required|matches:[a-zA-Zs'-]`,
            },
            { name: 'email', label: 'Email Address', type: `required|isEmail` },
            {
                name: 'password',
                label: 'Password',
                type: 'required|isLength:8,20',
            },
            {
                name: 'password_confirmation',
                label: 'Password Confirmation',
                type: 'required|same:password',
            },
        ]);
        return this.validator;
    }

    public static update(data: any): Validator {
        this.validator.make(data, [
            {
                name: 'name',
                label: 'Full Name',
                type: `nullable|matches:[a-zA-Zs'-]`,
            },
            { name: 'email', label: 'Email Address', type: `nullable|isEmail` },
            {
                name: 'password',
                label: 'Password',
                type: 'nullable|isLength:8,20',
            },
            {
                name: 'password_confirmation',
                label: 'Password Confirmation',
                type: 'nullable|same:password',
            },
        ]);
        return this.validator;
    }
}
