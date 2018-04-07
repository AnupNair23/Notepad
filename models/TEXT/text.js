var mongoose = require('mongoose');

//var log = require('../log/log');


//Text schema

var textSchema = mongoose.Schema({

    Textbox: {
        type: String,
        index:true
        
    },

    createdAt: {
        type: String
    }
});


var Text = module.exports = mongoose.model('texts', textSchema);


//ADD NEW TEXT==========================================================================================

module.exports.addTextPost = function (req, res) {

     var today = new Date().getTime();


    var Textbox = req.body.text;

    console.log("req.body.text==== ",req.body.text);


    console.log("Textbox=== ", Textbox);

    var formBody = new Text({

        Textbox: Textbox,
        createdAt: today

    });

    console.log("formBody== ", formBody);


    Text.create(formBody, function (err, TextDetails) {

        if (err) {
            res.sendStatus(500);
            console.log(" Error in creating Text ", err.message);
            return;
        }
        res.status(200).json({

            "status": true,
            "message": "New Text Created"

        })
        console.log(TextDetails.Textbox + " new post created succesfully ");
   

    });

}


// ============================================== GET THE TEXT =========================================

module.exports.getTexts = function (req, res) {

        
    //find from the database
    Text.find({},function (err, result) {	
    
            if (err) {
            res.send({ "code":500, "failed":"error ocurred"})
            console.log( " error",err.message);
            }
            console.log( "  Text fetched succesfully ",result );
            res.json(result);
    
    })

}

//---------------------------------------GET TEXT---------------------------------------------------------

module.exports.getText = function (req, res) {
    var id = req.params.id;
    console.log( " id",id);  
            
    // find the one element from db
    Text.findOne({_id:id}, function (err, result) {	
        
                if (err) {
                res.send({ "code":500, "failed":"error ocurred"})
                console.log( " error",err.message);
                }
                console.log( "  tEXT fetched succesfully ",result );
                
                res.json(result);
        
        })
    } 

// ========================================= UPDATE THE TEXT ==========================================


module.exports.updateTxts = function (req, res) {
	
    var text=req.body.Textbox;
    console.log("text     ===  =====   =====  ", text);

  //  console.log("req.params.gottext ===" , req.params.gottext);
	
	Text.update({}, // update it
				{$set:
					{Textbox: text}},{w:1},
	
	function (err, form1) {
		
		if (err) {
            res.sendStatus(500);
            console.log("Error ",err.message);
            return;
        }
        
		Text.find({}, function(err, form2){
		res.json({form2});
		console.log("Text updated succesfully " );
		})
		
		
	});
	
	
}
