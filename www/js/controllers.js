angular.module('starter.controllers', [])

////login
.controller('login', function ($scope, $http, $state, $ionicHistory ){
    $scope.loginform = function(){
        var username = $scope.username;
        var password = $scope.password;

        console.log(username + " " + password);

        $http.defaults.headers.post['Content-Type'] = 'applicaation/x-www-form-urlencoded; charset=UTF-8';
        $http({
            url: 'http://localhost/post-it/admin/www/php/login.php',
            method: "POST",
            data:{
                'username' : username,
                'password' : password,

            }
            })
        .then(function(response){
            console.log(response);
            var data = response.data[0];
            console.log(data);
            if(data != "Account Doesn't exist!"){
                $scope.username = '';
                $scope.password = '';
                $state.go('tab.home');
                localStorage.setItem("name", data);

            }else{
                $scope.error = data;
                $scope.password = '';
            }
        },
        function(response){
            console.log('Error');
        });
      }
    })

//ADD
.controller('TodoController', function($scope,$http) {

  $scope.$on('$ionicView.beforeEnter',function(){
    $http({
      url : 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1',
      method : 'GET'
    })
    .then(function(response){
        console.log(response);
        document.getElementById('qoutes').innerHTML = response['data'][0]['content'];
        $scope.qoutes1 = response['data'][0]['content'];
    })
  })

  $scope.qoutesclick = function(content){
    var content1 = content.replace("<p>", "");
    content1 = content1.replace("</p>","");
    console.log(content1);
    $scope.theText = content1;
    TTS
        .speak({
            text: $scope.theText,
            locale: 'en-US',
            rate: 1
        }, function () { console.log('success');
    },
    function (reason) {
    });
  }

    $scope.add = function(){
      var description = document.getElementById('description').value;
      $http({
        url:"http://localhost/post-it/admin/www/php/add.php",
        method:"POST",
        data:{
          'adddescription':description
        }
      })
    .then(function(response){
      console.log(response);
      document.getElementById('description').value="";
    })
  };
})
// edit
  .controller('edit',function($scope,$http,$state){
    $scope.$on('$ionicView.beforeEnter',function(){
      $scope.editlabel = "";
    var id= JSON.parse(localStorage.getItem('editid'));
    console.log(id);
    $http.get("http://localhost/post-it/admin/www/php/editdata.php?id="+id)
    .then(function(a){
      console.log(a.data);
      $scope.announcementlist = a.data;
      document.getElementById('me').value= a.data[0]['announcementid'];
        document.getElementById('name').value= a.data[0]['announcementname'];
      document.getElementById('description').value =  a.data[0]['announcementdescription'];
      // document.getElementById('ename').value = a.data['announcementname'];
      // document.getElementById('edescription').value = a.data['announcementdescription'];
    })


    // var a = JSON.parse(localStorage.getItem('detailsa'));
    // console.log(a);

$scope.save = function(a){
  var a =document.getElementById('me').value;
  // console.log(a);
  var b = document.getElementById('description').value;
  $http.get("http://localhost/post-it/admin/www/php/edit.php?id="+a+"&content="+b);
  $state.go("tab.announcement");
}
    })

    $scope.submitedit = function(){
      // var a = JSON.parse(localStorage.getItem('detailsa'));
      var a =document.getElementById('me').value;

      var b = document.getElementById('description').value;
      var id = a[0];
      if(name == "" || desc == ""){
        $scope.editlabel = "Please complete the form";
      }else{
        $http({
          url:"http://localhost/post-it/admin/www/php/edit.php",
          method:"POST",
          data:{
            'add':name,
            'adddescription':desc,
            'id':id
          }
        })
      .then(function(response){
        // console.log(response);
        $scope.editlabel = "Edit Successfully!";

      })
      }
    }

  })

//GET
  .controller('department', function($scope,$http,$state){
  $scope.$on('$ionicView.beforeEnter',function(){

$scope.edit= function (a) {
localStorage.setItem("editid",JSON.stringify(a));
$state.go("edit");
}

    $http({
      url:"http://localhost/post-it/admin/www/php/getdata.php",
      method:"GET"
    })

  .then(function(response){

    console.log(response['data']);
    $scope.announcementlist = response['data'];
  });
})
//delete
$scope.deletecom = function (a){
$http.get('http://localhost/post-it/admin/www/php/delete.php?id='+a).then(function(a){
  console.log(a);
  $http({
    url:"http://localhost/post-it/admin/www/php/getdata.php",
    method:"GET"
  })

.then(function(response){

  console.log(response['data']);
  $scope.announcementlist = response['data'];
});
})
}


$scope.edits = function(id,name,desc){
  var data = [];
  data.push(id,name,desc);
  console.log(id+' '+name+' '+desc);
  localStorage.setItem('detailsa',JSON.stringify(data));
  console.log(data);
  $state.go('edit');
}

})
