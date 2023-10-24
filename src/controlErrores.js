function controlEspaciosEnBlanco(libro){
	const valores=Object.values(libro);
	const valido=valores.reduce((resultado,valor)=>{
		return resultado && valor!=="";
	},true);

	if(!valido) throw("Se ha enviado uno o más campos en blanco.");
}

function controlID(id){
	if (id===undefined) throw ("Por favor, ingrese el ID del libro.");
	if (!Number.isInteger(id) && Number.isInteger(id) > 0) throw("Por favor, verifique el ID ingresado.");
}

function controlISBN(isbn){
	if (isbn===undefined) throw ("Por favor, ingrese el ISBN del libro.");
}

function controlNombre(nombre){
	if(nombre===undefined) throw ("Por favor, ingrese el nombre del libro.");	
}

function controlAutor(autor){
	if (autor===undefined) throw ("Por favor, ingrese el autor del libro.");

}

function controlCategoria(categoria){
	if(categoria===undefined) throw ("Por favor, ingrese la categoría del libro.");
}

function controlDeTodosLosCampos(libro, campos_db){
	const campos_invalidos=Object.keys(libro).filter((valor)=>{
		if(!campos_db.includes(valor)) return valor;
	});
	console.log(campos_invalidos);

	if (campos_invalidos.length>0) throw(`El campo ${campos_invalidos} no existe en la base de datos.`);
}

export function controlUpdate(libro){
	const campos_db=["id", "nombre", "autor", "categoria", "anio_publicacion", "ISBN"];
	controlID(libro.id);
	controlDeTodosLosCampos(libro, campos_db);
	controlEspaciosEnBlanco(libro);
}

export function controlAdd(libro){
	const campos_db=["nombre", "autor", "categoria", "anio_publicacion", "ISBN"];
	controlDeTodosLosCampos(libro,campos_db);
	controlEspaciosEnBlanco(libro);
	controlNombre(libro.nombre);
	controlAutor(libro.autor);
	controlCategoria(libro.categoria);
	controlISBN(libro.ISBN);
}

export function controlDelete(libro){
	const campos_db=["ISBN"];
	controlDeTodosLosCampos(libro,campos_db);
	controlEspaciosEnBlanco(libro);
	controlISBN(libro.ISBN);
}

export function controlGetOne(libro){
	const campos_db=["id"];
	controlID(libro.id);
	controlDeTodosLosCampos(libro,campos_db);
}

