// Arma las tarjetas de materias

var contenedorMaterias = document.getElementById('lista-materias');

function crearTarjetaMateria(materia) {
    var badge;

    if (materia.estado === 'Finalizado') {
        badge = '<span class="rounded-full bg-verde/10 px-2.5 py-1 text-xs font-semibold text-verde">Finalizado · Nota ' + materia.nota + '</span>';
    } else {
        badge = '<span class="rounded-full bg-barra/10 px-2.5 py-1 text-xs font-semibold text-barra">En curso</span>';
    }

    // Envolvemos todo en un enlace <a> que apunta a materia.html?id=X
    return `
        <a href="materia.html?id=${materia.id}" class="block group">
            <article class="cuadro rounded-2xl bg-white p-5 shadow-sm sm:p-6 transition group-hover:shadow-md group-hover:ring-1 group-hover:ring-verde">
                <div class="flex flex-wrap items-start justify-between gap-3">
                    <div>
                        <h3 class="text-lg font-semibold text-barra group-hover:text-verde">${materia.nombre}</h3>
                        <p class="mt-1 flex items-center gap-1.5 text-sm text-muted">
                            <i class="ti ti-user text-barra/60"></i>
                            ${materia.profesor}
                        </p>
                    </div>
                    ${badge}
                </div>
                <div class="mt-4 flex flex-wrap gap-4 text-sm text-barra">
                    <p class="flex items-center gap-1.5">
                        <i class="ti ti-book text-lg text-barra/70"></i>
                        ${materia.tipo}
                    </p>
                    <p class="flex items-center gap-1.5">
                        <i class="ti ti-calendar text-lg text-barra/70"></i>
                        ${materia.dia}
                    </p>
                    <p class="flex items-center gap-1.5">
                        <i class="ti ti-clock text-lg text-barra/70"></i>
                        ${materia.horario}
                    </p>
                    <p class="flex items-center gap-1.5">
                        <i class="ti ti-chart-bar text-lg text-barra/70"></i>
                        ${materia.asistencia}%
                    </p>
                </div>
            </article>
        </a>
    `;
}

function renderMaterias() {
    if (!contenedorMaterias) return;

    var lista = getMaterias();
    var html = '';
    for (var i = 0; i < lista.length; i++) {
        html += crearTarjetaMateria(lista[i]);
    }
    contenedorMaterias.innerHTML = html;
}

renderMaterias();
