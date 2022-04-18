import './App.css';
import {useEffect, useState} from "react";
import fuzzysort from "fuzzysort";
import {ChangeEvent} from "react";

function App() {
    useEffect(() => {
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
            .then(function (result) {
                setListToShow(result)
                setPositivListe(result.map(o => {
                    return {
                        ...o,
                        CVR_SE_TIN: o["CVR_SE_TIN"].toString(),
                        Første_registreringsår: o["Første_registreringsår"].toString()
                    }
                }))
            });

    }, [])

    let [positivListe, setPositivListe] = useState([])
    let [listToShow, setListToShow] = useState([])

    function fuzzyMatchList(e: ChangeEvent<HTMLInputElement>) {
        const val = e.target.value
        if (isBlank(val)) {
            setListToShow(positivListe)
            return;
        }
        var resultList = fuzzysort.go(e.target.value, positivListe,
            {keys: ["taxCountry", "ISIN_kode", "Navn", "LEI_kode", "ASIDENT", "CVR_SE_TIN", "Navn__1", "Første_registreringsår"]})
        console.log(resultList)
        setListToShow(resultList.map(r => r.obj))
    }

    function isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }

    return (
        <div className="App">

            <p>Baseret på <a href="https://skat.dk/getfile.aspx?id=148572&type=xlsx">Liste over aktiebaserede
                investeringsselskaber 2022</a> som kan findes på <a href="https://skat.dk/skat.aspx?oid=2244641">Skat.dk:
                Beviser og aktier i investeringsforeninger og selskaber (IFPA)</a></p>

            <input onChange={(e) => fuzzyMatchList(e)}/>

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
                {listToShow.map((o, i) =>
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
