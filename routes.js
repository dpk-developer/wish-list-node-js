const mongoose = require("mongoose");

const { mongoUrl } = require('./config/keys');

const wishModel = mongoose.model('wishes');

mongoose.connect(mongoUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const address = {
    initialRoute: '/',
    about: '/about',
    home: '/home',
    profile: '/profile/:id',
    sent: '/sent',
    delete: '/remove/:id'
};

// var data = ['code', 'eat', 'sleep', 'repeat'];

const routes = (app) => {

    app.get(address.initialRoute, (request, response) => {

        //---- For sending html pages with javascript to client side ----
        response.sendFile(__dirname + '/index.html');

    });

    app.get(address.about, (request, response) => {

        response.send("Hello Dpk! from About");

    });

    app.get(address.home, (request, response) => {

        /* 
        response.send({
            msg: 'Hello Dpk! from Home.... Hurreyyyy!',
            age: 25,
            mobileNumber: 7000919886,
        });
        */

        /*
        response.render('home', {
            data: {
                name: "dpk",
                age: 25,
                profession: "engineer",
            }
        });
        */

        wishModel.find({}).then(data => {

            response.render('home', { wish: data });

        })

    });

    app.get(address.profile, (request, response) => {

        // response.send("User Id : " + request.params.id);

        response.render('home', {
            data: {
                name: request.params.id
            }
        })

    });

    app.post(address.sent, (request, response) => {

        /* console.log('from client end ', request.body.item);

        data.push(request.body.item);

        response.send(data);
        */

        const wishItems = new wishModel({
            wish: request.body.item
        })

        wishItems.save()
            .then(data => {
                console.log('from client end data Saved = ', data);
                response.send(data);
            })
            .catch(error => {
                throw error;
            })

    });

    app.delete(address.delete, (request, response) => {

        /*
        data = data.map(item => {
            if (item != request.params.id) {
                return item;
            }
        })

        response.send(data);
        */

        wishModel.findOneAndDelete({ wish: request.params.id })
            .then(data => {
                response.send(data);
            })

    });

}

module.exports = routes;