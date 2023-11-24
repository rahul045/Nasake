import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
const Journal = () => {

    const [content, setContent] = useState('');
    let navigate = useNavigate();
    const sess = window.sessionStorage.getItem('session')
    const addNote = async (e) => {

        // console.log(content);
        const resp = await fetch("https://rahul045.pythonanywhere.com/addnote/" + sess, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                content: content
            })
        })

        if (resp.status !== 200) {
            console.log(resp.json());
            navigate('/error');

        }
        console.log(resp.json())
        navigate('/landing');

    }
    const [a, setA] = useState('')

    return (


        <>
            <div>
                <Navbar a={sess.length != 0 ? "1" : "0"} />

            </div>

            <div style={{ display: "flex" }}>
                <div className="ptr" style={{ display: "inline-block", width: "500px" }}>
                    <h4 className="pnts" > Want to write but don't know how? No worries, follow these points!</h4> <br />
                    <ul>
                        <li><p className="pnts" > Talk About Your Day</p></li>
                        <li><p className="pnts"> Identify Things You’re Grateful For</p></li>
                        <li><p className="pnts"> Write a List of Your Coping Mechanisms</p></li>
                        <li><p className="pnts"> Describe a Goal</p></li>
                        <li><p className="pnts"> Write About How Different You Were 5 Years Ago</p></li>
                        <li><p className="pnts"> Write a Letter to Your Body</p></li>
                        <li><p className="pnts"> List and Describe Your Emotions</p></li>
                        <li><p className="pnts"> Write About How You’d Describe Yourself to a Stranger</p></li>
                        <li><p className="pnts"> Describe the Best Compliment You’ve Ever Gotten</p></li>
                        <li><p className="pnts"> Write a Message for Yourself on Bad Days</p></li>
                    </ul>
                </div>
                <div className="jrn" style={{ width: '500px', display: "inline-block" }}>

                    <div className="mb-3">
                        <label htmlFor="description" name="content" className="form-label" ><h4>Your Today's Journal</h4></label>
                        <input type="text" name="content" value={content} onChange={(e) => setContent(e.target.value)} className="form-control" id="input-description" style={{ height: '500px' }}
                            required minLength={5} />
                    </div>


                    <button className="btn btn-primary" onClick={addNote}>Add Journal</button>


                </div>
            </div>
        </>




    )
}
export default Journal;