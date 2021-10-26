import React from "react";

//component that displays each separate ranking in the leaderboard
const Rank = (props) => {

    return(
        <div>
            <li><b>{props.username}</b>: {props.score} points</li>
        </div>
    )

}

export default Rank