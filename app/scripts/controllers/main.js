'use strict';

/**
 * @ngdoc function
 * @name myAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myAppApp
 */
angular.module('myAppApp')
    .controller('MainCtrl', function($scope, $location, $route, $rootScope, $http, $q, $sce) {
        var vm = this; //john baba for scoping problem
        $scope.getVideos = getVideos;
        $scope.downloadHighres = downloadHighres;
        $scope.logPagination = logPagination;
        $scope.youtubeIframe = youtubeIframe;
        $scope.viewVideo = viewVideo;
        $scope.showVideoFlag = false;

        var videosIds = [];
        var channelId = 'UCjXfkj5iapKHJrhYfAF9ZGg';
        var API_KEY = 'AIzaSyB6a8XrPTBNrphCTNpdktIodipdmuXlP9c';
        $scope.channel = "https://www.googleapis.com/youtube/v3/search?key=AIzaSyB6a8XrPTBNrphCTNpdktIodipdmuXlP9c&channelId=UCjXfkj5iapKHJrhYfAF9ZGg&part=snippet,id&order=date&maxResults=20";

        getVideos($scope.channel);
        $scope.videosDetails = [];
        var video = {
            title: '',
            uploadDate: '',
            duration: '',
            likes: '',
            views: '',
            description: '',
        }
        $scope.query = {
            limit: 5,
            page: 1
        };

        $scope.options = {
            boundaryLinks: true,
            pageSelector: 1
        };

        function downloadHighres() {
            var dlnk = document.getElementById('dwnldLnk');
            dlnk.href = $scope.img1;
            dlnk.click();
        };

        function getVideos(channelUrl) {
            $http({
                method: 'GET',
                url: channelUrl,
            }).then(function(response) {
                $scope.videosCount = response.data.items.length;
                response.data.items.forEach(function(video) {
                    videosIds.push(video.id.videoId);
                    $http.get("https://content.googleapis.com/youtube/v3/videos", {
                            params: {
                                id: video.id.videoId,
                                key: API_KEY,
                                part: 'snippet,contentDetails,statistics'
                            }
                        })
                        .then(function(response) {
                            video.title = response.data.items[0].snippet.title;
                            video.uploadDate = response.data.items[0].snippet.publishedAt;
                            video.description = response.data.items[0].snippet.localized.description;
                            video.high = response.data.items[0].snippet.thumbnails.high.url;
                            video.medium = response.data.items[0].snippet.thumbnails.medium.url;
                            video.likes = response.data.items[0].statistics.likeCount;
                            video.views = response.data.items[0].statistics.viewCount;
                            video.duration = convertISO8601ToSeconds(response.data.items[0].contentDetails.duration);
                            video.id = response.data.items[0].id;
                            $scope.videosDetails.push(video);
                        })
                })
            });
        }

        //ready function from https://stackoverflow.com/questions/19061360/how-to-convert-youtube-api-duration-iso-8601-duration-in-the-format-ptms-to
        function convertISO8601ToSeconds(input) {

            var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
            var hours = 0,
                minutes = 0,
                seconds = 0,
                totalseconds;

            if (reptms.test(input)) {
                var matches = reptms.exec(input);
                if (matches[1]) hours = Number(matches[1]);
                if (matches[2]) minutes = Number(matches[2]);
                if (matches[3]) seconds = Number(matches[3]);
                totalseconds = hours * 3600 + minutes * 60 + seconds;
            }

            return (totalseconds);
        }

        function logPagination(page, limit) {
            $scope.options.pageSelector = 2;
        }

        function viewVideo(videoId, high, medium) {
            $scope.showVideoFlag = true;
            $scope.img1 = high;
            $scope.img2 = medium;
            var url = 'https://www.youtube.com/embed/' + videoId;
            $scope.videoToView = $sce.trustAsHtml('<iframe width="100%" height="200px" style="margin:auto; margin-top: 30px"  src="' + url + '" ></iframe>');
        }

        function youtubeIframe(videoId) {
            var url = 'https://www.youtube.com/embed/' + videoId;
            return $sce.trustAsHtml('<iframe width="100%" style="margin:auto" height="200px" style="margin:auto;margin-top: 30px" src="' + url + '" ></iframe>');

        }

    });