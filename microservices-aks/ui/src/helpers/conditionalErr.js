// Conditional Errors for ServerSide Form Validation
const ConErrors = (errorReceived, field) => {
    let errorArray = errorReceived.error || [];
    return errorArray?.map((e, index) => e.field === errorReceived.field || !errorReceived.field ? (
        <div className="alert alert-danger" role="alert" key={index}>
            {e.message}
        </div>
    )
    : ""
    );
};
  
export default ConErrors;