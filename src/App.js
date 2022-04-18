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
    let timeout;

    function getHighligtedList(resultList) {
        return resultList.map(r => {
            return {
                "Registreringland": r[0] ? fuzzysort.highlight(r[0], '<b>', '</b>') : r.obj['Registreringland'],
                "ISIN_kode": r[1] ? fuzzysort.highlight(r[1], '<b>', '</b>') : r.obj['ISIN_kode'],
                "Navn": r[2] ? fuzzysort.highlight(r[2], '<b>', '</b>') : r.obj['Navn'],
                "LEI_kode": r[3] ? fuzzysort.highlight(r[3], '<b>', '</b>') : r.obj['LEI_kode'],
                "ASIDENT": r[4] ? fuzzysort.highlight(r[4], '<b>', '</b>') : r.obj['ASIDENT'],
                "CVR_SE_TIN": r[5] ? fuzzysort.highlight(r[5], '<b>', '</b>') : r.obj['CVR_SE_TIN'],
                "Navn__1": r[6] ? fuzzysort.highlight(r[6], '<b>', '</b>') : r.obj['Navn__1'],
                "Første_registreringsår": r[7] ? fuzzysort.highlight(r[7], '<b>', '</b>') : r.obj['Første_registreringsår'],
            }
        })
    }

    function fuzzyMatchList(e: ChangeEvent<HTMLInputElement>) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            const val = e.target.value
            if (isBlank(val)) {
                setListToShow(positivListe)
                return;
            }
            var resultList = fuzzysort.go(e.target.value, positivListe,
                {keys: ["taxCountry", "ISIN_kode", "Navn", "LEI_kode", "ASIDENT", "CVR_SE_TIN", "Navn__1", "Første_registreringsår"]})
            setListToShow(getHighligtedList(resultList))
        }, 50)
    }

    function isBlank(str) {
        return (!str || /^\s*$/.test(str));
    }

    const RawHTML = ({children, className = ""}) =>
        <div className={className} dangerouslySetInnerHTML={{__html: children}}/>

    return (
        <div className="App">

            <p style={{fontSize: "1.15rem"}}>Fuzzy search i skats positivliste</p>

            <p>Baseret på <a href="https://skat.dk/getfile.aspx?id=148572&type=xlsx">Liste over aktiebaserede
                investeringsselskaber 2022</a> som kan findes på <a href="https://skat.dk/skat.aspx?oid=2244641">Skat.dk:
                Beviser og aktier i investeringsforeninger og selskaber (IFPA)</a></p>

            <input autoFocus onChange={(e) => fuzzyMatchList(e)}/>

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
                        <td><RawHTML>{o.Registreringland}</RawHTML></td>
                        <td><RawHTML>{o.ISIN_kode}</RawHTML></td>
                        <td><RawHTML>{o.Navn}</RawHTML></td>
                        <td><RawHTML>{o.LEI_kode}</RawHTML></td>
                        <td><RawHTML>{o.ASIDENT}</RawHTML></td>
                        <td><RawHTML>{o.CVR_SE_TIN}</RawHTML></td>
                        <td><RawHTML>{o.Navn__1}</RawHTML></td>
                        <td><RawHTML>{o.Første_registreringsår}</RawHTML></td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}

export default App;
