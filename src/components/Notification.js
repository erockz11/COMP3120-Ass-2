import React from 'react'

const Notification = ({ message, type }) => {
    // display a notification with `message` and styling specified by `type` (styled in ../index.css)
    // valid types: `success`, `error`, `notice`
    if (message) {
        const notificationClass = "notification-" + type
        console.log("displaying notification");
        return (
            <div className={notificationClass}>
                {message}
            </div>
        )
    } else {
        return null
    }
}

export default Notification