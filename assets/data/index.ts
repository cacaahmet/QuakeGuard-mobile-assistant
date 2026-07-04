export const CityData: Record<string, any> = {
  // Önce ayrı olan büyük illeri ekleyelim
  "ADANA": require("./Adana.json"),
  "ADIYAMAN": require("./Adiyaman.json"),
  "DİYARBAKIR": require("./Diyarbakir.json"),
  "GAZİANTEP": require("./Gaziantep.json"),
  "HATAY": require("./Hatay.json"),
  "KAHRAMANMARAŞ": require("./Kahramanmaras.json"),
  "KİLİS": require("./Kilis.json"),
  "MALATYA": require("./Malatya.json"),
  "OSMANİYE": require("./Osmaniye.json"),
  "ŞANLIURFA": require("./Sanliurfa.json"),
};

export const CityList = Object.keys(CityData).sort();