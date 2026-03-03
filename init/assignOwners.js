/**
 * assignOwners.js
 * Run once: node init/assignOwners.js
 * Splits existing listings between the first two users in the DB.
 */

const mongoose = require('mongoose');
const { listing } = require('../Models/listing.js');
const { User } = require('../Models/User.js');

const main = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/WonderLust');
    console.log('✅ Connected to MongoDB');

    const users = await User.find({}).limit(2);
    if (users.length < 2) {
        console.error('❌  Need at least 2 users. Please sign up two accounts first.');
        process.exit(1);
    }

    const [u1, u2] = users;
    console.log(`👤 User 1: ${u1.email}  (${u1._id})`);
    console.log(`👤 User 2: ${u2.email}  (${u2._id})`);

    const listings = await listing.find({});
    console.log(`📋 Total listings: ${listings.length}`);

    const half = Math.ceil(listings.length / 2);

    for (let i = 0; i < listings.length; i++) {
        const owner = i < half ? u1._id : u2._id;
        await listing.findByIdAndUpdate(listings[i]._id, { owner });
    }

    console.log(`✅ First ${half} listings  →  ${u1.email}`);
    console.log(`✅ Remaining ${listings.length - half} listings  →  ${u2.email}`);
    process.exit(0);
};

main().catch(err => { console.error(err); process.exit(1); });
