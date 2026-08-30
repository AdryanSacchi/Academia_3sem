package com.academia.gym;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    private final JdbcTemplate jdbcTemplate;

    public UsuarioController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> listarTodos() {
        String sql = "SELECT id, nome, email, senha FROM usuario";
        List<Usuario> usuarios = jdbcTemplate.query(sql,
                new BeanPropertyRowMapper<>(Usuario.class)
        );

        return ResponseEntity.status(200).body(usuarios);
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<Void> cadastrar(
            @RequestBody Usuario novoUsuario) {
        if (
                novoUsuario.getEmail() == null || novoUsuario.getEmail().isBlank() ||
                novoUsuario.getSenha() == null || novoUsuario.getSenha().isBlank()) {
            return ResponseEntity.status(400).build();
        }

        String sql = "INSERT INTO usuario (email, senha, nome) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql,
                novoUsuario.getEmail(),
                novoUsuario.getSenha(),
                novoUsuario.getNome()
        );

        return ResponseEntity.status(201).build();
    }

    @PostMapping("/login")
    public ResponseEntity<Usuario> login(
            @RequestBody Usuario loginDados) {
        if (
                loginDados.getEmail() == null || loginDados.getSenha() == null) {
            return ResponseEntity.status(400).build();
        }

        String sql = "SELECT id, email, senha, nome FROM usuario WHERE email = ? AND senha = ?";
        List<Usuario> usuarios = jdbcTemplate.query(sql,
                new BeanPropertyRowMapper<>(Usuario.class),
                loginDados.getEmail(),
                loginDados.getSenha()
        );

        if (usuarios.isEmpty()) {
            return ResponseEntity.status(401).build();
        }

        return ResponseEntity.status(200).body(usuarios.get(0));
    }
}