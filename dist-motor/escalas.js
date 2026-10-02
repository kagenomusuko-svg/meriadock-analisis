// LEGACY: evidencia histórica del prototipo; no es autoridad del motor ni de la interfaz.
// E0: transición no materialmente acreditada; no afirma inexistencia causal.
"use strict";

// Escalas de evidencia por dominio — Taxonomia General de Aplicaciones
// Cada escala tiene niveles 0-8 con rango [min, max]
// El midpoint se calcula como (min + max) / 2
// Nivel 0 en todos los dominios = ausencia de evidencia o arista nula, peso 0.00

var ESCALAS = {

  // Escala general — aplica cuando no hay dominio especifico
  "general": {
    "0": [0.00, 0.00],
    "1": [0.75, 0.95],  // Documento directo que registra la instruccion o decision causal
    "2": [0.55, 0.75],  // Analisis pericial que reconstruye la cadena causal
    "3": [0.40, 0.60],  // Testimonios convergentes de fuentes independientes con documentacion parcial
    "4": [0.35, 0.55],  // Correlacion estadistica documentada
    "5": [0.30, 0.50],  // Testimonio unico con documentacion parcial corroborante
    "6": [0.25, 0.45],  // Posicion estructural del nodo en el sistema
    "7": [0.15, 0.35],  // Correlacion debil o indicio circunstancial
    "8": [0.05, 0.20]   // Dicho unico sin corroboracion
  },

  // Cap. 1 — Derecho penal y civil
  "penal": {
    "0": [0.00, 0.00],
    "1": [0.75, 0.95],  // Documento directo con instruccion o acuerdo explicito
    "2": [0.70, 0.90],  // Peritaje forense o analisis tecnico especializado
    "3": [0.45, 0.65],  // Testimonios convergentes con corroboracion documental
    "4": [0.38, 0.58],  // Correlacion estadistica o patron documentado
    "5": [0.28, 0.48],  // Testimonio unico con corroboracion documental parcial
    "6": [0.18, 0.38],  // Inferencia estructural por posicion en el sistema
    "7": [0.08, 0.28],  // Correlacion temporal o espacial sin mecanismo documentado
    "8": [0.03, 0.18]   // Dicho unico sin corroboracion
  },

  // Cap. 2 — Derecho laboral
  "laboral": {
    "0": [0.00, 0.00],
    "1": [0.76, 0.92],  // Documento directo con instruccion o protocolo obligatorio explicito
    "2": [0.65, 0.82],  // Documento institucional obligatorio con lenguaje imperativo
    "3": [0.50, 0.68],  // Testimonios multiples convergentes con corroboracion documental parcial
    "4": [0.42, 0.62],  // Correlacion estadistica controlada
    "5": [0.28, 0.48],  // Testimonio unico con respaldo documental parcial
    "6": [0.20, 0.38],  // Inferencia estructural por posicion jerarquica y contexto organizacional
    "7": [0.07, 0.24],  // Correlacion temporal o espacial sin mecanismo documentado
    "8": [0.04, 0.16]   // Dicho unico sin respaldo de ningun tipo
  },

  // Cap. 3 — Derecho penal internacional
  "penal_internacional": {
    "0": [0.00, 0.00],
    "1": [0.76, 0.93],  // Documento oficial con instruccion explicita o registro de cadena de mando
    "2": [0.68, 0.88],  // Peritaje forense masivo o analisis tecnico especializado
    "3": [0.52, 0.72],  // Testimonios multiples convergentes de sobrevivientes con corroboracion
    "4": [0.45, 0.68],  // Testimonio unico de sobreviviente — status especial
    "5": [0.38, 0.58],  // Correlacion estadistica o patron documentado en registros historicos
    "6": [0.20, 0.42],  // Inferencia estructural por posicion en la cadena de mando
    "7": [0.08, 0.28],  // Correlacion temporal o espacial
    "8": [0.04, 0.18]   // Fuente unica sin corroboracion
  },

  // Cap. 4 — Derecho ambiental
  "ambiental": {
    "0": [0.00, 0.00],
    "1": [0.74, 0.92],  // Documento corporativo o regulatorio directo
    "2": [0.68, 0.87],  // Peritaje cientifico-tecnico de dispersion y atribucion
    "3": [0.50, 0.68],  // Monitoreo ambiental oficial convergente con analisis pericial
    "4": [0.38, 0.58],  // Correlacion estadistica controlada en datos de monitoreo
    "5": [0.28, 0.48],  // Testimonios convergentes de comunidades afectadas con corroboracion parcial
    "6": [0.18, 0.38],  // Inferencia estructural por posicion en el sistema productivo o regulatorio
    "7": [0.07, 0.24],  // Correlacion espacio-temporal sin modelado de dispersion
    "8": [0.04, 0.16]   // Estimacion sin corroboracion tecnica
  },

  // Cap. 5 — Derecho de familia
  "familia": {
    "0": [0.00, 0.00],
    "1": [0.74, 0.90],  // Documento directo que registra el acto o la omision
    "2": [0.65, 0.84],  // Peritaje clinico especializado convergente con evidencia documental
    "3": [0.48, 0.66],  // Testimonios multiples convergentes de fuentes independientes
    "4": [0.38, 0.65],  // Testimonio del menor — status especial segun edad y condicion
    "5": [0.28, 0.48],  // Correlacion de patrones de comportamiento documentados
    "6": [0.18, 0.38],  // Inferencia estructural desde el contexto familiar documentado
    "7": [0.07, 0.24],  // Correlacion conductual sin mecanismo documentado
    "8": [0.04, 0.16]   // Fuente unica sin corroboracion
  },

  // Cap. 6 — Derecho de la competencia
  "competencia": {
    "0": [0.00, 0.00],
    "1": [0.76, 0.93],  // Documento interno directo con instruccion o acuerdo explicito
    "2": [0.68, 0.87],  // Peritaje economico forense o analisis tecnico especializado
    "3": [0.50, 0.68],  // Declaraciones convergentes de testigos con corroboracion documental
    "4": [0.42, 0.65],  // Analisis estadistico del comportamiento del mercado
    "5": [0.28, 0.48],  // Comunicaciones ambiguas o circunstanciales
    "6": [0.18, 0.38],  // Inferencia estructural por posicion en la cadena de decision
    "7": [0.07, 0.25],  // Correlacion temporal o de mercado sin mecanismo documentado
    "8": [0.04, 0.16]   // Dicho unico sin corroboracion
  },

  // Cap. 7 — Propiedad intelectual
  "propiedad_intelectual": {
    "0": [0.00, 0.00],
    "1": [0.74, 0.92],  // Documento directo de autoria o invencion con fecha verificable
    "2": [0.65, 0.85],  // Peritaje tecnico especializado en el campo de la obra o invencion
    "3": [0.48, 0.66],  // Testimonios convergentes de colaboradores con corroboracion documental
    "4": [0.58, 0.78],  // Analisis de proceso creativo mediante metadatos y versiones digitales
    "5": [0.38, 0.58],  // Similitud tecnica documentada
    "6": [0.18, 0.38],  // Inferencia estructural por posicion en el proceso creativo
    "7": [0.07, 0.24],  // Correlacion temporal o contextual sin mecanismo documentado
    "8": [0.04, 0.16]   // Fuente unica sin corroboracion
  },

  // Cap. 8 — Responsabilidad medica
  "medica": {
    "0": [0.00, 0.00],
    "1": [0.72, 0.90],  // Historia clinica completa, registros medicos y protocolos institucionales
    "2": [0.65, 0.84],  // Peritaje medico especializado convergente con evidencia documental
    "3": [0.48, 0.66],  // Testimonios convergentes del equipo clinico con corroboracion documental
    "4": [0.40, 0.60],  // Analisis de patrones de complicaciones o eventos adversos
    "5": [0.28, 0.48],  // Testimonio unico con corroboracion parcial
    "6": [0.18, 0.38],  // Inferencia estructural por posicion en el sistema clinico o protocolo
    "7": [0.07, 0.24],  // Correlacion temporal o clinica sin mecanismo documentado
    "8": [0.04, 0.16]   // Fuente unica sin corroboracion tecnica
  },

  // Cap. 9 — Derecho tributario
  "tributario": {
    "0": [0.00, 0.00],
    "1": [0.74, 0.92],  // Documento fiscal o financiero directo con instruccion o registro explicito
    "2": [0.65, 0.85],  // Peritaje financiero-contable especializado
    "3": [0.48, 0.66],  // Declaraciones convergentes de testigos con corroboracion documental fiscal
    "4": [0.40, 0.62],  // Analisis estadistico de comportamiento fiscal atipico
    "5": [0.28, 0.48],  // Documentacion de la estructura offshore o societal con inferencia de funcion
    "6": [0.18, 0.38],  // Inferencia estructural por posicion en la red de entidades relacionadas
    "7": [0.07, 0.24],  // Correlacion patrimonial sin mecanismo documentado
    "8": [0.04, 0.16]   // Dicho unico sin corroboracion
  },

  // Cap. 10 — Arbitraje e inversion extranjera
  "arbitraje": {
    "0": [0.00, 0.00],
    "1": [0.72, 0.91],  // Documento contractual, regulatorio o estatal directo
    "2": [0.65, 0.85],  // Peritaje economico-financiero especializado
    "3": [0.48, 0.66],  // Testimonios convergentes con corroboracion documental
    "4": [0.38, 0.58],  // Analisis comparativo de trato con inversores en situacion comparable
    "5": [0.28, 0.48],  // Analisis del entorno regulatorio y senales del Estado
    "6": [0.18, 0.38],  // Inferencia estructural por posicion del Estado en el marco regulatorio
    "7": [0.07, 0.24],  // Correlacion temporal entre accion estatal y deterioro del valor
    "8": [0.04, 0.16]   // Fuente unica sin corroboracion
  },

  // Cap. 11 — Credito y sistema financiero
  "financiero": {
    "0": [0.00, 0.00],
    "1": [0.74, 0.92],
    "2": [0.65, 0.85],
    "3": [0.48, 0.66],
    "4": [0.40, 0.62],
    "5": [0.28, 0.48],
    "6": [0.18, 0.38],
    "7": [0.07, 0.24],
    "8": [0.04, 0.16]
  },

  // Cap. 12 — Insolvencia y quiebra
  "insolvencia": {
    "0": [0.00, 0.00],
    "1": [0.74, 0.92],
    "2": [0.65, 0.85],
    "3": [0.48, 0.66],
    "4": [0.38, 0.58],
    "5": [0.28, 0.48],
    "6": [0.18, 0.38],
    "7": [0.07, 0.24],
    "8": [0.04, 0.16]
  },

  // Cap. 13 — Gobierno corporativo
  "corporativo": {
    "0": [0.00, 0.00],
    "1": [0.74, 0.92],
    "2": [0.65, 0.85],
    "3": [0.48, 0.66],
    "4": [0.38, 0.58],
    "5": [0.28, 0.48],
    "6": [0.18, 0.38],
    "7": [0.07, 0.24],
    "8": [0.04, 0.16]
  },

  // Cap. 14 — Finanzas de mercado
  "mercado": {
    "0": [0.00, 0.00],
    "1": [0.74, 0.92],
    "2": [0.65, 0.85],
    "3": [0.48, 0.66],
    "4": [0.38, 0.58],
    "5": [0.28, 0.48],
    "6": [0.18, 0.38],
    "7": [0.07, 0.24],
    "8": [0.04, 0.16]
  },

  // Cap. 15 — Seguros
  "seguros": {
    "0": [0.00, 0.00],
    "1": [0.74, 0.92],
    "2": [0.65, 0.85],
    "3": [0.48, 0.66],
    "4": [0.38, 0.60],
    "5": [0.28, 0.48],
    "6": [0.18, 0.38],
    "7": [0.07, 0.24],
    "8": [0.04, 0.16]
  },

  // Cap. 16 — Economia del comportamiento (Nivel C, candidatos)
  "comportamiento": {
    "0": [0.00, 0.00],
    "1": [0.60, 0.82],
    "2": [0.50, 0.74],
    "3": [0.38, 0.58],
    "4": [0.28, 0.48],
    "5": [0.18, 0.38],
    "6": [0.10, 0.26],
    "7": [0.04, 0.18],
    "8": [0.00, 0.08]
  },

  // Cap. 17 — Plataformas digitales (Nivel C, candidatos)
  "digital": {
    "0": [0.00, 0.00],
    "1": [0.72, 0.90],
    "2": [0.62, 0.82],
    "3": [0.48, 0.66],
    "4": [0.38, 0.58],
    "5": [0.28, 0.48],
    "6": [0.18, 0.38],
    "7": [0.07, 0.24],
    "8": [0.00, 0.12]
  },

  // Cap. 18 — Comercio internacional
  "comercio": {
    "0": [0.00, 0.00],
    "1": [0.74, 0.92],
    "2": [0.65, 0.85],
    "3": [0.48, 0.66],
    "4": [0.38, 0.60],
    "5": [0.28, 0.50],
    "6": [0.18, 0.40],
    "7": [0.07, 0.24],
    "8": [0.04, 0.16]
  },

  // Cap. 19 — Economia de la salud
  "economia_salud": {
    "0": [0.00, 0.00],
    "1": [0.72, 0.90],
    "2": [0.62, 0.82],
    "3": [0.48, 0.66],
    "4": [0.38, 0.58],
    "5": [0.28, 0.48],
    "6": [0.18, 0.38],
    "7": [0.07, 0.24],
    "8": [0.04, 0.16]
  },

  // Cap. 20 — Criptoeconomia (Nivel C, candidatos)
  "cripto": {
    "0": [0.00, 0.00],
    "1": [0.72, 0.88],
    "2": [0.60, 0.80],
    "3": [0.48, 0.66],
    "4": [0.38, 0.58],
    "5": [0.28, 0.48],
    "6": [0.18, 0.38],
    "7": [0.05, 0.22],
    "8": [0.00, 0.10]
  },

  // Cap. 21 — Epidemiologia y salud publica
  "epidemiologia": {
    "0": [0.00, 0.00],
    "1": [0.74, 0.92],
    "2": [0.65, 0.85],
    "3": [0.48, 0.66],
    "4": [0.38, 0.58],
    "5": [0.28, 0.48],
    "6": [0.18, 0.38],
    "7": [0.07, 0.24],
    "8": [0.04, 0.16]
  },

  // Cap. 22 — Oncologia
  "oncologia": {
    "0": [0.00, 0.00],
    "1": [0.74, 0.92],
    "2": [0.65, 0.85],
    "3": [0.48, 0.66],
    "4": [0.38, 0.58],
    "5": [0.28, 0.48],
    "6": [0.18, 0.38],
    "7": [0.07, 0.24],
    "8": [0.04, 0.16]
  },

  // Cap. 23 — Adicciones
  "adicciones": {
    "0": [0.00, 0.00],
    "1": [0.74, 0.92],
    "2": [0.65, 0.85],
    "3": [0.48, 0.66],
    "4": [0.38, 0.58],
    "5": [0.28, 0.48],
    "6": [0.18, 0.38],
    "7": [0.07, 0.24],
    "8": [0.04, 0.16]
  },

  // Cap. 24 — Salud mental
  "salud_mental": {
    "0": [0.00, 0.00],
    "1": [0.72, 0.90],
    "2": [0.65, 0.85],
    "3": [0.48, 0.66],
    "4": [0.38, 0.58],
    "5": [0.28, 0.48],
    "6": [0.18, 0.38],
    "7": [0.07, 0.24],
    "8": [0.04, 0.16]
  },

  // Cap. 25 — Medicina laboral
  "medicina_laboral": {
    "0": [0.00, 0.00],
    "1": [0.74, 0.92],
    "2": [0.65, 0.85],
    "3": [0.48, 0.66],
    "4": [0.38, 0.58],
    "5": [0.28, 0.48],
    "6": [0.18, 0.38],
    "7": [0.07, 0.24],
    "8": [0.04, 0.16]
  },

  // Cap. 26 — Bioetica y experimentacion (Nivel C)
  "bioetica": {
    "0": [0.00, 0.00],
    "1": [0.70, 0.90],
    "2": [0.58, 0.78],
    "3": [0.46, 0.64],
    "4": [0.36, 0.56],
    "5": [0.26, 0.44],
    "6": [0.16, 0.34],
    "7": [0.06, 0.22],
    "8": [0.03, 0.14]
  },

  // Cap. 27 — Sistemas de salud y politica sanitaria
  "politica_sanitaria": {
    "0": [0.00, 0.00],
    "1": [0.72, 0.90],
    "2": [0.62, 0.82],
    "3": [0.48, 0.66],
    "4": [0.38, 0.58],
    "5": [0.28, 0.48],
    "6": [0.18, 0.38],
    "7": [0.07, 0.24],
    "8": [0.03, 0.14]
  },

  // Cap. 28 — Trasplantes y donacion
  "trasplantes": {
    "0": [0.00, 0.00],
    "1": [0.72, 0.90],
    "2": [0.62, 0.82],
    "3": [0.48, 0.66],
    "4": [0.38, 0.58],
    "5": [0.28, 0.48],
    "6": [0.18, 0.38],
    "7": [0.07, 0.24],
    "8": [0.03, 0.14]
  },

  // Cap. 29-30 — Educacion (docente y politicas)
  "educacion": {
    "0": [0.00, 0.00],
    "1": [0.72, 0.90],
    "2": [0.62, 0.82],
    "3": [0.46, 0.64],
    "4": [0.36, 0.56],
    "5": [0.20, 0.38],
    "6": [0.14, 0.28],
    "7": [0.07, 0.22],
    "8": [0.03, 0.14]
  },

  // Cap. 31 — Acoso escolar
  "acoso_escolar": {
    "0": [0.00, 0.00],
    "1": [0.72, 0.90],
    "2": [0.62, 0.82],
    "3": [0.46, 0.64],
    "4": [0.36, 0.56],
    "5": [0.26, 0.46],
    "6": [0.16, 0.34],
    "7": [0.07, 0.22],
    "8": [0.03, 0.14]
  },

  // Cap. 32 — Educacion superior e investigacion
  "investigacion": {
    "0": [0.00, 0.00],
    "1": [0.72, 0.90],
    "2": [0.62, 0.82],
    "3": [0.46, 0.64],
    "4": [0.36, 0.56],
    "5": [0.26, 0.46],
    "6": [0.16, 0.32],
    "7": [0.07, 0.22],
    "8": [0.03, 0.14]
  },

  // Caps. 35-41 — Organizaciones y gestion (escala unificada O)
  "organizacional": {
    "0": [0.00, 0.00],
    "1": [0.72, 0.90],
    "2": [0.60, 0.80],
    "3": [0.46, 0.64],
    "4": [0.36, 0.56],
    "5": [0.26, 0.44],
    "6": [0.14, 0.28],
    "7": [0.07, 0.22],
    "8": [0.02, 0.12]
  },

  // Caps. 42-47 — Historia, geopolitica, ciencias sociales (escala unificada Hi)
  "historico": {
    "0": [0.00, 0.00],
    "1": [0.72, 0.90],
    "2": [0.62, 0.80],
    "3": [0.52, 0.70],
    "4": [0.40, 0.58],
    "5": [0.30, 0.50],
    "6": [0.16, 0.34],
    "7": [0.06, 0.20],
    "8": [0.02, 0.14]
  }
};

// Obtener rango [min, max] para un dominio y nivel dados
// nivel puede ser numero (1-8) o string ("1"-"8")
// dominio: string del dominio, por defecto "general"
// Retorna { min, max, midpoint }
exports.obtenerRango = function(dominio, nivel) {
  var escala = ESCALAS[dominio] || ESCALAS["general"];
  var key = String(nivel);
  var rango = escala[key] || ESCALAS["general"][key] || [0.00, 0.00];
  return {
    min: rango[0],
    max: rango[1],
    midpoint: (rango[0] + rango[1]) / 2
  };
};

// Calcular midpoint directamente
exports.midpoint = function(dominio, nivel) {
  return exports.obtenerRango(dominio, nivel).midpoint;
};

// Lista de dominios disponibles
exports.DOMINIOS = Object.keys(ESCALAS);

exports.ESCALAS = ESCALAS;

