import {pool} from './database.js';
import {controlAdd} from './controlErrores.js';
import {controlDelete} from "./controlErrores.js";
import {controlGetOne} from "./controlErrores.js";
import {controlUpdate} from "./controlErrores.js";

class LibroController {
    async getAll (req, res){
      const [result] = await pool.query('SELECT * FROM libros');
      res.json(result);
    }

    async add (req, res){
      try {
        const libro = req.body;

        controlAdd(libro);
        const [result] = await pool.query(`INSERT INTO Libros(nombre, autor, categoria, anio_publicacion, ISBN)
            VALUES (?, ?, ?, ? ,?)`, [libro.nombre, libro.autor, libro.categoria, libro.anio_publicacion, libro.ISBN]);
            res.status(201).json ({"ID insertado": result.insertId});
      } catch (e) {
        res.status(404).json({"Error":e});
      }
    }

    async getOne (req, res){
      try {
        const libro = {"id": parseInt(req.params.id)};
        controlGetOne(libro);
        const id_libro = parseInt(libro.id);
        const [result] = await pool.query(`SELECT * FROM Libros WHERE id=?`, [id_libro]);
        if (result.length > 0){
          res.json (result);
        }
        else {
          throw (`No existe un libro con el id: ${id_libro}.`);
        }
      } catch(e) {
        if(e.errno===1054) {
          res.json({"Error": "Ha ingresado un valor distinto a un número de ID."});
        }
        //res.status(404).json({"Error": e});
      }
    }

    async update (req, res) {
      try {
        //console.log(req.body);
        const libro = req.body;
        controlUpdate(libro);
        const id_libro = parseInt(libro.id);
        const [result] = await pool.query(`UPDATE Libros SET nombre=(?), autor=(?), categoria=(?), anio_publicacion=(?), ISBN=(?) WHERE id=(?)`,
        [libro.nombre, libro.autor, libro.categoria, libro.anio_publicacion, libro.ISBN, id_libro]);
        if(result.affectedRows>0){
					res.json("¡Libro actualizado!");
				}else{
					throw "No se pudo actualizar el libro. Controle que el id sea válido";
				}
      } catch(e) {
        res.status(404).json({"Error": e});
      }
    }

    async delete(req, res) {
      try {
        const libro = req.body;
        controlDelete(libro);
        const isbn = libro.ISBN;
        const [result] = await pool.query(`DELETE FROM Libros where ISBN=(?)`, isbn);

        if (result.affectedRows>0) {
          res.json(`El libro ha sido eliminado.`);
        } else {
          res.json(`No se pudo eliminar el libro. Controle el ISBN ingresado.`);
        }

      } catch(e) {
        //console.log(e);
        res.status(404).json({"Error": e});
      }
    }
}

export const libro = new LibroController();