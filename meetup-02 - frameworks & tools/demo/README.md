# Lab
En este Lab vamos a instalar y utilizar Yeoman para la generación de una App con AngularJS

## Requisitos
Para poder utilizar Yeoman, necesitamos tener instalado NodeJS http://nodejs.org/

Y en el caso de utilizar SASS, necesitaremos instalar Ruby y Compass

https://www.ruby-lang.org/es/

http://compass-style.org/install/

## Instalación de Yeoman
1. Para instalar Yeoman, necesitamos ejecutar el comando:
```
npm install -g yo
```
2. Y por último, vamos a necestiar en Generator de AngularJS, el cual se instala con el comando:
```
npm install -g generator-angular
```

## Generación de una App AngularJS
1. Para generar una App con AngularJS, debemos ejecutar el comando:
```
yo angular
```
Al ejecutarlo, Yeoman nos hará una serie de preguntas sobre que componentes queremos utilizar para la aplicación a generarse. En nuestro caso utilizaremos Twitter Bootstrap SCSS:
```
[?] Would you like to include Twitter Bootstrap? (Y/n) Y

[?] Would you like to use the SCSS version of Twitter Bootstrap with the Compass CSS Authoring Framework? (Y/n) Y

[?] Which modules would you like to include? (Press <space> to select)
 [X] angular-resource.js
 [X] angular-cookies.js
 [X] angular-sanitize.js
 [X] angular-route.js
```

Listo! La App ya fue generada! 

Ahora será Grunt (nuestro Task Runner) quien nos permitirá previsualizar nuestra App, generar el Build, ejecutar los Test, etc.

Por lo pronto, para previsualizar nuestra nueva App, debemos ejecutar el comando
```
grunt serve
```

All Done! Ya tenemos nuestra App AngularJS funcionando!

## Creación de una Vista

## Creación de un Controller

## Realizando un Test

## Dependencias con Bower

## El BUILD
