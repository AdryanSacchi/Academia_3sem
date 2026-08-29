package com.academia.gym;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Aparelhos {

    private Integer id;
    private String nome;
    @JsonProperty("grupoMuscular")
    private String grupoMuscular;
    private String status;

    public Aparelhos() {}

    public Aparelhos(Integer id, String nome, String grupoMuscular, String status) {
        this.id = id;
        this.nome = nome;
        this.grupoMuscular = grupoMuscular;
        this.status = status;
    }


    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getGrupoMuscular() { return grupoMuscular; }
    public void setGrupoMuscular(String grupoMuscular) { this.grupoMuscular = grupoMuscular; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}