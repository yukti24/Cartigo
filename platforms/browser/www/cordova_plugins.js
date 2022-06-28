cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-fcm-with-dependecy-updated/www/FCMPlugin.js",
        "id": "cordova-plugin-fcm-with-dependecy-updated.FCMPlugin",
        "pluginId": "cordova-plugin-fcm-with-dependecy-updated",
        "clobbers": [
            "FCM"
        ]
    },
    {
        "file": "plugins/cordova-plugin-facebook-connect/www/facebook-browser.js",
        "id": "cordova-plugin-facebook-connect.FacebookConnectPluginBrowser",
        "pluginId": "cordova-plugin-facebook-connect",
        "clobbers": [
            "facebookConnectPlugin"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-fcm-with-dependecy-updated": "7.8.0",
    "cordova-plugin-androidx": "3.0.0",
    "cordova-plugin-androidx-adapter": "1.1.3",
    "cordova-plugin-facebook-connect": "3.2.0"
}
// BOTTOM OF METADATA
});