import { useState } from 'react';
import { Alert } from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FuncionarioType } from '../model/Funcionario';
import {
    carregarFuncionarios,
    inserirFuncionario,
    procurarFuncionarioPorEmail,
} from '../repository/FuncionarioRepository';
import { useAuth } from '../context/AuthContext';

export const useDadosFuncionario = () => {
    const [nome, alterarNome] = useState('');
    const [cargo, alterarCargo] = useState('');
    const [cargaHorariaSemanal, alterarCarga] = useState('');
    const [salario, alterarSalario] = useState('');
    const [dataAdmissao, alterarData] = useState('');
    const [email, alterarEmail] = useState('');
    const [telefone, alterarTelefone] = useState('');

    const { token } = useAuth();
    const queryClient = useQueryClient();

    const limparFormulario = () => {
        alterarNome('');
        alterarCargo('');
        alterarCarga('');
        alterarSalario('');
        alterarData('');
        alterarEmail('');
        alterarTelefone('');
    };

    const { data: registros = [], refetch: carregar } = useQuery<FuncionarioType[]>({
        queryKey: ['funcionarios'],
        queryFn: () => carregarFuncionarios(token),
        enabled: !!token,
    });

    const { data: funcionarioPorEmail = [], refetch: carregarCampo } = useQuery<FuncionarioType[]>({
        queryKey: ['funcionarios', email],
        queryFn: () => procurarFuncionarioPorEmail(email, token),
        enabled: false,
    });

    const { mutate } = useMutation({
        mutationFn: (novoFuncionario: FuncionarioType) => inserirFuncionario(novoFuncionario, token),
        onSuccess: () => {
            Alert.alert('Cadastro realizado');
            limparFormulario();
            queryClient.invalidateQueries({ queryKey: ['funcionarios'] });
        },
        onError: (erro: any) => {
            Alert.alert('Erro', erro.message);
        },
    });

    const inserir = () => {
        const novoFuncionario: FuncionarioType = {
            nome,
            cargo,
            cargaHorariaSemanal: Number(cargaHorariaSemanal),
            salario: Number(salario),
            dataAdmissao,
            email,
            telefone,
        };

        mutate(novoFuncionario);
    };

    return {
        nome, alterarNome,
        cargo, alterarCargo,
        cargaHorariaSemanal, alterarCarga,
        salario, alterarSalario,
        dataAdmissao, alterarData,
        email, alterarEmail,
        telefone, alterarTelefone,
        registros,
        carregar,
        funcionarioPorEmail,
        carregarCampo,
        inserir,
    };
};
