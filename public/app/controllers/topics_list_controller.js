FoorumApp.controller('TopicsListController', function ($scope, $location, Api) {
    // Toteuta kontrolleri tähän
    Api.getTopics().success(function (topics) {
        $scope.topics = topics;
    });

    $scope.addTopic = function () {
        console.log($scope.newTopic);

        Api.addTopic($scope.newTopic)
                .success(function (topic) {
                    $location.path("/topics/" + topic.id);
                    console.log(topic);
                })
                .error(function () {
                    console.log("error");
                })
    }
});
