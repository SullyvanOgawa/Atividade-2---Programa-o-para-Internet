import ProfessorDB from '../DB/professorDB.js';
export default class Professor{
    #id
    #nome
    #especialidade

    constructor(id, nome, especialidade){
        this.#id = id;
        this.#nome = nome;
        this.#especialidade = especialidade;
    }

    get id(){
        return this.#id
    }

    set id(novoId){
        this.#id = novoId;
    }

    get nome(){
        return this.#nome
    }

    get especialidade(){
        return this.#especialidade
    }

    toString(){
        return `${this.#nome} - Especialidade: ${this.#especialidade}`
    }

   async gravar(){
       const professorDB = new ProfessorDB();
       await professorDB.gravar(this);
    }

    async editar(){
        const professorDB = new ProfessorDB();
        await professorDB.editar(this);
    }

    async excluir(){
        const professorDB = new ProfessorDB();
        await professorDB.excluir(this);
    }

    async consultar(termo){
        const professorDB = new ProfessorDB();
        return await professorDB.consultar(termo);
    }
}