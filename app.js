
/**
 * A simple drawing & animation API for the JavaScript Canvas heavily modeled after AS3 & TweenLite
 * Author : Stephen Braitsch
 * More Info : https://github.com/braitsch/js3
 */

 const express = require('@braitsch/express');

 const app = express();

 express.log('./logs');

 express.http(app);

 express.init(__dirname, app);

 express.start(app);