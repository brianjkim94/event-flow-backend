# SEI SEBPT220 Project 3: Event Flow

Event Flow is an experience coordination application enabling user to seamlessly RSVP to popular events in their area.

## How It Works

Registered users of can create and coordinate events. Users can additionaly RSVP to popular events in their area.

## Event-Flow-Backend

Backend Web Server. Servring RESTful API using Node.JS and Express.

## Features

### TBD

- **TBD:** TBD Description.
- **TBD:** TBD Description.

### TBD

- **TBD:** TBD Description.
- **TBD:** TBD Description.

### TBD

- **TBD:** TBD Description.
- **TBD:** TBD Description.

### TBD

- **TBD:** TBD Descriptiono.

### TBD

- **TBD:** TBD Description

## User Stories

1. **Create an account:**
   - TBD.
2. **TBD:**
   - TBD.
3. **TBD:**
   - TBD.
4. **TBD:**
   - TBD.

## Setup Instructions for Local Deployment

To set up this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone 
   ```

2. **Navigate to the project directory:**

   ```bash
   cd 
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Set up the environment variables:**

   - Create a `.env` file in the root directory.
   - Add the following environment variables:
     ```
     PORT=3000
     MONGODB_URI=your_mongodb_connection_string
     SECRET_KEY=your_secret_key
     ```

5. **Run the application:**

   ```bash
   npm start
   ```

6. **Open your browser and visit:**
   ```
   http://localhost:3000
   ```

## Live Demo

[Live Demo Site]()

## Models

### User

- **TBD:** TBD
- **TBD:** TBD

## Code Snippets

### TBD

Backend Users Routes - Signup / Signin 
```js
router.post('/signup', async (req, res) => {
  try {
    console.log('Received signup request:', req.body);
    const userInDatabase = await User.findOne({ username: req.body.username });
    if (userInDatabase) {
      return res.status(400).json({ error: 'Username already taken.' });
    }
    const user = await User.create({
      username: req.body.username,
      hashedPassword: bcrypt.hashSync(req.body.password, SALT_LENGTH),
      name: req.body.firstName + ' ' + req.body.lastName,
      phoneNumber: req.body.phone,
      country: req.body.country,
      state: req.body.state,
      email: req.body.email
    });
    const token = jwt.sign(
      { username: user.username, _id: user._id },
      process.env.JWT_SECRET
    );
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user && bcrypt.compareSync(req.body.password, user.hashedPassword)) {
      const token = jwt.sign(
        { username: user.username, _id: user._id },
        process.env.JWT_SECRET
      );
      res.status(200).json({ token });
    } else {
      res.status(401).json({ error: 'Invalid username or password.' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

Backend Events Routes - My Events / Category / Event Created / Event iD

```js
router.get('/myevents', isLoggedIn, async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user._id }).populate('organizer tags rsvp');
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/category', isLoggedIn, async (req, res) => {
  try {
    const category = req.query.category; 
    console.log(category);
    const events = await Event.find({ category }).populate('organizer tags rsvp');
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', isLoggedIn, async (req, res) => {
  try {
    const events = await Event.find().populate('organizer tags rsvp');
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', isLoggedIn, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('organizer tags rsvp');
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

Backend Routes RSVP - RSVP created / My RSVP

```js
router.get('/', isLoggedIn, async (req, res) => {
  try {
    const rsvps = await RSVP.find().populate('user event');
    res.status(200).json(rsvps);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/myrsvp', isLoggedIn, async (req, res) => {
  try {
    const rsvps = await RSVP.find({ user: req.user._id }).populate('user event');
    res.status(200).json(rsvps);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', isLoggedIn, async (req, res) => {
  try {
    const rsvp = await RSVP.findById(req.params.id).populate('user event');
    res.status(200).json(rsvp);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

### TBD

```js
router.post('/', async (req, res) => {
  const { title, description, date, time, location, category, organizer } = req.body;
  const event = new Event({ title, description, date, time, location, category, organizer });
  await event.save();
  res.status(201).send('Event created');
});

```


## Inspiration

- [EventBrite](https://www.eventbrite.com/)
- [GetYourGuide](https://www.getyourguide.com/)
- [Lu Ma](https://lu.ma/)
- [AirTable](https://www.airtable.com/)

## Mockups

![Musicfy](assets/img/firstDraft.png)
![Event Flow ERD](assets/img/EventFlowERD.png)

```

```
