import React from 'react'
import Rank from './Rank.js'

const Leaderboard = (props) => {

    return (
        <ul>
            {props.leaderboard.map(rank => {
                return <Rank key={rank.id} username={rank.username} score={rank.score}/>;
            })}
        </ul>
    )

}

export default Leaderboard
