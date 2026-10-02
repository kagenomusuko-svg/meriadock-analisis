# Estado de implementación — Metrología causal

Este archivo es el tablero operativo de Work.

Regla: una tarea sólo puede marcarse [x] cuando su implementación y pruebas correspondientes hayan sido comiteadas.

## Último punto seguro

- Estado: CIERRE VERIFICADO — sin decisiones obligatorias
- Último commit de implementación: 6212675
- Bloque activo: ninguno; bloques 1–9 completos
- Próxima tarea: ninguna; el tablero está cerrado. Nuevos protocolos corresponden a ampliaciones futuras.

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
- [x] Corregir semántica de E0. — `90ab817`, `7e50e97`.
- [x] Eliminar validaciones dependientes del viejo nodo_final. — `90ab817`, `7e50e97`.

## Bloque 3 — R* canónico

- [x] Refactorizar construcción de W_E. — `6e172b0`.
- [x] Eliminar normalización automática por destino como regla universal. — `6e172b0`.
- [x] Implementar Perron–Frobenius como ruta principal. — `6e172b0`.
- [x] Corregir orientación de multiplicación conforme a W R*=ρR*. — `6e172b0`.
- [x] Implementar error, tolerancia, residuo y eigenvalor dominante. — `6e172b0`.
- [x] Eliminar fallback uniforme. — `6e172b0`.
- [x] Separar W_E y W_epsilon. — `6e172b0`.
- [x] Implementar regularización auditable. — `6e172b0`.
- [x] Implementar representación y multiplicación sparse. — `6e172b0`.
- [x] Añadir fixture PF pequeño. — `6e172b0`.
- [x] Añadir prueba sparse de al menos 1,000 nodos. — `6e172b0`.
- [x] Añadir pruebas de reducibilidad, periodicidad y regularización. — `6e172b0`.
- [x] Mantener suma de caminos sólo como diagnóstico renombrado o eliminarla. — `6e172b0`.

## Bloque 4 — Operadores derivados

- [x] Eliminar S calculado desde normas L2. — `6e172b0`.
- [x] Separar Hijos de S automático. — `6e172b0`.
- [x] Implementar S desde componentes discriminados. — `6e172b0`.
- [x] Mantener null o indeterminado cuando falten componentes. — `6e172b0`.
- [x] Mantener R*_neta = R*(1-S). — `6e172b0`.
- [x] Eliminar α por conteo documental. — `6e172b0`.
- [x] Implementar contrato de α discriminado, proporcional y taxonómico. — `6e172b0`.
- [x] Implementar Δ = R* - α sin umbrales universales. — `6e172b0`.
- [x] Eliminar defaults Anteros o modo cuando no hay información. — `6e172b0`.

## Bloque 5 — Cálculos existentes y conexiones

- [x] Conectar IIC desde interfaz hasta motor. — `90ab817`, `7e50e97`.
- [x] Eliminar restricción de IIC por tipo diseno. — `90ab817`, `7e50e97`.
- [x] Separar Fraude annona de IIC. — `90ab817`, `7e50e97`.
- [x] Añadir y conectar B*. — `90ab817`, `7e50e97`.
- [x] Pasar danio por /api/calcular. — `90ab817`, `7e50e97`.
- [x] Pasar danio por /api/expediente. — `90ab817`, `7e50e97`.
- [x] Devolver dTotal y ajusteDebitor en API. — `90ab817`, `7e50e97`.
- [x] Eliminar estimación automática de trayectoria al 30%. — `90ab817`, `7e50e97`.
- [x] Verificar AD_i = R*_i D_total. — `90ab817`, `7e50e97`.
- [x] Verificar que ningún cálculo existente quede inaccesible por wiring roto. — `90ab817`, `7e50e97`.

## Bloque 6 — Robustez y sensibilidad

- [x] Separar sensibilidad canónica y extendida. — `6e172b0`.
- [x] Eliminar Math.random() no registrado. — `6e172b0`.
- [x] Corregir atribución defectuosa de inestabilidad por arista. — `6e172b0`.
- [x] Registrar método y semilla cuando corresponda. — `6e172b0`.
- [x] Unificar autoridad de declaraciones A/B/C/D. — `6e172b0`.
- [x] Marcar funciones legacy de declaración que ya no sean canónicas. — `6e172b0`.

- [x] Conservar empates de líderes como indeterminados, sin desempate inventado — `6e172b0`; RESERVA_PROTOCOLO_EMPATES.md (no bloqueante).

## Bloque 7 — Interfaz y asistente determinista

- [x] Añadir pantalla “¿Qué quieres hacer con este análisis?”. — `90ab817`, `7e50e97`.
- [x] Registrar las tres familias sólo como orientación, no bloqueo de operadores. — `90ab817`, `7e50e97`.
- [x] Generalizar “caso adverso” a fenómeno y pregunta. — `90ab817`, `7e50e97`.
- [x] Mantener texto libre sin LLM ni parser inteligente. — `90ab817`, `7e50e97`.
- [x] Reorganizar pasos del constructor. — `90ab817`, `7e50e97`.
- [x] Eliminar default de tipo ejecucion. — `90ab817`, `7e50e97`.
- [x] Corregir checkbox de E0. — `90ab817`, `7e50e97`.
- [x] Eliminar heurística de evidencia múltiple. — `90ab817`, `7e50e97`.
- [x] Implementar registry de mensajes ERROR/WARN/INFO. — `90ab817`, `7e50e97`.
- [x] Implementar panel determinista de estado. — `90ab817`, `7e50e97`.
- [x] Centralizar nomenclatura visible. — `90ab817`, `7e50e97`.

## Bloque 8 — Expediente y auditoría

- [x] Evitar que expediente reconstruya o recalcule W. — `90ab817`, `7e50e97`.
- [x] Consumir auditoría producida por el motor. — `90ab817`, `7e50e97`.
- [x] Eliminar fórmula vieja de R* del expediente. — `90ab817`, `7e50e97`.
- [x] Retirar “Tres Series” como arquitectura universal. — `90ab817`, `7e50e97`.
- [x] Modularizar secciones opcionales. — `90ab817`, `7e50e97`.
- [x] Retirar HISTOS automático del núcleo universal. — `90ab817`, `7e50e97`.
- [x] Retirar localización ontológica obligatoria del núcleo universal. — `90ab817`, `7e50e97`.
- [x] Actualizar glosario a operadores vigentes. — `90ab817`, `7e50e97`.
- [x] Implementar auditoría adaptativa para grafos pequeños y grandes. — `90ab817`, `7e50e97`.
- [x] Generar narrativa sólo mediante plantillas deterministas. — `90ab817`, `7e50e97`.

## Bloque 9 — Preparación para Taxonomía computable

- [x] Sacar escalas hardcodeadas de la autoridad del motor. — `90ab817`, `7e50e97`.
- [x] Añadir taxonomiaVersion. — `90ab817`, `7e50e97`.
- [x] Crear contrato y registry de protocolos taxonómicos. — `90ab817`, `7e50e97`.
- [x] Preparar cargador de protocolos. — `90ab817`, `7e50e97`.
- [x] Garantizar que cambiar Taxonomía no exige reescribir fórmulas. — `90ab817`, `7e50e97`.
- [x] Garantizar que añadir dominio no exige reconstruir el motor. — `90ab817`, `7e50e97`.

## Infraestructura transversal

- [x] Añadir suite de tests. — `90ab817`, `7e50e97`.
- [x] Añadir script de test en package.json. — `90ab817`, `7e50e97`.
- [x] Añadir GitHub Actions para install + test + build. — `90ab817`, `7e50e97`.
- [x] Documentar cualquier límite técnico real sin convertirlo en límite teórico. — `90ab817`, `7e50e97`.
- [x] Verificar ausencia de API keys obligatorias. — `90ab817`, `7e50e97`.
- [x] Verificar ausencia de Supabase obligatorio. — `90ab817`, `7e50e97`.

---

## Decisiones pendientes

Ninguna obligatoria. La regla global de indeterminación resuelve operativamente empates sin inventar una letra; la ampliación taxonómica futura queda descrita en RESERVA_PROTOCOLO_EMPATES.md.

---

## Historial de commits de implementación

- `5583296` — Bloque 1: instalación limpia, humo y build verdes; sin servicios externos.


- `6610299` — Modelo estructurado y separación de D; pruebas verdes.
- `6e172b0` — Núcleo PF y operadores independientes; 13 pruebas y CI verde (run 37061970463).

La interfaz, el expediente y la Taxonomía están comiteados. Verificación completa verde: https://github.com/kagenomusuko-svg/meriadock-analisis/actions/runs/37063742223 (18 pruebas + lint/tipos/build + formulario y descarga en Chromium).

- `90ab817` — Constructor, expediente determinista y Taxonomía; install/tests/build verdes. Prueba UI detectó selector sin nombre accesible exacto (run 37063380468), corrección en curso. Vercel READY (dpl_Bdb4obtTk11GxJfpyZuSjRMxoXsA).

- `7e50e97` — Etiquetas accesibles y α vacío; CI completo verde (run 37063742223).

- `6212675` — Frontera estricta de 10 puntos, reserva no bloqueante de empates y cierre del tablero. 18 pruebas locales y build con lint/tipos verdes. Verificación final y captura: https://github.com/kagenomusuko-svg/meriadock-analisis/actions/runs/37064025902.
