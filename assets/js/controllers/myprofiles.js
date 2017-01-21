angular.module('puttycolors.controllers.myprofiles', ['puttycolors.controllers.profiles', 'puttycolors.svc.profiles'])

.controller('myProfilesController', ['$scope', '$controller', 'profileService', 'profiles', 'profilesCount', function ($scope, $controller, profileService, profiles, profilesCount) {

    $scope.headerText = "My Profiles";
    $scope.emptyText = "You don't have any custom profiles saved.";
    $scope.canDelete = true;

    $scope.loadProfiles = function(page, pageSize) {
        return profileService.getMyProfiles(page, pageSize);
    };

    $controller('profilesController', {$scope: $scope, profiles: profiles, profilesCount: profilesCount});
}]);
