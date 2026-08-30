package com.academia.gym;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/aparelhos")
public class AparelhosController {

    private final JdbcTemplate jdbcTemplate;

    public AparelhosController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }


    @GetMapping
    public ResponseEntity<List<Aparelhos>> listarTodos() {
        String sql = "SELECT id, nome, grupo_muscular AS grupoMuscular, status FROM aparelho";
        List<Aparelhos> aparelhos = jdbcTemplate.query(sql,
                new BeanPropertyRowMapper<>(Aparelhos.class)
        );

        return ResponseEntity.status(200).body(aparelhos);
    }



    @PostMapping
    public ResponseEntity<Void> cadastrar(
            @RequestBody Aparelhos novoAparelhos) {
        if (
                novoAparelhos.getNome() == null || novoAparelhos.getNome().isBlank()) {
            return ResponseEntity.status(400).build();
        }

        String sql = "INSERT INTO aparelho (nome, grupo_muscular, status) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql,
                novoAparelhos.getNome(),
                novoAparelhos.getGrupoMuscular(),
                novoAparelhos.getStatus()
        );

        return ResponseEntity.status(201).build();
    }
}