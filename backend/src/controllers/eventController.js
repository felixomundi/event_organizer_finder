const { Event } = require("../database/models");
const generateDate = require("../utils/generateDate");

async function getOrganizerEvents(req, res) {
    try {
        const events = await Event.findAll({
            where: { userId: req.user.id }
        });
        return res.status(200).json(events);
    } catch (error) {
        return res.status(500).json({
            message:"Error in fetching events"
        });       
    }
}
async function createEventByOrganizer(req, res) {
    try {
        const
            { event_name, location,
            time_start, time_end, event_date,
            details, no_of_participants, entry_fee
            } = req.body;    
        const image = req.file;
        if (!event_name) {
            return res.status(400).json({
                message:"Please add event_name field"
            });   
        }
        if(!location){
            return res.status(400).json({
                message:"Please add location field"
            });  
        }
        if(!time_start){
            return res.status(400).json({
                message:"Please add time_start"
            });  
        }
        if(!time_end){
            return res.status(400).json({
                message:"Please add time_end field"
            });  
        }
        if(!event_date){
            return res.status(400).json({
                message:"Please add event_date field"
            });  
        }
        if(!no_of_participants){
            return res.status(400).json({
                message:"Please add no_of_participants field"
            });  
        }
        if(!entry_fee){
            return res.status(400).json({
                message:"Please add event_fee field"
            });  
        }
        
        if (!image) {
            return res.status(400).json({
                message:'Please add event image'
            })
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
            event_name, location, time_start, time_end, event_date: date, details, no_of_participants, entry_fee, userId: req.user.id,
            image: req.file.path,
            })            
        return res.status(200).json(event);  
        
    } catch (error) {   
        console.log(error);
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
async function updateEventStatusByOrganizer(req, res) { 
    try {
        const { event_id } = req.body;
        if (!event_id) {
            return res.status(400).json({
                message:"An event id is required"
            });    
        }
        const event_exists = await Event.findOne({
            where:{id:event_id, userId:req.user.id}
        })
        if (!event_exists) {
            return res.status(400).json({
                message:"An event not Found"
            });    
        }
        if (event_exists.status == "active") {
            await event_exists.update({
                status:"inactive"
            });
            return res.status(200).json({
                message:"Event Status DeActivated Successfully"
            });  
        } else {
            await event_exists.update({
                status:"active"
            });
            return res.status(200).json({
                message:"Event Status Activated Successfully"
            });  
        }        
    } catch (error) {
        return res.status(500).json({
            message:"Error in Updating Event"
        });  
    }
}
async function updateEventByOrganizer(req, res){
    try {
       
        const event_id = req.body.event_id;
        if (!event_id) {
            return res.status(400).json({
                message:"An event id is required"
            });    
        }
        const event = await Event.findOne({
            where:{id:event_id, userId:req.user.id}
        })
        if (!event) {
            return res.status(400).json({
                message:"Event not found"
            })
        }
        const { id, event_name, location,time_start, time_end,status, event_date,details, no_of_participants, entry_fee } = event;       
        event.id = id
        event.event_name = event_name || req.body.event_name
        event.location =  req.body.location || location
        event.time_start = req.body.time_start || time_start
        event.time_end =  req.body.time_end || time_end
        event.event_date =  await generateDate(new Date(req.body.event_date)) ||await generateDate(new Date(event_date));
        event.details = req.body.details || details
        event.no_of_participants =  req.body.no_of_participants || no_of_participants
        event.entry_fee = req.body.entry_fee || entry_fee
        event.status = req.body.status || status;
        const updatedEvent = await event.update();
        return res.status(200).json({
            event:updatedEvent            
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Error in Updating Event"
        }); 
    }
}
async function getEvents(req, res) {
    try {
        const events = await Event.findAll();
        return res.status(200).json(events);
    } catch (error) {
        return res.status(500).json({
            message:"Error in fetching events"
        });       
    }
}

module.exports = {
    getOrganizerEvents,
    createEventByOrganizer,
    deleteEventByOrganizer,
    updateEventStatusByOrganizer,
    updateEventByOrganizer,
    getEvents
}