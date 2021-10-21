import React from "react";

const Rank = (props) => {

    return(
        <div>
            <li><b>{props.username}</b>: {props.score} points</li>
        </div>
    )

}

export default Rank