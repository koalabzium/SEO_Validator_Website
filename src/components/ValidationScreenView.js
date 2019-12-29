import React from 'react'
import ValidationFormContainer from "./ValidationFormContainer";
import ValidationResultView from "./ValidationResultView";


export default function (props) {

    return(<div>
        <ValidationFormContainer onSubmit={props.onFormSubmit} />
        <ValidationResultView isLoading={props.isLoading}
                              results={props.results}
        />

    </div>)

}

