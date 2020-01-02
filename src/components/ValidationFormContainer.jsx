import React, {useState} from 'react'
import ValidationFormView from "./ValidationFormView";
import axios from "axios";

export default function (props) {

    const [url, setUrl] = useState('http://koalabzium.github.io/test_page/');
    const [depth, setDepth] = useState(0);
    const [checkSpeed, setCheckSpeed] = useState(false);
    const [checkW3C, setCheckW3C] = useState(false);

    return <ValidationFormView
        url={url}
        onUrlChange={(event) => setUrl(event.target.value)}
        depth={depth}
        onDepthChange={event => setDepth(event.target.value)}
        onCheckSpeedChange={event => setCheckSpeed(event.target.checked)}
        onCheckW3CChange={event => setCheckW3C(event.target.checked)}
        checkSpeed = {checkSpeed}
        onSubmit={() => {props.onSubmit({url, depth, checkSpeed, checkW3C})}}
    />
}