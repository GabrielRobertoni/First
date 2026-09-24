import * as yup from 'yup';

export type FuncionarioType = {
    id?: number;
    nome: string;
    cargo: string;
    cargaHorariaSemanal: number;
    salario: number;
    dataAdmissao: string;
    email: string;
    telefone: string;
};

export const schemaFuncionario = yup.object({
    nome: yup.string().required(),
    cargo: yup.string().required(),
    cargaHorariaSemanal: yup.number().required(),
    salario: yup.number().required(),
    dataAdmissao: yup.string().required(),
    email: yup.string().email('E-mail inválido').required(),
    telefone: yup.string().required(),
});
