angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl',
    controllerAs: 'view1',
  });
}])

.controller('View1Ctrl', ['$scope', '$http', function($scope, $http) {
	var vm = this;
    $http.get("https://interview-api-staging.bytemark.co/books").then(function(response){ 
        vm.booklist = response.data; 
    });
    vm.viewmorefun = function(booklist,index){
        vm['viewmore' + index] = !(vm['viewmore' + index]);
        if(booklist.showedit && booklist.edit){
            booklist['showedit']=false;
            booklist['edit']=false;
        }else{
            booklist['showedit']=true;
            booklist['edit']=true;
        }
        
    }
    vm.editabookfun = function(booklist,index){
        
        booklist['edit']=false;
        vm['editabook' + index] = false;
        console.log(booklist);
    }
    vm.addbook = function(addnewbookobj){
        console.log(addnewbookobj);
        var data={
            "author": addnewbookobj.author,
            "categories": addnewbookobj.categories,
            "publisher": addnewbookobj.publisher,
            "title": addnewbookobj.title
        };
        $http.post("https://interview-api-staging.bytemark.co/books",data).then(function(response){ 
            alert(response);
        });
        
        /*$http({
            method: 'POST',
            dataType: 'json',
            url: "https://interview-api-staging.bytemark.co/books",
            data: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
 
        }).success(function (data, status, headers, config) {
            console.log(data);
        }).error(function (data, status, headers, config) {
            console.log(data);
        });*/
    }
    vm.saveabook = function(book) {
        book.edit=true;
        console.log(book);
        //var id=book.url.substring(book.url.length, book.url.indexOf("/")+1);
        var id=book.url.split("/").slice(2);
        console.log(id[0]);
        var data={
            "author": book.author,
            "categories": book.categories,
            "publisher": book.publisher,
            "title": book.title
        };
        $http.put("https://interview-api-staging.bytemark.co/books/"+id[0],data).then(function(response){ 
            alert(response);
        });
    }
    vm.deleteabookfun = function(book) {
        var id=book.url.split("/").slice(2);
        console.log(id[0]);
        $http.delete("https://interview-api-staging.bytemark.co/books/"+id[0]).then(function(response){ 
            alert(response);
        });   
    }
    vm.deletebooks = function() {
        $http.delete("https://interview-api-staging.bytemark.co/clean").then(function(response){
            console.log(response);
        })
    }
}]);