# ORDEN WORK 06 — Parametrización provisional, medición pre-calibración y ciclo metrológico

## Mandato

Trabaja sobre:

kagenomusuko-svg/meriadock-analisis

Punto de partida:

- Work03: ACEPTADO_CON_RESERVAS.
- Work04: ACEPTADA CON RESERVAS EXPLÍCITAS.
- Work05: ACEPTADA CON RESERVAS CONCRETAS.
- Taxonomía: U·1–U·4 + tax-cap01@1…tax-cap78@1.
- Operadores reevaluados: OP01–OP45.
- Operadores activos actuales: 20.
- Reservas clasificadas por Work05:
  - 5 REQUIERE_CALIBRACION;
  - 10 REQUIERE_DECISION;
  - 2 RESERVADO_CONCEPTUAL;
  - 7 FUERA.
- cap02.alpha.1 permanece reservado y no bloquea.
- Fraude annona e I_inv ya están resueltos y activos.

Esta orden CORRIGE un supuesto epistemológico de Work05:

**“pendiente de calibración” no equivale a “incalculable hasta calibrar”.**

La calibración forma parte del ciclo metrológico y no puede convertirse en una condición previa que impida toda medición necesaria para calibrar.

No confundas:

1. operador formalmente definido;
2. parametrización provisional;
3. calibración;
4. validación externa.

La regla rectora de Work06 es:

[
oxed{
	ext{medir provisionalmente}
ightarrow
	ext{contrastar}
ightarrow
	ext{calibrar}
ightarrow
	ext{volver a medir}
}
]

No:

[
oxed{
	ext{no medir hasta calibrar}
}
]

si la calibración requiere precisamente mediciones previas.

El usuario debe poder responder únicamente:

CONTINÚA

y debes retomar desde ESTADO_WORK06_PARAMETRIZACION_PROVISIONAL.md.

---

# 1. Fundamento epistemológico obligatorio

Trata como principio de diseño:

[
oxed{
	ext{éxito metrológico futuro no es condición previa de toda medición presente}
}
]

Una ciencia o metrología puede:

- definir un estimando;
- proponer una parametrización;
- medir provisionalmente;
- observar sensibilidad;
- acumular resultados;
- ajustar parámetros;
- validar externamente.

No necesita acceder al “valor verdadero” del ser qua ser antes de empezar a medir.

La falta de calibración limita la fuerza epistémica de la conclusión; no necesariamente la computabilidad del operador.

---

# 2. Nueva taxonomía de estados epistemológicos de operador

Sustituye el uso binario:

- CALIBRADO / NO CALIBRADO

por estados más precisos.

Estados mínimos:

- FORMALMENTE_DEFINIDO
- PARAMETRIZABLE
- PARAMETRIZADO_PROVISIONALMENTE
- CALIBRADO
- VALIDADO_EXTERNAMENTE
- NO_OPERACIONALIZADO
- REQUIERE_DECISION
- RESERVADO_CONCEPTUAL
- HISTORICO
- FUERA

Definiciones:

## FORMALMENTE_DEFINIDO
Existe objeto medido, inputs y relación/fórmula suficientes.

## PARAMETRIZABLE
La estructura del operador está definida, pero necesita parámetros suministrados explícitamente.

## PARAMETRIZADO_PROVISIONALMENTE
Existe una parametrización candidata, rango, coeficiente o regla provisional con procedencia explícita.

## CALIBRADO
Los parámetros fueron ajustados a evidencia empírica bajo un procedimiento documentado.

## VALIDADO_EXTERNAMENTE
El desempeño fue contrastado fuera del procedimiento/conjunto usado para calibrar.

## NO_OPERACIONALIZADO
Existe concepto, pero no existe todavía relación computable suficientemente definida.

Regla crítica:

[
oxed{
	ext{NO CALIBRADO} 
eq 	ext{NO OPERACIONALIZADO}
}
]

---

# 3. Revisión obligatoria de las reservas por calibración de Work05

Reevalúa, como mínimo:

- OP13 Recurrencia.
- OP14 Exposición.
- OP24 Opacidad.
- OP25 Probabilidad sectorial.
- OP32 Shapley deportivo / S_B.

Para cada uno responde:

1. ¿Qué objeto mide?
2. ¿Existe una fórmula/función/relación ya definida?
3. ¿Existen inputs definidos?
4. ¿Lo único ausente son parámetros/calibración?
5. ¿La Taxonomía ofrece valores candidatos, intervalos, coeficientes ilustrativos o escalas?
6. ¿Puede el analista suministrar parámetros explícitos?
7. ¿Puede calcularse una familia de resultados sobre un rango?
8. ¿Qué afirmaciones quedan prohibidas mientras no esté calibrado?

Clasifica cada uno como:

- IMPLEMENTABLE_NO_CALIBRADO;
- PARAMETRIZABLE;
- NO_OPERACIONALIZADO;
- REQUIERE_DECISION.

No mantengas REQUIERE_CALIBRACION como razón suficiente para no implementar.

---

# 4. Regla de implementación pre-calibración

Si el operador está formalmente definido pero sus parámetros no están calibrados:

DEBE poder implementarse si los parámetros se proporcionan explícitamente.

Patrón:

[
Y=f(X;	heta)
]

con (	heta) no calibrado.

El motor puede calcular:

[
Y=f(X;	heta_{	ext{declarado}})
]

si el analista declara (	heta).

También puede calcular:

[
Y(	heta),qquad 	hetain[	heta_{min},	heta_{max}]
]

si existe un rango provisional autorizado.

El resultado debe etiquetarse como:

PARAMETRIZADO_PROVISIONALMENTE

o equivalente.

Nunca como:

CALIBRADO

si no lo está.

---

# 5. Provisional no significa arbitrario

Un parámetro provisional sólo puede entrar si tiene una fuente explícita.

Fuentes permitidas:

- rango candidato de la Taxonomía;
- propuesta derivada en fuente doctrinal;
- valor introducido explícitamente por el analista;
- protocolo de dominio versionado;
- estimación externa incorporada manualmente con referencia.

Fuentes prohibidas:

- default silencioso;
- “valor típico” inventado por código;
- promedio automático no autorizado;
- coeficiente tomado de otro dominio sin protocolo;
- valor inferido por nombre del actor;
- valor generado por LLM.

Debe conservarse:

- origen;
- versión;
- valor/rango;
- quién lo confirmó;
- fecha/versionado del protocolo;
- estatus epistemológico.

---

# 6. Cálculo por rango y sensibilidad

Cuando exista intervalo provisional:

[
	hetain[a,b]
]

el sistema debe poder, cuando sea matemáticamente apropiado:

- calcular extremos;
- calcular valor central sólo si el protocolo lo autoriza;
- mostrar sensibilidad;
- mostrar monotonicidad;
- identificar cambios de conclusión;
- conservar el rango aplicado.

No ocultes el intervalo detrás de un único punto.

Si la función no es monótona, no asumas que los extremos de (	heta) producen los extremos de Y sin comprobarlo.

---

# 7. Fuerza predicativa del resultado

Para cada resultado no calibrado, la UI y el expediente deben distinguir:

- resultado condicional;
- resultado provisional;
- resultado calibrado;
- resultado validado externamente.

Ejemplo correcto:

“Con la parametrización provisional declarada (	heta=0.35), el operador produce Y=...”

Ejemplo incorrecto:

“El valor real de Y es ...”

La falta de calibración limita la interpretación, no borra la medición.

---

# 8. Ciclo de calibración

Implementa soporte para un ciclo metrológico posterior:

[
	ext{parametrización provisional}
ightarrow
	ext{mediciones}
ightarrow
	ext{comparación}
ightarrow
	ext{ajuste}
ightarrow
	ext{nueva versión}
]

No necesitas ejecutar calibración empírica en Work06.

Sí debes preparar el sistema para que pueda hacerse sin reescribir el motor.

Como mínimo:

- cada resultado conserva versión de parámetros;
- los parámetros son exportables;
- los resultados son reproducibles;
- una nueva calibración puede crear protocolo/versión nueva;
- no sobrescribir retrospectivamente resultados históricos.

---

# 9. Registro de observaciones para calibración futura

Sin exigir almacenamiento de expedientes fuente, crea un formato exportable opcional de observación metrológica.

Debe poder registrar:

- operador;
- dominio;
- protocolo;
- parámetros;
- inputs;
- resultado;
- resultado observado posterior si el analista lo incorpora;
- error/diferencia;
- referencia opcional;
- versión.

No requiere base de datos ni uploads obligatorios.

Puede ser JSON/CSV exportable.

Objetivo:

permitir que una futura fase de calibración use mediciones acumuladas.

---

# 10. Revisión de los 203 estados PROPUESTA_PENDIENTE_CALIBRACION de Work04

No basta con revisar cinco operadores.

Recorre las reglas taxonómicas marcadas:

PROPUESTA_PENDIENTE_CALIBRACION.

Para cada una clasifica:

- ORIENTACION_NO_NUMERICA;
- PARAMETRO_PROVISIONAL_UTILIZABLE;
- RANGO_PROVISIONAL_UTILIZABLE;
- COEFICIENTE_PROVISIONAL_UTILIZABLE;
- EJEMPLO_NO_PARAMETRICO;
- NO_OPERACIONALIZADO;
- REQUIERE_DECISION.

No conviertas automáticamente las 203 reglas en inputs.

Pero tampoco las mantengas inertes sólo por no estar calibradas.

---

# 11. UI

La UI debe mostrar claramente:

- “Parámetro provisional”;
- “Pendiente de calibración”;
- “Confirmado por el analista”;
- “Calibrado”;
- “Validado externamente”.

Si una regla taxonómica propone un rango:

- mostrar el rango;
- explicar su estatus;
- permitir confirmarlo;
- permitir sustituirlo por un valor/rango externo explícito;
- registrar cuál se usó.

Nunca aplicar sugerencia sin confirmación.

---

# 12. Snapshot y expediente

Conservar:

- estado epistemológico;
- parámetro aplicado;
- fuente;
- rango original;
- valor efectivo;
- confirmación humana;
- sensibilidad;
- versión.

El expediente debe poder distinguir:

[
	ext{“resultado condicionado por parametrización provisional”}
]

de:

[
	ext{“resultado obtenido con calibración empírica”}.
]

---

# 13. Revisión de Work05

Actualiza:

- MATRIZ_SUFICIENCIA_OPERADORES_WORK05.md
- REGISTRO_RESERVAS_POST_WORK05.md
- CATALOGO_OPERADORES_ACTIVOS_WORK05.md

No borres el estado histórico.

Añade una columna o versión Work06 que indique la reclasificación.

Especialmente:

REQUIERE_CALIBRACION

no debe persistir como sinónimo de “no implementable”.

---

# 14. cap02.alpha.1

No resolver por esta orden.

Permanece RESERVADO por contradicción doctrinal.

Es distinto del problema de calibración.

No mezclar:

- conflicto de significado;
- falta de calibración.

---

# 15. Operadores REQUIERE_DECISION

No uses esta orden para resolver automáticamente:

- OP15;
- OP17;
- OP18;
- OP22;
- OP23;
- OP34;
- OP35;
- OP39;
- OP40;
- OP45.

Sin embargo, revisa si alguno estaba etiquetado REQUIERE_DECISION sólo porque en realidad faltaba parametrización.

Si la revisión demuestra que no existe contradicción doctrinal y sólo faltan parámetros, documenta la reclasificación y continúa.

Si realmente falta definir el objeto/fórmula, conserva REQUIERE_DECISION.

---

# 16. Tests

Añade pruebas de:

- operador no calibrado pero parametrizable sí calcula;
- sin parámetro explícito queda indeterminado;
- parámetro provisional conserva sourceRef;
- sugerencia no confirmada no entra en cálculo;
- rango provisional produce sensibilidad;
- resultado provisional no se etiqueta calibrado;
- versión de parámetros se conserva;
- exportación de observación reproduce el cálculo;
- calibración nueva no altera resultados históricos;
- ausencia != 0;
- ningún default silencioso.

Mantén las 93 pruebas existentes.

---

# 17. Productos obligatorios

Crea:

- MATRIZ_ESTADOS_EPISTEMOLOGICOS_WORK06.md
- MATRIZ_PARAMETRIZACION_PROVISIONAL_WORK06.md
- REGISTRO_RECLASIFICACION_CALIBRACION_WORK06.md
- ESQUEMA_OBSERVACION_CALIBRACION_WORK06.md
- AUDITORIA_ACEPTACION_WORK06.md
- ESTADO_WORK06_PARAMETRIZACION_PROVISIONAL.md actualizado

Actualiza:

- MAPA_MAESTRO_METROLOGIA_CAUSAL.md
- REPERTORIO_POST_CORRECCION.md
- CATALOGO_OPERADORES_ACTIVOS_WORK05.md
- REGISTRO_RESERVAS_POST_WORK05.md

---

# 18. Criterio de aceptación

Work06 sólo puede cerrar si:

1. las 5 reservas por calibración fueron reevaluadas;
2. las 203 reglas pendientes de calibración fueron clasificadas;
3. ningún operador formalmente definido queda bloqueado sólo por falta de calibración;
4. todo parámetro provisional requiere procedencia + confirmación;
5. UI distingue provisional/calibrado/validado;
6. snapshot/expediente conservan el estatus;
7. existe formato exportable de observaciones;
8. tests/build/Playwright/producción exacta están verdes;
9. auditoría final diferencia NO_OPERACIONALIZADO de NO_CALIBRADO.

---

# 19. Condición de parada

Sólo detente cuando:

A. aparezca una decisión doctrinal verdadera que no pueda resolverse con fuentes vigentes;

o

B. Work06 esté cerrado conforme al criterio de aceptación.

No te detengas porque un parámetro carezca de calibración si el operador ya es formalmente computable.
