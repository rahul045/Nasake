import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import whitecat from './images/white-cat.png'
import { PieChart } from 'react-minimal-pie-chart';



import { Link } from 'react-router-dom'
const Landing = () => {
    // export class Newscomp extends Component {
    const sess = window.sessionStorage.getItem('session')
    const [sentiment, setSent] = useState('');
    const [emotion, setEmot] = useState('');
    const [dt, setDt] = useState('');
    const [data, setData] = useState('');

    const graph = async () => {
        const resp = await fetch("https://rahul045.pythonanywhere.com/getgraph/" + sess, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
        const dat = await resp.json();

        if (resp.status !== 200) {
            console.log(dat);

        }
        setEmot(dat[0]['emotion'])
        setSent(dat[1]['sentiment']);

    }

    const setit = () => {

        setDt(
            [
                { title: 'Happy', value: emotion['Angry'] * 100, color: '#43A19E' },
                { title: 'Sad', value: emotion['Sad'] * 100, color: '#7B43A1' },
                { title: 'Angry', value: emotion['Angry'] * 100, color: '#FF0000' },
                { title: 'Fear', value: emotion['Fear'] * 100, color: '#F2317A' },
                { title: 'Excited', value: emotion['Excited'] * 100, color: '#eab676' },
                { title: 'Bore', value: emotion['Bored'] * 100, color: '#b97455' }
            ]
        )
        setData(
            [
                { title: 'Positive', value: sentiment['positive'] * 100, color: '#43A19E' },
                { title: 'Negative', value: sentiment['negative'] * 100, color: '#7B43A1' },
                { title: 'Neutral', value: sentiment['neutral'] * 100, color: '#F2317A' }
            ])




    }
    useEffect(() => {
        (async () => {
            await graph();
        })();

        return async () => {
            await graph();

        };
    }, []);
    const isdata = Object.keys(emotion).length

    return (
        <div onMouseOver={setit}>

            <div>
                <Navbar a="1" />

            </div>
            <img className="white-cat" src={whitecat} alt="white-cat" />

            <div >
                <h3 className="poem">"It is okay to cry sometimes,<br />Sometimes, it is okay to yell,<br />As long as you don't keep everything inside,<br />Sometimes it is okay to be sad as well."<br />~b.a.</h3>
                <h2>hi, buddy!</h2>
                <h4>what are you looking for today?</h4>
                <div className="btu" style={{ display: "flex" }}>
                    <button style={{ margin: "20px" }} type="button" className="btn btn-info"><Link className="test" to="/addjournal">Add Journal</Link></button>
                    <div className="dropdown" style={{ margin: "20px" }}>
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Therapists
                        </button>
                        <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" to="/mumbai">Mumbai</Link></li>
                            <li><Link className="dropdown-item" to="/delhi">Delhi</Link></li>
                            <li><Link className="dropdown-item" to="/bengaluru">Bengaluru</Link></li>
                            <li><Link className="dropdown-item" to="/kolkata">Kolkata</Link></li>
                        </ul>
                    </div>
                    <div className="dropdown" style={{ margin: "20px" }}>
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Support Groups
                        </button>
                        <ul className="dropdown-menu">
                            <li><Link className="dropdown-item" to="/online">Online</Link></li>
                            <li><Link className="dropdown-item" to="/both">Both</Link></li>
                        </ul>
                    </div>

                </div>
            </div>
            <br /> <br />
            <div>
                <h2>we've got some tests for you...</h2>
                <button style={{ margin: "20px" }} type="button" className="btn btn-info"><Link className="test" to="https://screening.mhanational.org/screening-tools/depression/?ref">Depression Test</Link></button>
                <button style={{ margin: "20px" }} type="button" className="btn btn-info"><Link className="test" to="https://screening.mhanational.org/screening-tools/anxiety/?ref">Anxiety Test</Link></button>
                <button style={{ margin: "20px" }} type="button" className="btn btn-info"><Link className="test" to="https://screening.mhanational.org/screening-tools/psychosis/?ref">Psychosis & Schizophrenia Test</Link></button>
                <button style={{ margin: "20px" }} type="button" className="btn btn-info"><Link className="test" to="https://screening.mhanational.org/screening-tools/ptsd/?ref">PTSD Test</Link></button>
                <button style={{ margin: "20px" }} type="button" className="btn btn-info"><Link className="test" to="https://screening.mhanational.org/screening-tools/eating-disorder/?ref">Eating Disorder Test</Link></button>
                <button style={{ margin: "20px" }} type="button" className="btn btn-info"><Link className="test" to="https://screening.mhanational.org/screening-tools/addiction/?ref">Addiction Test</Link></button>
                <button style={{ margin: "20px" }} type="button" className="btn btn-info"><Link className="test" to="https://screening.mhanational.org/screening-tools/parent/?ref">Parent Test: Your Child’s Mental Health</Link></button>
                <button style={{ margin: "20px" }} type="button" className="btn btn-info"><Link className="test" to="https://screening.mhanational.org/screening-tools/bipolar/?ref">Bipolar Test</Link></button>
                <button style={{ margin: "20px" }} type="button" className="btn btn-info"><Link className="test" to="https://screening.mhanational.org/screening-tools/youth/?ref">Youth Mental Health Test</Link></button>
                <button style={{ margin: "20px" }} type="button" className="btn btn-info"><Link className="test" to="https://screening.mhanational.org/screening-tools/adhd/?ref">Attention Deficient Hyperactivity Disorder</Link></button>



            </div>
            {/* <button onClick={graph}>graph</button> */}
            {/* {graph()} */}
            <h2 style={{ margin: "20px", color: "black" }}> Sentimental And Emotional Analysis </h2>

            {isdata !== 0 ?
                < div style={{ height: "300px", color: "black", display: "flex" }}>

                    <PieChart
                        animate
                        animationDuration={500}
                        animationEasing="ease-out"
                        center={[50, 50]}
                        data={data}
                        lengthAngle={360}
                        lineWidth={40}
                        paddingAngle={0}
                        radius={50}
                        rounded
                        startAngle={0}
                        viewBoxSize={[120, 120]}
                        label={(data) => data.dataEntry.title + " " + String(data.dataEntry.value).slice(0, 4) + "%"}
                        labelPosition={65}
                        labelStyle={{
                            fontSize: "5px",
                            fontColor: "white",
                            fontWeight: "600",
                        }}
                    />

                    <PieChart
                        animate
                        animationDuration={500}
                        animationEasing="ease-out"
                        center={[50, 50]}
                        data={dt}
                        lengthAngle={360}
                        lineWidth={40}
                        paddingAngle={0}
                        radius={50}
                        rounded
                        startAngle={0}
                        viewBoxSize={[120, 120]}
                        label={(data) => data.dataEntry.title + " " + String(data.dataEntry.value).slice(0, 4) + "%"}
                        labelPosition={65}
                        labelStyle={{
                            fontSize: "5px",
                            fontColor: "white",
                            fontWeight: "600",
                        }}

                    />
                </div> : <h3>No Journal Found For Analysis</h3>}
        </div>
    )
}
export default Landing;