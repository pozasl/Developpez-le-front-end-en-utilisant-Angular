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

export {
    AppNotification,
    AppNotificationType
}