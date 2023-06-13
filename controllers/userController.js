const users = require('../data');

module.exports = {
  home: (req, res) => {
    res.send('Welcome to the user management API');
  },

  getAllUsers: (req, res) => {
    const usersWithoutPassword = users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });

    res.json({
      success: true,
      message: 'Fetched users successfully',
      data: usersWithoutPassword,
    });
  },

  signupUser: (req, res) => {
    const { password, ...newUserWithoutPassword } = req.body;
    const newUser = { ...newUserWithoutPassword, password };
    users.push(newUser);
  
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUserWithoutPassword,
    });
  },

  updateUser: (req, res) => {
    const { userId } = req.params;
    const updatedUser = req.body;

    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    users[userIndex] = { ...users[userIndex], ...updatedUser };

    res.json({
      success: true,
      message: 'User updated successfully',
      data: users[userIndex]
    });
  },

  deleteUser: (req, res) => {
    const { userId } = req.params;

    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    users.splice(userIndex, 1);

    res.json({
      success: true,
      message: 'User deleted successfully',
      data: users
    });
  },
  

  getSingleUser: (req, res) => {
    const { userId } = req.params;

    const user = users.find(user => user.id === userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const { password, ...userWithoutPassword } = user;

    res.json({
      success: true,
      message: 'User retrieved successfully',
      data: userWithoutPassword,
    });
  },
  loginUser: (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email === email && user.password === password);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    res.json({
      success: true,
      message: 'User logged in successfully',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        age: user.age,
      },
    });
  },

  
};
