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
yo angular meetup
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
yo angular:view items
```

Este comando nos creará una vista **items.html** ubicada en *app/views/items.html*.

2. Abrimos la Vista, y la editamos para que se vea de la siguiente manera:

```
<div>
    <table ng-repeat="item in items">
        <tr>
            <td>{{item}}</td>
            <td><button class="btn btn-danger btn-xs" ng-click="removeItem($index)">X</button></td>
        </tr>
    </table>
    <input type="text" ng-model="item">
    <button class="btn btn-primary" ng-click="addItem(item)">Add</button>
</div>
```

## 4. Creación de un Controller

1. Creamos un Controller con Yeoman
```
yo angular:controller item
```
Este comando nos creará el controller **ItemCtrl** ubicado en *app/scripts/controllers/item.js* y lo agregará al index.html automáticamente.

2. Abrimos el controller, y lo editamos para que se vea de la siguiente manera:

```
angular.module('meetupApp')
.controller('ItemCtrl', function ($scope) {
    $scope.items = [];

    $scope.addItem = function (item) {
        $scope.items.push(item);
        $scope.item = '';
    };

    $scope.removeItem = function (index) {
        $scope.items.splice(index, 1);
    };
});
```
## 6. Actualizacion de la Vista Principal

1. Modificar la vista *main.html* para agregar un link a nuestra vista *items.html*

```
<ul class="nav nav-pills pull-right">
    <li class="active"><a ng-href="#">Home</a></li>
    <li><a ng-href="#/items">Items</a></li>
    <li><a ng-href="#">Contact</a></li>
</ul>
```

2. Luego agregar la ruta en nuestro archivo *app.js*

```
.when('/items', {
        templateUrl: 'views/items.html',
        controller: 'ItemCtrl'
      })
```

## 6. Realizando un Test

Una vez creado el Controller de Items, vamos a verificar que la misma esté funcionando correctamente. Para ello vamos a crear un Test y ejecutarlo con Grunt.

1. Abrimos el archivo *test/spec/controllers/item.js*

2. Agregamos un test para validar el método addItems y removeItems respectivamente. Como por ejemplo:

```
'use strict';

describe('Controller: ItemCtrl', function () {

  // load the controller's module
  beforeEach(module('meetupApp'));

  var ItemCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ItemCtrl = $controller('ItemCtrl', {
      $scope: scope
    });
  }));

  it('should add items to scope', function () {
    scope.addItem('Item 1');
    scope.addItem('Item 2');
    scope.addItem('Item 3');
    expect(scope.items.length).toBe(3);
  });

  it('should remove items from scope', function () {
    scope.items = ['Item 1', 'Item 2', 'Item 3'];
    scope.removeItem(1);
    expect(scope.items.length).toBe(2);
  });

});
```

3. Ahora estamos en condiciones de ejecutar el Test. ¿Como? Muy fácil, solamente debemos indicarle a Grunt que ahora queremos ejectuar los Tests de nuestra App.

```
grunt test
```

Si los Test están funcionando correctamente, deberíamos ver el mensaje:

```
Chrome 33.0.1712 (Windows): Executed N of M SUCCESS (0.33 secs / 0.042 secs)
```

*Nota: Posiblemente veamos un error al ejecutar el test con Grunt, ya que no puede encontrar el ejecutable de Google Chrome. En este caso, agregar la siguiente variable de entorno*

```
CHROME_BIN = <*path_to_google_chrome*>
```

## 7. Dependencias con Bower

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

## 8. El Build

Ya tenemos todo listo para empaquetar y distribuir nuestra App. Una vez más, le diremos a Grunt que se encargue de esta tarea por nosotros y lo haremos de la siguiente forma:

```
grunt build
```

Ese comando ejecutará una serie de tareas que fueron definidas automáticamente cuando creamos nuestro proyecto con Yeoman -definidas en el archivo **Gruntfile.js**, como por ejemplo *uglify, autoprefixer, ngmin, etc.*.

Una vez terminado el build, se creará una carpeta **dist** donde encontraremos el resultado final de la compilación!

## 9. El Deploy
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