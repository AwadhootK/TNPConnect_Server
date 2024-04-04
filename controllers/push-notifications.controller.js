const { ONE_SIGNAL_CONFIG } = require('../config/app.config.js');
const pushNotificationService = require('../push-notification.services.js');

exports.SendNotification = (req, res, next) => {
    var message = {
        app_id: ONE_SIGNAL_CONFIG.APP_ID,
        contents: { en: "You are selected! Enjoy Life Now!" },
        included_segments: ["All"],
        content_available: true,
        small_icon: "ic_notification_icon",
        data:
            { PushTitle: "CUSTOM NOTIFICATION" }
    };

    pushNotificationService.sendNotification(message, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results,
        });
    });
}



exports.SendNotificationToDevice = (deviceIDList, companyName) => {

    console.log(deviceIDList)
    var message = {
        app_id: ONE_SIGNAL_CONFIG.APP_ID,
        contents: { en: "Congratulations! 🤩🥳 You have received an internship at " + companyName + "!!" },
        included_segments: ["include_player_ids"],
        include_player_ids: deviceIDList,
        content_available: true,
        small_icon: "ic_notification_icon",
        data:
            { PushTitle: "CUSTOM NOTIFICATION" }
    };

    pushNotificationService.sendNotification(message, (error, results) => {
        if (error) {
            console.log("error in sending notification");
            return;
        }

        console.log("sent notification!");
    });
}
