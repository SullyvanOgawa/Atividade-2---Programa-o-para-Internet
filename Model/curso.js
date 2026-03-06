import CursoDB from '../DB/cursoDB.js';

export default class Curso{
    #id
    #nome
    #descricao
    #cargaHoraria
    #professor

    get id(){
        return this.#id
    }

    set id(novoId){
        this.#id = novoId
    }

    get nome(){
        return this.#nome
    }

    get descricao(){
        return this.#descricao
    }

    get cargaHoraria(){
        return this.#cargaHoraria
    }

    get professor(){
        return this.#professor
    }

    constructor(id, nome, descricao, cargaHoraria, professor){
        this.#id = id;
        this.#nome = nome;
        this.#descricao = descricao;
        this.#cargaHoraria = cargaHoraria;
        this.#professor = professor;
    }

    toString(){
        return `Nome: ${this.#nome} - Descrição: ${this.#descricao} - Carga Horária: ${this.#cargaHoraria} - Professor: ${this.#professor}`;
    }

    async gravar(){
        const cursoDB = new CursoDB();
        await cursoDB.gravar(this);
    }

    async editar(){
        const cursoDB = new CursoDB();
        await cursoDB.editar(this);
    }

    async excluir(){
        const cursoDB = new CursoDB();
        await cursoDB.excluir(this);
    }

    async consultar(termo){
        const cursoDB = new CursoDB();
        return await cursoDB.consultar(termo);
    }
}