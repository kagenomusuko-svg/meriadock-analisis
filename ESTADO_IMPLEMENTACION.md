# Estado de implementación — Metrología causal

Este archivo es el tablero operativo de Work.

Regla: una tarea sólo puede marcarse [x] cuando su implementación y pruebas correspondientes hayan sido comiteadas.

## Último punto seguro

- Estado: EN EJECUCIÓN
- Último commit de implementación: 5583296
- Bloque activo: Bloque 2
- Próxima tarea: separar D y el modelo estructurado

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

- [ ] Crear modelo estructurado de análisis.
- [ ] Separar eventoDeterminado de nodosActivos.
- [ ] Separar relaciones internas y relaciones de cierre.
- [ ] Garantizar D fuera de W_D.
- [ ] Garantizar D fuera de R*.
- [ ] Corregir semántica de E0.
- [ ] Eliminar validaciones dependientes del viejo nodo_final.

## Bloque 3 — R* canónico

- [ ] Refactorizar construcción de W_E.
- [ ] Eliminar normalización automática por destino como regla universal.
- [ ] Implementar Perron–Frobenius como ruta principal.
- [ ] Corregir orientación de multiplicación conforme a W R*=ρR*.
- [ ] Implementar error, tolerancia, residuo y eigenvalor dominante.
- [ ] Eliminar fallback uniforme.
- [ ] Separar W_E y W_epsilon.
- [ ] Implementar regularización auditable.
- [ ] Implementar representación y multiplicación sparse.
- [ ] Añadir fixture PF pequeño.
- [ ] Añadir prueba sparse de al menos 1,000 nodos.
- [ ] Añadir pruebas de reducibilidad, periodicidad y regularización.
- [ ] Mantener suma de caminos sólo como diagnóstico renombrado o eliminarla.

## Bloque 4 — Operadores derivados

- [ ] Eliminar S calculado desde normas L2.
- [ ] Separar Hijos de S automático.
- [ ] Implementar S desde componentes discriminados.
- [ ] Mantener null o indeterminado cuando falten componentes.
- [ ] Mantener R*_neta = R*(1-S).
- [ ] Eliminar α por conteo documental.
- [ ] Implementar contrato de α discriminado, proporcional y taxonómico.
- [ ] Implementar Δ = R* - α sin umbrales universales.
- [ ] Eliminar defaults Anteros o modo cuando no hay información.

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

- [ ] Separar sensibilidad canónica y extendida.
- [ ] Eliminar Math.random() no registrado.
- [ ] Corregir atribución defectuosa de inestabilidad por arista.
- [ ] Registrar método y semilla cuando corresponda.
- [ ] Unificar autoridad de declaraciones A/B/C/D.
- [ ] Marcar funciones legacy de declaración que ya no sean canónicas.

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

Ninguna registrada.

---

## Historial de commits de implementación

- `5583296` — Bloque 1: instalación limpia, humo y build verdes; sin servicios externos.

