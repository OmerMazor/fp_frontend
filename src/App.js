import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import PredictionsPage from "./PredictionsPage";

function HomePage() {
  const [message, setMessage] = useState("");
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [homeMarketValue, setHomeMarketValue] = useState("");
  const [awayMarketValue, setAwayMarketValue] = useState("");
  const [accuracy, setAccuracy] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const leagues = [
    "La Liga",
    "Saudi Pro League",
    "Russian Premier League",
    "Czech First League",
    "EFL League One",
    "Liga 1 Peru",
    "Liga Portugal",
    "Uruguayan Primera División",
    "Argentine Primera División",
    "Serie A (Italy)",
    "BeNe League",
    "LigaPro Ecuador",
    "Swiss Super League",
    "USL League One",
    "Liga 1 Romania",
    "Scottish Premiership",
    "Paraguayan Primera División",
    "Chinese Super League",
    "Chilean Primera División",
    "Danish Superliga",
    "Liga FUTVE (Venezuela)",
    "Scottish Championship",
    "Nemzeti Bajnokság I (Hungary)",
    "Eerste Divisie (Netherlands)",
    "Ligue 2 (France)",
    "A-League Men (Australia)",
    "Swiss Promotion League",
    "Serbian SuperLiga",
    "National League (England)",
    "I-League (India)",
    "I-League 2 (India)",
    "Indian Super League",
    "J1 League (Japan)",
    "J2 League (Japan)",
    "EFL Championship",
    "Süper Lig (Turkey)",
    "USL Championship",
    "Bolivian Primera División",
    "Ligue 1 (France)",
    "Ukrainian Premier League",
    "Liga MX (Mexico)",
    "Serie B (Italy)",
    "Bundesliga (Germany)",
    "3. Liga (Germany)",
    "K League 1 (South Korea)",
    "Ekstraklasa (Poland)",
    "MLS (USA)",
    "WE League (Japan, Women)",
    "Liga F (Spain, Women)",
    "South African Premiership",
    "Super League Greece",
    "Frauen-Bundesliga (Germany)",
    "Categoría Primera A (Colombia)",
    "Premier League (England)",
    "Serie A Women (Italy)",
    "Iran Pro League",
    "EFL League Two",
    "Eredivisie Women",
    "League of Ireland Premier Division",
    "2. Bundesliga (Germany)",
    "Primera Federación Femenina (Spain)",
    "Eredivisie (Netherlands)",
    "Croatian Football League",
    "Austrian Bundesliga",
    "Damallsvenskan (Sweden)",
    "Swiss Women's Super League",
    "Brazil Serie A",
    "Segunda División (Spain)",
    "Bulgarian First League",
    "NWSL (USA, Women)",
    "Challenger Pro League (Belgium)",
    "Belgian Pro League",
    "Cypriot First Division",
    "SAFA Second Division (South Africa)",
    "Elitettan (Sweden)",
    "Bulgarian Second League",
    "Azadegan League (Iran)",
    "Slovak Super Liga",
    "Austrian 2. Liga",
    "Swiss Challenge League",
    "Hungarian Nemzeti Bajnokság II",
    "Romanian Liga II",
    "Slovak 2. Liga",
    "Greek Super League 2",
    "Turkish TFF First League",
    "Russian First League",
    "Ukrainian First League",
    "South African National First Division",
    "Mexican Liga de Expansión MX",
    "Brazilian Série B",
    "Chilean Primera B",
    "Colombian Categoría Primera B",
    "Venezuelan Segunda División",
    "Uruguayan Segunda División",
    "Paraguayan División Intermedia",
    "Bolivian Copa Simón Bolívar",
    "Peruvian Liga 2",
    "Ecuadorian Serie B",
    "Argentine Primera Nacional",
    "Spanish Primera Federación",
    "German Regionalliga",
    "French Championnat National",
    "Italian Serie C",
    "Dutch Tweede Divisie",
    "Belgian National Division 1",
    "Austrian Regionalliga",
    "Polish II liga",
    "Czech Moravian-Silesian Football League",
    "Slovak 3. Liga",
    "Greek Gamma Ethniki",
    "Turkish TFF Second League",
    "Russian Second League",
    "Ukrainian Second League",
    "Japanese J3 League",
    "Iranian League 2",
    "Mexican Liga Premier ",
    "Brazilian Série C",
    "Chilean Segunda División",
    "Colombian Categoría Primera C",
    "Venezuelan Tercera División",
    "Uruguayan Tercera División",
    "Paraguayan Primera División B",
    "Bolivian Tercera División",
    "Peruvian Copa Perú",
    "Ecuadorian Segunda Categoría",
    "Argentine Torneo Federal A",
    "Spanish Segunda Federación",
    "English National League North/South",
    "German Oberliga",
    "French National 2",
    "Italian Serie D",
    "Dutch Derde Divisie",
    "Belgian Division 2",
    "Swiss 1. Liga",
    "Austrian Landesliga",
    "Polish III liga",
    "superettan",
    "premijer liga_bih (Bosna & Hercegovina)",
    "allsvenskan (Sweden)",
    "slovenian prvaliga",
    "npsl (USA)"
  ];
  const teams = ['Adelaide United', 'Auckland FC', 'Brisbane Roar', 'Central Coast Mariners', 'Macarthur FC', 'Melbourne City', 'Melbourne Victory', 'Newcastle Jets', 'Perth Glory', 'Sydney FC', 'Wellington Phoenix', 'Western Sydney Wanderers', 'Western United', 'Adelaide United', 'Brisbane Roar Women', 'Canberra United', 'Central Coast Mariners', 'Melbourne City', 'Melbourne Victory', 'Newcastle Jets', 'Perth Glory', 'Sydney FC Women', 'Wellington Phoenix', 'Western Sydney Wanderers Women', 'Western United Women', 'AIK Stockholm', 'Hacken', 'Degerfors', 'Djurgarden', 'GAIS', 'Halmstad', 'Hammarby', 'IF Brommapojkarna', 'Elfsborg', 'Goteborg', 'Norrkoping', 'Varnamo', 'Sirius', 'Malmo', 'Mjallby', 'Oster', 'Aldosivi', 'Argentinos Juniors', 'Atletico Tucuman', 'Banfield', 'Barracas Central', 'Belgrano', 'Boca Juniors', 'Central Cordoba SdE', 'Defensa y Justicia', 'Deportivo Riestra', 'Estudiantes LP', 'Gimnasia y Esgrima LP', 'Godoy Cruz', 'Huracan', 'Independiente', 'Independiente Rivadavia', 'Instituto', 'Lanus', 'Newells Old Boys', 'Platense', 'Racing', 'River Plate', 'Rosario Central', 'San Lorenzo', 'San Martin de San Juan', 'Sarmiento', 'Talleres', 'Tigre', 'Union', 'Velez Sarsfield', 'SK Austria Klagenfurt', 'Austria Wien', 'Blau Weiss Linz', 'Grazer AK', 'LASK', 'Rapid Wien', 'Red Bull Salzburg', 'Rheindorf Altach', 'Sturm Graz', 'Hartberg', 'Wolfsberger AC', 'WSG Tirol', 'Fajr Sepasi Shiraz', 'Ario Eslamshahr', 'Saipa FC', 'Paykan FC', 'Sanat Naft Abadan', 'Mes Shahr e Babak', 'Pars Jonoubi Jam', 'Palayesh Naft Bandar Abbas', 'Mes Kerman', 'Shahrdari Noshahr', 'Naft va Gaz Gachsaran', 'Besat Kermanshah', 'Mes Soongoun Varzaghan', 'Damash Gilan', 'Niroye Zamini', 'Shahr Raz Shiraz', 'Naft Masjed Soleyman', 'Shahrdari Astara', 'SorkhPooshan FC', 'Anderlecht', 'Beerschot Wilrijk', 'Cercle Brugge', 'Club Brugge', 'Charleroi', 'Dender', 'Genk', 'Gent', 'Kortrijk', 'Mechelen', 'OH Leuven', 'Antwerp', 'Sint Truiden', 'Standard Liege', 'Union SG', 'KVC Westerlo', 'Westerlo', 'Bulldogs Liege', 'EG Diez Limburg', 'EHC Neuwied', 'Friesland Flyers Heerenveen', 'Geleen Eaters', 'Herentals HYC', 'HYS The Hague', 'IHC Leuven', 'Mechelen Golden Sharks', 'Twente Women', 'ABB', 'Always Ready', 'Aurora', 'Blooming', 'Bolivar', 'Real Oruro', 'FC Universitario', 'Gualberto Villarroel SJ', 'Guabira', 'Independiente Petrolero', 'Jorge Wilstermann', 'Nacional Potosi', 'Oriente Petrolero', 'Real Tomayapo', 'San Antonio', 'The Strongest', 'GV San Jose', 'San Antonio Bulo Bulo', 'Athletico Paranaense', 'Atletico Goianiense', 'Atletico Mineiro', 'Bahia',
    'Botafogo RJ', 'Corinthians', 'Criciuma', 'Cruzeiro', 'Cuiaba', 'Flamengo', 'Fluminense', 'Fortaleza', 'Gremio', 'Internacional', 'Juventude', 'Palmeiras', 'Red Bull Bragantino', 'Sao Paulo', 'Vasco da Gama', 'Vitoria', 'Santos', 'Mirassol', 'Ceara', 'Sport Recife', 'Fortaleza FC', 'Arda', 'Beroe', 'Botev Plovdiv', 'Botev Vratsa', 'Cherno More', 'CSKA 1948', 'CSKA Sofia', 'PFC Hebar Pazardzhik', 'Krumovgrad', 'FK Levski 2005', 'Lokomotiv Plovdiv', 'Lokomotiv Sofia', 'Ludogorets Razgrad', 'Septemvri Sofia', 'Slavia Sofia', 'FC Spartak Varna', 'Levski Sofia', 'Dobrudzha Dobrich', 'Montana', 'Pirin Blagoevgrad', 'Marek Dupnitsa', 'Yantra Gabrovo', 'Dunav Ruse', 'Belasitsa Petrich', 'CSKA Sofia II', 'CSKA 1948 II', 'Etar Veliko Tarnovo', 'Spartak Pleven', 'Ludogorets Razgrad II', 'Lokomotiv Gorna Oryahovitsa', 'Fratria', 'Minyor Pernik', 'Litex Lovech', 'Sportist Svoge', 'Strumska Slava', 'Botev Plovdiv II', 'Nesebar', 'Eintracht Braunschweig', 'Hertha BSC', 'Darmstadt 98', 'Dusseldorf', 'Elversberg', 'Greuther Furth', 'Hamburger SV', 'Hannover 96', 'Kaiserslautern', 'Karlsruher', 'Koln', 'Magdeburg', 'Preussen Munster', 'Nurnberg', 'Paderborn 07', 'Jahn Regensburg', 'Schalke 04', 'Ulm', 'Bayern Munich', 'Bayer Leverkusen', 'RB Leipzig', 'Dortmund', 'Eintracht Frankfurt', 'Stuttgart', 'Freiburg', 'Monchengladbach', 'Mainz 05', 'Hoffenheim', 'Augsburg', 'Werder Bremen', 'Union Berlin', 'Wolfsburg', 'Bochum', 'Heidenheim', 'St Pauli', 'Holstein Kiel', 'Atletico Ottawa', 'Cavalry FC', 'Forge FC', 'HFX Wanderers', 'Pacific FC', 'Valour FC', 'Vancouver FC', 'York United', 'Aguilas Doradas', 'Alianza FC', 'AD Cali', 'CA Bucaramanga', 'Atletico Nacional', 'Boyaca Chico', 'Tolima', 'Deportivo Cali', 'Pasto', 'Deportivo Pereira', 'Envigado', 'Fortaleza CEIF', 'Independiente Medellin', 'Junior', 'La Equidad', 'Millonarios', 'Once Caldas', 'Patriotas', 'Santa Fe', 'Llaneros', 'Rionegro', 'Union Magdalena', 'CD America', 'Waasland Beveren', 'Beveren', 'Club NXT', 'Eupen', 'Francs Borains', 'Jong Genk', 'La Louviere', 'Lierse Kempenzonen', 'Lokeren Temse', 'Lommel SK', 'Patro Eisden', 'RFC Liege', 'RSCA Futures', 'RWD Molenbeek', 'RFC Seraing', 'Zulte Waregem', 'KMSK Deinze', 'AS Nancy Lorraine', 'Le Mans FC', 'US Boulogne', 'Dijon FCO', 'Football Bourg en Bresse Péronnas 01', 'Aubagne FC', 'US Orléans', 'US Concarneau', 'Valenciennes FC', 'FC Rouen 1899', 'Quevilly Rouen Métropole', 'FC Sochaux Montbéliard', 'FC Villefranche Beaujolais', 'FC Versailles 78', 'LB Châteauroux', 'Nîmes Olympique', 'Paris 13 Atletico', 'Fleury', 'Audax Italiano', 'Cobreloa', 'Cobresal', 'Colo Colo', 'Coquimbo Unido', 'Deportes Copiapó', 'Deportes Iquique', 'Everton', 'Huachipato', 'Nublense', 'OHiggins', 'Palestino', 'Union Espanola', 'La Calera', 'Universidad Catolica', 'Universidad de Chile', 'La Serena', 'CD Limache', 'Beijing Guoan', 'Changchun Yatai', 'Chengdu Rongcheng', 'Dalian Yingbo', 'Henan', 'Meizhou Hakka', 'Qingdao Hainiu', 'Qingdao West Coast', 'Shandong Taishan', 'Shanghai Port', 'Shanghai Shenhua', 'Shenzhen Peng City', 'Tianjin Jinmen Tiger', 'Wuhan Three Towns', 'Yunnan Yukun', 'Zhejiang Professional', 'Dinamo Zagreb', 'Gorica', 'Hajduk Split', 'Istra 1961', 'Lokomotiva', 'Osijek', 'Rijeka', 'Slaven Belupo', 'Sibenik', 'Varazdin', 'AEK Larnaca', 'AEL Limassol', 'Anorthosis Famagusta', 'APOEL', 'Apollon Limassol', 'Aris Limassol', 'Enosis Neon Paralimni', 'Ethnikos Achnas', 'Karmiotissa Pano Polemidion', 'Nea Salamina Famagusta', 'Omonia Aradippou', 'AC Omonia', 'Omonia 29is Maiou', 'Pafos FC', 'Bohemians 1905', 'Ceske Budejov', 'Dukla Prague', 'Hradec Kralove', 'Jablonec', 'Karvina', 'Slovan Liberec', 'Mlada Boleslav', 'Sigma Olomouc', 'Banik Ostrava', 'FK Pardubice', 'Viktoria Plzen', 'Slavia Prague', 'Slovacko', 'Sparta Prague', 'Teplice', 'AIK Fotboll Dam', 'Djurgarden Women', 'BK Hacken Women', 'Hammarby Women', 'Brommapojkarna', 'IFK Norrkoping DFK', 'Kristianstads', 'Linkoping', 'Orebro', 'Pitea', 'Rosengard', 'Trelleborgs FF', 'Vaxjo', 'Vittsjo', 'AaB', 'AGF', 'Brondby', 'Copenhagen', 'Lyngby', 'Midtjylland', 'Nordsjaelland', 'Randers', 'Silkeborg', 'SonderjyskE', 'Vejle BK', 'Viborg', 'Aalborg', 'FC Copenhagen', 'ADO Den Haag', 'Cambuur', 'De Graafschap', 'Den Bosch', 'Dordrecht', 'FC Eindhoven', 'Emmen', 'Excelsior', 'Helmond Sport', 'Jong Ajax', 'Jong AZ', 'Jong PSV', 'Jong Utrecht', 'MVV Maastricht', 'Roda JC Kerkrade', 'Telstar 1963', 'Oss', 'Vitesse', 'Volendam', 'VVV Venlo', 'Blackburn Rovers', 'Bristol City', 'Burnley', 'Cardiff City', 'Coventry City', 'Derby County', 'Hull City', 'Leeds United', 'Luton Town', 'Middlesbrough', 'Millwall', 'Norwich City', 'Oxford United', 'Plymouth Argyle', 'Portsmouth', 'Preston North End', 'Queens Park Rangers', 'Sheffield United',
    'Sheffield Wednesday', 'Stoke City', 'Sunderland', 'Swansea City', 'Watford', 'West Bromwich Albion', 'Barnsley', 'Birmingham City', 'Blackpool', 'Bolton Wanderers', 'Bristol Rovers', 'Burton Albion', 'Cambridge United', 'Charlton Athletic', 'Crawley Town', 'Exeter City', 'Huddersfield Town', 'Leyton Orient', 'Lincoln City', 'Mansfield Town', 'Northampton Town', 'Peterborough United', 'Reading', 'Rotherham United', 'Shrewsbury Town', 'Stevenage', 'Stockport County', 'Wigan Athletic', 'Wrexham', 'Wycombe Wanderers', 'Stockport', 'Accrington Stanley', 'AFC Wimbledon', 'Barrow', 'Bradford City', 'Bromley', 'Carlisle United', 'Cheltenham Town', 'Chesterfield',
    'Colchester United', 'Crewe Alexandra', 'Doncaster Rovers', 'Fleetwood Town', 'Gillingham', 'Grimsby Town', 'Harrogate', 'Milton Keynes Dons', 'Morecambe', 'Newport County', 'Notts County',
    'Port Vale', 'Salford City', 'Swindon Town', 'Tranmere Rovers', 'Walsall', 'Cracovia', 'Katowice', 'Gornik Zabrze', 'Jagiellonia', 'Korona Kielce', 'Lech Poznan', 'Lechia Gdansk', 'Legia Warsaw', 'Motor Lublin', 'Piast Gliwice', 'Pogon Szczecin', 'Puszcza Niepolomice', 'Radomiak Radom', 'Rakow Czestochowa', 'Stal Mielec', 'Slask Wroclaw', 'Widzew Lodz', 'Zaglebie Lubin', 'FK Bodø/Glimt', 'SK Brann', 'Bryne', 'Fredrikstad', 'HamKam', 'Haugesund', 'KFUM Oslo', 'Kristiansund', 'Molde', 'Rosenborg', 'Sandefjord', 'Sarpsborg 08', 'Stromsgodset', 'Tromso', 'Viking', 'Valerenga', 'BodoGlimt', 'Alingsas FC United', 'Bollstanas SK', 'Eskilstuna United DFF', 'Jitex BK', 'IFK Kalmar', 'Lidkopings FK', 'Mallbackens IF', 'Malmo FF', 'Orebro SK', 'Sundsvalls DFF', 'Sunnana SK', 'Umea IK', 'IK Uppsala Fotboll', 'Gamla Upsala SK', 'Ajax', 'Almere City', 'AZ Alkmaar', 'Feyenoord', 'Fortuna Sittard', 'Go Ahead Eagles', 'Groningen', 'Heerenveen', 'Heracles Almelo', 'NAC Breda', 'NEC Nijmegen', 'Zwolle', 'PSV Eindhoven', 'RKC Waalwijk', 'Sparta Rotterdam', 'Twente', 'FC Utrecht', 'Willem II', 'ADO Den Haag Women', 'Ajax Women', 'AZ', 'ExcelsiorBarendrecht Women', 'Feyenoord', 'Fortuna Sittard', 'Heerenveen', 'PEC Zwolle', 'PSV Vrouwen', 'Telstar', 'Twente', 'Utrecht', 'VV Alkmaar', '1 FC Köln', '1899 Hoffenheim', 'Bayer Leverkusen Women', 'Bayern München', 'Eintracht Frankfurt Women', 'FC Carl Zeiss Jena', 'RB Leipzig', 'SC Freiburg', 'SGS Essen', 'SV Werder Bremen', 'Turbine Potsdam', 'VfL Wolfsburg', 'Dresden', 'Arminia', 'Saarbrucken', 'Energie Cottbus', 'Ingolstadt 04', 'Hansa Rostock', 'Viktoria Koln',
    'Verl', '1860 Munich', 'Rot Weiss Essen', 'Aachen', 'Dortmund II', 'Wehen Wiesbaden', 'Erzgebirge Aue', 'Osnabruck', 'SV Waldhof', 'Sandhausen', 'Stuttgart II', 'Unterhaching', 'Hannover 96 II', 'Diamond Harbour FC', 'Chanmari FC', 'Sporting Clube de Goa', 'FC Bengaluru United', 'SAT Tirur', 'United SC', 'NEROCA FC', 'TRAU FC', 'KLASA FC', 'SC Bengaluru', 'Aizawl', 'Churchill Brothers FC Goa', 'Delhi FC', 'Dempo', 'Gokulam Kerala', 'Inter Kashi', 'Namdhari FC', 'Rajasthan United FC', 'Real Kashmir FC', 'Shillong Lajong', 'Sreenidi Deccan FC', 'Sporting Club Bengaluru', 'Bengaluru', 'Chennaiyin', 'East Bengal', 'Goa', 'Hyderabad FC', 'Jamshedpur', 'Kerala Blasters', 'Mohammedan', 'Mohun Bagan', 'Mumbai City', 'NorthEast United', 'Odisha', 'Punjab', 'Churchill Brothers', 'Real Kashmir', 'Aluminium Arak', 'Chadormalu SC', 'Esteghlal', 'Esteghlal Khuzestan', 'Foolad', 'Gol Gohar', 'Havadar', 'Kheybar Khorramabad FC', 'Malavan', 'Mes Rafsanjan', 'Nassaji Mazandaran', 'Persepolis', 'Sepahan', 'Shams Azar Qazvin', 'Tractor Sazi', 'Zob Ahan', 'Kheybar Khorramabad', 'Hokkaido Consadole Sapporo', 'Kashima Antlers', 'Urawa Red Diamonds', 'Kashiwa Reysol', 'FC Tokyo', 'Tokyo Verdy', 'Machida Zelvia', 'Kawasaki Frontale', 'Yokohama F Marinos', 'Shonan Bellmare', 'Albirex Niigata', 'Jubilo Iwata', 'Nagoya Grampus', 'Kyoto Sanga', 'Gamba Osaka', 'Cerezo Osaka', 'Vissel Kobe', 'Sanfrecce Hiroshima', 'Avispa Fukuoka',
    'Sagan Tosu', 'Blaublitz Akita', 'Ehime FC', 'Fagiano Okayama', 'Fujieda MYFC', 'Iwaki FC', 'JEF United Chiba', 'Kagoshima United', 'Mito HollyHock', 'Montedio Yamagata', 'Oita Trinita', 'Renofa Yamaguchi', 'Roasso Kumamoto', 'Shimizu S Pulse', 'Thespakusatsu Gunma', 'Tochigi SC', 'Tokushima Vortis', 'V Varen Nagasaki', 'Vegalta Sendai', 'Ventforet Kofu', 'Yokohama FC', 'FC Imabari', 'Kataller Toyama', 'Omiya Ardija', 'FC Anyang', 'Daegu', 'Daejeon Citizen FC', 'Gangwon', 'Sangju Sangmu', 'Gwangju FC', 'Jeju United FC', 'Jeonbuk', 'Pohang', 'FC Seoul', 'Suwon FC', 'Jeonbuk Hyundai Motors', 'Ulsan Hyundai', 'Alaves', 'Almeria', 'Athletic Club', 'Atletico', 'Barcelona', 'Cádiz', 'Celta Vigo', 'Getafe', 'Girona', 'Granada', 'Las Palmas', 'Mallorca', 'Osasuna', 'Rayo Vallecano', 'Real Betis', 'Real Madrid', 'Real Sociedad', 'Sevilla', 'Valencia',
    'Villarreal', 'Valladolid', 'Espanyol', 'Bohemians', 'Derry City', 'Drogheda United', 'Dundalk', 'Galway United', 'Shamrock Rovers', 'Shelbourne', 'Sligo Rovers', 'St Patricks Athletic', 'Waterford', 'Universitario', 'Alianza Lima', 'Alianza', 'Sporting Cristal', 'Comerciantes Unidos', 'Los Chankas', 'Melgar', 'Cusco', 'Sport Huancayo', 'Deportivo Garcilaso', 'Cienciano', 'ADT', 'Atletico Grau', 'Alianza Atletico', 'Sport Boys', 'Alianza Universidad', 'Juan Pablo II College', 'UTC', 'Ayacucho', 'Asociacion Deportiva Tarma', 'CDC Santa Rosa', 'ADT Tarma', 'Binacional', 'Universidad Tecnica de Cajamarca', 'Botosani', 'CFR Cluj', 'Dinamo Bucuresti', 'Farul Constanta', 'FCSB', 'Hermannstadt', 'Gloria Buzau', 'Otelul Galati', 'Petrolul Ploiesti', 'Politehnica Iasi', 'Rapid Bucuresti', 'Sepsi OSK', 'Unirea Slobozia', 'CS Universitatea Craiova', 'Universitatea Cluj', 'UTA Arad', 'Sepsi Sfantu GheorgheSCM Gloria Buzau', 'Sepsi Sfantu Gheorghe', 'SCM Gloria Buzau', 'FC Barcelona', 'Real Madrid Women', 'Atletico Madrid', 'Athletic Club', 'Granada CF', 'UD Costa Adeje Tenerife', 'Real Sociedad', 'SD Eibar', 'Sevilla FC', 'Madrid CFF', 'Deportivo Abanca', 'RCD Espanyol', 'Levante Badalona', 'Levante UD', 'Real Betis Feminas', 'Valencia CF Femenino', 'Academia Puerto Cabello', 'Angostura', 'Carabobo', 'Caracas', 'Deportivo La Guaira', 'Deportivo Tachira', 'Estudiantes de Merida', 'Inter de Barinas', 'Metropolitanos', 'Monagas', 'Portuguesa', 'Rayo Zuliano', 'Universidad Central', 'Zamora', 'Yaracuyanos FC',
    'Anzoategui', 'America', 'Atlas', 'Atletico San Luis', 'Cruz Azul', 'Guadalajara', 'FC Juarez', 'Leon', 'Mazatlan', 'Monterrey', 'Necaxa', 'Pachuca', 'Puebla', 'Queretaro', 'Santos Laguna',
    'Tijuana', 'Toluca', 'UANL', 'Pumas UNAM', 'Arouca', 'AVS Futebol', 'Benfica', 'Boavista', 'Braga', 'Casa Pia', 'Estoril', 'Estrela', 'Famalicao', 'Farense', 'Gil Vicente FC', 'Moreirense',
    'Nacional', 'Porto', 'Rio Ave', 'Santa Clara', 'Sporting CP', 'Vitoria Guimaraes', 'Barcelona SC Guayaquil', 'CS Emelec', 'SD Aucas', 'LDU de Quito', 'El Nacional', 'Delfin', 'Deportivo Cuenca', 'CD Universidad Catolica', 'Macara', 'Independiente del Valle', 'Tecnico Univ', 'Orense',
    'Manta Futbol Club', 'Mushuc Runa', 'Vinotinto Ecuador', 'Libertad FC', 'Paris Saint Germain',
    'Monaco', 'Marseille', 'Lyon', 'Lille', 'Strasbourg', 'Nice', 'Brest', 'Lens', 'Auxerre', 'Rennes', 'Reims', 'Toulouse', 'Nantes', 'Le Havre', 'Montpellier', 'Angers', 'Saint Etienne', 'Ajaccio', 'Amiens', 'Annecy', 'Bastia', 'Caen', 'Clermont Foot', 'Dunkerque', 'Grenoble Foot', 'Guingamp', 'Stade Laval', 'Lorient', 'Martigues', 'Metz', 'Paris FC', 'Pau FC', 'Red Star', 'Rodez AF', 'Troyes', 'Rodez Aveyron', 'Atlanta United 2', 'Austin FC II', 'Bethlehem Steel FC', 'Carolina Core FC', 'Chattanooga FC', 'Chicago Fire II', 'Colorado Rapids 2', 'Columbus Crew 2', 'Crown Legacy FC', 'FC Cincinnati 2', 'Houston Dynamo 2', 'Huntsville City FC', 'Inter Miami CF II', 'Los Angeles FC 2', 'Minnesota United FC 2', 'New England Revolution II', 'New York City FC II', 'New York Red Bulls II', 'North Texas SC', 'Orlando City B', 'Philadelphia Union II', 'Portland Timbers 2', 'Real Monarchs', 'Sporting Kansas City II', 'St. Louis City 2', 'Tacoma Defiance', 'Toronto FC II', 'Ventura County FC', 'Vancouver Whitecaps FC 2', 'Atlanta United', 'Austin FC', 'Charlotte FC', 'Chicago Fire', 'FC Cincinnati', 'Colorado Rapids', 'Columbus Crew', 'DC United', 'FC Dallas', 'Houston Dynamo', 'LA Galaxy', 'Los Angeles FC', 'Inter Miami', 'Minnesota United', 'CF Montreal', 'Nashville SC', 'New England Revolution', 'New York City FC', 'New York Red Bulls', 'Orlando City', 'Philadelphia Union', 'Portland Timbers', 'Real Salt Lake', 'San Diego FC', 'San Jose Earthquakes', 'Seattle Sounders FC', 'Seattle Sounders', 'Sporting Kansas City', 'St Louis City', 'Toronto FC', 'Vancouver Whitecaps FC', 'RKS Rakow', 'Fylde', 'Aldershot Town', 'Altrincham', 'Barnet', 'Boston United', 'Braintree Town', 'Dagenham and Redbridge', 'Eastleigh', 'Ebbsfleet United', 'FC Halifax Town', 'Forest Green Rovers', 'Gateshead', 'Hartlepool United', 'Maidenhead United', 'Oldham Athletic', 'Rochdale', 'Solihull Moors', 'Southend United', 'Sutton United', 'Tamworth', 'Wealdstone', 'Woking', 'Yeovil Town', 'York City', 'Debrecen', 'Diosgyor', 'Fehervar FC', 'Ferencvaros', 'Gyor', 'Kecskemet', 'MTK Budapest', 'Nyiregyhaza Spartacus FC', 'Puskas Akademia', 'Paks', 'Ujpest', 'Zalaegerszeg', 'Nyiregyhaza', 'Kisvárda FC', 'Kazincbarcikai SC', 'Vasas FC', 'Kozármisleny FC', 'Szentlőrinc SE', 'Mezőkövesd Zsóry FC', 'Szeged Csanád GA', 'Budapest Honvéd FC', 'BVSC Zugló', 'Aqvital FC Csákvár', 'Soroksár SC', 'Budafoki MTE', 'FC Ajka', 'Békéscsaba 1912 Elöre SE', 'Gyirmót FC Győr', 'Tatabányai SC', 'Vidi', 'Alexandria Reds', 'Ambassadors FC Ohio', 'America Soccer Club New York', 'Alexandria Rough Diamonds', 'American SC New York', 'Baltimore Virginia Dream FC', 'Buffalo Stallions', 'Burlington United FC', 'Club De Lyon FC', 'Cruizers FC', 'District Elite FC', 'FC Florida', 'New Haven United FC', 'Osners FC', 'Players Development Academy', 'Virginia Dream FC', 'Angel City FC', 'Bay FC', 'Chicago Stars FC', 'Houston Dash', 'Kansas City Current', 'NJ NY Gotham FC', 'North Carolina Courage', 'Orlando Pride', 'Portland Thorns FC', 'Racing Louisville', 'San Diego Wave', 'Seattle Reign FC', 'Utah Royals', 'Washington Spirit', 'SPG SCR Altach/FFC Vorderland', 'FK Austria Wien', 'FC Bergheim', 'First Vienna FC', 'SPG UNION Kleinmünchen/FC Blau Weiß Linz', 'SV Neulengbach', 'SKN St. Pölten', 'SK Sturm Graz', 'FC Wacker Innsbruck', 'FC LustenauFC Dornbirn', 'Vorderland', 'Arsenal', 'Aston Villa', 'Bournemouth', 'Brentford', 'Brighton and Hove Albion', 'Chelsea', 'Crystal Palace', 'Everton', 'Fulham', 'Ipswich Town', 'Leicester City', 'Liverpool', 'Manchester City', 'Manchester United', 'Newcastle United', 'Nottingham Forest',
    'Southampton', 'Tottenham Hotspur', 'West Ham United', 'Wolverhampton Wanderers', 'Montpellier Women', 'Paris Saint Germain Women', 'Stade Rennais FC', 'Dijon Women', 'Saint Etienne Women',
    'Stade de Reims Women', 'Lyon Women', 'Nantes Women', 'Le Havre Women', 'Guingamp Women', 'Strasbourg Women', 'Fleury', 'Paris FC Women', 'Borac Banja Luka', 'GOŠK Gabela', 'Igman Konjic', 'Posušje', 'Radnik Bijeljina', 'Sarajevo', 'Sloboda Tuzla', 'Sloga Doboj', 'Široki Brijeg', 'Velež Mostar', 'Zrinjski Mostar', 'Željezničar', 'Deportes Antofagasta', 'Cobreloa', 'Deportes Copiapó', 'Curicó Unido', 'Deportes Concepción', 'Deportivo Recoleta', 'Deportes Santa Cruz', 'Deportes Temuco', 'Magallanes', 'Rangers', 'San Luis de Quillota', 'San Marcos de Arica', 'Santiago Morning', 'Santiago Wanderers', 'Unión San Felipe', 'Universidad de Concepción', 'Alhama CF', 'Atletico Madrid B', 'CA Osasuna', 'CD Atletico Baleares', 'CD Getafe', 'CP Cacereno', 'Deportivo Alaves', 'DUX Logrono', 'FC Barcelona B', 'Fundacion Albacete', 'Real Madrid B', 'SE AEM',
    'Sporting de Huelva', 'Villarreal CF', 'Espanyol Women', '2 de Mayo', 'Cerro Porteno', 'Club General Caballero JLM', 'Guarani', 'Libertad', 'Nacional Asuncion', 'Club Olimpia', 'Sol de America', 'Sportivo Ameliano', 'Sportivo Luqueno', 'Sportivo Trinidense', 'Tacuary', 'Club Atletico Tembetary', 'General Caballero JLM', 'Krasnodar', 'Zenit', 'Spartak Moscow', 'CSKA Moscow', 'Dynamo Moscow', 'Lokomotiv Moscow', 'Rubin Kazan', 'Rostov', 'FK Akron Tolyatti', 'FC Dynamo Makhachkala', 'Samara', 'Akhmat Grozny', 'FC Khimki', 'Nizhny Novgorod', 'Fakel Voronezh', 'Orenburg', 'Amavarara', 'Matta Milan', 'Qqberha United', 'Buffalo City Relatives', 'Emi', 'Seven Stars', 'Bush Pirates', 'Camdeboo Football Academy', 'Mayaya', 'Peace Makers', 'FC Ravens', 'Mighty Eagles', 'Sinenkani', 'FC Siyanda', 'Amaxesibe', 'G millionaires', 'Bush Bucks', 'Young Challengers', 'Appollo XI', 'Tiger Boys', 'Montshioa Swallows FC', 'Thaba Tshwane FC', 'Mahika Champions FC', 'Lerumo Lions FC', 'Bokone FC', 'Phezulu FC', 'MP Future Stars', 'Nkowankowa Continental', 'Sunrise FC', 'Dlangezwa Hellenic', 'Swayimane United', 'Mike 1 Stars', 'University of Johannesburg', 'Ixias', 'Royal Eagles FC', 'EMI', 'Ayliff City', 'Spain', 'FN Rangers', 'Clarewood FC', 'Thames FC', 'Mpheni Defenders', 'Njampela FC', 'Mangaung Unite', 'NC Professionals', 'Dondol Stars', 'Al Ahli', 'Al Ettifaq', 'Al Fateh', 'Al Fayha', 'Al Hilal', 'Al Ittihad', 'Al Khaleej', 'Al Kholood Saudi Club', 'Al Nassr', 'Al Okhdood SC', 'Al Orobah', 'Al Qadsiah', 'Al Raed', 'Al Riyadh SC', 'Al Shabab', 'Al Taawoun', 'Al Wehda', 'Damac', 'Airdrieonians', 'Ayr United', 'Dunfermline Athletic', 'Falkirk', 'Greenock Morton', 'Hamilton Academical', 'Livingston', 'Partick Thistle', 'Queens Park FC', 'Raith Rovers', 'Aberdeen', 'Celtic', 'Dundee', 'Dundee United', 'Heart of Midlothian', 'Hibernian', 'Kilmarnock', 'Motherwell', 'Rangers', 'Ross County', 'St Johnstone', 'St Mirren', 'Albacete', 'Almeria', 'Burgos', 'Cadiz', 'Cartagena', 'Castellon', 'Cordoba', 'Deportivo La Coruna', 'Eibar', 'Elche', 'Eldense', 'Racing Ferrol', 'Sporting Gijon', 'Granada CF', 'Huesca', 'Levante', 'Malaga', 'CD Mirandes', 'Racing Santander', 'Oviedo', 'Zaragoza', 'Tenerife', 'Leganes', 'Red Star Belgrade', 'Partizan', 'OFK Beograd', 'Radnicki Kragujevac', 'Vojvodina', 'Mladost Lucani', 'TSC Backa Top', 'Novi Pazar', 'Cukaricki', 'FK IMT Novi Beograd', 'FK Zeleznicar Pancevo', 'Napredak Krusevac', 'Spartak Subotica', 'Radnicki Nis', 'Tekstilac Odzaci', 'FK Jedinstvo Ub', 'Atalanta', 'Bologna', 'Cagliari', 'Como', 'Empoli', 'Fiorentina', 'Genoa', 'Internazionale', 'Juventus', 'Lazio', 'Lecce', 'Milan', 'Monza', 'Napoli', 'Parma', 'AS Roma', 'Torino', 'Udinese', 'Venezia', 'Hellas Verona', 'Juventus Women', 'Roma', 'Internazionale Women', 'Milan Women', 'Fiorentina Women', 'Sassuolo Women', 'FC Como Women', 'Sampdoria Women', 'Napoli Women', 'Lazio Women', 'Goias', 'Novorizontino', 'CRB', 'Coritiba', 'Cuiabá', 'Remo', 'Chapecoense', 'Avai', 'Athletico Paranaense', 'America MG', 'Vila Nova', 'Criciúma', 'Atlético Goianiense', 'Ferroviaria', 'Operário Ferroviário', 'Volta Redonda', 'Botafogo SP', 'Amazonas', 'Athletic', 'Paysandu', 'Bari', 'Brescia', 'Carrarese', 'Catanzaro', 'Cesena', 'Cittadella', 'Cosenza', 'Cremonese', 'Frosinone', 'Juve Stabia', 'Mantova', 'Modena', 'Palermo', 'Pisa', 'Reggiana', 'Salernitana', 'Sampdoria', 'Sassuolo', 'Spezia', 'Sudtirol', 'Olimpija Ljubljana', 'Maribor', 'Koper', 'NK Celje', 'NK Bravo', 'ND Primorje', 'NS Mura', 'NK Radomlje', 'NK Domzale', 'NK Nafta 1903', 'AmaZulu', 'Cape Town City', 'Chippa United', 'Lamontville Golden Arrows', 'Kaizer Chiefs', 'Magesi FC', 'Mamelodi Sundowns', 'Marumo Gallants FC', 'Orlando Pirates', 'Polokwane City', 'Richards Bay FC', 'Royal AM', 'Sekhukhune United FC', 'Stellenbosch FC', 'SuperSport United', 'TS Galaxy', 'Olympiacos', 'AEK Athens', 'Panathinaikos', 'PAOK', 'Aris', 'OFI Crete', 'Asteras Tripoli', 'Atromitos', 'Panserraikos', 'Panetolikos', 'Levadiakos', 'Volos NFC', 'Kallithea', 'PAS Lamia', 'Adana Demirspor', 'Alanyaspor', 'Antalyaspor',
    'Besiktas', 'Bodrum FK', 'Rizespor', 'Eyupspor', 'Fenerbahce', 'Galatasaray', 'Gaziantep FK', 'Goztepe', 'Hatayspor', 'Istanbul Basaksehir', 'Kasimpasa', 'Kayserispor', 'Konyaspor', 'Samsunspor', 'Sivasspor', 'Trabzonspor', 'BB Bodrumspor', 'Brage', 'Falkenberg', 'Sundsvall', 'Helsingborg', 'IK Brage', 'IK Oddevold', 'Kalmar', 'Landskrona', 'Oddevold', 'Orebro SK', 'Orgryte', 'Ostersund', 'Sandvikens IF', 'Trelleborg', 'Umea FC', 'Utsikten', 'Varberg', 'Vasteras', 'FC Baden', 'FC Basel U21', 'FC Bavois', 'FC Biel Bienne', 'FC Breitenrain', 'SC Bruhl SG', 'FC Bulle', 'SC Cham', 'SR Delemont', 'FC Grand Saconnex', 'SC Kriens', 'FC Lugano II', 'FC Luzern U21', 'FC Paradiso', 'FC Rapperswil Jona', 'Vevey Sports', 'BSC Young Boys U21', 'FC Zurich U21', 'Basel', 'Servette FC', 'Luzern', 'Young Boys', 'Lugano', 'Zurich', 'Lausanne Sport', 'St Gallen', 'Sion', 'Grasshopper', 'Yverdon Sport', 'FC Winterthur', 'Servette', 'FC Aarau', 'Basel Women', 'GC Zurich', 'FC Luzern Frauen', 'FC Rapperswil Jona', 'Servette Chenois', 'St Gallen Staad', 'Thun Berner Oberland', 'BSC YB Frauen', 'Zurich Women', 'Grasshopper Women', 'Bodø/Glimt', 'Brann', 'Hønefoss', 'Kolbotn', 'LSK Kvinner', 'Lyn Women', 'Rosenborg Women', 'Roa', 'Stabaek Women', 'Valerenga Women', 'Dynamo Kyiv', 'Shakhtar Donetsk', 'FC Oleksandriya', 'FC Polissya Zhytomyr', 'Karpaty Lviv', 'Kryvbas Kryvyi Rih', 'Veres Rivne', 'Zorya Luhansk', 'Rukh Lviv', 'FC LNZ Cherkasy', 'FK Kolos', 'Obolon Brovar Kyiv', 'FK Livyi Bereh', 'Vorskla Poltava', 'Chornomorets Odesa', 'FK Inhulets', 'Rukh', 'Penarol', 'Nacional', 'Racing Club', 'Boston River', 'Danubio', 'Cerro Largo', 'Defensor Sporting', 'Liverpool', 'Montevideo Wanderers', 'River Plate',
    'Cerro', 'Miramar Misiones', 'Progreso', 'Rampla Juniors', 'Juventud de Las Piedras', 'Plaza Colonia', 'Torque', 'Birmingham Legion', 'Charleston Battery', 'Colorado Springs Switchbacks', 'Detroit City', 'El Paso Locomotive', 'FC Tulsa', 'Hartford Athletic', 'Indy Eleven', 'Las Vegas Lights FC', 'Lexington SC', 'Loudoun United', 'Louisville City', 'Miami FC', 'Monterey Bay', 'New Mexico United', 'North Carolina FC', 'Oakland Roots', 'Orange County SC', 'Phoenix Rising',
    'Pittsburgh Riverhounds', 'Rhode Island FC', 'Sacramento Republic', 'San Antonio FC', 'Tampa Bay Rowdies', 'AV Alta FC', 'Charlotte Independence', 'Chattanooga Red Wolves', 'Forward Madison', 'Greenville Triumph', 'FC Naples', 'One Knoxville SC', 'Portland Hearts of Pine', 'Richmond Kickers', 'Texoma FC', 'Tormenta FC', 'Spokane Velocity FC', 'Union Omaha', 'Westchester SC', 'AC Oulu', 'Haka', 'Inter Turku', 'FF Jaro', 'HJK Helsinki', 'IF Gnistan', 'IFK Mariehamn', 'Ilves', 'KTP', 'KuPS', 'SJK', 'VPS', 'Kobe Leonessa', 'NTV Beleza', 'Urawa Reds Ladies', 'Albirex Niigata Women', 'Sanfrecce Hiroshima Regina', 'AS Elfen Saitama', 'JEF United Chiba Women', 'Nagano Parceiro Ladies', 'Cerezo Osaka Ladies', 'Nojima Stella', 'Omiya Ardija Women', 'Vegalta Sendai Women']
  const filteredLeagues = leagues.filter((league) =>
    league.toLowerCase().includes(searchQuery.toLowerCase())
  );


  useEffect(() => {
    axios.get("http://localhost:5000/api/accuracy")
      .then(res => setAccuracy(res.data.accuracy))
      .catch(err => console.error("Failed to fetch accuracy", err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/models")
      .then(res => {

        setModels(res.data.models);
        setSelectedModel(res.data.models[0]?.name || "");
      })
      .catch(err => console.error("Failed to fetch models", err));
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    setResult("");
    axios
      .post("http://localhost:5000/api/teams", {
        homeTeam,
        awayTeam,
        homeMarketValue,
        awayMarketValue,
        modelName: selectedModel
      })
      .then((response) => {
        setResult(response.data.result);
      })
      .catch((error) => {
        console.error("Error sending teams", error);
      })
      .finally(() => {
        setLoading(false); // בסיום הבקשה
      });
  };

  return (
    <div className="main-layout">
      <div className="container">
        <Link
          to="/predictions"
          style={{
            display: "block",
            marginTop: "15px",
            color: "#007bff",
            textDecoration: "underline",
            fontSize: "14px",
          }}
        >
          View Prediction History
      </Link>
        <h1 className="title">Football Match Prediction</h1>
        <p className="subtitle">Enter the names of the home and away teams and their values to predict match outcomes.</p>
        <label style={{ marginTop: "10px", fontWeight: "bold" }}>
          Choose Prediction Model:
        </label>
        <select
          className="input"
          value={selectedModel}
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          {models.map((model) => (
            <option key={model.name} value={model.name}>
              {model.name} – {model.accuracy}% accuracy
            </option>
          ))}
        </select>
        <input
          type="text"
          list="team-options"
          placeholder="Home Team"
          value={homeTeam}
          onChange={(e) => setHomeTeam(e.target.value)}
          className="input"
        />
        <input
          type="text"
          list="team-options"
          placeholder="Away Team"
          value={awayTeam}
          onChange={(e) => setAwayTeam(e.target.value)}
          className="input"
        />
        <datalist id="team-options">
          {teams.map((team, index) => (
            <option key={index} value={team} />
          ))}
        </datalist>
        <p style={{ fontSize: "13px", color: "#555", marginTop: "5px" }}>
          <strong>Note:</strong> Not all team names in the autocomplete list are perfectly accurate.<br />
        If the prediction result is <em>"Not enough data"</em>, try using a different variation of the team names.
        </p>
        <input
          type="number"
          placeholder="Home Team Market Value"
          value={homeMarketValue}
          onChange={(e) => setHomeMarketValue(e.target.value)}
          className="input"
        />
        <input
          type="number"
          placeholder="Away Team Market Value"
          value={awayMarketValue}
          onChange={(e) => setAwayMarketValue(e.target.value)}
          className="input"
        />
        <a
          href="https://www.transfermarkt.com/schnellsuche/keinergebnis/schnellsuche?query="
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            marginTop: "10px",
            color: "#007bff",
            textDecoration: "underline",
            fontSize: "14px",
          }}
        >
          Need help? Find team values on Transfermarkt
      </a>
        <button onClick={handleSubmit} className="button">Send</button>
        {loading ? (
          <p style={{ fontWeight: "bold", color: "#007bff" }}>Predicting result...</p>
        ) : (
            result && <p className="result">🔮{result}</p>
          )}

      </div>
      <div className="league-table-section">
        <h3>Relevant Leagues</h3>
        <input
          type="text"
          placeholder="Search leagues..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input"
        />
        <div className="table-wrapper">
          <table className="league-table">
            <thead>
              <tr>
                <th>League Name</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeagues.map((league, index) => (
                <tr key={index}>
                  <td>{league}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/predictions" element={<PredictionsPage />} />
    </Routes>
  );
}
