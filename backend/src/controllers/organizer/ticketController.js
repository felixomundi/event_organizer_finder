const { Ticket } = require("../../database/models");

async function getTickets(req, res) {
    try {
        const tickets = await Ticket.findAll({
            where:{creatorId:req.user.id}
        });
        return res.status(200).json({
            tickets
        })
    } catch (error) {
        return res.status(200).json({
            message:"Error in fetching tickets"
        })
    }
}
async function bookTicket(req, res) {
    try {
        
    } catch (error) {
        
    }
}
module.exports = {
    getTickets,
    bookTicket
}