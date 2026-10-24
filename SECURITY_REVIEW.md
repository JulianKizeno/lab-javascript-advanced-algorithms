# Revisión de seguridad — 2026-10-24

Repositorio: `JulianKizeno/lab-javascript-advanced-algorithms`. Rama: `security/review-2026-10-24`.

## Correcciones

- CWE-79: queue input was interpreted as HTML
- CWE-79: stack input was interpreted as HTML
- Remove unused jQuery with known prototype pollution/HTML parsing vulnerabilities (CVE-2019-11358, CVE-2020-11022/11023)

## Auditoría npm después de los cambios

Sin manifiesto npm aplicable; la revisión de bibliotecas vendorizadas se describe en las correcciones.

## Verificación

- Pruebas de regresión de seguridad (`security-tests`): correctas.

## Límites y configuración

- La auditoría cubre el árbol npm resuelto, no demuestra ausencia de vulnerabilidades de lógica, infraestructura o servicios externos. No se ha desplegado ni fusionado este cambio.
