class Proyecto {
	constructor(id, nombre, descripcion, fecha, tipo) {
		this._id = id;
		this._nombre = nombre;
		this._descripcion = descripcion;
		this._fecha = fecha;
		this._tipo = tipo;
	}

	get id() {
		return this._id;
	}

	set id(id) {
		this._id = id;
	}
	get nombre() {
		return this._nombre;
	}

	set nombre(nombre) {
		this._nombre = nombre;
	}

	get descripcion() {
		return this._descripcion;
	}

	set descripcion(descripcion) {
		this._descripcion = descripcion;
	}

	get fecha() {
		return this._fecha;
	}

	set fecha(fecha) {
		this._fecha = fecha;
	}

	get tipo() {
		return this._tipo;
	}

	set tipo(tipo) {
		this._tipo = tipo;
	}
}
