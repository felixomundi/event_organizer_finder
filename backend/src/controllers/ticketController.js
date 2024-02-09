const { Ticket,Event,User } = require("../database/models");
const { Sequelize } = require('sequelize');
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
                attributes: ["event_name", "location", "image", "entry_fee", "id"],
                required: true,
            },
            ],
        });
        return res.status(200).json({ tickets: tickets });
    } catch (error) {       
        return res.status(500).json({ message:"Error in fetching tickets" })
    }
}
const cartTotal = async (req, res) => {
    try {
        const cart = await Ticket.findAll({
            where: { userId: req.user.id },
            attributes: [               
                [Sequelize.fn("SUM", Sequelize.cast(Sequelize.col("total"), 'integer')),"total"], 
            ],
            raw: true,
        });
      
        let total = 0;
        for (const obj of cart) {
            const values = Object.values(obj);
            total = values[0];            
        }
        total = Number(total).toFixed(2);

        return res.status(200).json({total});
        
    } catch (error) {
        return res.status(500).json({ message:"Error in getting cart total" })
    }
}
const totalItems = async (req, res) => {
    try {
        let total = 0;
        const cart = await Ticket.findAll({ where: { userId: req.user.id } });       
        total = cart.length;    
        return res.status(200).json(total);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message:"Error in getting total ticket items" }) 
    }
    
}
const clearCart = async(req, res) => {
    try {
      await Ticket.destroy({ where: { userId: req.user.id } });
        return res.status(200).json({           
            message:"Cart Cleared",
           })
       
    } catch (error) {
        return res.status(500).json({
            message:"Something went wrong",
        })  
    }
}
const deleteCartItem = async (req, res) => {   
    try {
        const cartId = req.body.cartId;  
        if (!cartId) {
            return res.status(400).json({
                "message": "No Cart Item Selected",
                "status":400,
            }); 
        }
        else {            
        
            const cart = await Ticket.findOne({where:{id: cartId, userId:req.user.id}});
        if (cart) {
            await cart.destroy();
            return res.status(200).json({
                "message": "Cart Item Deleted"                
            }); 
        } else {
            return res.status(404).json({
                "message": "Cart Item Not Found"                
            });     
        }
        } 
    } catch (error) {
        if (error) {
            return res.status(500).json({
                message: "Something went wrong When deleting",
            });            
        }
        
    }
    
}
module.exports = {
    getTickets,
    bookTicket,
    getMyTickets,
    cartTotal,
    totalItems,
    clearCart,
    deleteCartItem,
}