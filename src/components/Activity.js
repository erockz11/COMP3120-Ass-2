import React from 'react'

const Activity = ({ activity }) => {
    if (activity) {
        return (
            <div>
                { activity.activity }
            </div>
        )
    } else {
        return null
    }
}

export default Activity