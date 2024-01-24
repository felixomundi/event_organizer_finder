const { Event } = require("../../database/models");
const generateDate = require("../../utils/generateDate");

async function getOrganizerEvents(req, res) {
    try {
        const events = await Event.findAll({
            where: { userId: req.user.id }
        });
        return res.status(200).json(events);
    } catch (error) {
        return res.status(500).json("Error in fetching events");       
    }
}
async function createEventByOrganizer(req, res) {
    try {
        const
            { event_name, location,
            time_start, time_end, event_date,
            details, no_of_participants, entry_fee
            } = req.body;       
        if (!event_name || !location || !time_start || !time_end || !event_date || !no_of_participants || !entry_fee) {
            return res.status(400).json({
                message:"Please add all event fields"
            });   
        }
        let date = await generateDate(event_date);
        const event_exists = await Event.findOne({
            where:{location:location, event_name:event_name,event_date:new Date(date), userId:req.user.id}
        })
        if (event_exists) {
            return res.status(400).json({
                message:"An event with same details exists"
            });    
        }
        const event = await Event.create({
                event_name,location,time_start,time_end,event_date:date,details,no_of_participants,entry_fee,userId:req.user.id
            })            
        return res.status(200).json(event);  
        
    } catch (error) {        
        return res.status(500).json({
            message:"Error in creating an event"
        });    
    }
}
async function deleteEventByOrganizer(req, res) {
    try {
        
        const event_exists = await Event.findOne({
            where:{id:req.params.id, userId:req.user.id}
        })
        if (!event_exists) {
            return res.status(400).json({
                message:"An event not Found"
            });    
        }
        await event_exists.destroy();
        
        return res.status(200).json({
            message:"Event Deleted Successfully"
        });  
        
    } catch (error) {        
        return res.status(500).json({
            message:"Error in deleting an event"
        });    
    }
}


module.exports = {
    getOrganizerEvents,
    createEventByOrganizer,
    deleteEventByOrganizer
}