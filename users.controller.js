const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const config = require('config.json');
const dbUtils = require('db-utils.js');

router.get('/echo', echo);
router.post('/authenticate', authenticate);

module.exports = router;

function echo(req, res, next) {
	
	res.status(200).json({ mesaj: 'Sistem çalışıyor..' });
}

async function authenticate(req, res, next) {

	const dbSonuc = await dbUtils.query(`select * from kullanici where kullanici_adi =$1 and sifre=$2`,[req.body.kullaniciAdi,req.body.sifre]);
//	res.status(200).json(req.body.sifre);
//	res.status(200).json(req.body.sifre);
	if (dbSonuc.rows.length) {
		const kullanici = dbSonuc.rows[0];
        const token = jwt.sign({ sub: kullanici.id }, config.secret);
        const sonuc = {
            result: true,
            user: {kullaniciAdi: kullanici.kullanici_adi, adi:kullanici.adi, soyadi:kullanici.soyadi},
            token: {access_token: token}
        };
	   res.status(200).json({ sonuc });
	   return;
	}	
	res.status(401).json({ hata: 'Yanlış kullanıcı adı/parola!!' });
}
