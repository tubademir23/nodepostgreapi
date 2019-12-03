const express = require('express');
const router = express.Router();

const dbUtils = require('db-utils.js');

router.get('/kullanici', getKullanicilar);
router.post('/kullanici', kullaniciEkle);
router.put('/kullanici', kullaniciGuncelle);
router.delete('/kullanici', kullaniciSil);

router.get('/duyuru', getDuyurular);
router.post('/duyuru', duyuruEkle);
router.put('/duyuru', duyuruGuncelle);
router.delete('/duyuru', duyuruSil);


router.get('/kullanici-ders', getKullaniciDersleri);
router.post('/kullanici-ders', kullaniciDersEkle);
router.put('/kullanici-ders', kullaniciDersGuncelle);
router.delete('/kullanici-ders', kullaniciDersSil);


module.exports = router;


async function kullaniciEkle(req, res, next) {
	const sonuc = await dbUtils.query(`insert into kullanici values(nextval('seq_kullanici'),$1,$2,$3,$4,$5)`
	 ,[req.body.kullaniciAdi,req.body.sifre,req.body.adi,req.body.soyadi,req.body.admin]);
	res.status(200).json({ data: sonuc});
}

async function kullaniciGuncelle(req, res, next) {
	const sonuc = await dbUtils.query(`update kullanici set kullanici_adi =$1,sifre=$2,adi=$3,soyadi=$4,admin=$5 where id=$6`
	 ,[req.body.kullaniciAdi,req.body.sifre,req.body.adi,req.body.soyadi,req.body.admin,req.body.id]);
	res.status(200).json({ data: sonuc});
}

async function kullaniciSil(req, res, next) {
	const sonuc = await dbUtils.query(`delete from kullanici where id=$1`
	 ,[req.body.id]);
	res.status(200).json({ data: sonuc});
}

async function getKullanicilar(req, res, next) {
	const sonuc = await dbUtils.query(`select * from kullanici order by id desc`,[]);
	res.status(200).json({ data: sonuc.rows});
}


async function getDuyurular(req, res, next) {
	const sonuc = await dbUtils.query(`select * from duyuru order by id desc`,[]);
	res.status(200).json({ data: sonuc.rows});
}

async function duyuruEkle(req, res, next) {
	const sonuc = await dbUtils.query(`insert into duyuru values(nextval('seq_duyuru'),$1,$2)`
	 ,[req.body.baslik,req.body.icerik]);
	res.status(200).json({ data: sonuc});
}

async function duyuruGuncelle(req, res, next) {
	const sonuc = await dbUtils.query(`update duyuru set baslik =$1,icerik=$2 where id=$3`
	 ,[req.body.baslik,req.body.icerik,req.body.id]);
	res.status(200).json({ data: sonuc});
}

async function duyuruSil(req, res, next) {
	const sonuc = await dbUtils.query(`delete from duyuru where id=$1`
	 ,[req.body.id]);
	res.status(200).json({ data: sonuc});
}


async function getKullaniciDersleri(req, res, next) {
	const sonuc = await dbUtils.query(`select * from kullanici_ders where kullanici_id=$1 order by id desc`,[req.user.sub ]);
	res.status(200).json({ data: sonuc.rows});
}

async function kullaniciDersEkle(req, res, next) {
	const sonuc = await dbUtils.query(`insert into kullanici_ders values(nextval('seq_kullanici_ders'),$1,$2,$3,$4,$5,$6)`
	 ,[req.body.kullanici_id,req.body.ders_id,req.body.not_vize1,req.body.not_vize2,req.body.not_proje,req.body.not_final]);
	res.status(200).json({ data: sonuc});
}

async function kullaniciDersGuncelle(req, res, next) {
	const sonuc = await dbUtils.query(`update kullanici_ders set kullanici_id =$1, ders_id=$2, not_vize1=$3, not_vize2=$4, not_proje=$5, not_final=$6 where id=$7`
	 ,[req.body.kullanici_id,req.body.ders_id,req.body.not_vize1,req.body.not_vize2,req.body.not_proje,req.body.not_final,req.body.id]);
	res.status(200).json({ data: sonuc});
}

async function kullaniciDersSil(req, res, next) {
	const sonuc = await dbUtils.query(`delete from kullanici_ders where id=$1`
	 ,[req.body.id]);
	res.status(200).json({ data: sonuc});
}









