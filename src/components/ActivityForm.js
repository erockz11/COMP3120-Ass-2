import React from 'react'

const ActivityForm = ({ setActivityType, setActivityParticipants, setActivityPrice, findActivityByParticipants, findActivityByPrice, findActivityByType, findRandom }) => {
    return (
        <div className="container">
            <form>
                <div className="row">
                    <div className="four columns">
                        <label htmlFor="type">Type</label> <br />
                        <select onChange={(e) => setActivityType(e.target.value)} name="type">
                        <option value="education">Education</option>
                        <option value="recreational">Recreational</option>
                        <option value="social">Social</option>
                        <option value="DIY">DIY</option>
                        <option value="charity">Charity</option>
                        <option value="cooking">Cooking</option>
                        <option value="relaxation">Relaxation</option>
                        <option value="music">Music</option>
                        <option value="busywork">Busywork</option>
                        </select>
                    </div>

                    {/* activities.json from API currently doesn't have any activities with more than 5 participants */}
                    <div className="four columns">
                        <label htmlFor="participants">Participants</label> <br />
                        1<input style={{marginRight: '15px', marginLeft: '3px'}} type="radio" name="participants" value="1" onChange={(e) => setActivityParticipants(e.target.value)} />
                        2<input style={{marginRight: '15px', marginLeft: '3px'}} type="radio" name="participants" value="2" onChange={(e) => setActivityParticipants(e.target.value)} />
                        3<input style={{marginRight: '15px', marginLeft: '3px'}} type="radio" name="participants" value="3" onChange={(e) => setActivityParticipants(e.target.value)} />
                        4<input style={{marginRight: '15px', marginLeft: '3px'}} type="radio" name="participants" value="4" onChange={(e) => setActivityParticipants(e.target.value)} />
                        5<input style={{marginRight: '15px', marginLeft: '3px'}} type="radio" name="participants" value="5" onChange={(e) => setActivityParticipants(e.target.value)} />
                    
                    </div>

                    {/* API uses [0.0 - 1.0] */}
                    <div className="four columns">
                        <label htmlFor="price">Price Range</label> <br />
                        <input type="range" name="price" min="0.0" max="1.0" step="0.1" onChange={(e) => setActivityPrice(e.target.value)} />
                    
                    </div> 
                </div>

                <div className="row">
                    <div className="four columns"><button className="button-primary" onClick={ findActivityByType } style={{marginRight: '10px'}}>Show me an activity (by type)</button></div>
                    <div className="four columns"><button className="button-primary" onClick={ findActivityByParticipants } style={{marginRight: '10px'}}>Show me an activity (by participants)</button></div>
                    <div className="four columns"><button className="button-primary" onClick={ findActivityByPrice } style={{marginRight: '10px'}}>Show me an activity (by price)</button></div>
                </div>

                <div className="row">
                    <button className="button-primary" onClick={ findRandom } style={{marginRight: '10px'}}>... or show me a random activity</button>
                </div>
            </form>
        </div>
    )
}

export default ActivityForm