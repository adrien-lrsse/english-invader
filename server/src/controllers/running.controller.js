// running.controller.js

exports.getStatus = (req, res) => {
    res.json({ message: "Hello from server!" });
}

exports.getUsers = (req, res) => {
    const users = [
        { name: 'Ram', email: 'ram@user.com' },
        { name: 'Bob', email: 'bob@user.com' },
    ];
    res.json(users);
}