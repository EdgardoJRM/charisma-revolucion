// API base (backend separado en API Gateway)
const API_BASE = 'https://2w5dtqjsbj.execute-api.us-east-1.amazonaws.com/prod';

// Preguntas del examen (sin mencionar estilos directamente)
const preguntas = [
    // NIVEL 1 - Carisma Energético (12 preguntas)
    {
        nivel: 1,
        texto: "Voz y ritmo: ¿Cómo hablas cuando algo te apasiona?",
        opciones: [
            { valor: 'A', descripcion: 'Pausado, deliberado y con autoridad técnica.' },
            { valor: 'B', descripcion: 'Rápido, con volumen creciente y mucha emoción.' },
            { valor: 'C', descripcion: 'Suave, optimista y juguetón.' },
            { valor: 'D', descripcion: 'Directo, fuerte y sin rodeos.' },
            { valor: 'E', descripcion: 'Variado, con pausas dramáticas y entonación teatral.' },
            { valor: 'F', descripcion: 'Ágil, ingenioso y buscando la complicidad del otro.' }
        ]
    },
    {
        nivel: 1,
        texto: "En una videollamada: Lo que más destaca de ti es...",
        opciones: [
            { valor: 'A', descripcion: 'Tu fondo impecable y la claridad de tus datos.' },
            { valor: 'B', descripcion: 'Tu entusiasmo que traspasa la pantalla.' },
            { valor: 'C', descripcion: 'Tu sonrisa constante y buena vibra.' },
            { valor: 'D', descripcion: 'Tu presencia imponente que domina el encuadre.' },
            { valor: 'E', descripcion: 'Tu expresividad facial y movimientos de manos.' },
            { valor: 'F', descripcion: 'Tus comentarios rápidos y bromas oportunas.' }
        ]
    },
    {
        nivel: 1,
        texto: "Primer contacto: ¿Qué impresión sueles dejar al conocer a alguien?",
        opciones: [
            { valor: 'A', descripcion: '"Es una persona muy profesional y capaz".' },
            { valor: 'B', descripcion: '"¡Qué energía tan inspiradora tiene!".' },
            { valor: 'C', descripcion: '"Es alguien sumamente agradable y ligero".' },
            { valor: 'D', descripcion: '"Es una persona poderosa que sabe lo que quiere".' },
            { valor: 'E', descripcion: '"Es fascinante, imposible de ignorar".' },
            { valor: 'F', descripcion: '"Es muy carismático y divertido".' }
        ]
    },
    {
        nivel: 1,
        texto: "Narrativa: Al contar una anécdota, tu objetivo es...",
        opciones: [
            { valor: 'A', descripcion: 'Explicar los hechos con precisión quirúrgica.' },
            { valor: 'B', descripcion: 'Hacer que los demás sientan la misma emoción que tú.' },
            { valor: 'C', descripcion: 'Dibujar una sonrisa en los rostros de los demás.' },
            { valor: 'D', descripcion: 'Demostrar un punto de victoria o aprendizaje fuerte.' },
            { valor: 'E', descripcion: 'Transportar a la gente a la escena como en una película.' },
            { valor: 'F', descripcion: 'Hacer que la gente se ría o se mantenga intrigada.' }
        ]
    },
    {
        nivel: 1,
        texto: "Lenguaje Corporal: Tus gestos suelen ser...",
        opciones: [
            { valor: 'A', descripcion: 'Mínimos y controlados.' },
            { valor: 'B', descripcion: 'Amplios y expansivos.' },
            { valor: 'C', descripcion: 'Suaves y acogedores.' },
            { valor: 'D', descripcion: 'Firmes y de \"toma de espacio\".' },
            { valor: 'E', descripcion: 'Exagerados y descriptivos.' },
            { valor: 'F', descripcion: 'Dinámicos y sociales.' }
        ]
    },
    {
        nivel: 1,
        texto: "Manejo de silencios: Si hay un silencio incómodo en un grupo...",
        opciones: [
            { valor: 'A', descripcion: 'No te molesta, esperas a tener algo valioso que decir.' },
            { valor: 'B', descripcion: 'Lo rompes con una frase motivadora.' },
            { valor: 'C', descripcion: 'Lo suavizas con una sonrisa o comentario amable.' },
            { valor: 'D', descripcion: 'Lo usas para observar y mantener tu estatus.' },
            { valor: 'E', descripcion: 'Lo aprovechas para crear tensión dramática.' },
            { valor: 'F', descripcion: 'Lanzas un chiste o comentario ingenioso.' }
        ]
    },
    {
        nivel: 1,
        texto: "Vestimenta: Tu estilo proyecta...",
        opciones: [
            { valor: 'A', descripcion: 'Perfeccionismo y estatus.' },
            { valor: 'B', descripcion: 'Energía y modernidad.' },
            { valor: 'C', descripcion: 'Frescura y comodidad.' },
            { valor: 'D', descripcion: 'Poder y autoridad.' },
            { valor: 'E', descripcion: 'Algo único, llamativo o artístico.' },
            { valor: 'F', descripcion: 'Tendencia y accesibilidad.' }
        ]
    },
    {
        nivel: 1,
        texto: "Ante un reto: ¿Cómo reaccionas públicamente?",
        opciones: [
            { valor: 'A', descripcion: 'Analizas la situación con calma.' },
            { valor: 'B', descripcion: 'Te emocionas por la oportunidad de ganar.' },
            { valor: 'C', descripcion: 'Mantienes el optimismo grupal.' },
            { valor: 'D', descripcion: 'Te pones al frente con determinación.' },
            { valor: 'E', descripcion: 'Expresas la magnitud del desafío con pasión.' },
            { valor: 'F', descripcion: 'Buscas el lado irónico o divertido del problema.' }
        ]
    },
    {
        nivel: 1,
        texto: "Social media: Tu contenido favorito para publicar es...",
        opciones: [
            { valor: 'A', descripcion: 'Infografías, datos o logros profesionales.' },
            { valor: 'B', descripcion: 'Videos hablando a cámara con mucha energía.' },
            { valor: 'C', descripcion: 'Fotos estéticas, alegres y con mensajes positivos.' },
            { valor: 'D', descripcion: 'Declaraciones fuertes y visiones de liderazgo.' },
            { valor: 'E', descripcion: 'Historias muy producidas o con mucho storytelling visual.' },
            { valor: 'F', descripcion: 'Memes, encuestas o interacción constante.' }
        ]
    },
    {
        nivel: 1,
        texto: "Feedback: Cuando alguien te felicita, prefieres que te digan:",
        opciones: [
            { valor: 'A', descripcion: '"Eres un experto en lo que haces".' },
            { valor: 'B', descripcion: '"Tu energía me cambió el día".' },
            { valor: 'C', descripcion: '"Eres una persona luz, da gusto estar contigo".' },
            { valor: 'D', descripcion: '"Tu seguridad me inspira confianza".' },
            { valor: 'E', descripcion: '"No puedo dejar de escucharte/mirarte".' },
            { valor: 'F', descripcion: '"Eres la persona más interesante de la sala".' }
        ]
    },
    {
        nivel: 1,
        texto: "Energía ambiental: En una fiesta, tú eres quien...",
        opciones: [
            { valor: 'A', descripcion: 'Está en una esquina hablando profundamente con un experto.' },
            { valor: 'B', descripcion: 'Está en el centro motivando a todos a bailar o participar.' },
            { valor: 'C', descripcion: 'Está asegurándose de que todos estén felices y cómodos.' },
            { valor: 'D', descripcion: 'Está hablando con los anfitriones o personas clave.' },
            { valor: 'E', descripcion: 'Se lleva todas las miradas por su forma de contar historias.' },
            { valor: 'F', descripcion: 'Está saltando de grupo en grupo haciendo reír a todos.' }
        ]
    },
    {
        nivel: 1,
        texto: "Uso de manos: Al hablar...",
        opciones: [
            { valor: 'A', descripcion: 'Las mantienes juntas o sobre la mesa.' },
            { valor: 'B', descripcion: 'Las mueves hacia afuera, como lanzando energía.' },
            { valor: 'C', descripcion: 'Las usas para gestos de apertura y calidez.' },
            { valor: 'D', descripcion: 'Haces gestos de mando (señalar sutilmente, palmas hacia abajo).' },
            { valor: 'E', descripcion: 'Dibujas en el aire lo que estás diciendo.' },
            { valor: 'F', descripcion: 'Las usas para enfatizar tus remates humorísticos.' }
        ]
    },

    // NIVEL 2 - Carisma de Compasión (12 preguntas)
    {
        nivel: 2,
        texto: "Amigo en crisis: ¿Qué es lo primero que haces?",
        opciones: [
            { valor: 'A', descripcion: 'Escuchas en silencio, ofreciendo una presencia estable.' },
            { valor: 'B', descripcion: 'Ofreces soluciones prácticas de inmediato.' },
            { valor: 'C', descripcion: 'Le dices \"te entiendo, yo también me he sentido así\".' }
        ]
    },
    {
        nivel: 2,
        texto: "Contacto visual: Tu mirada busca...",
        opciones: [
            { valor: 'A', descripcion: 'Transmitir paz y calma.' },
            { valor: 'B', descripcion: 'Analizar cómo puedes ayudar.' },
            { valor: 'C', descripcion: 'Conectar con el sentimiento del otro.' }
        ]
    },
    {
        nivel: 2,
        texto: "Vulnerabilidad: Para ti, mostrar debilidad es...",
        opciones: [
            { valor: 'A', descripcion: 'Algo que haces solo con quien ha ganado tu confianza total.' },
            { valor: 'B', descripcion: 'Una oportunidad para aprender y mejorar.' },
            { valor: 'C', descripcion: 'Una herramienta para que los demás se sientan menos solos.' }
        ]
    },
    {
        nivel: 2,
        texto: "Escucha activa: Mientras el otro habla, tú...",
        opciones: [
            { valor: 'A', descripcion: 'Asientes lentamente y mantienes el espacio.' },
            { valor: 'B', descripcion: 'Estás pensando en el siguiente paso o solución.' },
            { valor: 'C', descripcion: 'Reflejas sus expresiones faciales (neuronas espejo).' }
        ]
    },
    {
        nivel: 2,
        texto: "Ambiente laboral: Prefieres ser visto como el colega que...",
        opciones: [
            { valor: 'A', descripcion: 'Nunca pierde los nervios.' },
            { valor: 'B', descripcion: 'Siempre tiene la respuesta.' },
            { valor: 'C', descripcion: 'Siempre sabe cómo te sientes.' }
        ]
    },
    {
        nivel: 2,
        texto: "Conflictos: Para resolver una pelea...",
        opciones: [
            { valor: 'A', descripcion: 'Actúas como un pilar neutro.' },
            { valor: 'B', descripcion: 'Actúas como un mediador táctico.' },
            { valor: 'C', descripcion: 'Actúas como un puente emocional.' }
        ]
    },
    {
        nivel: 2,
        texto: "Validación: Tu frase típica de apoyo es...",
        opciones: [
            { valor: 'A', descripcion: '"Aquí estoy para lo que necesites".' },
            { valor: 'B', descripcion: '"Hagamos un plan para arreglarlo".' },
            { valor: 'C', descripcion: '"Es totalmente normal que te sientas así".' }
        ]
    },
    {
        nivel: 2,
        texto: "Reacción al error ajeno: Si alguien se equivoca delante de ti...",
        opciones: [
            { valor: 'A', descripcion: 'No haces drama, solo esperas a que se recupere.' },
            { valor: 'B', descripcion: 'Le indicas discretamente cómo corregirlo.' },
            { valor: 'C', descripcion: 'Le das una sonrisa reconfortante para que no se sienta mal.' }
        ]
    },
    {
        nivel: 2,
        texto: "Presencia: En una conversación 1 a 1, el otro siente...",
        opciones: [
            { valor: 'A', descripcion: 'Que el tiempo se detiene (estabilidad).' },
            { valor: 'B', descripcion: 'Que está avanzando (progreso).' },
            { valor: 'C', descripcion: 'Que es visto y amado (validación).' }
        ]
    },
    {
        nivel: 2,
        texto: "Límites: Cuando estás cansado emocionalmente...",
        opciones: [
            { valor: 'A', descripcion: 'Te retiras en silencio a tu \"cueva\".' },
            { valor: 'B', descripcion: 'Buscas algo productivo que hacer para distraerte.' },
            { valor: 'C', descripcion: 'Tratas de seguir complaciendo hasta que no puedes más.' }
        ]
    },
    {
        nivel: 2,
        texto: "Cumplidos: Prefieres dar halagos sobre...",
        opciones: [
            { valor: 'A', descripcion: 'El carácter y la consistencia de la persona.' },
            { valor: 'B', descripcion: 'Los logros y la inteligencia.' },
            { valor: 'C', descripcion: 'La esencia y el sentir de la persona.' }
        ]
    },
    {
        nivel: 2,
        texto: "Confianza: La gente confía en ti porque...",
        opciones: [
            { valor: 'A', descripcion: 'Eres predecible y sólido.' },
            { valor: 'B', descripcion: 'Eres eficiente y resolutivo.' },
            { valor: 'C', descripcion: 'Eres empático y humano.' }
        ]
    },

    // NIVEL 3 - Carisma de Autoridad (12 preguntas)
    {
        nivel: 3,
        texto: "Liderazgo: Tu rol natural es...",
        opciones: [
            { valor: 'A', descripcion: 'El Maestro (enseñas el camino).' },
            { valor: 'B', descripcion: 'El Comandante (diriges la ejecución).' },
            { valor: 'C', descripcion: 'El Coach (empoderas a los demás).' }
        ]
    },
    {
        nivel: 3,
        texto: "Toma de decisiones: Al decidir algo para un grupo...",
        opciones: [
            { valor: 'A', descripcion: 'Explicas el \"por qué\" detalladamente.' },
            { valor: 'B', descripcion: 'Dices \"confíen en mí, vamos por aquí\".' },
            { valor: 'C', descripcion: 'Preguntas \"¿cómo nos sentimos con esta dirección?\".' }
        ]
    },
    {
        nivel: 3,
        texto: "Crisis de tiempo: Si falta una hora para una entrega...",
        opciones: [
            { valor: 'A', descripcion: 'Das instrucciones claras y lógicas.' },
            { valor: 'B', descripcion: 'Tomas el mando absoluto y delegas con fuerza.' },
            { valor: 'C', descripcion: 'Motivas al equipo para un último esfuerzo conjunto.' }
        ]
    },
    {
        nivel: 3,
        texto: "Postura en reuniones:",
        opciones: [
            { valor: 'A', descripcion: 'Erguida, pero relajada, con mirada atenta.' },
            { valor: 'B', descripcion: 'Dominante, ocupando espacio y con gestos firmes.' },
            { valor: 'C', descripcion: 'Inclinada hacia adelante, mostrando interés y apoyo.' }
        ]
    },
    {
        nivel: 3,
        texto: "Visión de éxito: El éxito para ti es...",
        opciones: [
            { valor: 'A', descripcion: 'Que todos hayan entendido la lección.' },
            { valor: 'B', descripcion: 'Haber alcanzado el objetivo a toda costa.' },
            { valor: 'C', descripcion: 'Que el equipo haya crecido y se sienta orgulloso.' }
        ]
    },
    {
        nivel: 3,
        texto: "Uso del \"No\": Cuando dices que no...",
        opciones: [
            { valor: 'A', descripcion: 'Lo justificas con argumentos sólidos.' },
            { valor: 'B', descripcion: 'Es un \"no\" final y tajante.' },
            { valor: 'C', descripcion: 'Es un \"no, pero...\" buscando no herir.' }
        ]
    },
    {
        nivel: 3,
        texto: "Delegación: Delegas porque...",
        opciones: [
            { valor: 'A', descripcion: 'Es lo más eficiente para el sistema.' },
            { valor: 'B', descripcion: 'Necesitas que otros ejecuten tu visión.' },
            { valor: 'C', descripcion: 'Quieres que otros desarrollen sus habilidades.' }
        ]
    },
    {
        nivel: 3,
        texto: "Inspiración: Inspiras a los demás mediante...",
        opciones: [
            { valor: 'A', descripcion: 'Tu conocimiento y sabiduría.' },
            { valor: 'B', descripcion: 'Tu determinación e imparatibilidad.' },
            { valor: 'C', descripcion: 'Tu calidez y fe en ellos.' }
        ]
    },
    {
        nivel: 3,
        texto: "Manejo del estatus: En un grupo nuevo...",
        opciones: [
            { valor: 'A', descripcion: 'Te ganas el respeto por lo que sabes.' },
            { valor: 'B', descripcion: 'Te ganas el respeto por tu seguridad personal.' },
            { valor: 'C', descripcion: 'Te ganas el respeto por cómo tratas a la gente.' }
        ]
    },
    {
        nivel: 3,
        texto: "Hablar en público: Tu meta principal es...",
        opciones: [
            { valor: 'A', descripcion: 'Informar y dar claridad.' },
            { valor: 'B', descripcion: 'Convencer y mover a la acción.' },
            { valor: 'C', descripcion: 'Inspirar y elevar el espíritu.' }
        ]
    },
    {
        nivel: 3,
        texto: "Corrección: Si alguien no rinde como esperabas...",
        opciones: [
            { valor: 'A', descripcion: 'Le das una guía paso a paso para mejorar.' },
            { valor: 'B', descripcion: 'Le exiges resultados inmediatos.' },
            { valor: 'C', descripcion: 'Le preguntas qué necesita para brillar.' }
        ]
    },
    {
        nivel: 3,
        texto: "Energía final: Después de una charla contigo, la gente se siente...",
        opciones: [
            { valor: 'A', descripcion: 'Iluminada (Light).' },
            { valor: 'B', descripcion: 'Guiada (Lead).' },
            { valor: 'C', descripcion: 'Empoderada (Lift).' }
        ]
    }
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

// Función para obtener opciones según la pregunta
function getOpcionesPorPregunta(pregunta) {
    return pregunta.opciones || [];
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
    const opciones = getOpcionesPorPregunta(pregunta);
    
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
    console.log(`Pregunta ${preguntaActual + 1} respondida:`, valor);
    console.log(`Total respuestas:`, respuestas.length, '/', preguntas.length);
    
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
            console.log('Todas las preguntas respondidas. Respuestas finales:', respuestas);
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
    console.log('Validando respuestas:', {
        totalPreguntas: preguntas.length,
        totalRespuestas: respuestas ? respuestas.length : 0,
        respuestas: respuestas
    });
    
    if (!respuestas || respuestas.length !== preguntas.length) {
        console.error('Respuestas incompletas:', {
            esperadas: preguntas.length,
            recibidas: respuestas ? respuestas.length : 0,
            respuestas: respuestas
        });
        mostrarMensaje(`Por favor, completa todas las preguntas. Faltan ${preguntas.length - (respuestas ? respuestas.length : 0)} respuestas.`, 'error');
        return;
    }
    
    // Verificar que todas las respuestas tengan valor
    const respuestasIncompletas = [];
    respuestas.forEach((r, index) => {
        if (!r || (typeof r === 'string' && r.trim() === '')) {
            respuestasIncompletas.push(index + 1);
        }
    });
    
    if (respuestasIncompletas.length > 0) {
        console.error('Hay respuestas vacías en preguntas:', respuestasIncompletas);
        mostrarMensaje(`Por favor, responde las preguntas: ${respuestasIncompletas.join(', ')}`, 'error');
        return;
    }
    
    console.log('✅ Todas las validaciones pasadas. Enviando datos...');
    
    const submitBtn = document.getElementById('btn-enviar');
    submitBtn.disabled = true;
    submitBtn.textContent = '⏳ Procesando...';
    
    try {
        console.log('Enviando datos:', { nombre, email, respuestasCount: respuestas.length });
        
        // Backend separado en API Gateway
        const apiUrl = `${API_BASE}/api/evaluar`;
        
        const response = await fetch(apiUrl, {
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
        
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        
        // Intentar parsear la respuesta
        let data;
        try {
            const text = await response.text();
            console.log('Response text:', text);
            data = text ? JSON.parse(text) : {};
        } catch (parseError) {
            console.error('Error parsing response:', parseError);
            throw new Error('Error al procesar la respuesta del servidor');
        }
        
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
        console.error('Error completo:', error);
        console.error('Error message:', error.message);
        console.error('Error stack:', error.stack);
        
        let mensajeError = '❌ Error de conexión. Por favor, intenta nuevamente.';
        if (error.message) {
            mensajeError = '❌ ' + error.message;
        }
        mostrarMensaje(mensajeError, 'error');
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
