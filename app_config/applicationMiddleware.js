const helmet = require('helmet');
const cors = require('cors');

const allMiddleware = (express,app) => {
    require('dotenv').config();    
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(__dirname + '/public'))    
    app.use(helmet());
    app.use(cors());
    
}

module.exports = allMiddleware