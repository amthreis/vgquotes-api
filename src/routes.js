import express, { Router } from "express";
import rateLimit from "express-rate-limit";
import { fileURLToPath } from 'url';
import path from "path";
import { data } from "./db.js";

const router = Router();

const limiter = rateLimit({
    windowMs: 2500,
    max: 3
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/ip', (request, response) => response.json({ ip: request.ip, xfwd: request.headers['x-forwarded-for'] || null }));
router.use("/debug",  express.static(path.join(__dirname, "..", "page")));

router.get("/newer/:than", limiter, async (req, res) => {
    if (!req.params.than)
        return res.status(400).json({ error: "Invalid date parameter." });
    
    const than = parseInt(req.params.than);

    res.status(200).json(data.filter(it => {
        const isNewer = it.createdAt.getTime() > than;
        return isNewer;
    }));
});

router.get("/older/:than", limiter, async (req, res) => {
    if (!req.params.than)
        return res.status(401).json({ error: "Invalid date parameter." });
    
    const than = parseInt(req.params.than);
    const allOlder = data.filter(it => it.createdAt.getTime() < than);
    
    const hasMore = allOlder.length > 8;
    const posts = allOlder.slice(0, 8);

    res.status(200).json({ posts, hasMore, fullCount: allOlder.length });
});

router.get("/", limiter, async (req, res) => {
    res.status(200).json(data);
});

router.get('*', function(req, res){
    res.sendStatus(404);
});

export default router;