import { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { loginSchema } from '../model/Login';
import { autenticar } from '../repository/AuthRepository';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagemErro, setMensagemErro] = useState('');

    const { setToken } = useAuth();

    const entrar = async () => {
        try {
            await loginSchema.validate({ email, senha });
        } catch (erroValidacao: any) {
            setMensagemErro(erroValidacao.message);
            return;
        }

        try {
            const token = await autenticar(email, senha);
            setToken(token);
            setMensagemErro('');
        } catch (erro) {
            setMensagemErro('Não foi possível efetuar o login. Verifique seu e-mail e senha.');
        }
    };

    return (
        <SafeAreaView style={estilos.tela}>
            <View style={estilos.formulario}>
                <Text style={estilos.label}>E-mail</Text>
                <TextInput
                    style={estilos.input}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />

                <Text style={estilos.label}>Senha</Text>
                <TextInput
                    style={estilos.input}
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry
                />

                {mensagemErro ? <Text style={estilos.erro}>{mensagemErro}</Text> : null}

                <TouchableOpacity style={estilos.botao} onPress={entrar}>
                    <Text style={estilos.textoBotao}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const estilos = StyleSheet.create({
    tela: { flex: 1, backgroundColor: '#f4f4f4' },
    formulario: { padding: 20 },
    label: { marginBottom: 6, marginTop: 14, fontWeight: '600', color: '#333' },
    input: {
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 12,
        height: 48,
    },
    erro: { color: 'red', marginTop: 12 },
    botao: {
        backgroundColor: '#1565C0',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
    },
    textoBotao: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
