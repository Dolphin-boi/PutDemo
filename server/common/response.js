function successRes(res, data = {}, statusCode = 200) {
    return res.status(statusCode).json({ success: true, data });
}

function errorRes(res, err, errMsg = "failed operation", statusCode = 400) {
    console.error("ERROR:", err);
    return res.status(statusCode).json({ success: false, error: errMsg, errorInfo:err });
}
module.exports = {
    errorRes,
    successRes
  };