FoorumApp.controller('UsersController', function ($scope, $location, Api) {
    // Toteuta kontrolleri tähän
    $scope.login = function () {
        Api.login($scope.loginUser)
                .success(function () {
                    $location.path('/');
                })
                .error(function () {
                    $scope.errorMessage = 'Väärä käyttäjätunnus tai salasana!';
                    ;
                });
    };

    $scope.register = function () {
        Api.register($scope.registerUser)
                .success(function (user) {
                    Api.login(user)
                            .success(function () {
                                $location.path('/');
                            });
                })
                .error(function (error) {
                    $scope.errorMessage = error.error;
                    ;
                });
    };

    $scope.invalidPassword = function () {
        if ($scope.registerUser) {
            return !($scope.registerUser.password == $scope.passwordAgain);
        }
        return true;
    };

});
