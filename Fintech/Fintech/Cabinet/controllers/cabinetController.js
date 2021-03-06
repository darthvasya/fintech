myApp.controller('cabinetController', function ($scope, $http, $routeParams) {
  console.log(localStorage.getItem('shop'));
  if(localStorage.getItem('shop') != undefined)
    $scope.marketId = localStorage.getItem('shop');
  else {
    $scope.marketId = 3;
  }
  console.log("ID " + localStorage.getItem('shop'));
  $scope.shop = {};
  $scope.shops = {};
  var idUser = localStorage.getItem('id');
  $scope.cards = {};
  $scope.categories = {};
  $scope.products = {};
  $scope.categoryId = {};
  $scope.product = {};
  $scope.bag = [];



  if($scope.marketId <= 0) {
    location.href = "#/shops";
  }
  getCategories();
  function getCategories() {
    $http.get('http://vasya18-001-site1.dtempurl.com/CustomerService.svc/Shops/' + $scope.marketId + '/Categories/').success(function (data) {
      $scope.categories = data;

    });
  }

  getCards();
  function getCards() {
    console.log(idUser);
    $http.get('http://vasya18-001-site1.dtempurl.com/CustomerService.svc/cards/' + idUser ).success(function (data) {
      $scope.cards = data;
      console.log(data);
    });
  }

  getShops();
  function getShops() {
    $http.get('http://vasya18-001-site1.dtempurl.com/CustomerService.svc/GetShopList/').success(function (data) {
      $scope.shops = data;
      console.log($scope.shops);
    });
  }

  getShop();
  function getShop() {
    $http.get('http://vasya18-001-site1.dtempurl.com/CustomerService.svc/Shops/' + $scope.marketId).success(function(data) {
      $scope.shop = data;
    });
  }

  $scope.addcard = function (card, cardForm) {

    var send = {
      "uid": Number(idUser),
      "cardNumber": card.cardNumber,
      "validDate": card.validDate,
      "cardKey":  card.cardKey
    }
    if(cardForm.$valid) {
        console.log(send);
        $http.post('http://vasya18-001-site1.dtempurl.com/CustomerService.svc/AddCard/', send).success(function (data) {
          console.log(data);
        });
    }
  }

  $scope.IDProd = 0;
  $scope.$on("$routeChangeSuccess", function () {
    var id = $routeParams["id"];
    var productId = $routeParams["productId"];
    var categoryId = $routeParams["categoryId"];
    $scope.IDProd = productId;

    if(id!=='undefined'){
      console.log(id);
      $scope.categoryId = id;
      $http.get('http://vasya18-001-site1.dtempurl.com/CustomerService.svc/Shops/' + $scope.marketId  + '/Categories/' +  id + '/').success(function (data) {
        $scope.products = data;
      });
    }

    if(productId !== 'undefined') {
        $http.get('http://vasya18-001-site1.dtempurl.com/CustomerService.svc/Shops/' + $scope.marketId + '/Categories/' + categoryId + '/Goods/'+productId+'/').success(function (data) {
          $scope.product = data;
          console.log(data);
        });
    }
  });
//ShopId
//CardId
//GoodsId
//UserId
//OrderTime

$scope.addToBag = function() {
  console.log(2);
  $scope.bag.push($scope.IDProd);
  if(localStorage.getItem('bag') != undefined)
    var buf = localStorage.getItem('bag') + ",";
  else {
    var buf = "";
  }
  localStorage.setItem('bag', buf + $scope.IDProd);
  console.log(localStorage.getItem('bag'));
  alert("Объект успешно добавлен в корзину");
}


});
