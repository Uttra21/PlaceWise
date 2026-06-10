const express = require("express");
const router = express.Router();

const responses = [
    { keywords: ["hello", "hi"], reply: "Hello! I'm PlaceBot! Ask me about aptitude, resume or interviews!" },
    { keywords: ["aptitude", "math"], reply: "Focus on: Percentages, Time & Work, Profit & Loss." },
    { keywords: ["interview", "hr"], reply: "Prepare: Tell me about yourself, strengths, weaknesses." },
    { keywords: ["resume", "cv"], reply: "1 page resume. Add projects, skills, GitHub link!" },
    { keywords: ["coding", "dsa"], reply: "Practice arrays and strings on LeetCode!" },
    { keywords: ["company", "companies"], reply: "Top recruiters: TCS, Infosys, Wipro, Accenture." },
    { keywords: ["bye", "thanks"], reply: "Good luck with placements! You got this 💪" },
];

router.post("/chat", (req, res) => {
    const msg = req.body.message.toLowerCase();
    const found = responses.find(r => r.keywords.some(k => msg.includes(k)));
    res.json({ response: found ? found.reply : "Try asking about aptitude, resume, or interviews!" });
});

module.exports = router;