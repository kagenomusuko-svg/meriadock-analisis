# Estado de implementación — Metrología causal

Este archivo es el tablero operativo de Work.

Regla: una tarea sólo puede marcarse [x] cuando su implementación y pruebas correspondientes hayan sido comiteadas.

## Último punto seguro

- Estado: EN EJECUCIÓN
- Último commit de implementación: 6e172b0
- Bloque activo: Bloques 7–9; cierre de conexiones en UI y exportación
- Próxima tarea: corregir etiquetas accesibles de selectores y repetir navegador en GitHub Actions

---

## Bloque 1 — Ejecutable sin servicios externos

- [x] Registrar baseline de dependencias, rutas y build. — `5583296`
- [x] Retirar autenticación y dependencia obligatoria de Supabase. — `5583296`
- [x] Hacer que / abra o redirija a /constructor. — `5583296`
- [x] Retirar Anthropic y APIs generativas. — `5583296`
- [x] Eliminar imports y dependencias huérfanas. — `5583296`
- [x] Verificar instalación limpia. — `5583296`
- [x] Verificar tests de humo. — `5583296`
- [x] Verificar build sin API keys ni variables Supabase. — `5583296`

## Bloque 2 — Modelo causal y evento determinado

- [x] Crear modelo estructurado de análisis. — `6610299`, `6e172b0`.
- [x] Separar eventoDeterminado de nodosActivos. — `6610299`, `6e172b0`.
- [x] Separar relaciones internas y relaciones de cierre. — `6610299`, `6e172b0`.
- [x] Garantizar D fuera de W_D. — `6610299`, `6e172b0`.
- [x] Garantizar D fuera de R*. — `6610299`, `6e172b0`.
- [ ] Corregir semántica de E0.
- [ ] Eliminar validaciones dependientes del viejo nodo_final.

## Bloque 3 — R* canónico

- [x] Refactorizar construcción de W_E. — `6e172b0` (motor; interfaz en verificación).
- [x] Eliminar normalización automática por destino como regla universal. — `6e172b0` (motor; interfaz en verificación).
- [x] Implementar Perron–Frobenius como ruta principal. — `6e172b0` (motor; interfaz en verificación).
- [x] Corregir orientación de multiplicación conforme a W R*=ρR*. — `6e172b0` (motor; interfaz en verificación).
- [x] Implementar error, tolerancia, residuo y eigenvalor dominante. — `6e172b0` (motor; interfaz en verificación).
- [x] Eliminar fallback uniforme. — `6e172b0` (motor; interfaz en verificación).
- [x] Separar W_E y W_epsilon. — `6e172b0` (motor; interfaz en verificación).
- [x] Implementar regularización auditable. — `6e172b0` (motor; interfaz en verificación).
- [x] Implementar representación y multiplicación sparse. — `6e172b0` (motor; interfaz en verificación).
- [x] Añadir fixture PF pequeño. — `6e172b0` (motor; interfaz en verificación).
- [x] Añadir prueba sparse de al menos 1,000 nodos. — `6e172b0` (motor; interfaz en verificación).
- [x] Añadir pruebas de reducibilidad, periodicidad y regularización. — `6e172b0` (motor; interfaz en verificación).
- [x] Mantener suma de caminos sólo como diagnóstico renombrado o eliminarla. — `6e172b0` (motor; interfaz en verificación).

## Bloque 4 — Operadores derivados

- [x] Eliminar S calculado desde normas L2. — `6e172b0` (motor; interfaz en verificación).
- [x] Separar Hijos de S automático. — `6e172b0` (motor; interfaz en verificación).
- [x] Implementar S desde componentes discriminados. — `6e172b0` (motor; interfaz en verificación).
- [x] Mantener null o indeterminado cuando falten componentes. — `6e172b0` (motor; interfaz en verificación).
- [x] Mantener R*_neta = R*(1-S). — `6e172b0` (motor; interfaz en verificación).
- [x] Eliminar α por conteo documental. — `6e172b0` (motor; interfaz en verificación).
- [x] Implementar contrato de α discriminado, proporcional y taxonómico. — `6e172b0` (motor; interfaz en verificación).
- [x] Implementar Δ = R* - α sin umbrales universales. — `6e172b0` (motor; interfaz en verificación).
- [x] Eliminar defaults Anteros o modo cuando no hay información. — `6e172b0` (motor; interfaz en verificación).

## Bloque 5 — Cálculos existentes y conexiones

- [ ] Conectar IIC desde interfaz hasta motor.
- [ ] Eliminar restricción de IIC por tipo diseno.
- [ ] Separar Fraude annona de IIC.
- [ ] Añadir y conectar B*.
- [ ] Pasar danio por /api/calcular.
- [ ] Pasar danio por /api/expediente.
- [ ] Devolver dTotal y ajusteDebitor en API.
- [ ] Eliminar estimación automática de trayectoria al 30%.
- [ ] Verificar AD_i = R*_i D_total.
- [ ] Verificar que ningún cálculo existente quede inaccesible por wiring roto.

## Bloque 6 — Robustez y sensibilidad

- [x] Separar sensibilidad canónica y extendida. — `6e172b0` (motor; interfaz en verificación).
- [x] Eliminar Math.random() no registrado. — `6e172b0` (motor; interfaz en verificación).
- [x] Corregir atribución defectuosa de inestabilidad por arista. — `6e172b0` (motor; interfaz en verificación).
- [x] Registrar método y semilla cuando corresponda. — `6e172b0` (motor; interfaz en verificación).
- [x] Unificar autoridad de declaraciones A/B/C/D. — `6e172b0` (motor; interfaz en verificación).
- [x] Marcar funciones legacy de declaración que ya no sean canónicas. — `6e172b0` (motor; interfaz en verificación).

- [ ] Definir cierre del protocolo de robustez en empates de líderes — BLOQUEADA — DECISION_PENDIENTE_EMPATES_ROBUSTEZ.md.

## Bloque 7 — Interfaz y asistente determinista

- [ ] Añadir pantalla “¿Qué quieres hacer con este análisis?”.
- [ ] Registrar las tres familias sólo como orientación, no bloqueo de operadores.
- [ ] Generalizar “caso adverso” a fenómeno y pregunta.
- [ ] Mantener texto libre sin LLM ni parser inteligente.
- [ ] Reorganizar pasos del constructor.
- [ ] Eliminar default de tipo ejecucion.
- [ ] Corregir checkbox de E0.
- [ ] Eliminar heurística de evidencia múltiple.
- [ ] Implementar registry de mensajes ERROR/WARN/INFO.
- [ ] Implementar panel determinista de estado.
- [ ] Centralizar nomenclatura visible.

## Bloque 8 — Expediente y auditoría

- [ ] Evitar que expediente reconstruya o recalcule W.
- [ ] Consumir auditoría producida por el motor.
- [ ] Eliminar fórmula vieja de R* del expediente.
- [ ] Retirar “Tres Series” como arquitectura universal.
- [ ] Modularizar secciones opcionales.
- [ ] Retirar HISTOS automático del núcleo universal.
- [ ] Retirar localización ontológica obligatoria del núcleo universal.
- [ ] Actualizar glosario a operadores vigentes.
- [ ] Implementar auditoría adaptativa para grafos pequeños y grandes.
- [ ] Generar narrativa sólo mediante plantillas deterministas.

## Bloque 9 — Preparación para Taxonomía computable

- [ ] Sacar escalas hardcodeadas de la autoridad del motor.
- [ ] Añadir taxonomiaVersion.
- [ ] Crear contrato y registry de protocolos taxonómicos.
- [ ] Preparar cargador de protocolos.
- [ ] Garantizar que cambiar Taxonomía no exige reescribir fórmulas.
- [ ] Garantizar que añadir dominio no exige reconstruir el motor.

## Infraestructura transversal

- [ ] Añadir suite de tests.
- [ ] Añadir script de test en package.json.
- [ ] Añadir GitHub Actions para install + test + build.
- [ ] Documentar cualquier límite técnico real sin convertirlo en límite teórico.
- [ ] Verificar ausencia de API keys obligatorias.
- [ ] Verificar ausencia de Supabase obligatorio.

---

## Decisiones pendientes

DECISION_PENDIENTE_EMPATES_ROBUSTEZ.md — árbol A/B/C/D no define empates de líderes. La implementación devuelve indeterminado y conserva los escenarios; se requiere confirmar esa restricción o definir comparación de colíderes.

---

## Historial de commits de implementación

- `5583296` — Bloque 1: instalación limpia, humo y build verdes; sin servicios externos.


- `6610299` — Modelo estructurado y separación de D; pruebas verdes.
- `6e172b0` — Núcleo PF y operadores independientes; 13 pruebas y CI verde (run 37061970463).

La interfaz/expediente/Taxonomía están implementadas y verificadas por 17 pruebas locales y build; cierre pendiente de commit y prueba de navegador en CI.

- `90ab817` — Constructor, expediente determinista y Taxonomía; install/tests/build verdes. Prueba UI detectó selector sin nombre accesible exacto (run 37063380468), corrección en curso. Vercel READY (dpl_Bdb4obtTk11GxJfpyZuSjRMxoXsA).
