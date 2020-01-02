import React, {useState} from 'react'
import ValidationFormContainer from "./ValidationFormContainer";
import axios from "axios";
import ValidationScreenView from "./ValidationScreenView";

export default function () {

    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState(null);

    const handleSubmit = (req) => {
        setIsLoading(true);
        const validateUrl = "http://127.0.0.1:5000/";

        const body = {
            'starting-url': req.url,
            'crawl-depth': parseInt(req.depth),
            'config': {
                'measure_speed': req.checkSpeed,
                'w3c': req.checkW3C
            }
        };
        axios.post(validateUrl, body)
            .then(res => {
                console.log(res.data);
                setIsLoading(false);

                setResults(res.data)

            })
            .catch(err => {
                alert(err.message);
                setIsLoading(false);

            })

    };

    return <ValidationScreenView isLoading={isLoading} results={results} onFormSubmit={handleSubmit}/>
}