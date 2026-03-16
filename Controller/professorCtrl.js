 import Professor from "../Model/professor.js";

 export default class ProfessorCtrl{
    gravar(requisicao, resposta){
        if(requisicao.method === "POST" && requisicao.is("application/json")){
            const nome = requisicao.body.nome;
            const especialidade = requisicao.body.especialidade;

            if(nome && especialidade){
                const professor = new Professor(null, nome, especialidade);
                
                professor.gravar()
                .then(() => {
                    resposta.status(201).json({
                        "status": true,
                        "mensagem": "Professor gravado com sucesso!!!", 
                        "id": professor.id
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Nao foi possivel cadastrar o professor. Erro: " + erro.message
                    });
                });
            }
            else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Todas as informacoes devem ser preenchidas!!!"
                });
            }
        }
        else{
            resposta.status(405).json({
                "status": false,
                "mensagem": "Metodo nao permitido"
            });
        }
    }

    editar(requisicao, resposta){
        if(requisicao.method === "PUT" || requisicao.method === "PATCH" && requisicao.is("application/json")){
            const id = requisicao.params.id;
            
            const nome = requisicao.body.nome;
            const especialidade = requisicao.body.especialidade;

            if(id > 0 && nome && especialidade){
                const professor = new Professor(id, nome, especialidade);
                
                professor.editar()
                .then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Dados do professor atualizados com sucesso!!!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Não foi possível atualizar os dados do professor. Erro: " + erro.message
                    });
                });
            }
            else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Todos as informacoes devem ser preenchidas!!!"
                }); 
            }
        }
        else{
            resposta.status(405).json({
                "status": false,
                "mensagem": "Metodo não permitido.Consulte a documentação da API."
            });
        }
    }

    excluir(requisicao, resposta){
        if(requisicao.method === "DELETE"){
            const id = requisicao.params.id;

            if(id > 0){
                const professor = new Professor(id);

                professor.excluir()
                .then(() => {
                    resposta.status(200).json({
                        "status": true,
                        "mensagem": "Professor excluido com sucesso!!!"
                    });
                })
                .catch((erro) => {
                    resposta.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao excluir o professor. Erro: " + erro.message
                    });
                });
            }
            else{
                resposta.status(400).json({
                    "status": false,
                    "mensagem": "Informe o id do professor. Consulte a documentação da API."
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

            const professor = new Professor();
            professor.consultar(termo)
            .then(listaProfessores => {
                resposta.status(200).json({
                    "status": true,
                    "mensagem": "Consulta realizada com sucesso!!!",
                    "professores": listaProfessores
                });
            })
            .catch((erro) => {
                resposta.status(500).json({
                    "status": false,
                    "mensagem": "Erro ao consultar o professor. Erro: " + erro.message
                });
            });
        }
    }
 }
