<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>

        <v-img id="profilePhoto" src="https://www.cntry.biz/wp-content/uploads/2015/12/Female-Coders.jpg" height="300px">
          <v-layout column fill-height>
            <v-spacer></v-spacer>
            <v-card-title class="white--text pl-5 pt-5">
              <div class="display-1 pl-5 pt-5">Pearl Hacks</div>
            </v-card-title>
          </v-layout>
        </v-img>

        <v-list two-line>

          <v-list-tile @click="makeCall(phoneNumber)">
            <v-list-tile-action>
              <v-icon color="indigo">phone</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Make a call</v-list-tile-title>
              <v-list-tile-sub-title>Deutsche Bank Cary Office: {{phoneNumberString}}</v-list-tile-sub-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-divider inset></v-divider>

          <v-list-tile @click="openBrowser(website)">
            <v-list-tile-action>
              <v-icon class="fab fa-instagram" color="indigo"></v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Open in-app browser</v-list-tile-title>
              <v-list-tile-sub-title>PearlHacks Instagram</v-list-tile-sub-title>
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
  name: 'Profile',
  data () {
    return {
      phoneNumber: 9194187940,
      phoneNumberString: '(919) 481-7940',
      platforms: {
        ANDROID: 'android',
        BROWSER: 'browser'
      },
      website: 'https://www.instagram.com/pearlhacks/'
    }
  },
  methods: {
    getLocation () {
      const options = {
        enableHighAccuracy: true,
        maximumAge: '3600000'
      }
      navigator.geolocation.getCurrentPosition(onSuccess, onError, options)
      let latitude
      let longitude
      function onSuccess (location) {
        latitude = location.coords.latitude
        longitude = location.coords.longitude
        if (window.cordova.platformId === this.platforms.BROWSER) {
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
        const firstResult = result[0]
        const address = JSON.stringify(firstResult)
        const position = JSON.parse(address)
        alert(position.subThoroughfare + ' ' + position.thoroughfare + '\n' + position.locality + ', ' +
            position.administrativeArea + ' ' + position.postalCode + '\n' + position.countryCode)
      }
      function failure (error) {
        alert('There was an error translating your location. Error: ' + error)
      }
    },
    makeCall (phoneNumber) {
      if (window.cordova && window.cordova.platformId !== this.platforms.BROWSER) {
        window.cordova.plugins.CordovaCall.callNumber(this.phoneNumber, callSuccess, callError)
      } else {
        // cordova-call plugin does not work on browser, display alert
        alert('Unable to call ' + phoneNumber + ' in browser.')
      }
      function callError (message) {
        alert('There was an error making the call. Error: ' + message)
      }
      function callSuccess (result) {
        // do nothing
      }
    },
    openBrowser (url) {
      function loadErrorCallback (error) {
        alert('Error loading page: ' + error.message)
      }
      if (window.cordova && window.cordova.platformId !== this.platforms.BROWSER) {
        // Prevent Cordova browser platform for x-frame-options: sameorigin urls
        const target = '_blank'
        const options = 'location = yes'
        const ref = window.cordova.InAppBrowser.open(url, target, options)
        ref.addEventListener('loaderror', loadErrorCallback)
      } else {
        // alert('Not opening in-app browser. Platform: ' + window.cordova.platformId + ' Cordova: ' + cordova)
        const target = '_system'
        window.open(url, target)
      }
    },
    openCamera () {
      function cameraError (error) {
        alert('There was a problem taking a picture. Error: ' + error)
      }
      function cameraSuccess (imageData) {
        const image = document.getElementById('profilePhoto').getElementsByClassName('v-image__image--cover')[0]
        image.setAttribute('style', 'background-image: url(' + imageData + ');')
      }
      if (window.cordova) {
        let options
        if (window.cordova.platformId === this.platforms.ANDROID) {
          options = {
            sourceType: window.Camera.PictureSourceType.CAMERA,
            mediaType: window.Camera.MediaType.PICTURE
          }
          navigator.camera.getPicture(cameraSuccess, cameraError, options)
        } else if (window.cordova.platformId === this.platforms.BROWSER) {
          alert('Camera on a browser is not yet supported')
        }
      }
    },
    vibratePhone () {
      const time = 1000
      navigator.vibrate(time)
      alert('Deutsche Bank wishes you good luck!')
    }
  }
}
</script>
