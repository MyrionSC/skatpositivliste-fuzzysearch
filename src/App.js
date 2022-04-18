import './App.css';
import {useEffect, useState} from "react";

function App() {
    const getData = () => {
        fetch('data/positiv-liste-2022.json', {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                return response.json();
            })
            .then(function (myJson) {
                setPositivListe(myJson)
            });
    }
    useEffect(() => {
        getData()
    })

    let [positivListe, setPositivListe] = useState([])

    return (
        <div className="App">



            {positivListe.map((item, i) =>
                <div key={i}>
                    <p>{item.Navn}</p>
                </div>
            )}
        </div>
    );
}

export default App;
