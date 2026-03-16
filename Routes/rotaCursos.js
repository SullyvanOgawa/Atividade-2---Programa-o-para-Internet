import {Router} from 'express';
import CursoCtrl from '../Controller/cursoCtrl.js';

const rotaCursos = Router();
const cursosCtrl = new CursoCtrl();

rotaCursos.get("/", cursosCtrl.consultar);
rotaCursos.get("/:id", cursosCtrl.consultar);
rotaCursos.post("/", cursosCtrl.gravar);
rotaCursos.put("/:id", cursosCtrl.editar);
rotaCursos.patch("/:id", cursosCtrl.editar);
rotaCursos.delete("/:id", cursosCtrl.excluir);

export default rotaCursos;