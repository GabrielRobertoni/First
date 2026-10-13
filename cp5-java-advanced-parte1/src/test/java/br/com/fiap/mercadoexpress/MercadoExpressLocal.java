package br.com.fiap.mercadoexpress;

import io.zonky.test.db.postgres.embedded.EmbeddedPostgres;
import org.springframework.boot.SpringApplication;

import java.io.IOException;

/**
 * Executa o Mercado Express SEM precisar instalar o PostgreSQL (nem Docker).
 *
 * Sobe um PostgreSQL 16 real embutido, aplica as migrations do Flyway e inicia a aplicação em
 * http://localhost:8080. Os dados ficam só em memória/arquivos temporários: ao parar, tudo é descartado
 * e a próxima execução começa do zero (12 produtos + admin e cliente de demonstração).
 *
 * Como usar:
 *   - Terminal: ./mvnw spring-boot:test-run      (Windows: mvnw.cmd spring-boot:test-run)
 *   - IntelliJ: botão verde ao lado do main() desta classe.
 *
 * Para produção/deploy NÃO se usa esta classe (ela fica na pasta de testes e não entra no JAR).
 */
public class MercadoExpressLocal {

    public static void main(String[] args) throws IOException {
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

        System.setProperty("spring.datasource.url", postgres.getJdbcUrl("postgres", "postgres"));
        System.setProperty("spring.datasource.username", "postgres");
        System.setProperty("spring.datasource.password", "");

        System.out.println();
        // Sem acentos de propósito: alguns consoles do Windows não exibem UTF-8 corretamente.
        System.out.println(">>> PostgreSQL embutido rodando na porta " + postgres.getPort());
        System.out.println(">>> Acesse: http://localhost:8080");
        System.out.println(">>> Admin:   admin@mercadoexpress.com / Admin@123");
        System.out.println(">>> Cliente: cliente@mercadoexpress.com / Cliente@123");
        System.out.println();

        SpringApplication.run(MercadoExpressApplication.class, args);
    }
}
