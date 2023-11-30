const {Transaction} = require('../../models/transaction');
const {RENDER_BAD_REQUEST} = require('../common/utils');

const delete_transaction = async (req, res) => {
    try {
        //Check for transaction ID exist then delete
        var transaction = await Transaction.findById(req.params.transaction_id);
        if(!transaction){return res.status(400).json({code: 400, message: "Invalid Transaction ID"})}
        await Transaction.findByIdAndDelete(req.params.transaction_id);
        //Recordings Delete This Transaction
       res.status(200).json({
            code      : 200,
            message   : 'Transaction deleted successfully'
        });     
    } catch (e) {
       RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = delete_transaction;