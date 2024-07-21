const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const { User, Event, Tag, RSVP } = require('../models');

mongoose.connect(process.env.MONGO_URI_LOCAL)
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.log('Database error during seeding:', err));

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Event.deleteMany({});
    await Tag.deleteMany({});
    await RSVP.deleteMany({});

    // Create users
    const user1 = await User.create({
      username: 'john_jones',
      hashedPassword: bcrypt.hashSync('password123', 12),
      name: 'John Jones',
      phoneNumber: '123-456-7890',
      location: 'New York',

      email:'email@gmail.com',
      role: 'user'

    });

    const user2 = await User.create({
      username: 'jane_jones',
      hashedPassword: bcrypt.hashSync('password123', 12),
      name: 'Jane Jones',
      phoneNumber: '098-765-4321',
      location: 'Los Angeles',

      email: 'jane_jones@gmail.com',
      role: 'admin'
    });

    // Create tags
    const tag1 = await Tag.create({ name: 'Birthday' });
    const tag2 = await Tag.create({ name: 'Wedding' });

    // Create events
    const event1 = await Event.create({
      title: 'Birthday',
      description: 'John Jones 25th Birthday',
      date: new Date('2024-08-01'),
      time: '10:00 AM',
      location: 'San Francisco',
      category: 'Birthday',
      organizer: user2._id,
      tags: [tag1._id]
    });

    const event2 = await Event.create({
      title: 'Wedding',
      description: 'John and Jane Wedding',
      date: new Date('2024-09-01'),
      time: '09:00 AM',
      location: 'Los Angeles',
      category: 'Wedding',
      organizer: user2._id,
      tags: [tag2._id]
    });

    // Create RSVPs
    const rsvp1 = await RSVP.create({ user: user1._id, event: event1._id });
    const rsvp2 = await RSVP.create({ user: user1._id, event: event2._id });

    console.log('Seed data created successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
