# Baseline — 2 de octubre de 2026

Fuente: árbol 354779540674593f2b94d3ece0048a4855c7d6a2 de main.

- npm ci: correcto, 420 paquetes.
- npm run build: compiló; falló al recopilar /dashboard: supabaseUrl is required.
- Dependencias: tres paquetes Supabase, Anthropic SDK y mammoth; sin tests.
- Rutas: / redirigía según sesión; /login y /dashboard requerían Supabase; /constructor era recuperable; /api/chat y /api/narrativa dependían de Anthropic.
- No se modificaron matemáticas en el Bloque 1.
- La clonación HTTPS sin credenciales no está disponible; lectura y commits se realizan mediante el conector GitHub. Los archivos binarios originales se preservan en el árbol remoto.
