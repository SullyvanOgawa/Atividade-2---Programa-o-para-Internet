import Curso from './Model/curso.js';
import Professor from './Model/professor.js';

const professor1 = new Professor(1, 'Sullyvan', 'Especialidade em Python');
const professor2 = new Professor(2, 'Almeida', 'Especialidade em Java');
const professor3 = new Professor(3, 'José', 'Especialidade em Java Script para FrontEnd');
const professor4 = new Professor(4, 'João', 'Especialidade em Persistência de dados com Node e mySQL');

const curso1 = new Curso(1, 'Python', 'Desenvolvimento backend', 40, professor1);
const curso2 = new Curso(2, 'Java', 'Desenvolvimento backend', 40, professor2);
const curso3 = new Curso(3, 'Java Script','Desenvolvimento para aplicações FrontEnd', 80, professor3);
const curso4 = new Curso(4, "Node.js", 'Desenvolvimento backend', 40, professor4);



// curso4.gravar().then(() => {
//     console.log('Curso gravado com sucesso!!!');
// })
// .catch(err => console.log(err));

// professor1.editar()
// .then(() => {
//     console.log("Curso editado com sucesso!!!");
// })
// .catch(err => console.log(err));


// curso.excluir()
// .then(() => {
//     console.log("Curso excluido com sucesso!!!");
// })
// .catch(err => console.log(err));

// curso4.consultar('Java')
// .then((listaCursos) => {
//     for(const curso of listaCursos){
//         console.log(curso.toString());
//     }
        
// })
// .catch((erro) => console.log(erro.menssage));