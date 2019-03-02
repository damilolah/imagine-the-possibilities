<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>

        <v-img src="https://www.cntry.biz/wp-content/uploads/2015/12/Female-Coders.jpg" height="300px">
          <v-layout column fill-height>
            <v-spacer></v-spacer>
            <v-card-title class="white--text pl-5 pt-5">
              <div class="display-1 pl-5 pt-5">Pearl Hacks</div>
            </v-card-title>
          </v-layout>
        </v-img>

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
              <v-list-tile-title>Get location</v-list-tile-title>
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
  data () {
    return {
      phoneNumber: 9194187940,
      phoneNumberString: '(919) 481-7940',
      website: 'https://www.instagram.com/pearlhacks/'
    }
  },
  methods: {
    getLocation () {
      let options = {
        enableHighAccuracy: true,
        maximumAge: '3600000'
      }
      navigator.geolocation.getCurrentPosition(onSuccess, onError, options)
      let latitude = ''
      let longitude = ''
      function onSuccess (location) {
        latitude = location.coords.latitude
        longitude = location.coords.longitude
        if (window.cordova.platformId === 'browser') {
          // cordova-plugin-nativegeocoder does not work on browser, display latitude and longitude
          alert('Your location:\nLatitidue: ' + latitude + '\nLongitude: ' + longitude)
        } else {
          // Reverse geolocation, display address location
          window.nativegeocoder.reverseGeocode(success, failure, latitude, longitude, {useLocale: true, maxResults: 1})
        }
      }
      function onError (error) {
        alert('There was a problem getting your geolocation.\nError: ' + error.message)
      }
      function success (result) {
        let firstResult = result[0]
        let address = JSON.stringify(firstResult)
        let position = JSON.parse(address)
        alert(position.subThoroughfare + ' ' + position.thoroughfare + '\n' + position.locality + ', ' +
            position.administrativeArea + ' ' + position.postalCode + '\n' + position.countryCode)
      }
      function failure (error) {
        alert('There was an error translating your location. Error: ' + error)
      }
    },
    makeCall () {
      function callError (message) {
        alert('There was an error making the call. Error: ' + message)
      }
      function callSuccess (result) {
        // do nothing
      }
      window.cordova.plugins.CordovaCall.callNumber(this.phoneNumber, callSuccess, callError)
    },
    openBrowser (url) {
      let cordova
      let target = '_blank'
      let options = 'location = yes'
      function loadErrorCallback (error) {
        alert('Error loading page: ' + error.message)
      }
      let ref = cordova.InAppBrowser.open(url, target, options)
      ref.addEventListener('loaderror', loadErrorCallback)
    },
    openCamera () {
      function cameraError (error) {
        alert('There was a problem taking a picture. Error: ' + error)
      }
      function cameraSuccess (result) {
        // do nothing
      }
      let Camera
      let options = {
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: Camera.PictureSourceType.CAMERA,
        mediaType: Camera.MediaType.PICTURE
      }
      navigator.camera.getPicture(cameraSuccess, cameraError, options)
    },
    vibratePhone () {
      let time = 1000
      navigator.vibrate(time)
      alert('Deutsche Bank wishes you good luck!')
    }
  }
}
</script>
