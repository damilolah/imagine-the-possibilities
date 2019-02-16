<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-img id="myImage" src="https://pearlhacks.com/img/logo.png" height="300px" style="background:#6DB3F2;"></v-img>
      <v-card>
        <v-card-title class="pl-5 pb-0">
          <div class="display-1 pl-5">Pearl Hacks</div>
        </v-card-title>       

        <v-list two-line>
          <v-list-tile @click="makeCall()">
            <v-list-tile-action>
              <v-icon color="indigo">phone</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{phoneNumberString}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile @click="openBrowser(website)">
            <v-list-tile-action>
              <v-icon color="indigo">open_in_browser</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>{{website}}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile @click="vibratePhone()">
            <v-list-tile-action>
              <v-icon color="indigo">notifications_active</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Vibrate phone</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile @click="getLocation()">
            <v-list-tile-action>
              <v-icon color="indigo">location_on</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Get Location</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile @click="openCamera()">
            <v-list-tile-action>
              <v-icon color="indigo">camera_alt</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Open camera</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    data() {
      return {
        phoneNumber: 9194187940,
        phoneNumberString: '(919) 481-7940',
        website: 'https://www.instagram.com/pearlhacks/'
           
      }
    },
    methods: {
      getLocation() {
        let options = {
          enableHighAccuracy: true,
          maximumAge: '3600000'
        }
        let watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
        let latitude = '';
        let longitude = '';
        function onSuccess(position) {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
          // Translate latitude and longitude
          nativegeocoder.reverseGeocode(success, failure, latitude, longitude, {useLocale: true, maxResults: 1});
        }
        function onError(error) {
          alert('code: ' + error.code + '\nmessage: ' + error.message);
        }
        function success(result) {
          let address = JSON.stringify(result[0]);
          let position = JSON.parse(address);
          alert(position + '\n' + position.subThoroughfare + ' ' + position.thoroughfare + '\n' + position.locality + '\n' +
              position.countryName  + ', '  +  position.postalCode+ '\n');
        }
        function failure(error) {
          alert('There was an error translating your location. Error: ', error);
        }
      },
      makeCall() {
        function callError(message) {
          alert('There was an error making the call. Error: ', message);
        }
        function callSuccess(result) {
          // do nothing
        }
        window.cordova.plugins.CordovaCall.callNumber(this.phoneNumber, this.callSuccess, this.callError);
      },
      openBrowser(url) {
        let target = '_blank';
        let options = 'location = yes';
        let ref = cordova.InAppBrowser.open(url, target, options);
        function loadErrorCallback(error) {
          alert('Error loading page: ', error.message);
        }
        ref.addEventListener('loaderror', loaderrorCallback);
      },
      openCamera() {
        function cameraError(error) {
          alert('There was a problem taking a picture. Error: ', error);
        }
        function cameraSuccess(result) {
          // do nothing
        }
        let options = {
          destinationType: Camera.DestinationType.FILE_URI,
          sourceType: Camera.PictureSourceType.CAMERA,
          mediaType: Camera.MediaType.PICTURE
        }
        navigator.camera.getPicture(cameraSuccess, cameraError, options);
      },
      vibratePhone() {
        let time = 1000;
        navigator.vibrate(time);
        alert('Deutsche Bank wishes you good luck!');
      }
    }
  }
</script>
