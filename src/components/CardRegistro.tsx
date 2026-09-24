import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FuncionarioType } from '../model/Funcionario';

type Props = {
    item: FuncionarioType;
    navigation: any;
};

export default function CardRegistro({ item, navigation }: Props) {
    return (
        <TouchableOpacity
            style={estilos.card}
            onPress={() => navigation.navigate('Cadastro')}
        >
            <Text style={estilos.nome}>{item.nome}</Text>
            <Text style={estilos.info}>{item.cargo}</Text>
        </TouchableOpacity>
    );
}

const estilos = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        marginHorizontal: 16,
        marginTop: 14,
        borderRadius: 12,
        padding: 16,
        elevation: 2,
    },
    nome: { fontSize: 18, fontWeight: 'bold', color: '#1565C0' },
    info: { marginTop: 5, fontSize: 15, color: '#555' },
});
