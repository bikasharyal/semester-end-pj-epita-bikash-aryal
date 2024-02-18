const express = require("express");
const router = express.Router();
const userService = require("../services/user.service"); 

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  // if authentication middleware sets `req.session.user` use req.session.user
  if (id) {
    try {
      const user = await userService.getUserById(id); //req.session.user._id
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body; // Expecting { contact, address, preferences }

  try {
    const updatedUser = await userService.updateUser(id, updates);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/updatePassword/:id", async (req, res) => {
  const { id } = req.params;
  const updates = req.body; // Expecting { email, oldPassword, oldPassword }

  try {
    const updatedUserPass = await userService.updateUserPassword(id, updates);
    res.status(200).json(updatedUserPass);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (id) {
    try {
      const user = await userService.deleteUser(id); //req.session.user._id
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
});

module.exports = router;
