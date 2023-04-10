const MsgErrors = (errorReceived, field) => {
  let errorArray = errorReceived.error || [];

  return errorArray?.map((e, index) =>
    e.field !== errorReceived.field || !errorReceived.message ? (
      <div className="alert alert-danger" role="alert" key={index}>
        {e.message}
      </div>
    ) : (
      ""
    )
  );
};

export default MsgErrors;