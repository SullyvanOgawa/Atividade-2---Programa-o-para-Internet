import {Router} from 'express';
import ProfessorCtrl from '../Controller/professorCtrl.js';

const rotaProfessores = Router();
const professoresCtrl = new ProfessorCtrl();

rotaProfessores.get("/", professoresCtrl.consultar);
rotaProfessores.get("/:id", professoresCtrl.consultar);
rotaProfessores.post("/", professoresCtrl.gravar);
rotaProfessores.put("/:id", professoresCtrl.editar);
rotaProfessores.patch("/:id", professoresCtrl.editar);
rotaProfessores.delete("/:id", professoresCtrl.excluir);

export default rotaProfessores;