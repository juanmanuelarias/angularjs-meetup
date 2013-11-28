# Lab
En este Lab vamos a instalar y utilizar Yeoman para la generación de una App con AngularJS

## Requisitos
Para poder utilizar Yeoman, necesitamos tener instalado NodeJS http://nodejs.org/

Y en el caso de utilizar SASS, necesitaremos instalar Ruby y Compass

https://www.ruby-lang.org/es/

http://compass-style.org/install/

## 1. Instalación de Yeoman
1. Para instalar Yeoman, necesitamos ejecutar el comando:

```
npm install -g yo
```

2. Y por último, vamos a necestiar en Generator de AngularJS, el cual se instala con el comando:

```
npm install -g generator-angular
```

## 2. Generación de una App AngularJS
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

## 3. Creación de una Vista

1. Creamos una Vista con Yeoman

```
yo angular:view user
```

Este comando nos creará una vista **user.html** ubicada en *app/views/user.html*.

2. Abrimos la Vista, y la editamos para que se vea de la siguiente manera:

```
<p>This is the user view.</p>
<div ng-controller="UserCtrl">
	<panel title="User Properties">
		My name is: {{name}}
	</panel>
</div>
```

## 4. Creación de un Controller

1. Creamos un Controller con Yeoman
```
yo angular:controller user
```
Este comando nos creará el controller **UserCtrl** ubicado en *app/scripts/controllers/user.js* y lo agregará al index.html automáticamente.

2. Abrimos el controller, y lo editamos para que se vea de la siguiente manera:

```
angular.module('meetupApp')
  .controller('UserCtrl', function ($scope) {
    $scope.name = 'juan';
  });
```

## 5. Realizando un Test

Una vez creado el Controller, vamos a verificar que la misma esté funcionando correctamente, para ello vamos a crear un Test y ejecutarlo con Grunt.

1. Abrimos el archivo *test/spec/controllers/user.js*

2. Creamos/Editamos un test para validar que la variable *name* tenga el valor "juan" (es un test muy sencillo, pero sirve para el propósito de este Workshop).

```
it('should name always be juan', function () {
	expect(scope.name).toBe('juan');
});
```

3. Ahora estamos en condiciones de ejecutar el Test. ¿Como? Muy fácil, solamente debemos indicarle a Grunt que ahora queremos ejectuar los Tests de nuestra App.

```
grunt test
```

*Nota: Posiblemente veamos un error al ejecutar el test con Grunt, ya que no puede encontrar el ejecutable de Google Chrome. En este caso, agregar la siguiente variable de entorno*

```
CHROME_BIN = <*path_to_google_chrome*>
```

## 6. Dependencias con Bower

Bower es un administrador de paquetes, el cual nos permite poder instalar y actualizar los paquetes junto a sus dependencias de forma automática.

Por ejemplo, para descargar **angular-ui** en nuestro proyecto, solamente debemos ingresar el comando:

```
bower install angular-ui --save
```

El parámetro **--save** se encargará actualizar el archivo **bower.json** con la nueva dependencia. De esta forma, cuando alguien baje del repositorio nuestro proyecto, solamente deberá ejecutar

```
bower install
```

y bower se encargará de descargar todas las dependencias encontradas en el archivo bower.json.

## 7. El Build

Ya tenemos todo listo para empaquetar y distribuir nuestra App. Una vez más, le diremos a Grunt que se encargue de esta tarea por nosotros y lo haremos de la siguiente forma:

```
grunt build
```

Ese comando ejecutará una serie de tareas que fueron definidas automáticamente cuando creamos nuestro proyecto con Yeoman -definidas en el archivo **Gruntfile.js**, como por ejemplo *uglify, autoprefixer, ngmin, etc.*.

Una vez terminado el build, se creará una carpeta **dist** donde encontraremos el resultado final de la compilación!

## 8. El Deploy
No podíamos terminar este Lab, sin hacer un deploy a producción y para ello, utlizaremos la plataforma [Heroku](https://www.heroku.com/).

1. Lo primero que debemos hacer, es instalar el generador de heroku.

```
npm install -g generator-heroku
```

2. Luego, en la carpeta "root" de Yeoman (donde se encuentra Gruntfile.js), ejecutar el comando:

```
yo heroku
```

Y cuando nos pregunte si queremos un repositorio separado para "dist", le diremos que sí:

```
[?] Do you want a separate git repository in dist/? Yes
```

Si todo salió bien, vamos a ver en el output lo siguiente:

```
Please add this copy task rule to your Gruntfile:
    copy: {
        dist: {
            files: [{
                expand: true,
                dest: '<%= yeoman.dist %>',
                cwd: 'heroku',
                src: '*',
                rename: function (dest, src) {
                    var path = require('path');
                    if (src === 'distpackage.json') {
                        return path.join(dest, 'package.json');
                    }
                    return path.join(dest, src);
                }
            }]
        }
    }

You're all set! Now go to dist and run
        heroku apps:create
```

Ahora solo debemos copiar el contenido generado en el comando anterior, y agregarlo a nuestro **Gruntfile.js** en la *copy* task.

3. Ir a la carpeta *dist*

```
cd dist
```

4. Creamos nuestra app heroku:

```
heroku apps:create
```

*Nota: Si el repo ya existe en heroku, entonces no hay que crear una nueva App, sino que tenemos que agregar el repo de heroku y hacer un pull en la carpeta **dist***

```
git remote add heroku git@heroku.com:project-name.git
git pull heroku master
```

5. Y por último, subimos nuestra aplicación a la nube!

```
git add .
git commit -m "moving to the cloud"
git push heroku master
```

Felicitaciones! Creaste una App AngularJS de punta a punta!