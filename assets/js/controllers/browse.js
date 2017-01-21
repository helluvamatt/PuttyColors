angular.module('puttycolors.controllers.browse', ['puttycolors.controllers.profiles', 'puttycolors.svc.profiles'])

.controller('browseController', ['$scope', '$controller', 'profileService', 'profiles', 'profilesCount', function ($scope, $controller, profileService, profiles, profilesCount) {

    $scope.headerText = "Browse Profiles";
    $scope.emptyText = "There no shared profiles to show.";
    $scope.canDelete = false;

    $scope.loadProfiles = function(page, pageSize) {
        return profileService.getPublicProfiles(page, pageSize);
    };

    $controller('profilesController', {$scope: $scope, profiles: profiles, profilesCount: profilesCount});
}]);
