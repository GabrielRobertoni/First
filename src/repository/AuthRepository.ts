import axios from 'axios';

const URI = 'http://firebase.fiap.com/2tdsr/cp5/api';

export const autenticar = async (email: string, senha: string): Promise<string> => {
    const resultado = await axios.post(`${URI}/login`, { email, senha });
    return resultado.data.token;
};
