import * as yup from 'yup';

export type Login = {
    email: string;
    senha: string;
};

export const loginSchema = yup.object({
    email: yup
        .string()
        .email('E-mail inválido')
        .required('E-mail é obrigatório'),
    senha: yup
        .string()
        .required('Senha é obrigatória'),
});
