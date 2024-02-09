const { Ticket,Event,User } = require("../database/models");

async function getTickets(req, res) {
    try {
        const tickets = await Ticket.findAll({
            where:{creatorId:req.user.id}
        });
        return res.status(200).json({ tickets: tickets });
    } catch (error) {
        return res.status(500).json({
            message:"Error in fetching tickets"
        })
    }
}
async function bookTicket(req, res) {
    try {
        const { event_id } = req.body;
        if (!event_id) {
            return res.status(400).json({
                message:"Event field is required"
            })
        }
        const event = await Event.findOne({
                    where:{id:event_id}
        })
        if (!event) {
            return res.status(400).json({
                message:"Event Not found"
            })
        }
        let total = event.entry_fee;
        const no_of_participants = 1;
        total = no_of_participants * total;

        // event already book
        const ticket_already_booked = await Ticket.findOne({
            where: {
                userId: req.user.id,
                eventId:event.id,
            }
        })
        if (ticket_already_booked) {
            return res.status(400).json({
                message:"Event Already Booked"
            })
        }
        const new_ticket = await Ticket.create({
            userId: req.user.id,
            eventId: event.id,
            no_of_participants: 1,
            total,
            creatorId:req.user.id,
        })
        return res.status(201).json({
            ticket: new_ticket,
            message:'Event booked successfully'
        })
        
    } catch (error) {
        return res.status(500).json({
           message:"Error in booking event ticket"
        })
    }
}
async function getMyTickets(req, res) {
    try {
        const tickets = await Ticket.findAll({
            where: { userId: req.user.id },
            include: [{
                model: User,
                attributes: ["name"],
                required:true,
            
            },
            {
                model: Event,
                attributes: ["event_name", "image", "entry_fee", "id"],
                required: true,
            },
            ],
        });
        return res.status(200).json({ tickets: tickets });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message:"Error in fetching tickets" })
    }
}
module.exports = {
    getTickets,
    bookTicket,
    getMyTickets
}