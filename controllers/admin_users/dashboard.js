const {PaymentTransaction} = require('../../models/payment_transaction');
const {Program} = require('../../models/program');
const {Lesson} = require('../../models/lesson');
const {MemberUser} = require('../../models/member');
const {RENDER_BAD_REQUEST} = require('../common/utils');
const bcrypt = require('bcryptjs');

const dashboard = async (req, res) => {
    try {
        let program_array = [];
        let transaction_revnue = await PaymentTransaction.CountTransactionAmount();
        transaction_revnue = transaction_revnue.length?transaction_revnue[0].total_amount:0;
        var lesson_count  = await Lesson.find({}).countDocuments();
        var program_count = await Program.find({}).countDocuments();
        var member_count  = await MemberUser.find({}).countDocuments();
        var lesson        = await Lesson.find({}).sort({createdAt: -1}).limit(5);
        var member_user   = await MemberUser.find({}).sort({createdAt: -1}).limit(5);
        var program       = await Program.find({}).sort({createdAt: -1}).limit(5);
        const promise = program.map(async Obj => {
            let program_member_count = await MemberUser.find({"program._id":Obj._id, status:true}).countDocuments();
            let program_lesson_count = await Lesson.find({"program._id":Obj._id, status:true}).countDocuments();
            Obj.total_active_members = program_member_count;
            Obj.no_of_lesson = program_lesson_count;
            program_array.push(Obj);
        })
        await Promise.all(promise);
        res.status(200).json({
            code      : 200,
            message   : 'Dashboard Api',
            transaction_revnue : transaction_revnue,
            lesson_count : lesson_count,
            program_count : program_count,
            member_count : member_count,
            recent_lesson : lesson,
            recent_member : member_user,
            recent_program : program_array
        });     
    } catch (e) {
        RENDER_BAD_REQUEST(res, e);
    }
};

module.exports = dashboard;