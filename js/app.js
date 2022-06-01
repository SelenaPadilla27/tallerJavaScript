//Arreglo para almacenar los proyecto
var arrayProyectos = [];

//Funcion de incio del script se llama asi misma en un loop
(() => {
	init();
})();

function init() {
	document.getElementById("btnAddProyect").addEventListener("click", () => {
		agregarProyectos();
	});

	document.getElementById("btnEliminarProyecto").addEventListener("click", () => {
		eliminarProyectos();
		mostrarProyectos();
	});

	document.getElementById("btnRestablecerProyecto").addEventListener("click", () => {
		mostrarProyectos();
	});

	document.getElementById("btnBuscarProyecto").addEventListener("click", () => {
		let valorBuscar = document.getElementById("inputBuscar").value;
		buscarProyecto(valorBuscar);
	});

	mostrarProyectos();
}

/*
Funcion encargada de guardar los proyectos en el arreglo de proyectos y almacenar en localStorage
para que los datos persitan despues de refrescar el navegador
*/
function agregarProyectos() {
	let idRepetido = false;
	const form = document.forms["forma"];
	let id = parseInt(form["inputId"].value);
	let nombre = form["inputName"].value;
	let descripcion = form["inputTextArea"].value;
	let fecha = Date.parse(form["inputDate"].value);
	let tipo = form["selectTipo"].value;
	if (Number.isNaN(fecha) || Number.isNaN(id)) {
		alert("El id o fecha ingresado son incorrectos");
		console.log("Datos ingresados incorrectos");
		return;
	} else {
		arrayProyectos.forEach((proyecto) => {
			if (proyecto._id === id) {
				idRepetido = true;
				return;
			}
		});
		if (!idRepetido) {
			const proyecto = new Proyecto(id, nombre, descripcion, fecha, tipo);
			limpiarInputs();
			arrayProyectos.push(proyecto);
			console.log("Se agrego el proyecto: " + proyecto);
			localStorage.arrayProyectos = JSON.stringify(arrayProyectos);
			mostrarProyectos();
		} else {
			alert("Id del proyecto ya existe por favor ingrese otro");
		}
	}
}

function mostrarProyectos() {
	//Se valida si el localStorage esta vacio, si tiene elementos los agrega al arrayProyectos
	if (localStorage.arrayProyectos) {
		arrayProyectos = JSON.parse(localStorage.arrayProyectos);
	}
	//variable texto que va almacnar lo que va mostrara en la tabla
	let texto = "";

	// concatenar cada valor del objeto proyecto con sus respectivo <tr> y <th>
	if (!(arrayProyectos.length == 0)) {
		arrayProyectos.forEach((proyecto) => {
			let date = new Date(proyecto._fecha).toLocaleDateString("sv").replaceAll("-", "-");
			texto += `<tr > <th scope="row">${proyecto._id}</th>`;
			texto += `<td>${proyecto._nombre}</td>`;
			texto += `<td>${proyecto._descripcion}</td>`;
			texto += `<td>${date}</td>`;
			texto += `<td>${proyecto._tipo}</td>`;
			texto += `<td > <button type="button" class="btn btn-primary mb-2" id="${proyecto._id}" onclick = "editarId(${proyecto._id})"
            style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
            <i class="bi bi-pencil"></i></button>`;
			texto += `<button type="button" class="btn btn-danger id="${proyecto._id}" onclick = "eliminarId(${proyecto._id})"
            style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
            <i class="bi bi-x"></i></button></td></tr>`;
		});
		document.getElementById("elementTable").innerHTML = texto;
	} else {
		document.getElementById("elementTable").innerHTML = texto;
		console.log("Ingrese datos al array");
	}
}

function limpiarInputs() {
	let elements = document.querySelectorAll("input,textarea,select");
	Array.from(elements).forEach((inputs) => {
		if (inputs.type === "text" || inputs.type === "number" || inputs.type === "textarea") {
			inputs.value = "";
		}

		if (inputs.type === "date") {
			inputs.value = "2022-05-30";
		}

		if (inputs.type === "select-one") {
			inputs.value = "Tipo de proyecto";
		}
	});
	console.log("Inputs limpios");
}

function eliminarProyectos() {
	localStorage.clear();
	arrayProyectos.splice(0, arrayProyectos.length);
	mostrarProyectos();
	console.log("Proyectos eliminados");
}

function buscarProyecto(valorBuscar) {
	let texto = "";
	let dato;
	if (!Number.isNaN(parseInt(valorBuscar))) {
		dato = parseInt(valorBuscar);
	} else {
		dato = valorBuscar;
	}

	arrayProyectos.forEach((proyecto) => {
		if (proyecto._id === dato || proyecto._nombre === dato) {
			let date = new Date(proyecto._fecha).toLocaleDateString("sv").replaceAll("-", "-");
			texto += `<tr > <th scope="row">${proyecto._id}</th>
            <td>${proyecto._nombre}</td>
            <td>${proyecto._descripcion}</td>
            <td>${date}</td>
            <td>${proyecto._tipo}</td> 
            <td>
            <button type="button" class="btn btn-primary" id="${proyecto._id}" onclick = "editarId(${proyecto._id})"
            style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
            <i class="bi bi-pencil"></i></button>
            <button type="button" class="btn btn-danger id="${proyecto._id}" onclick = "eliminarId(${proyecto._id})"
            style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
            <i class="bi bi-x"></i></button>
            </td>
            </tr>`;
		}
	});

	if (!(texto === "")) {
		document.getElementById("elementTable").innerHTML = texto;
	} else {
		document.getElementById("elementTable").innerHTML = "";
		alert("No se encontro el registro a buscar");
		console.log("Dato a buscar no encontrado");
	}
}

function eliminarId(id) {
	arrayProyectos.forEach((proyecto) => {
		if (proyecto._id === id) {
			arrayProyectos.splice(arrayProyectos.indexOf(proyecto), 1);
			localStorage.arrayProyectos = JSON.stringify(arrayProyectos);
			mostrarProyectos();
			console.log("Elemento eliminado: " + id);
			return;
		}
	});
}

function editarId(id) {
	let texto = "";
	if (!Number.isNaN(parseInt(id))) {
		arrayProyectos.forEach((proyecto) => {
			if (proyecto._id === id) {
				let date = new Date(proyecto._fecha).toLocaleDateString("sv").replaceAll("-", "-");
				console.log(proyecto._descripcion);
				texto += `<tr >
				<th scope="row"> <input type="number"class="form-control col-auto"
                id="inputIdEditable"placeholder="Ingrese el ID" value ="${proyecto._id}" required/></th>
                <td> <input type="text" class="form-control col-auto" id="inputNameEditable" placeholder="Ingrese el ID"
                value ="${proyecto._nombre}"
                required
            /> </td>
                <td>
                <textarea
						class="form-control col-auto"
						placeholder="Ingrese la descripcion"
						id="inputTextAreaEditable"
						style="height: 40px"
                       	>${proyecto._descripcion}</textarea>
               </td>
                <td>
                <input
						type="date"
						class="form-control col-auto"
						id="inputDateEditable"
                        value="${date}";
					/>
                </td>
                <td>
                <select class="form-select" aria-label="" id="selectTipoEditable">
						<option selected>${proyecto._tipo}</option>
						<option value="Investigacion">Investigacion</option>
						<option value="Extensión">Extensión</option>
					</select>
                </td> 
                <td>
                <button type="button" class="btn btn-success" id="${proyecto._id}" onclick = "guardarCambio(${proyecto._id})"
                style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
                <i class="bi bi-check-lg"></i></button>
                </td>
                </tr>`;
			}
		});
	} else {
		dato = idvalorBuscar;
	}

	if (!(texto === "")) {
		document.getElementById("elementTable").innerHTML = texto;
	} else {
		document.getElementById("elementTable").innerHTML = "";
		alert("No se encontro el registro a buscar");
		console.log("Dato a buscar no encontrado");
	}
}

function guardarCambio(id) {
	if (!Number.isNaN(parseInt(id))) {
		arrayProyectos.forEach((proyecto) => {
			if (proyecto._id === id) {
				let id = parseInt(document.getElementById("inputIdEditable").value);
				let nombre = document.getElementById("inputNameEditable").value;
				let descripcion = document.getElementById("inputTextAreaEditable").value;
				let fecha = Date.parse(document.getElementById("inputDateEditable").value);
				tipo = document.getElementById("selectTipoEditable").value;
				const proyecto = new Proyecto(id, nombre, descripcion, fecha, tipo);
				arrayProyectos.splice(arrayProyectos.indexOf(proyecto), 1, proyecto);
				localStorage.arrayProyectos = JSON.stringify(arrayProyectos);
				mostrarProyectos();
				return;
			}
		});
	} else {
		console.log("Id incorrecto no se puede modificar el proyecto");
	}
}
