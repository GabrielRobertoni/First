package br.com.fiap.mercadoexpress;

import io.zonky.test.db.postgres.embedded.EmbeddedPostgres;
import org.springframework.boot.SpringApplication;

import java.io.IOException;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

/**
 * Executa o Mercado Express na sua máquina SEM precisar instalar o PostgreSQL (nem Docker).
 *
 * Esta classe apenas fornece um servidor PostgreSQL 16 real (embutido) e cria nele o banco
 * "mercado_express". A conexão continua sendo configurada pelo application.yml, exatamente como
 * em produção: aqui só informamos a porta do servidor pela variável DB_PORT.
 *
 * Os dados ficam em arquivos temporários: ao parar, tudo é descartado e a próxima execução
 * começa do zero (12 produtos + admin e cliente de demonstração).
 *
 * Como usar:
 *   - IntelliJ: botão verde ao lado do main() desta classe.
 *   - Terminal: mvnw.cmd spring-boot:test-run (Windows) ou ./mvnw spring-boot:test-run (Linux/Mac).
 *
 * Fica na pasta de testes, portanto NÃO entra no JAR do deploy.
 */
public class MercadoExpressLocal {

    private static final String BANCO = "mercado_express";

    public static void main(String[] args) throws IOException, SQLException {
        // Sem o reinício automático do DevTools: ele executaria este main duas vezes e subiria dois bancos.
        System.setProperty("spring.devtools.restart.enabled", "false");

        EmbeddedPostgres postgres = EmbeddedPostgres.builder().start();
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            try {
                postgres.close();
            } catch (IOException ignored) {
                // encerrando
            }
        }));

        try (Connection conexao = postgres.getPostgresDatabase().getConnection();
             Statement sql = conexao.createStatement()) {
            sql.execute("CREATE DATABASE " + BANCO);
        }

        // Lidos pelo application.yml: jdbc:postgresql://${DB_HOST:localhost}:${DB_PORT:5432}/${DB_NAME:mercado_express}
        System.setProperty("DB_PORT", String.valueOf(postgres.getPort()));
        System.setProperty("DB_NAME", BANCO);

        // Sem acentos de propósito: alguns consoles do Windows não exibem UTF-8 corretamente.
        System.out.println();
        System.out.println(">>> PostgreSQL embutido rodando na porta " + postgres.getPort() + " (banco " + BANCO + ")");
        System.out.println(">>> Acesse: http://localhost:8080");
        System.out.println(">>> Admin:   admin@mercadoexpress.com / Admin@123");
        System.out.println(">>> Cliente: cliente@mercadoexpress.com / Cliente@123");
        System.out.println();

        SpringApplication.run(MercadoExpressApplication.class, args);
    }
}
