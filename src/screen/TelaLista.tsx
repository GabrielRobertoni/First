import { useEffect, useMemo } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet } from 'react-native';
import { FuncionarioType } from '../model/Funcionario';
import CardRegistro from '../components/CardRegistro';

type Props = {
    lista: FuncionarioType[];
    carregar: () => void;
    navigation: any;
};

export default function TelaLista({ lista, carregar, navigation }: Props) {
    useEffect(() => {
        carregar();
    }, []);

    const dados = useMemo(() => lista, [lista]);

    return (
        <SafeAreaView style={estilos.tela}>
            <FlatList
                data={dados}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <CardRegistro item={item} navigation={navigation} />
                )}
                ListEmptyComponent={
                    <Text style={estilos.vazio}>Nenhum registro encontrado</Text>
                }
            />
        </SafeAreaView>
    );
}

const estilos = StyleSheet.create({
    tela: { flex: 1, backgroundColor: '#f4f4f4' },
    vazio: { textAlign: 'center', marginTop: 40 },
});
