// MÉTODO PARA CONTROLAR RESTO DE CONTROLADORES



// Controla si se envian campos en blanco a la base de datos

export function controlarEspaciosEnBlanco(libro){
	const valores=Object.values(libro);
	const valido=valores.reduce((resultado,valor)=>{
		return resultado && valor!=="";
	},true);

	if(!valido) throw("Se han enviado campos en blanco.");
}