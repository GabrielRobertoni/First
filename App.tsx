import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDadosFuncionario } from './src/control/useDadosFuncionario';
import TelaFormulario from './src/screen/TelaFormulario';
import TelaLista from './src/screen/TelaLista';
import TelaAnimacao from './src/screen/TelaAnimacao';
import Login from './src/screen/Login';
import { AuthProvider, useAuth } from './src/context/AuthContext';

const Tabs = createBottomTabNavigator();
const queryClient = new QueryClient();

function AppContent() {
    const { token } = useAuth();
    const hook = useDadosFuncionario();

    return (
        <NavigationContainer>
            <View style={estilos.topo}>
                <Text style={estilos.titulo}>Controle de Funcionários</Text>
            </View>

            <Tabs.Navigator screenOptions={{ headerShown: false }}>

                {!token ? (
                    <Tabs.Screen name="Login" component={Login} />
                ) : (
                    <>
                        <Tabs.Screen name="Cadastro">
                            {() => <TelaFormulario {...hook} />}
                        </Tabs.Screen>

                        <Tabs.Screen name="Funcionários">
                            {(props: any) => (
                                <TelaLista
                                    {...props}
                                    lista={hook.registros}
                                    carregar={hook.carregar}
                                />
                            )}
                        </Tabs.Screen>

                        <Tabs.Screen name="Animação" component={TelaAnimacao} />
                    </>
                )}

            </Tabs.Navigator>
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </QueryClientProvider>
    );
}

const estilos = StyleSheet.create({
    topo: {
        paddingTop: 50,
        paddingBottom: 20,
        backgroundColor: '#1565C0',
        alignItems: 'center',
    },
    titulo: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '700',
    },
});
