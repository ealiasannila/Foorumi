FoorumApp.controller('ShowMessageController', function ($scope, $routeParams, Api) {
    // Toteuta kontrolleri tähän
    Api.getMessage($routeParams.id).success(function (message) {
        $scope.message = message;
    });

    $scope.addReply = function () {
        Api.addReply($scope.newReply, $routeParams.id).success(function (reply) {
            $scope.message.Replies.push(reply);
        });
    }
});
