import Curso from './Model/curso.js';

const curso1 = new Curso(2, 'Python', 'Desenvolvimento backend com Python', 40);
const curso2 = new Curso(1, 'Java', 'Desenvimento backend com Java', 40);
const curso3 = new Curso(3, 'Java Script', 'Desenvolvimento FrontEnd com Java Script', 80);
const curso4 = new Curso(4, "Node.js", 'Desenvolvimento uma persistência de dados no Banco mySQL', 40);

// curso4.gravar().then(() => {
//     console.log('Curso gravado com sucesso');
// })
// .catch(err => console.log(err));

// curso3.editar()
// .then(() => {
//     console.log("Curso editado com sucesso");
// })
// .catch(err => console.log(err));


// curso.excluir()
// .then(() => {
//     console.log("Curso excluido com sucesso");
// })
// .catch(err => console.log(err));

curso1.consultar('Java Script')
.then((listaCursos) => {
    for(const curso of listaCursos){
        console.log(curso.toString());
    }
        
})
.catch((erro) => console.log(erro.menssage));