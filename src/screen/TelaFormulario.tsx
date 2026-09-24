import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { schemaFuncionario } from '../model/Funcionario';

const Campo = ({ titulo, valor, alterar, numerico = false }: any) => {
    return (
        <View style={{ marginBottom: 14 }}>
            <Text style={estilos.label}>{titulo}</Text>

            <TextInput
                value={valor}
                onChangeText={alterar}
                style={estilos.input}
                keyboardType={numerico ? 'numeric' : 'default'}
            />
        </View>
    );
};

type Props = {
    nome: string;
    alterarNome: (v: string) => void;
    cargo: string;
    alterarCargo: (v: string) => void;
    cargaHorariaSemanal: string;
    alterarCarga: (v: string) => void;
    salario: string;
    alterarSalario: (v: string) => void;
    dataAdmissao: string;
    alterarData: (v: string) => void;
    email: string;
    alterarEmail: (v: string) => void;
    telefone: string;
    alterarTelefone: (v: string) => void;
    inserir: () => void;
};

export default function TelaFormulario(props: Props) {
    const cadastrar = async () => {
        const novoFuncionario = {
            nome: props.nome,
            cargo: props.cargo,
            cargaHorariaSemanal: Number(props.cargaHorariaSemanal),
            salario: Number(props.salario),
            dataAdmissao: props.dataAdmissao,
            email: props.email,
            telefone: props.telefone,
        };

        try {
            await schemaFuncionario.validate(novoFuncionario);
            props.inserir();
        } catch (erro: any) {
            Alert.alert('Erro', erro.message);
        }
    };

    return (
        <SafeAreaView style={estilos.tela}>
            <View style={estilos.formulario}>
                <Campo titulo="Nome" valor={props.nome} alterar={props.alterarNome} />

                <Campo titulo="Cargo" valor={props.cargo} alterar={props.alterarCargo} />

                <Campo
                    titulo="Carga Horária"
                    valor={props.cargaHorariaSemanal}
                    alterar={props.alterarCarga}
                    numerico
                />

                <Campo
                    titulo="Salário"
                    valor={props.salario}
                    alterar={props.alterarSalario}
                    numerico
                />

                <Campo titulo="Data Admissão" valor={props.dataAdmissao} alterar={props.alterarData} />

                <Campo titulo="E-mail" valor={props.email} alterar={props.alterarEmail} />

                <Campo titulo="Telefone" valor={props.telefone} alterar={props.alterarTelefone} numerico />

                <TouchableOpacity style={estilos.botao} onPress={cadastrar}>
                    <Text style={estilos.textoBotao}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const estilos = StyleSheet.create({
    tela: { flex: 1, backgroundColor: '#f4f4f4' },
    formulario: { padding: 20 },
    label: { marginBottom: 6, fontWeight: '600', color: '#333' },
    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 12,
        height: 48,
    },
    botao: {
        backgroundColor: '#1565C0',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 10,
    },
    textoBotao: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
