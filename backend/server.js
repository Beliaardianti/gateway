const express = require("express");
const cors = require("cors");
const pool = require("./database");
const bcrypt = require("bcrypt");
const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/submit_log", async (req, res) => {
    try {
        console.log("Running query...");
        const result = await pool.query("SELECT * FROM submit_log");
        console.log("Query result:", result.rows);
        res.json(result.rows);
    } catch (err) {
        console.error("Error executing query", err.stack);
        res.status(500).json({
            error: "Internal Server Error",
            details: err.message,
        });
    }
});



app.get("/api/submit_log", async (req, res) => {
    try {
        const result = await pool.query("SELECT uid FROM submit_log");
        res.json(result.rows);
    } catch (err) {
        console.error("Error executing query:", err.stack);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Email atau password salah" });
        }

        const user = result.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Email atau password salah" });
        }
        res.json({
            message: "Login berhasil",
            user: { id: user.id, email: user.email },
        });
    } catch (err) {
        console.error("Error saat login:", err.stack);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
