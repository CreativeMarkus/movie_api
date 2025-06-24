router.post('/register', async (req, res, next) => {
  try {
    const { username, password, email } = req.body;

    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
      favorites: []
    });

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});