const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = 3000;

// CORS politikasını etkinleştir (Mobil cihaz erişimi için şart)
app.use(cors());

/**
 * Web Scraping Fonksiyonu
 * @param {string} slug - Örn: 'istanbul' veya 'istanbul-besiktas'
 */
async function getEczaneVerisi(slug) {
    try {
        const url = `https://www.eczaneler.gen.tr/nobetci-${slug}`;
        console.log(`Veri çekiliyor: ${url}`);

        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        const $ = cheerio.load(data);
        const eczaneler = [];

        // Tablo satırlarını tara
        $('table tbody tr').each((index, element) => {
            const isim = $(element).find('span.isim').text().trim() || 
                         $(element).find('a').first().text().trim();
            
            // Adres ve telefon bilgilerini de çekelim (Filtrelemede işe yarar)
            const telefon = $(element).find('.py-1.px-2 a').text().trim();
            const adres = $(element).find('div').filter((i, el) => $(el).text().includes('Mahallesi')).text().trim();

            if (isim && isim.length > 2) {
                eczaneler.push({ 
                    id: index.toString(),
                    isim: isim,
                    adres: adres || "Adres bilgisi çekilemedi",
                    telefon: telefon || "Telefon bilgisi çekilemedi"
                });
            }
        });

        return eczaneler;
    } catch (error) {
        console.error(`Scraping Hatası (${slug}):`, error.message);
        return [];
    }
}

/**
 * API Endpoint: Dinamik Şehir ve İlçe
 * Kullanım: 
 * /eczaneler/istanbul          -> Tüm İstanbul
 * /eczaneler/istanbul/besiktas -> Sadece Beşiktaş
 */
app.get('/eczaneler/:sehir/:ilce?', async (req, res) => {
    const { sehir, ilce } = req.params;
    
    // Eğer ilçe varsa URL yapısı 'istanbul-besiktas' olur
    const querySlug = ilce ? `${sehir}-${ilce}` : sehir;
    
    const veriler = await getEczaneVerisi(querySlug.toLowerCase());
    res.json(veriler);
});

// Sunucuyu tüm ağa aç (0.0.0.0)
app.listen(PORT, '0.0.0.0', () => {
    console.log(`===========================================`);
    console.log(`   ECZANE SUNUCUSU ÇALIŞIYOR`);
    console.log(`   Port: ${PORT}`);
    console.log(`   IP Adresin: 192.168.43.207`);
    console.log(`===========================================`);
    console.log(`Test Et: http://192.168.43.207:3000/eczaneler/istanbul/besiktas`);
});