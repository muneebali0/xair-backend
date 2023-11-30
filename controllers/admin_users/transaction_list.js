const { Transaction } = require('../../models/transaction');
const { RENDER_BAD_REQUEST } = require('../common/utils');

const transaction_list = async (req, res) => {
    try {
        const transaction = await Transaction.find({}).sort({ createdAt: -1 }).populate('plan member subscription');
        res.status(200).json({
            code: 200,
            message: 'Transaction List',
            transaction: transaction
        });
    } catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = transaction_list;