const express = require('express');
const connectDB = require('./app/Config/db');
const cors = require('cors');
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();

//Establish database connection
connectDB();

//init middleware
app.use(cors());
app.use(express.json({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

//default response
app.get('/', (req, res) => res.send('Case study API up and running!'));

//import routes
const userRoute = require('./app/Routes/user.route');
const supplierRoute = require('./app/Routes/supplier.route');
const SiteRoute = require('./app/Routes/site.route');
const ItemRoute = require('./app/Routes/item.route');
const orderRoute = require('./app/Routes/order.route');
const deliveriesRoute = require('./app/Routes/deliveries.route');

//define routes
app.use('/api/users', userRoute);
app.use('/api/suppliers', supplierRoute);
app.use('/api/sites', SiteRoute);
app.use('/api/items', ItemRoute);
app.use('/api/orders', orderRoute);
app.use('/api/deliveries', deliveriesRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server up and running on port ${PORT}`));