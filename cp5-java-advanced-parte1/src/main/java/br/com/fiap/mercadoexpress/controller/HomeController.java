package br.com.fiap.mercadoexpress.controller;

import br.com.fiap.mercadoexpress.security.LoginSucessoHandler;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    /** Landing page pública (templates/index.html). */
    @GetMapping("/")
    public String index() {
        return "index";
    }

    /** Tela de login personalizada. Quem já está logado vai direto para a sua área. */
    @GetMapping("/login")
    public String login(Authentication authentication) {
        if (estaLogado(authentication)) {
            return "redirect:" + LoginSucessoHandler.destinoPorPerfil(authentication);
        }
        return "login";
    }

    @GetMapping("/acesso-negado")
    public String acessoNegado(HttpServletResponse response) {
        response.setStatus(HttpServletResponse.SC_FORBIDDEN);
        return "acesso-negado";
    }

    static boolean estaLogado(Authentication authentication) {
        return authentication != null && authentication.isAuthenticated()
                && !(authentication instanceof AnonymousAuthenticationToken);
    }
}
