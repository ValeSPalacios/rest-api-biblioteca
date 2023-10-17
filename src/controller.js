import {pool} from './database.js';

class LibroController {
    async getAll (req, res){
        const [result] = await pool.query('SELECT * FROM libros');
        res.json(result);
    }

    async add (req,res){
        const libro=req.body;
        const [result] = await pool.query(`INSERT INTO Libros(nombre, autor, categoria, anio_publicacion, ISBN) VALUES (?, ?, ?, ? ,?)`, [libro.nombre, libro.autor, libro.categoria, libro.anio_publicacion, libro.isbn]);
        res.json ({"ID insertado": result.insertId});
    }

    async getOne (req,res){
      const libro=req.body;
      const [result] = await pool.query(`SELECT * FROM Libros WHERE id=?`, [libro.id]);
      if (result.length > 0){
        res.json (result);
      }
      else {
        res.json({"Error": "No se encontró un libro con el ID insertado."});
      }
    }

}
export const libro = new LibroController();