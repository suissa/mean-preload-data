Hoje estava vendo um [vídeo sobre o Synth](https://www.youtube.com/watch?v=MSH9yB9y4ZA) que é um framework em Node.js criado especificamente para trabalhar com o AngularJs fazendo alguns pré-carregamentos de dados darem maior velocidade a aplicação já que o Angularjs já receberá a view com esses dados *mockados*, podendo ter a primeira interação sem um requisição adicional para a obtenção dos dados, [visto nessa parte do vídeo](http://youtu.be/MSH9yB9y4ZA?t=8m41s).

Utilizando MEAN podemos fazer uma técnica parecida de pré-carregamento dos dados para o AngularJs fazendo o seguinte:

1. Criar uma rota no AngularJs para a view
2. Criar uma rota no Express
3. Criar a view com Jade+AngularJs

####1. Criar uma rota no AngularJs para a view


    $routeProvider.
        when('/preload', {
          templateUrl: 'partials/preload',
          controller: 'PreloadController'
        })
        
####2. Criar uma rota no Express

    app.get('/partials/preload', function(req, res){
      var beers = [{"alcohol":4.5,"price":3,"_id":"53c6f9a66c2303373b944322","__v":0,"created":"2014-07-16T22:16:06.847Z","category":"pilsen","description":"Mijo de Rato","name":"Skol"},{"price":99,"alcohol":8,"_id":"53c9a37c353837acbf84951b","__v":0,"created":"2014-07-18T22:45:16.571Z","category":"","description":"","name":"TESTE"},{"__v":0,"_id":"53c6f51fae30b8d7392a8ce2","alcohol":4.5,"price":3,"created":"2014-07-16T21:56:47.946Z","category":"pilsen","description":"Mijo de Rato","name":"Skolzinha"}];
      // beers apenas de exemplo
      // ele normalmente vem do MongoDB
      res.render('partials/preload', {beers: beers});
    });
    
 Note que passamos um objeto que vai para a view:
 
  {beers: beers}

####3. Criar a view com Jade+AngularJs

    h2 Pre-load beers
    
    h2 Listagem com Jade
    blockquote= JSON.stringify(beers)
    ul
    for beer in beers
      li= beer.name
    
    h2 Listagem com Angular
    blockquote(ng-init='atualizarBeers('+JSON.stringify(beers)+')') {{beers}}
    ul
      li(ng-repeat='beer in beers') {{beer.name}}
      
  button(ng-click='atualizarBeers(beers)') Atualizar no Controller


Agora na view nós injetamos essa variável `beers` do Jade no AngularJs com [ng-init](https://docs.angularjs.org/api/ng/directive/ngInit):

  ng-init='atualizarBeers('+JSON.stringify(beers)+')'
    
Por que passar o beers em uma função no Controller?

Bom porque quando usamos o ng-init ele cria uma variável mas não instancia no `$scope` do controller, para atualizar no Controller criei essa pequena função para instanciar essa váriavel no `$scope`:

    controller('PreloadController', ['$scope', 
        function($scope){
          console.log('PreloadController beers', $scope.beers);
          $scope.atualizarBeers = function(beers){
            $scope.beers = beers;
            console.log('atualizarBeers beers', $scope.beers);
          }
      }])
 

Depois listamos com o `ng-repeat`:

  ul
      li(ng-repeat='beer in beers') {{beer.name}}
 

É uma técnica bem simples mas dependendo da quantidade de requisições que você faz no início da sua aplicação o pré-carregamento pode melhorar na performance da inicialização.



###RUN
Para iniciar o projeto rode:

    npm install && node app

Entre na URL 

    http://localhost:3000/preload


É utilizado o [Angular Express Seed](https://github.com/btford/angular-express-seed) como base.
