'use strict';


class Utility {
    
    static sendEmail(from,to,subject,content) {

        try {
        
            EMAILSERVER.send({
                               
                from:    from, 
                to:      to,
                subject: subject,
                attachment: 
                [
                   {data:content, alternative:true}
                  
                ]
            }, function(err, message) { console.log(err || message); });

            return true
        }
        catch(error)
        {
            return false;
        }
    }
}

module.exports = Utility;