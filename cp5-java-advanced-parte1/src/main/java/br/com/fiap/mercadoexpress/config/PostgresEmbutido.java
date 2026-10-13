package br.com.fiap.mercadoexpress.config;

import io.zonky.test.db.postgres.embedded.EmbeddedPostgres;

import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.UUID;

/**
 * Sobe um PostgreSQL 16 real embutido (biblioteca zonky) para rodar o projeto na máquina
 * sem instalar banco. Usada somente por {@link BancoDeDadosLocal}; não existe no JAR de deploy.
 */
final class PostgresEmbutido {

    /** Mantém a referência enquanto a aplicação estiver rodando. */
    private static EmbeddedPostgres servidor;

    private PostgresEmbutido() {
    }

    static int iniciar(String nomeBanco) {
        try {
            // Os dados ficam dentro da pasta de trabalho da biblioteca. Assim, se uma execução anterior foi
            // encerrada à força (sem desligar o banco), a biblioteca encontra esse PostgreSQL órfão nas
            // próximas execuções, desliga-o e apaga os arquivos (feito para locks com mais de 10 minutos).
            File pastaDeTrabalho = new File(System.getProperty("ot.epg.working-dir",
                    new File(System.getProperty("java.io.tmpdir"), "embedded-pg").getPath()));
            File pastaDosDados = new File(pastaDeTrabalho, "epg-mercado-express-" + UUID.randomUUID());

            EmbeddedPostgres postgres = EmbeddedPostgres.builder()
                    .setDataDirectory(pastaDosDados)
                    .setCleanDataDirectory(true)
                    .start();
            Runtime.getRuntime().addShutdownHook(new Thread(() -> {
                try {
                    postgres.close();
                } catch (IOException ignored) {
                    // a aplicação está encerrando
                }
            }, "encerrar-postgres-embutido"));

            criarBancoSeNaoExistir(postgres, nomeBanco);
            servidor = postgres;
            return postgres.getPort();
        } catch (IOException | SQLException e) {
            throw new IllegalStateException(
                    "Nao foi possivel iniciar o PostgreSQL embutido. Alternativas: rodar 'docker compose up --build' "
                    + "ou configurar um PostgreSQL proprio pelas variaveis DB_HOST, DB_PORT, DB_USER e DB_PASSWORD.", e);
        }
    }

    private static void criarBancoSeNaoExistir(EmbeddedPostgres postgres, String nomeBanco) throws SQLException {
        try (Connection conexao = postgres.getPostgresDatabase().getConnection();
             Statement sql = conexao.createStatement()) {
            try (ResultSet existe = sql.executeQuery(
                    "SELECT 1 FROM pg_database WHERE datname = '" + nomeBanco + "'")) {
                if (existe.next()) {
                    return;
                }
            }
            sql.execute("CREATE DATABASE " + nomeBanco);
        }
    }
}
