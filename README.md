# Actividad Ionic con Angular

Aplicacion desarrollada con Ionic Framework y Angular. Presenta un menu lateral,
tres vistas principales, tema claro/oscuro, varias mejoras de experiencia de
usuario y un formulario de contacto con validaciones (Angular Reactive Forms).

## Que utilice

- Ionic Framework para la interfaz movil.
- Angular para la estructura de componentes, rutas y formularios.
- Angular Reactive Forms para el formulario de contacto y sus validaciones.
- Ionicons para los iconos del menu y del contenido.
- SCSS para personalizar colores, fondos y apariencia general.

## Que contiene la aplicacion

- Pagina de `Inicio`.
- Pagina de `Informacion personal`.
- Pagina de `Contacto` (incluye formulario validado).
- Menu lateral para navegar entre las tres opciones.
- Interruptor para cambiar entre tema claro y oscuro.
- Fondos con color en lugar de pantallas blancas.
- Estilo visual adaptado para escritorio y movil.

## Mejoras agregadas

Funcionalidades anadidas sin quitar lo ya existente:

1. Buscador para filtrar los items dentro de cada seccion.
2. Favoritos: marcar items con una estrella; la seleccion se guarda en el navegador.
3. Pull-to-refresh para recargar el contenido deslizando hacia abajo.
4. Botones para copiar el contenido al portapapeles y compartirlo (menu nativo si esta disponible).
5. Ajuste del tamano de texto (A- / A+) desde el menu, para accesibilidad.
6. Selector de color de acento de la aplicacion.
7. Reloj con fecha y hora en vivo en cada pagina.
8. Contador de visitas por seccion.
9. Mensajes de confirmacion (toasts) al copiar o marcar favoritos.

Las preferencias de tema, tamano de texto, color de acento y favoritos quedan
guardadas en `localStorage`.

## Formulario de contacto (Angular Reactive Forms)

La pagina de Contacto incluye un formulario reactivo con validaciones del lado
del cliente. Lo que se programo manualmente:

- Definicion del `FormGroup` con cuatro campos y sus validadores.
- Reglas de validacion por campo:

  | Campo   | Reglas                            |
  |---------|-----------------------------------|
  | nombre  | obligatorio, minimo 3 caracteres  |
  | correo  | obligatorio, formato de email     |
  | asunto  | obligatorio                       |
  | mensaje | obligatorio, minimo 10 caracteres |

- Metodo `hasError()` para mostrar cada mensaje solo cuando el campo fue tocado.
- Metodo `submitContactForm()`: si el formulario es invalido marca los campos y
  avisa; si es valido muestra los datos enviados y limpia el formulario.

El formulario solo aparece en la seccion de contacto y no afecta a las demas vistas.

## Estructura principal

- `src/app/app.component.*` — menu lateral, tema, tamano de texto y color de acento.
- `src/app/folder/folder.page.*` — contenido de cada seccion, mejoras de UX y formulario.
- `src/app/folder/folder.module.ts` — modulo de la pagina (incluye `ReactiveFormsModule`).

## Como ejecutar la aplicacion

1. Instalar las dependencias con `npm install`.
2. Iniciar el servidor de desarrollo con `npm start` (Angular sirve en
   `http://localhost:4200/`) o con `ionic serve`.
3. Abrir en el navegador la direccion que indique la terminal.

Para compilar la version de produccion: `npm run build`.
