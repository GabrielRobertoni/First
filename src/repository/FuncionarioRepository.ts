import axios from 'axios';
import { FuncionarioType } from '../model/Funcionario';

const URI = 'http://firebase.fiap.com/2tdsr/cp5/api/funcionarios';

export const carregarFuncionarios = async (token: string | null): Promise<FuncionarioType[]> => {
    const resultado = await axios.get(URI, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return resultado.data;
};

export const inserirFuncionario = async (
    funcionario: FuncionarioType,
    token: string | null
): Promise<void> => {
    await axios.post(URI, funcionario, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const procurarFuncionarioPorEmail = async (
    email: string,
    token: string | null
): Promise<FuncionarioType[]> => {
    const resultado = await axios.get(`${URI}/procurarPorCampo/${email}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return resultado.data;
};
