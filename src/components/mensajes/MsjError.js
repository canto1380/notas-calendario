import React, { Fragment } from 'react';

const MsjError = (props) => {
    return (
        <Fragment>
            <div className="row mt-5">
        <div className="col-10 alert alert-danger mx-auto">
            <h4 className="text-center">ERROR!</h4>
            <p className="text-center">{props.text1} <strong>{props.text2}</strong></p>
        </div> 
        </div>
        </Fragment>
    );
};

export default MsjError;