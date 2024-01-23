const {Subscribers} = require('./../database/models');
class SubscriberService {
    static  async findByEmail(email) {
     return   await Subscribers.findOne({
            where: {
             email
         }
     })       
    }
    static async createSubscriber(data) {       
        return await Subscribers.create(data);
    }
    static async findAll() {
        return await Subscribers.findAll()
    }   
}

module.exports = SubscriberService;