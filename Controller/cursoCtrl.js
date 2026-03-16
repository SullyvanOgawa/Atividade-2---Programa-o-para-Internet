
import Curso from "../Model/curso.js";
import Professor from "../Model/professor.js";

export default class CursoCtrl{

    gravar(requisicao, resposta){
        if(requisicao.method === "POST" && requisicao.is("application/json")){
            const nome = requisicao.body.nome;
            const descricao = requisicao.body.descricao;
            const cargaHoraria = requisicao.body.cargaHoraria;
            const professor = requisicao.body.professor;
            
            if(nome && descricao && cargaHoraria &&professor){
                const professorObj = new Professor(professor.id);
                const curso = new Curso(null, nome, descricao, cargaHoraria, professorObj);

                curso.gravar().then(() => {
                    resposta.status(201).json({
                        "status": true,
                        "mensagem": "Curso cadastrado com sucesso!!!", 
                        "id": curso.id
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Não foi possível cadastrar o curso. Erro: " + erro.message
                    });
                });

            }
            else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Todas os campos devem ser preenchidos!!!"
                });
            }
        }
        else{
            resposta.status(405).json({
                "status": false,
                "mensagem": "Método não permitido. Consulte a documentação da API."
            });
        }
    }

    editar(requisicao, resposta){
        if((requisicao.method === "PUT" || requisicao.method === "PATCH") && requisicao.is("application/json")){
            const id = requisicao.params.id;

            const nome = requisicao.body.nome;
            const descricao = requisicao.body.descricao;
            const cargaHoraria = requisicao.body.cargaHoraria;
            const professor = requisicao.body.professor;
            
            if(id > 0 && nome && descricao && cargaHoraria && professor){
                
                const professorObj = new Professor(professor.id);
                const curso = new Curso(id, nome, descricao, cargaHoraria, professorObj);

                curso.editar()
                .then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Curso atualizado com sucesso!!!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao atualizar o curso. Erro: " + erro.message
                    });
                });

            }
            else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Todos os dados do curso são obrigatórios. Consulte a documentação da API."
                });
            }
        }
        else{
            resposta.status(405).json({
                "status": false,
                "mensagem": "Metodo não permitido. Consulte a documentação da API."
            });

        }
    }

    excluir(requisicao, resposta){
        if(requisicao.method === "DELETE"){
            const id = requisicao.params.id;

            if(id > 0){
                const curso = new Curso(id);

                curso.excluir()
                .then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Curso excluido com sucesso!!!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir o curso. Erro: " + erro.message
                    });
                });
            }
            else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe o id do curso. Consulte a documentação da API."
                });
            }

        }
        else{
            resposta.status(405).json({
                "status": false,
                "mensagem": "Metodo não permitido. Consulte a documentação da API."
            });
        }
    }

    consultar(requisicao, resposta){
        if(requisicao.method === "GET"){
            let termo;

            const id = requisicao.params.id;
            if(!isNaN(id)){
                termo = id;
            }
            else{
                termo = '';
            }

            const curso = new Curso();
            curso.consultar(termo)
            .then(listaCursos => {
                resposta.status(200).json({
                    "status": true,
                    "mensagem": "Segue Abaixo todos os cursos disponíveis",
                    "cursos": listaCursos
                });
            })
            .catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao consultar o curso. Erro: " + erro.message
                });
            });
        }
    }
}