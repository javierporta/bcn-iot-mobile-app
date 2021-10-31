# bcn-iot-mobile-app

Crossplatform web and mobile application developed with React Native and Expo written in Typescript. The app communicates with a Web API (https://github.com/javierporta/bcn-iot-webapi)
 to get telemetry data related to different temperature and humidity sensors located in a office. It also gets and updates current client values (names and threshold). In addition, this app receives push notifications when temperature measured is too high or too low, depending on the threshold set.
 
 NOTE: Push notifications only work for Android and iOS, but not for the Web.
 
 
 
 # How to run it?
 
    expo start
    
Then you can select if you want to run the project in:
- Web
- Android
- iOS
