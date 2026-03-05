import Curso from './Model/curso.js';

const curso = new Curso(1, 'Java', 'Desenvimento backend com Java', 40);
const curso2 = new Curso(2, 'Python', 'Desenvolvimento backend com Python', 40);
const cursoNovo = new Curso(4, 'Java Script', 'Desenvolvimento backend com Java Script', 80);

curso.gravar().then(() => {
    console.log('Curso gravado com sucesso');
})
.catch(err => console.log(err));

// cursoNovo.editar()
// .then(() => {
//     console.log("Curso editado com sucesso");
// })
// .catch(err => console.log(err));