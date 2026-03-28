// import Curso from './Model/curso.js';
// import Professor from './Model/professor.js';

// const professor1 = new Professor(1, 'Cássia Perego', 'Python');
// const professor2 = new Professor(2, 'Renato Gonçalves', 'Java Spring Boot');
// const professor3 = new Professor(3, 'Cristiane Rizzo', 'Java Script DOM e jQuery');
// const professor4 = new Professor(4, 'Sullyvan Ogawa', 'Desenvolvimento em Node e mySQL');
// const professor5 = new Professor(5, 'Mário Pazzoti', ' Álgebra e Probabilidade');

// const curso1 = new Curso(1, 'Python', 'Desenvolvimento backend', 40, professor1);
// const curso2 = new Curso(2, 'Java', 'Desenvolvimento backend', 40, professor2);
// const curso3 = new Curso(3, 'Java Script','Desenvolvimento para aplicações FrontEnd', 80, professor3);
// const curso4 = new Curso(4, "Node.js", 'Desenvolvimento backend', 40, professor4);
// const curso5 = new Curso(5, 'Data Science', 'Programação para Análise', 80, professor5);



// curso5.gravar().then(() => {
//     console.log('Curso gravado com sucesso!!!');
// })
// .catch(err => console.log(err));


// curso5.editar()
// .then(() => {
//     console.log("Curso editado com sucesso!!!");
// })
// .catch(err => console.log(err));

// curso5.excluir()
// .then(() => {
//     console.log("Curso excluido com sucesso!!!");
// })
// .catch(err => console.log(err));

// curso5.consultar(5)
// .then((listaCursos) => {
//     for(const curso of listaCursos){
//         console.log(curso.toString());
//     }
        
// })
// .catch((erro) => console.log(erro.menssage));

import express from "express";
import rotaCursos from "./Routes/rotaCursos.js";
import rotaProfessores from "./Routes/rotaProfessor.js";
import cors from 'cors';

const localhost = '0.0.0.0';
const port = 5000;
const app = express();

app.use(cors({
    origin: 'http://localhost:4000'
}));

app.use(express.json());
app.use("/professores", rotaProfessores);
app.use("/cursos", rotaCursos);


app.listen(port, localhost, () => console.log(`API Executando na porta ${port}`));
