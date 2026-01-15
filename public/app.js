// Preguntas del examen (sin mencionar "carisma")
const preguntas = [
    // NIVEL 1 - Energía (12 preguntas)
    { nivel: 1, texto: "Cuando entro a una fiesta, prefiero..." },
    { nivel: 1, texto: "Mi forma de captar atención es..." },
    { nivel: 1, texto: "En una conversación, me gusta..." },
    { nivel: 1, texto: "Cuando quiero entretener, yo..." },
    { nivel: 1, texto: "Mi estilo de presentación es..." },
    { nivel: 1, texto: "Para hacer reír a la gente, yo..." },
    { nivel: 1, texto: "Cuando hablo en público, prefiero..." },
    { nivel: 1, texto: "Mi energía se manifiesta cuando..." },
    { nivel: 1, texto: "Para conectar con otros, yo..." },
    { nivel: 1, texto: "Mi presencia se caracteriza por..." },
    { nivel: 1, texto: "Cuando quiero ser memorable, yo..." },
    { nivel: 1, texto: "Mi forma de expresarme es..." },
    
    // NIVEL 2 - Confianza (12 preguntas)
    { nivel: 2, texto: "Cuando alguien está triste, yo..." },
    { nivel: 2, texto: "Para generar confianza, yo..." },
    { nivel: 2, texto: "Cuando alguien tiene un problema, yo..." },
    { nivel: 2, texto: "Mi forma de escuchar es..." },
    { nivel: 2, texto: "Para crear conexión emocional, yo..." },
    { nivel: 2, texto: "Cuando alguien necesita apoyo, yo..." },
    { nivel: 2, texto: "Mi manera de mostrar empatía es..." },
    { nivel: 2, texto: "Para hacer sentir cómodos a otros, yo..." },
    { nivel: 2, texto: "Cuando hay conflicto, yo..." },
    { nivel: 2, texto: "Mi forma de entender a los demás es..." },
    { nivel: 2, texto: "Para generar seguridad en otros, yo..." },
    { nivel: 2, texto: "Mi estilo de compasión se muestra cuando..." },
    
    // NIVEL 3 - Acción (12 preguntas)
    { nivel: 3, texto: "Cuando necesito tomar una decisión, yo..." },
    { nivel: 3, texto: "Mi forma de liderar es..." },
    { nivel: 3, texto: "Para inspirar acción, yo..." },
    { nivel: 3, texto: "Cuando hay que resolver algo, yo..." },
    { nivel: 3, texto: "Mi estilo de autoridad se manifiesta..." },
    { nivel: 3, texto: "Para guiar a otros, yo..." },
    { nivel: 3, texto: "Cuando necesito influir, yo..." },
    { nivel: 3, texto: "Mi forma de ejercer poder es..." },
    { nivel: 3, texto: "Para lograr objetivos, yo..." },
    { nivel: 3, texto: "Cuando necesito dirección, yo..." },
    { nivel: 3, texto: "Mi manera de tomar control es..." },
    { nivel: 3, texto: "Para generar cambio, yo..." }
];

// Opciones por nivel (solo descripciones, sin nombres de estilos)
const opcionesNivel1 = [
    { valor: 'A', descripcion: 'Crear una impresión poderosa y memorable' },
    { valor: 'B', descripcion: 'Generar entusiasmo y energía contagiosa' },
    { valor: 'C', descripcion: 'Asombrar con presencia y acciones sorprendentes' },
    { valor: 'D', descripcion: 'Usar voz y presencia fuerte que resuena' },
    { valor: 'E', descripcion: 'Manifestar a través de acción directa' },
    { valor: 'F', descripcion: 'Atraer y seducir de manera sutil y natural' }
];

const opcionesNivel2 = [
    { valor: 'A', descripcion: 'Proporcionar estabilidad y confianza' },
    { valor: 'B', descripcion: 'Identificar y corregir problemas, guiar soluciones' },
    { valor: 'C', descripcion: 'Reflejar emociones y necesidades, crear conexión empática' }
];

const opcionesNivel3 = [
    { valor: 'A', descripcion: 'Iluminar con claridad y visión, inspirar posibilidades' },
    { valor: 'B', descripcion: 'Guiar y dirigir con autoridad natural' },
    { valor: 'C', descripcion: 'Elevar a otros hacia su máximo potencial' }
];

// Estado de la aplicación
let preguntaActual = 0;
let respuestas = [];

// Mensajes psicológicos por nivel
const mensajesNivel = {
    1: "No hay respuestas correctas. Solo elige lo que más resuene contigo.",
    2: "Ahora vamos más profundo. Esto mide cómo conectas emocionalmente.",
    3: "Último paso. Aquí descubrimos cómo influyes y lideras."
};

// Función para obtener opciones según el nivel
function getOpcionesPorNivel(nivel) {
    switch(nivel) {
        case 1: return opcionesNivel1;
        case 2: return opcionesNivel2;
        case 3: return opcionesNivel3;
        default: return [];
    }
}

// Función para obtener nombre del nivel
function getNombreNivel(nivel) {
    const nombres = {
        1: 'Energía',
        2: 'Confianza',
        3: 'Acción'
    };
    return nombres[nivel] || 'Nivel';
}

// Función para calcular progreso
function calcularProgreso() {
    return Math.round(((preguntaActual + 1) / preguntas.length) * 100);
}

// Función para actualizar barra de progreso
function actualizarProgreso() {
    const porcentaje = calcularProgreso();
    const pregunta = preguntas[preguntaActual];
    const nivel = pregunta.nivel;
    
    document.getElementById('nivel-texto').textContent = `Nivel ${nivel} de 3 — ${getNombreNivel(nivel)}`;
    document.getElementById('porcentaje-texto').textContent = `${porcentaje}%`;
    document.getElementById('progress-fill').style.width = `${porcentaje}%`;
    
    // Actualizar mensaje psicológico
    const mensajeTexto = document.getElementById('texto-psicologico');
    if (nivel === 3 && preguntaActual >= 24) {
        mensajeTexto.textContent = "Solo faltan " + (36 - preguntaActual) + " preguntas";
    } else {
        mensajeTexto.textContent = mensajesNivel[nivel];
    }
}

// Función para mostrar pregunta
function mostrarPregunta() {
    if (preguntaActual >= preguntas.length) {
        mostrarPasoEmail();
        return;
    }
    
    const pregunta = preguntas[preguntaActual];
    const opciones = getOpcionesPorNivel(pregunta.nivel);
    
    // Actualizar texto de pregunta
    document.getElementById('pregunta-texto').textContent = pregunta.texto;
    
    // Renderizar opciones como cards grandes (solo descripciones)
    const container = document.getElementById('opciones-container');
    container.innerHTML = '';
    
    opciones.forEach((opcion, index) => {
        const card = document.createElement('div');
        card.className = 'opcion-card';
        card.dataset.valor = opcion.valor;
        
        card.innerHTML = `
            <div class="opcion-letra">${opcion.valor}</div>
            <div class="opcion-contenido">
                <div class="opcion-descripcion">${opcion.descripcion}</div>
            </div>
        `;
        
        card.addEventListener('click', () => seleccionarOpcion(opcion.valor, card));
        container.appendChild(card);
    });
    
    actualizarProgreso();
}

// Función para seleccionar opción
function seleccionarOpcion(valor, cardElement) {
    // Guardar respuesta
    respuestas[preguntaActual] = valor;
    
    // Remover selección anterior
    document.querySelectorAll('.opcion-card').forEach(card => {
        card.classList.remove('seleccionada');
    });
    
    // Agregar animación de selección
    cardElement.classList.add('seleccionada');
    
    // Avanzar automáticamente después de un breve delay
    setTimeout(() => {
        preguntaActual++;
        if (preguntaActual < preguntas.length) {
            mostrarPregunta();
        } else {
            mostrarPasoEmail();
        }
    }, 500);
}

// Función para cambiar de paso
function cambiarPaso(pasoActual, pasoSiguiente) {
    const actual = document.getElementById(pasoActual);
    const siguiente = document.getElementById(pasoSiguiente);
    
    actual.classList.remove('activo');
    siguiente.classList.add('activo');
}

// Función para mostrar paso de email
function mostrarPasoEmail() {
    cambiarPaso('paso-preguntas', 'paso-email');
}

// Función para mostrar mensaje
function mostrarMensaje(texto, tipo = 'success') {
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.textContent = texto;
    mensajeDiv.className = `mensaje ${tipo}`;
    mensajeDiv.classList.remove('hidden');
    
    if (tipo === 'success') {
        mensajeDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

// Función para enviar formulario
async function enviarFormulario(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    
    if (!nombre) {
        mostrarMensaje('Por favor, ingresa tu nombre', 'error');
        return;
    }
    
    if (!email) {
        mostrarMensaje('Por favor, ingresa tu email', 'error');
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mostrarMensaje('Por favor, ingresa un email válido', 'error');
        return;
    }
    
    // Validar que todas las preguntas estén respondidas
    if (respuestas.length !== preguntas.length) {
        mostrarMensaje('Por favor, completa todas las preguntas', 'error');
        return;
    }
    
    const submitBtn = document.getElementById('btn-enviar');
    submitBtn.disabled = true;
    submitBtn.textContent = '⏳ Procesando...';
    
    try {
        const response = await fetch('/api/evaluar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre,
                email,
                respuestas
            })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            mostrarMensaje(
                '✅ ' + data.message + ' Revisa tu bandeja de entrada (y spam) para ver tu fórmula de carisma.',
                'success'
            );
            
            // Limpiar formulario
            document.getElementById('form-email').reset();
        } else {
            mostrarMensaje('❌ ' + (data.error || 'Error al procesar tu evaluación'), 'error');
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarMensaje('❌ Error de conexión. Por favor, intenta nuevamente.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Recibir Mi Receta De Carisma';
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    // Botón comenzar
    document.getElementById('btn-comenzar').addEventListener('click', () => {
        cambiarPaso('paso-intro', 'paso-preguntas');
        mostrarPregunta();
    });
    
    // Formulario de email
    document.getElementById('form-email').addEventListener('submit', enviarFormulario);
});
