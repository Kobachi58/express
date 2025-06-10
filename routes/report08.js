var express = require('express');
var router = express.Router();
const request = require('request');

router.get('/', async (req, res) => {
    const text = req.query.text || 'Example';
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`;

    request({ url: qrApiUrl, encoding: null }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.set('Content-Type', 'image/png');
            res.send(body);
        } else {
            res.status(500).json({ error: 'QRコードの取得に失敗しました。' });
        }
    });
});

module.exports = router;
