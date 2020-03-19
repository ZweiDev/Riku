import express from 'express';
import bodyParser from "body-parser";
import Riku, {Search} from "./model/riku/Riku";
import RikuCreator from "./lib/creator/RikuCreator";

const server: express.Application = express();

const PORT = process.env.PORT || '9813';

const SHIRO_URL = process.env.SHIRO_URL || "https://api.thepublictransport.de/shiro/";

const rikuCreator: RikuCreator = new RikuCreator(SHIRO_URL);

server.use(bodyParser.json());

server.post("/riku/search", async function (req, res, next) {
    let requestBody = req.body;

    if (requestBody == null || requestBody == {}) {
        res.status(400).send({
            success: false,
            status: "No POST body given.",
            data: null
        });
    } else {
        try {
            let searchBody: Search = requestBody as Search;

            let result: Riku | null;

            result = await rikuCreator.createRiku(searchBody);

            if (result == null) {
                res.status(200).send({
                    success: false,
                    status: "No results",
                    data: null
                });
            } else {
                if (result.result == null) {
                    res.status(500).send({
                        success: false,
                        status: "Shiro is empty",
                        data: null
                    });
                } else {
                    res.status(200).send({
                        success: true,
                        status: "Success. " + result.result.vehicles.length + " trips found.",
                        data: result
                    });
                }
            }
        } catch (e) {
            res.status(500).send({
                success: false,
                status: "Riku Error occurred: " + e,
                data: null
            });
        }
    }
});

server.post("/riku/handshake", async function (req, res, next) {
    let requestBody = req.body;

    if (requestBody == null || requestBody == {}) {
        res.status(400).send({
            success: false,
            status: "No POST body given.",
            data: null
        });
    } else {
        try {
            let searchBody: Search = requestBody as Search;

            let result: Riku | null;

            result = await rikuCreator.createRikuHandshaked(searchBody);

            if (result == null) {
                res.status(200).send({
                    success: false,
                    status: "No results",
                    data: null
                });
            } else {
                if (result.result == null) {
                    res.status(500).send({
                        success: false,
                        status: "Shiro is empty",
                        data: null
                    });
                } else {
                    res.status(200).send({
                        success: true,
                        status: "Success. " + result.result.vehicles.length + " trips found.",
                        data: result
                    });
                }
            }
        } catch (e) {
            res.status(500).send({
                success: false,
                status: "Riku Error occurred: " + e,
                data: null
            });
        }
    }
});

server.listen(PORT, function() {
    console.log('Riku listening on port ' + PORT.toString());
});
