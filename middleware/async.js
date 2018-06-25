
// this is now replaced by a plugin module npm i express-async-errors

// module.exports = function asyncMiddelWare(handler){
//     return async(req, res, next) => {
//         try {
//             await handler(req,res);
//         }
//         catch(ex) {
//             next(ex);
//         }
//     }
// }