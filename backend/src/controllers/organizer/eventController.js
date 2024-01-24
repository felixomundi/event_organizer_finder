const { Event } = require("../../database/models");

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

        
    } catch (error) {
        console.log(error);
        return res.status(500).json("Error in creating an event");    
    }
}

module.exports = {
    getOrganizerEvents,
    createEventByOrganizer
}