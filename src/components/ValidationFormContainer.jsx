import React, {useState} from 'react'
import ValidationFormView from "./ValidationFormView";
import axios from "axios";

export default function (props) {

    const [url, setUrl] = useState('');
    const [depth, setDepth] = useState(0);

    return <ValidationFormView
        url={url}
        onUrlChange={(event) => setUrl(event.target.value)}
        depth={depth}
        onDepthChange={event => setDepth(event.target.value)}
        onSubmit={() => {props.onSubmit({url, depth})}}
    />
}