// Lee el id de la materia desde la URL, la busca en los datos
// y renderiza la información, los materiales y el foro.

var parametros = new URLSearchParams(window.location.search);
var idMateria = Number(parametros.get('id'));

var listaMaterias = getMaterias();
var materia = null;

//Buscamos la materia en el arreglo
for (var i = 0; i < listaMaterias.length; i++) {
    if (listaMaterias[i].id === idMateria) {
        materia = listaMaterias[i];
        break;
    }
}

//Si no se encuentra la materia, mostramos un mensaje
if (!materia) {
    document.getElementById('titulo-materia').textContent = 'Materia no encontrada';
    document.getElementById('profesor-materia').textContent = 'Volvé al listado de materias para elegir una válida.';
} else {
    // 1. Título y profesor
    document.getElementById('titulo-materia').textContent = materia.nombre;
    document.getElementById('profesor-materia').textContent = 'Profesor/a: ' + materia.profesor;
    document.getElementById('breadcrumb-materia').textContent = materia.nombre;

    //Info general (Horario, Nota, Asistencia)
    var estadoNota = materia.nota !== null ? materia.nota : 'En curso';
    var infoHtml = `
        <div class="rounded-xl bg-fondo p-4">
            <p class="text-xs text-muted">Horario de cursada</p>
            <p class="mt-1 font-medium text-barra">${materia.dia}, ${materia.horario}</p>
        </div>
        <div class="rounded-xl bg-fondo p-4">
            <p class="text-xs text-muted">Nota actual</p>
            <p class="mt-1 font-medium ${materia.nota ? 'text-verde' : 'text-barra'}">${estadoNota}</p>
        </div>
        <div class="rounded-xl bg-fondo p-4">
            <p class="text-xs text-muted">Asistencia</p>
            <p class="mt-1 font-medium text-barra">${materia.asistencia}%</p>
        </div>
    `;
    document.getElementById('info-general').innerHTML = infoHtml;

    //Materiales de ejemplo
    var materiales = [
        { titulo: 'Guía de ' + materia.nombre + ' (PDF)', icono: 'ti-file-text' },
        { titulo: 'Diapositivas de clase (PPT)', icono: 'ti-presentation' },
        { titulo: 'Ejercicios prácticos (ZIP)', icono: 'ti-file-zip' }
    ];

    var materialesHtml = materiales.map(function (m) {
        return `
            <a href="#" class="flex items-center gap-3 rounded-xl bg-white p-4 shadow-sm transition hover:bg-fondo">
                <i class="ti ${m.icono} text-xl text-barra"></i>
                <span class="font-medium text-barra">${m.titulo}</span>
            </a>
        `;
    }).join('');
    document.getElementById('lista-materiales').innerHTML = materialesHtml;

    //Foro de ejemplo
    var foro = [
        { autor: materia.profesor, fecha: '18/09/2026', mensaje: 'Recuerden traer el trabajo práctico la próxima clase.', nuevo: true },
        { autor: materia.profesor, fecha: '10/09/2026', mensaje: 'Subí el material de la clase pasada a la sección de materiales.', nuevo: false }
    ];

    var foroHtml = foro.map(function (mensaje) {
        var clasesCaja = mensaje.nuevo
            ? 'border-l-4 border-verde bg-verde/5'
            : 'border-l-4 border-transparent bg-white';

        return `
            <article class="${clasesCaja} rounded-r-xl p-4 shadow-sm">
                <div class="flex flex-wrap justify-between gap-2">
                    <p class="text-sm font-semibold text-barra">Prof. ${mensaje.autor}</p>
                    <time class="text-xs text-muted">${mensaje.fecha}</time>
                </div>
                <p class="mt-2 text-sm text-muted">${mensaje.mensaje}</p>
                ${mensaje.nuevo ? '<span class="mt-2 inline-block rounded-full bg-verde/10 px-2 py-0.5 text-xs font-semibold text-verde">Nuevo</span>' : ''}
            </article>
        `;
    }).join('');
    document.getElementById('lista-foro').innerHTML = foroHtml;
}