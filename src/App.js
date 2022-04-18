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

            <table>
                <thead>
                <tr>
                    <th>Registreringsland /Skattemæssigt hjemsted</th>
                    <th>ISIN-kode</th>
                    <th>Navn</th>
                    <th>LEI kode</th>
                    <th>ASIDENT</th>
                    <th>CVR/SE/TIN</th>
                    <th>Navn</th>
                    <th>Første registreringsår</th>
                </tr>
                </thead>

                <tbody>
                {positivListe.map((o, i) =>
                    <tr key={i}>
                        <td>{o.taxCountry}</td>
                        <td>{o.ISIN_kode}</td>
                        <td>{o.Navn}</td>
                        <td>{o.LEI_kode}</td>
                        <td>{o.ASIDENT}</td>
                        <td>{o.CVR_SE_TIN}</td>
                        <td>{o.Navn__1}</td>
                        <td>{o.Første_registreringsår}</td>
                    </tr>
                )}
                </tbody>
            </table>


        </div>
    );
}

export default App;
