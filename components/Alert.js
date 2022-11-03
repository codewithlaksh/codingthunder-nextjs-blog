const Alert = function(props) {
    return (
        <>
            {props.alert && <div className={`alert alert-${props.alert.type==="error"?"danger":"success"} alert-dismissible fade show`} role="alert">
                <strong>{props.alert.type==="error"?"Error":"Success"}:</strong> {props.alert.msg}
            </div>}
        </>
    );
}

export default Alert;