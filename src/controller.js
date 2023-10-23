import {pool} from './database.js';
import {controlarEspaciosEnBlanco} from './controlar.js';

class LibroController {
    async getAll (req, res){
      const [result] = await pool.query('SELECT * FROM libros');
      res.json(result);
    }

    async add (req, res){
      try {
        const libro = req.body;

        controlarEspaciosEnBlanco(libro);
        const [result] = await pool.query(`INSERT INTO Libros(nombre, autor, categoria, anio_publicacion, ISBN)
            VALUES (?, ?, ?, ? ,?)`, [libro.nombre, libro.autor, libro.categoria, libro.anio_publicacion, libro.ISBN]);
            res.status(201).json ({"ID insertado": result.insertId});
      } catch (e) {
        res.status(404).json({"Error":e});
      }
    }

    async getOne (req, res){
      //const libro = req.body;
      //const libro = req.params.id;

      try {
        const id_libro = parseInt(req.params.id);
        console.log(libro);
        const [result] = await pool.query(`SELECT * FROM Libros WHERE id=?`, [id_libro]);
        if (result.length > 0){
          res.json (result);
        }
        else {
          res.json({"Error": "No se encontró el libro con el ID insertado."});
        }
      } catch(e) {

        // PROBAR SWITCH
        if(e.errno===1054) {
          res.json({"Error": "Ha ingresado un valor distinto a un id."});
        }
        //res.status(404).json({"Error": e});
      }

    }

    async update (req, res) {
      const libro = req.body;
      const id_libro = parseInt(libro.id);
      const [result] = await pool.query(`UPDATE Libros SET nombre=(?), autor=(?), categoria=(?), anio_publicacion=(?), ISBN=(?) WHERE id=(?)`,
                        [libro.nombre, libro.autor, libro.categoria, libro.anio_publicacion, libro.isbn, id_libro]);
      res.json({"Libro actualizado": result.changedRows});
    }

    async delete(req, res) {
      try {
        const libro = req.body;
        if (!Number.isInteger(libro.id)) throw("Por favor, ingrese un entero positivo para el id");
        const [result] = await pool.query(`DELETE FROM Libro WHERE id=(?)`, [libro.id]);

        if (result.affectedRows>0) {
          res.json(`El libro con id ${libro.id} ha sido eliminado`);
        } else {
          res.json(`No existe el libro con id ${libro.id} en la base de datos`);
        }

      } catch(e) {
        console.log(e);
        res.status(404).json({"Error": e});
      }
    }
}
export const libro = new LibroController();