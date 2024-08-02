class AppNotification {
    constructor(
        public type:AppNotificationType,
        public message:string,
        public date:Date = new Date()
    ) {}
}

enum AppNotificationType {
    Info = "Info",
    Warning = "Warning",
    Error = "Error"
}

enum NotificationMessage {
    NoData = "Error fetching data",
    WrongId = "Unknown country id",
    PageNotFound = "Error",
    Loading = "Loading",
}

export {
    AppNotification,
    AppNotificationType,
    NotificationMessage
}