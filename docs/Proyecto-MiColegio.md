# MiColegio: Sistema Web para la Gestión de Información Estudiantil

**Autor:** Jhoel Alexander Huchani Porcel  
**Lugar:** Sucre – Bolivia  
**Año:** 2026

---

## INTRODUCCIÓN

La tecnología puede facilitar la organización y consulta de información dentro de las instituciones educativas. A partir de esta necesidad se desarrolla **MiColegio**, una aplicación web orientada principalmente a estudiantes.

El sistema permite iniciar sesión mediante carnet y contraseña y, una vez autenticado, consultar información académica desde una interfaz sencilla y organizada. Entre sus principales funciones se encuentran la consulta de materias, profesores, calificaciones, horarios y entrevistas o citaciones asignadas por la institución.

El proyecto está desarrollado con React, TypeScript y Vite, utilizando React Router para la navegación y una organización por componentes, páginas, repositorios, servicios y datos. Actualmente funciona como un prototipo frontend y utiliza almacenamiento local del navegador para conservar usuarios y sesión.

---

# CAPÍTULO I: PROBLEMA DE INVESTIGACIÓN

## 1. Descripción del problema

La información académica de un estudiante puede encontrarse distribuida entre diferentes medios, lo que puede dificultar su consulta rápida. Entre los datos que un estudiante necesita revisar se encuentran sus materias, profesores, calificaciones, horarios y citaciones.

MiColegio propone reunir estas consultas en una sola plataforma web, evitando que el estudiante tenga que buscar cada información por separado.

## 1.1 Planteamiento del problema

La falta de una plataforma centralizada para consultar información estudiantil puede provocar pérdida de tiempo, dificultad para encontrar datos académicos y dependencia de consultas manuales.

## 1.2 Formulación del problema

**¿Cómo puede un sistema web facilitar la organización y consulta de la información académica de los estudiantes mediante una plataforma sencilla, ordenada y accesible?**

## 1.3 Objetivos

### 1.3.1 Objetivo general

Desarrollar un sistema web que facilite la consulta de información académica de los estudiantes mediante una interfaz sencilla, organizada y fácil de utilizar.

### 1.3.2 Objetivos específicos

- Diseñar una interfaz web clara para el estudiante.
- Implementar un sistema de inicio de sesión mediante carnet y contraseña.
- Organizar la consulta de materias y profesores.
- Permitir consultar las calificaciones por trimestre.
- Permitir consultar el horario semanal de clases.
- Mostrar las entrevistas o citaciones asignadas al estudiante.
- Facilitar la navegación entre las diferentes secciones del portal.

## 1.4 Justificación

### Institucional y social

El sistema propone una forma más organizada de consultar información estudiantil y puede servir como base para una futura plataforma institucional.

### Técnica

El proyecto permite aplicar tecnologías modernas de desarrollo frontend como React, TypeScript, Vite y React Router.

### Académica

El desarrollo permite aplicar conocimientos de programación, diseño de interfaces, organización de proyectos y control de versiones.

---

# CAPÍTULO II: MARCO TEÓRICO

## 2. Conceptos principales

- **Sistema web:** aplicación que funciona mediante un navegador y permite interactuar con diferentes funcionalidades.
- **Frontend:** parte de la aplicación con la que interactúa directamente el usuario.
- **React:** biblioteca utilizada para construir interfaces mediante componentes reutilizables.
- **TypeScript:** lenguaje basado en JavaScript que incorpora tipado estático.
- **Vite:** herramienta utilizada para el desarrollo y compilación de la aplicación.
- **React Router:** herramienta utilizada para controlar la navegación entre las páginas del sistema.
- **CSS:** lenguaje utilizado para definir el diseño y presentación visual de la aplicación.
- **LocalStorage:** mecanismo del navegador utilizado en este prototipo para conservar determinados datos localmente.

---

# CAPÍTULO III: METODOLOGÍA

## 3. Tipo de investigación

El proyecto utiliza un enfoque descriptivo, orientado a identificar las necesidades relacionadas con la consulta y organización de información estudiantil.

## 4. Técnicas de investigación

### Encuesta

Permite conocer las necesidades de los estudiantes respecto al acceso a notas, materias, horarios y otra información académica.

### Entrevista

Permite conocer las necesidades de la institución y las características que debería tener una plataforma estudiantil.

### Observación directa

Permite identificar cómo se consulta y organiza actualmente la información académica y qué dificultades pueden presentarse.

---

# CAPÍTULO IV: DESARROLLO DE LA INNOVACIÓN

## 5. Diseño del producto

MiColegio se diseñó como un portal académico sencillo. Después del inicio de sesión, el estudiante accede a un panel principal desde donde puede entrar a las diferentes funciones del sistema.

## 5.1 Programas y herramientas utilizadas

- **Visual Studio Code:** edición y organización del código.
- **GitHub:** almacenamiento del repositorio y control de cambios.
- **Vite:** entorno de desarrollo y compilación.
- **React:** construcción de la interfaz.
- **TypeScript:** desarrollo del código con tipado.
- **Vercel:** plataforma prevista para el despliegue de la aplicación.

## 5.2 Características del producto

### 5.2.1 Inicio de sesión y registro

El usuario puede ingresar mediante carnet y contraseña. También existe un formulario de registro para crear usuarios dentro del prototipo.

### 5.2.2 Panel principal

El panel muestra el nombre del estudiante, su curso, el promedio actual y la cantidad de entrevistas pendientes. También proporciona accesos directos a:

- Mis Materias
- Mis Notas
- Mi Horario
- Entrevistas

Además, muestra la próxima citación pendiente cuando existe una asignada.

### 5.2.3 Mis Materias

La sección presenta las materias del curso y la información del profesor correspondiente, junto con una descripción del contenido.

### 5.2.4 Mis Notas

La sección permite consultar las calificaciones del estudiante. Las notas están organizadas en:

- Primer trimestre
- Segundo trimestre
- Tercer trimestre

Al seleccionar un trimestre, el sistema muestra las calificaciones correspondientes y calcula el promedio de las notas disponibles.

### 5.2.5 Mi Horario

Presenta el horario semanal del curso con día, materia, horario y profesor. La información está organizada de lunes a viernes.

### 5.2.6 Entrevistas

La sección permite al estudiante consultar las entrevistas o citaciones que fueron asignadas por la institución. Se muestran datos como materia, motivo, fecha, hora, lugar, estado y observación.

Esta función es de consulta: el estudiante visualiza las citaciones que ya fueron asignadas.

### 5.2.7 Cerrar sesión

El usuario puede cerrar su sesión desde el panel principal. Al hacerlo, el sistema elimina la sesión local y vuelve a la pantalla de inicio de sesión.

## 5.3 Organización del proyecto

```text
src/
├── components/
│   ├── auth/
│   ├── layout/
│   └── ...
├── data/
│   ├── alumnos.json
│   ├── cursos.json
│   ├── horarios.json
│   ├── notas.json
│   ├── entrevistas.json
│   └── users.json
├── pages/
│   ├── auth/
│   ├── CursosPage.tsx
│   ├── NotasPage.tsx
│   ├── HorariosPage.tsx
│   ├── EntrevistaPage.tsx
│   └── HomePage.tsx
├── repositories/
├── services/
├── types/
└── App.tsx
```

La navegación se encuentra organizada mediante rutas para `/login`, `/`, `/cursos`, `/notas`, `/horarios` y `/entrevista`.

## 5.4 Arquitectura funcional

El proyecto separa la interfaz de usuario de la lógica de acceso a datos mediante repositorios. Los componentes y páginas presentan la información, mientras que los repositorios se encargan de obtener los datos utilizados por las diferentes secciones.

En el estado actual, la autenticación y determinados datos se almacenan localmente en el navegador. Por lo tanto, esta versión debe considerarse un **prototipo frontend**, no un sistema institucional con una base de datos y autenticación de producción.

## 5.5 Utilidad del producto

El sistema está dirigido principalmente a estudiantes y permite consultar desde un solo portal información relacionada con su formación académica.

Su utilidad principal consiste en centralizar las consultas de materias, calificaciones, horarios y citaciones dentro de una interfaz organizada.

## 5.6 Estructura de costos

Para una versión académica y de prototipo, los principales recursos utilizados son herramientas de desarrollo y servicios con opciones gratuitas. Una implementación institucional completa requeriría considerar costos de dominio, alojamiento, base de datos, mantenimiento y seguridad.

---

# CAPÍTULO V: RESULTADOS

## 6. Resultados obtenidos

Se obtuvo una aplicación web funcional con navegación entre diferentes módulos académicos. El estudiante puede iniciar sesión, acceder al panel principal y consultar materias, notas, horarios y entrevistas asignadas.

También se incorporó la consulta de notas por tres trimestres y el cálculo del promedio según el periodo seleccionado.

## 6.1 Conclusiones

- Se desarrolló una interfaz web orientada a la consulta de información estudiantil.
- Se organizaron las principales funciones académicas en diferentes secciones.
- Se implementó navegación mediante rutas utilizando React Router.
- Se incorporó la consulta de calificaciones por trimestre.
- Se implementó la visualización de horarios y entrevistas asignadas.
- El proyecto demuestra la utilidad de una plataforma web para centralizar consultas académicas.

## 6.2 Recomendaciones

- Conectar el sistema a un backend y una base de datos para una implementación institucional real.
- Implementar autenticación segura y control de permisos.
- Incorporar un módulo administrativo para que personal autorizado pueda actualizar notas, materias, horarios y citaciones.
- Mantener actualizada la información académica.
- Realizar pruebas periódicas de funcionamiento, seguridad y usabilidad.

---

## Tecnologías del proyecto

**React + TypeScript + Vite + React Router + CSS + GitHub + Visual Studio Code + Vercel**

## Repositorio

**Frontend-Proyect — MiColegio**

Sucre – Bolivia, 2026
