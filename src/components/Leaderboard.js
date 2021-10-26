import React from 'react'
import Rank from './Rank.js'

//component that displays the leaderboard rankings
const Leaderboard = (props) => {

    return (
        <div>
            <h1>Activity Leaderboard</h1>
            <ol>
                {props.leaderboard.map(rank => {
                    return <Rank key={rank.id} username={rank.username} score={rank.score}/>
                })}
            </ol>
        </div>
    )

}

export default Leaderboard
