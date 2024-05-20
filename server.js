
const express = require('express');
const noblox = require('noblox');
const { parse } = require('path');
const app = express();
 
require('dotenv').config();
 
const cookie = process.env.COOKIE;
const groupid = process.env.GROUPID;
 
app.use(express.static('public'));
 
async function startApp() {
    await noblox.setCookie(cookie);
    let currentUser = await noblox.getCurrentUser(); // Get information about the current user
    console.log(`Logged in as ${currentUser.UserName} (${currentUser.UserID})`); // Log the current user's username and ID to the console
}
 
startApp();
 
app.get('/setRank', async (req, res) => {
    const User = req.param('userid');
    const Rank = req.param('rank');
 
    noblox.setRank(groupid, parseInt(User), parseInt(Rank));
    res.json("Rank has been set.")
});
 
const listener = app.listen(process.env.PORT, () => {
    console.log('Your app is listening on port ' + listener.address().port);
});
