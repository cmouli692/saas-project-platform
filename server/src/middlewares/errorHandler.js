// export const errorHandler = (err, req, res, next) => {
//     console.error("GLOBAL ERROR:", err);
//     if(res.headersSent){
//         return next(err);
//     }
//     const status = err.status || 500;
//     const message = err.message || "Server error";
//     res.status(status).json({message});
// }

export const errorHandler = (err, req, res, next) => {
  console.error(
    JSON.stringify({
      requestId: req.requestId,
      message: err.message,
      stack: err.message,
      stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    }),
  );

  const status = err.status || 500;
  res.status(status).json({
    message:err.message || "Server error",
    requestId : req.requestId,
  })
};
