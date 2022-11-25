# Asesorias ITAM

Herramienta que permite unir alumnos que necesitan ayuda con sus estudios con alumnos que quieren ayudar a otros en asignaturas que ellos dominan. Esta aplicación le permite dar asesorías a aquellos alumnos que disfrutan y entienden de un tema y así ayudar a los que necesitan. Del mismo modo, a aquellos alumnos que tienen dificultad para algún tema, esta aplicación les permite mejorar su entendimiento, conocimiento y habilidades de manera cercana y sencilla. Finalmente, la autoridad escolar, ITAM, puede fomentar espacios de colaboración entre alumnos para así poder construir una comunidad más unida, con una mayor identidad y cohesión.

## Tabla de contenido

* [Información general](#información-general)
  * [Software requirements](#software-requirements)
  * [Plan de calidad](#plan-de-calidad)
  * [Arquitectura](#arquitectura)
  * [Metodología](#metodología)
* [Tecnologías utilizadas](#tecnologías-utilizadas)
* [Uso](#uso)
* [Propuesta económica](#propuesta-económica)
  * [Propuesta de venta](#propuesta-de-venta)
  * [Propuesta de costos](#propuesta-de-costos)
* [Créditos](#créditos)
* [Contacto](#contacto)

## Información general

### Software requirements

Los requerimientos de software se pueden consultar [aquí.](https://github.com/Asesorias-ITAM/AsesoriasITAM/blob/main/SRS.md)

### Plan de calidad

El plan de calidad se puede consultar [aquí.](https://github.com/Asesorias-ITAM/AsesoriasITAM/blob/main/PlanCalidad.md)

### Arquitectura

Optamos por el uso de una Arquitectura de Microservicios.

Microservicios es una arquitectura basada en que la mayoría de las acciones del sistema no están dentro del sistema, sino que están en el exterior. Esto significa que cada servicio es independiente y por ende, la modularización del sistema es más sencilla.Esta arquitectura presenta tener grandes ventajas, comparada con las demás, las cuales fueron las que ayudaron a que tomaramos la decisión de usar Microservicios.

Con Microservicios, se tiene una muy alta agilidad que va de la mano con una alta facilidad de despliegue y alta facilidad de prueba. Cada servicio (microservicio) es pequeño y trabaja de manera independiente, para ello, sólo se necesita un equipo de programadores pequeño para darle mantenimiento, aplicarle actualizaciones o modificaciones. Al tener microservicios de manera independiente, si se requieren hacer estos cambios o actualizaciones no afectará el sistema completo al estar de forma independiente, por lo tanto no se tiene que volver a generar o implementar toda la aplicación. Vemos que esto es una gran ventaja para Asesorías ITAM ya que queremos que sea una aplicación que no necesite ser "quitada" o "removida" por cierto tiempo para realizar los cambios ya que es una aplicación que los alumnos puedan tener acceso para mejorar su entendimiento en materias o estar al pendiente de sus cursos. A su vez, como son independientes, la facilidad de prueba para las nuevas funciones o correxiones es escencial para lograr tener una aplicación de asesorias totalmente funcional.

A su vez, la escalabilidad de esta arquitectura es muy vasta ya que los servicios pueden escalar de manera independiente, lo cual le permite a la aplicación en general poder crecer horizontalmente si es que los microservicios requieren más recursos, fortificando la aplicación en conjunto. Del mismo modo, esto permite que se tengan varios servicios en diversos lados, ayudando incluso a la evasión de fallas generales en el sistema. Si se llega a tener un error en algúns servicio, este no va a afectar el sistema completo.

Para desarrollar eficientemente la aplicación, construimos la aplicación con la arquitectura mostrada en el siguiente diagrama: 

![image](https://user-images.githubusercontent.com/86432413/203692248-38d83f6f-e4eb-42d6-b0e5-ac69702e1d54.png)

Las funciones de cada microservicio principal son:
* Cognito - Autentificación y creación de cuentas
* Vercel - Para hostear la página
* Hygraph - Sistema de manejo de contenido

A su vez cada microservicio utiliza distintas herramientas para cumplir con sus funciones.

### Metodología

Optamos por el uso de la metodología Feature Driven Development (FDD).

FDD es una metodología agil que nos permite progresar en el desarollo de software a través del progreso en features definidas, siendo estas features relacionadas a las user stories y casos de uso del proyecto. El ciclo de desarrollo bajo esta metodología es el siguiente:

1. Desarrollar un modelo general
2. Generar una lista de features
3. Planear una feature
4. Diseñar la feature
5. Desarrollar la feature

Fortalezas:
* Al ser un proceso simple de 5 pasos que permite un desarrollo rápido
* Permite a equipos grandes avanzar a buen ritmo exitosamente
* Se pre-definen estándares de desarrollo que permiten al equipo avanzar rápido

Debilidades
* No es tan eficiente para proyectos pequeños
* Se escribe poca documentación
* Depende mucho de los lead developers o lead programmers

Decidimos usar esta metodología porque nos ayudó a definir qué queríamos desarrollar, trabajar en torno a las features para así obtener las funcionalidades deseadas y cumplir con los requerimientos, y hacerlo de manera rápida por la poca cantidad de pasos. Las debilidades de esta metodología no resultaron ser tan importantes como para opacar las fortalezas que nos aportó durante el desarrollo de la aplicación

## Tecnologías utilizadas

### Lenguajes de programación

Todo se programó en JavaScript

### Frontend

* Vue como Framework
* Tailwind para los estilos
* AWS Cognito para autentificación 

### Backend

* Hygraph como backend as a service
* Graphql para las llamadas a API


## Uso

### Modo usuario

* Acceder a https://asesorias-itam.vercel.app/#/

![image](https://user-images.githubusercontent.com/86432413/203696369-76fe3b76-aeaf-42dc-aa12-ef13d9086648.png)


#### Creación de cuenta

1. Si no se tiene una cuenta, dar clic en *Regístrate*
![image](https://user-images.githubusercontent.com/86432413/203696455-ddefaa08-f9b4-42c8-bc1c-28935c4a23d3.png)

2. Rellena los campos y marca la casilla si deseas ser asesor
![image](https://user-images.githubusercontent.com/86432413/203696538-54867d0a-84d4-4c93-8ec2-b0e016230e3e.png)

3. Confirma la creación de la cuenta con el código que se envía a tu correo

![image](https://user-images.githubusercontent.com/86432413/203696703-d6d19d71-fc67-45dc-a4a8-a4965fdaf9bf.png)

![image](https://user-images.githubusercontent.com/86432413/203696753-f64f5b5d-f4d7-453e-82ca-43a989f13dd3.png)

4. Inicia sesión con tu nueva cuenta

#### Inicio de sesión

1. Introduce tu correo y contraseña

![image](https://user-images.githubusercontent.com/86432413/203697191-a2c01f82-ff06-4abe-99ff-fcbf8bcb100b.png)

##### Modo Asesor

* Desde la pantalla principal, *Mis asesores* puedes manejar los grupos a los que estás incrito. Da clic en *ver curso* para ver los detalles del curso, o en *Dejar grupo* para elimiar el grupo de tu pantalla principal.

![image](https://user-images.githubusercontent.com/86432413/203697420-444fcf1d-0758-47ae-97cb-018a0089af64.png)

* En el apartado buscar aparecen todos los grupos disponibles. Puedes buscar por materia o por el nombre del asesor.

![image](https://user-images.githubusercontent.com/86432413/203697811-12bcebcc-e97c-4332-8dd8-283d2e2de3e1.png)

* En el apartado crear grupo, se pueden crear grupos para materias en las que el asesor quiera dar su ayuda.

![image](https://user-images.githubusercontent.com/86432413/203698182-de86e021-0eb0-44e0-93bd-37b10641e3a9.png)

* En el apartado mis grupos, aparecen todos los grupos que estás impartiendo como asesor.

![image](https://user-images.githubusercontent.com/86432413/203887877-9492ce0e-e4d2-4409-a2ce-d9904c910c4c.png)

* En el apartado de ajustes, aparecen tus datos de usuario.

![image](https://user-images.githubusercontent.com/86432413/203887953-208dd67b-95a6-4fb5-962f-ac5c4ded3b9c.png)

 Con el botón *editar* puedes realizar cambios. Da clic en *cancelar* para cancelar los cambios, y en *guardar* para guardar los cambios.
 
![image](https://user-images.githubusercontent.com/86432413/203888152-9972f5be-0d84-480b-9f90-58cd618d6d72.png)

Nota: Al desactivar la opción de ser asesor, se pierden los privilegios del modo asesor y todos los grupos que el usuario tenga activos pasan a estar ocultos hasta que el usuario vuelva a activar la opción de ser asesor

##### Modo No Asesor

El modo no asesor no cuenta con las funcionalidades de crear grupo y mis grupos

![image](https://user-images.githubusercontent.com/86432413/203698293-cfbf68f4-7feb-4c60-a93c-559bfc0686be.png)


### Modo administrador

#### Inicio de sesión
1. Acceder a la aplicación con este enlace: http://asesorias-itam.vercel.app/#/admin
2. Iniciar sesión con una cuenta de administrador.
![image](https://user-images.githubusercontent.com/86432413/203688086-f9bf87bf-b98b-4e5d-ba7e-d244bffcb5f5.png)

#### Uso del directorio

* Al iniciar sesión se mostrará la siguiente pantalla:

![image](https://user-images.githubusercontent.com/86432413/203688364-aa806799-e88c-4867-a6c9-254505563cd5.png)

* Se puede dar clic en los usuarios para desplegar sus datos.

![image](https://user-images.githubusercontent.com/86432413/203688534-2c6c4168-4134-41e2-b36e-90d18da42e6a.png)

* Se puede dar clic en *asesores* para que solo se muestre a aquellos alumnos que son asesores.

![image](https://user-images.githubusercontent.com/86432413/203688611-e7d79eec-db4e-4c22-b02d-a948e5d49bf1.png)

* Se puede buscar a un usuario en específico por su nombre o correo en la barra de búsqueda.

![image](https://user-images.githubusercontent.com/86432413/203688797-5c24293c-c3cb-4acf-9c9a-e2effa38698d.png)

Nota: Si la casilla de asesores está activada y se busca a un no asesor, no mostrará nada.

#### Uso de la pestaña de publicaciones

1. Desde el menú principal, dar clic en publicaciones.
![image](https://user-images.githubusercontent.com/86432413/203689422-35ebbfac-43b0-43c2-8d86-4c17ce85ae4f.png)

2. Ya en la pestaña de publicaciones se puede buscar publicaciones en la barra de búsqueda y dar clic en ellas directamente para mostrar su información.
![image](https://user-images.githubusercontent.com/86432413/203689583-82f98603-f2b7-4826-84ab-58cfeb70fc38.png)

3. Para eliminar una publicación, dar clic en el botón de *eliminar*.

![image](https://user-images.githubusercontent.com/86432413/203689670-0c1f0b99-436d-4461-87b2-3a1c16d53958.png)



### Funcionalidades comúnes

#### Modo oscuro

Para habilitar el modo oscuro, dar clic en el icóno de la esquina superior derecha
![image](https://user-images.githubusercontent.com/86432413/203698541-054143b7-9d4d-418c-838f-767b22d75485.png)

![image](https://user-images.githubusercontent.com/86432413/203698578-35a71db2-f584-4926-912d-7c47d1001f8b.png)

Este cambio se mantiene entre apartados, y se puede desactivar dando clic en el mismo lugar.

#### Cerrar sesión

Para salir de la aplicación, dar clic en *cerrar sesión* .

![image](https://user-images.githubusercontent.com/86432413/203690734-bc3a99a2-b001-4162-95b1-08cad05e1177.png)



## Propuesta económica

### Propuesta de venta

Esta aplicación tiene el fin de ayudar a unir a la comunidad ITAM a la vez que se obtiene una mejora en el desempeño escolar de los alumnos, y hacer la aplicación de pago para los alumnos supondría una barrera de entrada. Es por lo anterior que proponemos vender la aplicación al ITAM para que sea implementada y distribuida libremente a los alumnos, además de darle mantenimiento semestral a la aplicación pues habrá que reiniciar la base de datos cada semestre.

Además, los asesores podrán generar un ingreso, si lo desean, o cubrir horas de servicio social como es el caso de los laboratoristas.

### Propuesta de costos

 La distribución de los costos necesarios para la creación de esta aplicación se puede consultar [aquí](https://docs.google.com/spreadsheets/d/1dWlTZhmF74pfeHZoSSXBFog-eDm9AqX3c1Zm7__oD2I/edit?usp=sharing)

## Créditos

* El diseño de la barra lateral está inspirado de (https://www.youtube.com/watch?v=Ul4KOXNQJSk&t=18s&ab_channel=TylerPotts
)
* La alerta de inscripción a una materia está inspirada de (https://github.com/k90mirzaei/vue-toast)
* El modo oscuro está inspirado de :
  * Funcionalidad: (https://www.youtube.com/watch?v=cGN91TLXrC8&ab_channel=LearnVue)
  * Diseño: (https://dev.to/tqbit/create-your-own-dark-mode-toggle-component-with-vue-js-1284#fromHistory)

## Contacto

Creado por:

+ Rodrigo Alejandro Barrera Manjarrez (rbarrer1@itam.mx)
+ Fabio Giuseppe Calo Dizy (fcalodiz@itam.mx)
+ Axel Giuseppe Flores Aranda (aflore85@itam.mx)
+ Salvador Alejandro Uribe Calva (suribeca@itam.mx)

Este proyecto se desarrolló para la materia Ingeniería de Software en Otoño 2022
