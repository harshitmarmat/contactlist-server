const express = require('express');     
const path = require('path');
const port = process.env.PORT || 9000;

const Contact = require('./models/contact');
const db = require('./config/mongoose');
const app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname,'view'));

app.use(express.urlencoded());

app.use(express.static('assets'));


var contactList = [
    {
        name : "Harshit",
        phone : "7823897249" 
    },
    {
        name : "Nishu",
        phone : "1234567890" 
    },
    {
        name : "Mummy",
        phone : "0987654321"
    }
];


app.get('/',function(req,res){

    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in fetching the contact from db',err);
            return;
        }
        return res.render('home',{
            // title:"My contact Lists",
            contact_List : contacts
        });
    })


    // return res.render('home',{
    //     title:"My contact Lists",
    //     contact_List : contactList
    // });
});



app.post('/create-contact',function(req,res){
    // contactList.push(req.body);
    
    Contact.create({
        name : req.body.name,
        phone : req.body.phone
    },function(err,newAccount){
        if(err){
            console.log('Error in creating a contact');
            return;
        }
        console.log('****************',newAccount);
        return res.redirect('back');
    });

    // return res.redirect('back');
});

app.get('/delete-contact/',function(req,res){
    let id = req.query.id;

    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('Error in deleting the contact from DB',err);
            return ;
        }
        return res.redirect('back');
    });


    // let contactIndex = contactList.findIndex(contact=> contact.phone == phone);

    // if(contactIndex!=-1){
    //     contactList.splice(contactIndex,1);
    // }
    // return res.redirect('back');
});

// app.post("/update",function(req,res){
//     let id = req.body.name;
//     console.log(id);
//     let value = req.body.phone;
//     console.log(req.body);
//     console.log(Contact.find({name : id}));

//     // Contact.findByIdAndUpdate(id,{
//     //     name : id,
//     //     phone : value
//     // },function(err){
//     //     if(err){
//     //         console.log('Error in updating the contact from DB',err);
//     //         return ;
//     //     }
//     //     return res.redirect('back');
//     // });
// });


// app.post("/update-name",function(req,res){
//     let currentName = req.body.name;
//     let currentPhone = req.body.phone;
//     for( let i of contactList){
//         if(currentPhone == i.phone){
//             i.name = currentName;
//             return res.redirect('back');
//         }
//     }
//     return res.redirect('program');
// });


app.listen(port , function(err){
    if(err){
        console.log('Error',err);
        return;
    }
    console.log('Server is running at ', port);
    return;
})