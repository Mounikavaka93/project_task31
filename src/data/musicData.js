const avatar = (name, bg) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${bg}&color=ffffff&size=400&bold=true&font-size=0.38`

const photo = (seed) => `https://picsum.photos/seed/${encodeURIComponent(seed)}/800/800`

const audio = (n) => `/audio/track-${((n - 1) % 8) + 1}.mp3`

export const artists = [
  {
    id: 'a1',
    name: 'Sid Sriram',
    nameTe: 'సిద్ శ్రీరామ్',
    monthlyListeners: 28420311,
    followers: '12.4M',
    bio: 'One of Tollywood’s most loved playback singers, known for melody and romantic hits like Samajavaragamana and Srivalli.',
    image: avatar('Sid Sriram', '0f766e'),
    banner: photo('telugu-melody-stage'),
    genres: ['Melody', 'Romantic', 'Telugu'],
  },
  {
    id: 'a2',
    name: 'Devi Sri Prasad',
    nameTe: 'దేవి శ్రీ ప్రసాద్',
    monthlyListeners: 32110490,
    followers: '15.8M',
    bio: 'Composer known as DSP. King of mass beats and dance numbers, from Butta Bomma to Oo Antava.',
    image: avatar('DSP', 'b45309'),
    banner: photo('telugu-mass-concert'),
    genres: ['Mass', 'Dance', 'Telugu'],
  },
  {
    id: 'a3',
    name: 'S. Thaman',
    nameTe: 'ఎస్. థమన్',
    monthlyListeners: 19804412,
    followers: '9.2M',
    bio: 'Known for energetic background scores and hit title songs across Telugu cinema.',
    image: avatar('Thaman S', '9f1239'),
    banner: photo('telugu-thaman-live'),
    genres: ['Mass', 'Folk', 'Telugu'],
  },
  {
    id: 'a4',
    name: 'Anirudh Ravichander',
    nameTe: 'అనిరుధ్ రవిచందర్',
    monthlyListeners: 25300221,
    followers: '18.1M',
    bio: 'Composer-singer behind youth anthems and trending hits like Hoyna Hoyna.',
    image: avatar('Anirudh', '1d4ed8'),
    banner: photo('telugu-anirudh-dj'),
    genres: ['Pop', 'Dance', 'Telugu'],
  },
  {
    id: 'a5',
    name: 'Shreya Ghoshal',
    nameTe: 'శ్రేయా ఘోషాల్',
    monthlyListeners: 16401180,
    followers: '22.6M',
    bio: 'A sweet, versatile voice that makes Telugu melodies even more beautiful.',
    image: avatar('Shreya Ghoshal', '86198f'),
    banner: photo('telugu-classical-vocal'),
    genres: ['Melody', 'Classical', 'Telugu'],
  },
  {
    id: 'a6',
    name: 'Kaala Bhairava',
    nameTe: 'కాల భైరవ',
    monthlyListeners: 14200340,
    followers: '4.1M',
    bio: 'The voice behind Naatu Naatu. Fresh folk-mass energy that travels worldwide.',
    image: avatar('Kaala Bhairava', 'b91c1c'),
    banner: photo('telugu-folk-dance'),
    genres: ['Folk', 'Mass', 'Telugu'],
  },
  {
    id: 'a7',
    name: 'Mangli',
    nameTe: 'మంగ్లీ',
    monthlyListeners: 8702290,
    followers: '3.4M',
    bio: 'Folk singer known for janapada-mass mixes like Ramuloo Ramulaa.',
    image: avatar('Mangli', 'c2410c'),
    banner: photo('telugu-folk-woman'),
    genres: ['Folk', 'Item', 'Telugu'],
  },
  {
    id: 'a8',
    name: 'Chinmayi Sripada',
    nameTe: 'చిన్మయి శ్రీపాద',
    monthlyListeners: 11110880,
    followers: '5.7M',
    bio: 'Soft, emotional vocals with a special place in Telugu love songs.',
    image: avatar('Chinmayi', '0f766e'),
    banner: photo('telugu-soft-melody'),
    genres: ['Melody', 'Romantic', 'Telugu'],
  },
  {
    id: 'a9',
    name: 'Arijit Singh',
    monthlyListeners: 91200310,
    followers: '48.2M',
    bio: 'The defining voice of modern Bollywood, from Tum Hi Ho to Kesariya.',
    image: avatar('Arijit Singh', '7f1d1d'),
    banner: photo('bollywood-arijit-live'),
    genres: ['Bollywood', 'Romantic', 'Hindi'],
  },
  {
    id: 'a10',
    name: 'Pritam',
    monthlyListeners: 55400210,
    followers: '12.1M',
    bio: 'Bollywood composer behind Kalank, Kesariya, and countless chart-toppers.',
    image: avatar('Pritam', '9a3412'),
    banner: photo('bollywood-pritam-studio'),
    genres: ['Bollywood', 'Pop', 'Hindi'],
  },
  {
    id: 'a11',
    name: 'A.R. Rahman',
    monthlyListeners: 40122011,
    followers: '22.8M',
    bio: 'Oscar-winning composer. Jai Ho and a global catalogue across Indian cinema.',
    image: avatar('AR Rahman', '1e3a8a'),
    banner: photo('rahman-concert-india'),
    genres: ['Bollywood', 'Classical', 'Hindi'],
  },
  {
    id: 'a12',
    name: 'Ed Sheeran',
    monthlyListeners: 82044910,
    followers: '55.6M',
    bio: 'English singer-songwriter behind Perfect and Shape of You.',
    image: avatar('Ed Sheeran', 'b45309'),
    banner: photo('ed-sheeran-stage'),
    genres: ['Pop', 'English', 'Acoustic'],
  },
  {
    id: 'a13',
    name: 'The Weeknd',
    monthlyListeners: 102331002,
    followers: '61.4M',
    bio: 'Canadian pop star. Blinding Lights is one of the biggest songs of the decade.',
    image: avatar('The Weeknd', '111827'),
    banner: photo('weeknd-after-hours'),
    genres: ['Pop', 'R&B', 'English'],
  },
  {
    id: 'a14',
    name: 'Taylor Swift',
    monthlyListeners: 118002441,
    followers: '92.1M',
    bio: 'Record-breaking songwriter. Midnights hits like Anti-Hero.',
    image: avatar('Taylor Swift', '9f1239'),
    banner: photo('taylor-swift-eras'),
    genres: ['Pop', 'English'],
  },
  {
    id: 'a15',
    name: 'Dua Lipa',
    monthlyListeners: 67440112,
    followers: '38.9M',
    bio: 'British pop star of Future Nostalgia and dance-floor hits like Levitating.',
    image: avatar('Dua Lipa', '1d4ed8'),
    banner: photo('dua-lipa-disco'),
    genres: ['Pop', 'Dance', 'English'],
  },
  {
    id: 'a16',
    name: 'Harry Styles',
    monthlyListeners: 58922001,
    followers: '44.7M',
    bio: 'English pop artist. As It Was defined early-2020s radio.',
    image: avatar('Harry Styles', '0f766e'),
    banner: photo('harry-styles-live'),
    genres: ['Pop', 'English'],
  },
]

export const albums = [
  { id: 'al1', title: 'Ala Vaikunthapurramuloo', titleTe: 'అల వైకుంఠపురములో', artist: 'Devi Sri Prasad', artistId: 'a2', year: 2020, cover: photo('ala-vaikunthapurramuloo') },
  { id: 'al2', title: 'Pushpa', titleTe: 'పుష్ప', artist: 'Devi Sri Prasad', artistId: 'a2', year: 2021, cover: photo('pushpa-the-rise') },
  { id: 'al3', title: 'Sita Ramam', titleTe: 'సీతా రామం', artist: 'Vishal Chandrashekhar', artistId: 'a1', year: 2022, cover: photo('sita-ramam-telugu') },
  { id: 'al4', title: 'RRR', titleTe: 'ఆర్‌ఆర్‌ఆర్', artist: 'M. M. Keeravani', artistId: 'a6', year: 2022, cover: photo('rrr-telugu-movie') },
  { id: 'al5', title: 'Geetha Govindam', titleTe: 'గీత గోవిందం', artist: 'Gopi Sundar', artistId: 'a1', year: 2018, cover: photo('geetha-govindam') },
  { id: 'al6', title: 'Sarkaru Vaari Paata', titleTe: 'సర్కారు వారి పాట', artist: 'S. Thaman', artistId: 'a3', year: 2022, cover: photo('sarkaru-vaari-paata') },
  { id: 'al7', title: 'Uppena', titleTe: 'ఉప్పెన', artist: 'Devi Sri Prasad', artistId: 'a2', year: 2021, cover: photo('uppena-telugu') },
  { id: 'al8', title: 'Gang Leader', titleTe: 'గ్యాంగ్ లీడర్', artist: 'Anirudh Ravichander', artistId: 'a4', year: 2019, cover: photo('gang-leader-telugu') },
  { id: 'al9', title: 'Brahmastra', artist: 'Pritam', artistId: 'a10', year: 2022, cover: photo('brahmastra-kesariya') },
  { id: 'al10', title: 'Aashiqui 2', artist: 'Mithoon', artistId: 'a9', year: 2013, cover: photo('aashiqui-2-album') },
  { id: 'al11', title: 'Jawan', artist: 'Anirudh Ravichander', artistId: 'a4', year: 2023, cover: photo('jawan-chaleya') },
  { id: 'al12', title: 'Pathaan', artist: 'Vishal-Shekhar', artistId: 'a10', year: 2023, cover: photo('pathaan-besharam-rang') },
  { id: 'al13', title: 'Shershaah', artist: 'Tanishk Bagchi', artistId: 'a9', year: 2021, cover: photo('shershaah-raataan') },
  { id: 'al14', title: 'Bhediya', artist: 'Sachin-Jigar', artistId: 'a9', year: 2022, cover: photo('bhediya-apna-bana-le') },
  { id: 'al15', title: 'Kalank', artist: 'Pritam', artistId: 'a10', year: 2019, cover: photo('kalank-title-track') },
  { id: 'al16', title: 'Slumdog Millionaire', artist: 'A.R. Rahman', artistId: 'a11', year: 2008, cover: photo('slumdog-jai-ho') },
  { id: 'al17', title: 'Divide', artist: 'Ed Sheeran', artistId: 'a12', year: 2017, cover: photo('ed-sheeran-divide') },
  { id: 'al18', title: 'After Hours', artist: 'The Weeknd', artistId: 'a13', year: 2020, cover: photo('weeknd-after-hours-album') },
  { id: 'al19', title: 'Harry’s House', artist: 'Harry Styles', artistId: 'a16', year: 2022, cover: photo('harrys-house') },
  { id: 'al20', title: 'Midnights', artist: 'Taylor Swift', artistId: 'a14', year: 2022, cover: photo('taylor-midnights') },
  { id: 'al21', title: 'Future Nostalgia', artist: 'Dua Lipa', artistId: 'a15', year: 2020, cover: photo('dua-future-nostalgia') },
  { id: 'al22', title: 'Rocky Aur Rani Kii Prem Kahaani', artist: 'Pritam', artistId: 'a10', year: 2023, cover: photo('rocky-rani-jhumka') },
  { id: 'al23', title: 'Endless Summer Vacation', artist: 'Miley Cyrus', artistId: 'a15', year: 2023, cover: photo('miley-flowers') },
  { id: 'al24', title: 'Divinely Uninspired', artist: 'Lewis Capaldi', artistId: 'a12', year: 2019, cover: photo('lewis-capaldi-someone') },
  { id: 'al25', title: 'F*CK LOVE 3', artist: 'The Kid LAROI', artistId: 'a16', year: 2021, cover: photo('kid-laroi-stay') },
]

const preview = (path) => `https://audio-ssl.itunes.apple.com/itunes-assets/${path}`

function track({ id, title, titleTe, artist, artistId, albumId, duration, plays, audio, youtubeId, language = 'telugu' }) {
  const album = albums.find((item) => item.id === albumId)
  return {
    id,
    title,
    titleTe,
    artist,
    artistId,
    album: album?.title,
    albumTe: album?.titleTe,
    albumId,
    duration,
    plays,
    cover: album?.cover,
    audio,
    youtubeId,
    language,
  }
}

export const songs = [
  track({ id: 's1', title: 'Butta Bomma', titleTe: 'బుట్టబొమ్మ', artist: 'Armaan Malik, DSP', artistId: 'a2', albumId: 'al1', duration: 197, plays: 812331102, youtubeId: '2mDCVzruYzQ', audio: preview('AudioPreview211/v4/00/87/1c/00871cd6-9a64-717a-2072-d19c49f94682/mzaf_4402448724622500589.plus.aac.p.m4a') }),
  track({ id: 's2', title: 'Samajavaragamana', titleTe: 'సమజవరగమన', artist: 'Sid Sriram', artistId: 'a1', albumId: 'al1', duration: 229, plays: 690221441, youtubeId: 'Thf60JU8E98', audio: preview('AudioPreview221/v4/29/a7/55/29a75528-3808-d849-ad00-9e714bf12621/mzaf_2813549342968292058.plus.aac.p.m4a') }),
  track({ id: 's3', title: 'Ramuloo Ramulaa', titleTe: 'రాములూ రాములా', artist: 'Anurag Kulkarni, Mangli', artistId: 'a7', albumId: 'al1', duration: 241, plays: 388044120, youtubeId: 'wFAj0pW6xX0', audio: preview('AudioPreview221/v4/21/7b/7d/217b7d89-df73-12db-ca5f-2fee71f47dce/mzaf_2385408187580859158.plus.aac.p.m4a') }),
  track({ id: 's4', title: 'Srivalli', titleTe: 'శ్రీవల్లి', artist: 'Sid Sriram', artistId: 'a1', albumId: 'al2', duration: 221, plays: 912003441, youtubeId: '5IEbR79kBPY', audio: preview('AudioPreview211/v4/9b/4a/e3/9b4ae3a2-43ee-dd7b-0474-3b7e914513cf/mzaf_10743675123561433132.plus.aac.p.m4a') }),
  track({ id: 's5', title: 'Oo Antava Oo Oo Antava', titleTe: 'ఊ అంటావా ఊ ఊ అంటావా', artist: 'Indravathi Chauhan, DSP', artistId: 'a2', albumId: 'al2', duration: 227, plays: 701228190, youtubeId: 'u_wB6byrl5k', audio: preview('AudioPreview211/v4/59/5d/86/595d8694-c034-2040-9a11-2f117ed32ea4/mzaf_8961189800316643417.plus.aac.p.m4a') }),
  track({ id: 's6', title: 'Saami Saami', titleTe: 'సామి సామి', artist: 'Mounika Yadav', artistId: 'a2', albumId: 'al2', duration: 216, plays: 344882001, youtubeId: 'JJFVjxFmYlY', audio: preview('AudioPreview221/v4/e9/e7/ce/e9e7cec0-4073-3c70-8b26-cc03fcc1129d/mzaf_4901988606946752203.plus.aac.p.m4a') }),
  track({ id: 's7', title: 'Inthandham', titleTe: 'ఇంతంధం', artist: 'S.P. Charan', artistId: 'a1', albumId: 'al3', duration: 223, plays: 499022113, youtubeId: '9g2tgsYDUnE', audio: preview('AudioPreview211/v4/fa/c2/93/fac2934d-d9de-1e85-f999-22b5b0852771/mzaf_8467517637936464628.plus.aac.p.m4a') }),
  track({ id: 's8', title: 'Oh Sita Hey Rama', titleTe: 'ఓ సీత హే రామ', artist: 'SPB, Aaffrin', artistId: 'a1', albumId: 'al3', duration: 209, plays: 267044190, audio: preview('AudioPreview211/v4/10/69/c8/1069c8ba-41ba-1152-452f-0f63929eeb65/mzaf_10345644834486550801.plus.aac.p.m4a') }),
  track({ id: 's9', title: 'Kaanunna Kalyanam', titleTe: 'కానున్న కళ్యాణం', artist: 'Anurag Kulkarni, Sindhuri', artistId: 'a8', albumId: 'al3', duration: 256, plays: 181022881, audio: preview('AudioPreview211/v4/16/6d/a9/166da992-8cc4-102c-72dd-80e60933f817/mzaf_9866241091822004195.plus.aac.p.m4a') }),
  track({ id: 's10', title: 'Naatu Naatu', titleTe: 'నాటు నాటు', artist: 'Rahul Sipligunj, Kaala Bhairava', artistId: 'a6', albumId: 'al4', duration: 232, plays: 1288441002, youtubeId: '4_eEgJhsBMo', audio: preview('AudioPreview211/v4/8e/dd/a4/8edda474-3fe1-3fe6-43d3-765db520a29b/mzaf_11740310005222997767.plus.aac.p.m4a') }),
  track({ id: 's11', title: 'Dosti', titleTe: 'దోస్తీ', artist: 'Vedala Hemachandra', artistId: 'a6', albumId: 'al4', duration: 248, plays: 410339441, audio: preview('AudioPreview221/v4/7b/5f/ce/7b5fce98-6629-000d-b86c-ae7821f7123b/mzaf_18235421262980845641.plus.aac.p.m4a') }),
  track({ id: 's12', title: 'Komuram Bheemudo', titleTe: 'కోమురం భీముడో', artist: 'Kaala Bhairava', artistId: 'a6', albumId: 'al4', duration: 254, plays: 355002190, audio: preview('AudioPreview116/v4/6b/64/10/6b6410f8-3620-44af-8da7-378da8959bc3/mzaf_8455483532068537598.plus.aac.p.m4a') }),
  track({ id: 's13', title: 'Vachindamma', titleTe: 'వచ్చిందమ్మా', artist: 'Sid Sriram', artistId: 'a1', albumId: 'al5', duration: 268, plays: 254022910, audio: preview('AudioPreview221/v4/3b/a0/a1/3ba0a1ce-bf63-bbaf-48f6-48593c231168/mzaf_16000697806590920631.plus.aac.p.m4a') }),
  track({ id: 's14', title: 'Inkem Inkem Inkem Kaavaale', titleTe: 'ఇంకెం ఇంకెం ఇంకెం కావాలే', artist: 'Sid Sriram', artistId: 'a1', albumId: 'al5', duration: 245, plays: 633011882, youtubeId: 'cC8AmhPUJPA', audio: preview('AudioPreview221/v4/6d/5a/f1/6d5af141-475c-7404-495c-0ef55283457c/mzaf_3028662401385709025.plus.aac.p.m4a') }),
  track({ id: 's15', title: 'Yenti Yenti', titleTe: 'ఎంతి ఎంతి', artist: 'Chinmayi Sripada', artistId: 'a8', albumId: 'al5', duration: 221, plays: 128044112, audio: preview('AudioPreview221/v4/5e/ef/ff/5eefff68-e026-2b8e-5999-b6d01a9e3232/mzaf_15343903785544506669.plus.aac.p.m4a') }),
  track({ id: 's16', title: 'Kalaavathi', titleTe: 'కళావతి', artist: 'Sid Sriram', artistId: 'a1', albumId: 'al6', duration: 203, plays: 476441890, youtubeId: 'Vbu44JdN12s', audio: preview('AudioPreview116/v4/47/2f/a0/472fa0e8-5643-6461-0653-56b87aa67fab/mzaf_17345742665182397098.plus.aac.p.m4a') }),
  track({ id: 's17', title: 'Penny', titleTe: 'పెన్నీ', artist: 'Ram Miriyala', artistId: 'a3', albumId: 'al6', duration: 189, plays: 188220441, audio: preview('AudioPreview126/v4/e1/50/52/e1505211-c69f-9afe-9e72-1b76ee3b74f3/mzaf_10184225126399264243.plus.aac.p.m4a') }),
  track({ id: 's18', title: 'Kola Kalle Ilaa', titleTe: 'కోల కల్లే ఇలా', artist: 'Sid Sriram', artistId: 'a3', albumId: 'al6', duration: 227, plays: 199044120, audio: preview('AudioPreview116/v4/95/9b/c6/959bc67f-cafc-4767-40a0-8a920bc1a5bc/mzaf_4901214408636654483.plus.aac.p.m4a') }),
  track({ id: 's19', title: 'Nee Kannu Neeli Samudram', titleTe: 'నీ కన్ను నీలి సముద్రం', artist: 'Javed Ali', artistId: 'a5', albumId: 'al7', duration: 236, plays: 521003441, audio: preview('AudioPreview125/v4/12/85/34/12853461-4a89-0825-f8b9-f34a4244237d/mzaf_7933769262972519634.plus.aac.p.m4a') }),
  track({ id: 's20', title: 'Jala Jala Jalapaatham', titleTe: 'జల జల జలపాథం', artist: 'Shreya Ghoshal', artistId: 'a5', albumId: 'al7', duration: 211, plays: 187022910, youtubeId: 'dPYedgdQqNQ', audio: preview('AudioPreview211/v4/dd/7b/75/dd7b7576-bbd5-6c65-53dc-eca8393bee97/mzaf_17888079348530326831.plus.aac.p.m4a') }),
  track({ id: 's21', title: 'Dhak Dhak Dhak', titleTe: 'ధక్ ధక్ ధక్', artist: 'DSP', artistId: 'a2', albumId: 'al7', duration: 184, plays: 164011820, audio: preview('AudioPreview211/v4/46/e8/1a/46e81abe-5056-9c27-e326-b87baad1632a/mzaf_13938532032530540250.plus.aac.p.m4a') }),
  track({ id: 's22', title: 'Hoyna Hoyna', titleTe: 'హోయ్నా హోయ్నా', artist: 'Anirudh Ravichander', artistId: 'a4', albumId: 'al8', duration: 239, plays: 301339002, audio: preview('AudioPreview211/v4/ac/1e/4a/ac1e4a70-2e7b-60c3-4971-3cc09d38815b/mzaf_7284747758742989760.plus.aac.p.m4a') }),
  track({ id: 's23', title: 'Ninnu Chudagane', titleTe: 'నిన్ను చూడగానే', artist: 'Anirudh, Shakthisree', artistId: 'a4', albumId: 'al8', duration: 215, plays: 144002881, audio: preview('AudioPreview221/v4/a2/13/8b/a2138bea-9f7c-23e2-8d74-140952867409/mzaf_10967094827279783013.plus.aac.p.m4a') }),
  track({ id: 's24', title: 'Ra Ra', titleTe: 'రా రా', artist: 'Anirudh Ravichander', artistId: 'a4', albumId: 'al8', duration: 201, plays: 98044120, audio: preview('AudioPreview221/v4/b0/ab/4c/b0ab4ca5-1c20-ccf9-4aef-7f592b13c797/mzaf_5020249723363233215.plus.aac.p.m4a') }),
  track({ id: 's25', title: 'Kesariya', artist: 'Arijit Singh', artistId: 'a9', albumId: 'al9', duration: 268, plays: 980221441, language: 'hindi', audio: preview('AudioPreview211/v4/38/4c/5c/384c5c8f-3ff8-e457-b2f7-3158ce108649/mzaf_12389299033886433185.plus.aac.p.m4a') }),
  track({ id: 's26', title: 'Tum Hi Ho', artist: 'Arijit Singh', artistId: 'a9', albumId: 'al10', duration: 262, plays: 1200441902, language: 'hindi', audio: preview('AudioPreview211/v4/3a/8c/9b/3a8c9b0b-2def-750a-f615-1555bf941edf/mzaf_17229496441442805917.plus.aac.p.m4a') }),
  track({ id: 's27', title: 'Apna Bana Le', artist: 'Arijit Singh', artistId: 'a9', albumId: 'al14', duration: 261, plays: 710339441, language: 'hindi', audio: preview('AudioPreview211/v4/eb/27/61/eb2761c7-d606-0912-dff0-2dc6b69974bd/mzaf_2023722930851223219.plus.aac.p.m4a') }),
  track({ id: 's28', title: 'Chaleya', artist: 'Arijit Singh, Shilpa Rao', artistId: 'a9', albumId: 'al11', duration: 200, plays: 890221441, language: 'hindi', audio: preview('AudioPreview221/v4/55/fb/9c/55fb9c31-320a-5dba-0a3f-5e69552085a7/mzaf_13508224660474474886.plus.aac.p.m4a') }),
  track({ id: 's29', title: 'Besharam Rang', artist: 'Shilpa Rao, Vishal-Shekhar', artistId: 'a10', albumId: 'al12', duration: 258, plays: 64022910 + 400000000, language: 'hindi', audio: preview('AudioPreview211/v4/f8/d5/fb/f8d5fb8e-ea86-4d56-32d4-28912d4623b9/mzaf_7899315727013580274.plus.aac.p.m4a') }),
  track({ id: 's30', title: 'Raataan Lambiyan', artist: 'Jubin Nautiyal, Asees Kaur', artistId: 'a9', albumId: 'al13', duration: 230, plays: 801339002, language: 'hindi', audio: preview('AudioPreview221/v4/99/0c/38/990c381b-0530-8c0d-87a9-18b050b97f0a/mzaf_10418866714500530894.plus.aac.p.m4a') }),
  track({ id: 's31', title: 'What Jhumka', artist: 'Arijit Singh, Jonita Gandhi', artistId: 'a9', albumId: 'al22', duration: 213, plays: 388044120, language: 'hindi', audio: preview('AudioPreview221/v4/93/ba/25/93ba25e4-40f1-7a27-0045-382fbc9b5995/mzaf_14137462857523698264.plus.aac.p.m4a') }),
  track({ id: 's32', title: 'Kalank', artist: 'Arijit Singh', artistId: 'a10', albumId: 'al15', duration: 311, plays: 499022113, language: 'hindi', audio: preview('AudioPreview211/v4/c8/a2/09/c8a20920-52a8-9728-a305-9f12a85ae305/mzaf_8477813248295499776.plus.aac.p.m4a') }),
  track({ id: 's33', title: 'Jai Ho', artist: 'A.R. Rahman', artistId: 'a11', albumId: 'al16', duration: 312, plays: 910331102, language: 'hindi', audio: preview('AudioPreview211/v4/19/7e/2a/197e2a0a-f1ba-c2bd-cb7f-6e4ad84d20fa/mzaf_7441079560183401765.plus.aac.p.m4a') }),
  track({ id: 's34', title: 'Perfect', artist: 'Ed Sheeran', artistId: 'a12', albumId: 'al17', duration: 263, plays: 2800441902, language: 'english', youtubeId: '2Vv-BfVoq4g', audio: preview('AudioPreview221/v4/c7/ba/bc/c7babc66-f598-aaa6-bcf6-307281795817/mzaf_16337361235117168274.plus.aac.p.m4a') }),
  track({ id: 's35', title: 'Shape of You', artist: 'Ed Sheeran', artistId: 'a12', albumId: 'al17', duration: 233, plays: 3500221130, language: 'english', youtubeId: 'JGwWNGJdvx8', audio: preview('AudioPreview221/v4/44/c7/4f/44c74f0d-72dc-6143-d4d0-ba14d661ca0d/mzaf_9566898362556366703.plus.aac.p.m4a') }),
  track({ id: 's36', title: 'Blinding Lights', artist: 'The Weeknd', artistId: 'a13', albumId: 'al18', duration: 200, plays: 4103394410, language: 'english', youtubeId: '4NRXx6U8ABQ', audio: preview('AudioPreview211/v4/1d/44/0d/1d440dbc-9832-08e6-080d-aa1e1bacf40c/mzaf_3600642016947675074.plus.aac.p.m4a') }),
  track({ id: 's37', title: 'As It Was', artist: 'Harry Styles', artistId: 'a16', albumId: 'al19', duration: 167, plays: 2200441902, language: 'english', audio: preview('AudioPreview221/v4/67/10/16/67101606-3869-ca44-6c03-e13d6322cb51/mzaf_1135399237022217274.plus.aac.p.m4a') }),
  track({ id: 's38', title: 'Anti-Hero', artist: 'Taylor Swift', artistId: 'a14', albumId: 'al20', duration: 200, plays: 1900221130, language: 'english', audio: preview('AudioPreview211/v4/1d/56/2a/1d562a07-dc5f-a9c0-1f36-2051a8c14eb7/mzaf_7214829135431340590.plus.aac.p.m4a') }),
  track({ id: 's39', title: 'Levitating', artist: 'Dua Lipa', artistId: 'a15', albumId: 'al21', duration: 203, plays: 1801339002, language: 'english', audio: preview('AudioPreview211/v4/59/dc/4d/59dc4dda-93ff-8f1c-c536-f005f6ea6af5/mzaf_3066686759813252385.plus.aac.p.m4a') }),
  track({ id: 's40', title: 'Senorita', artist: 'Shawn Mendes, Camila Cabello', artistId: 'a15', albumId: 'al21', duration: 191, plays: 1600441120, language: 'english', youtubeId: 'Pkh8UtuejGw', audio: preview('AudioPreview211/v4/cf/06/d6/cf06d6fd-f7a0-2898-8363-67688df6c14f/mzaf_8234301186390421644.plus.aac.p.m4a') }),
  track({ id: 's41', title: 'Flowers', artist: 'Miley Cyrus', artistId: 'a15', albumId: 'al23', duration: 200, plays: 1500228810, language: 'english', youtubeId: 'G7KNmW9a75Y', audio: preview('AudioPreview221/v4/68/9e/f7/689ef7fe-14fe-a846-c87f-7d3b2d6344b1/mzaf_4167137058064023087.plus.aac.p.m4a') }),
  track({ id: 's42', title: 'Someone You Loved', artist: 'Lewis Capaldi', artistId: 'a12', albumId: 'al24', duration: 182, plays: 2103390021, language: 'english', audio: preview('AudioPreview221/v4/e5/c8/17/e5c817e2-7830-091f-8686-d6276d5beaeb/mzaf_5586826958480073790.plus.aac.p.m4a') }),
  track({ id: 's43', title: 'STAY', artist: 'The Kid LAROI, Justin Bieber', artistId: 'a16', albumId: 'al25', duration: 141, plays: 2400441902, language: 'english', audio: preview('AudioPreview211/v4/d7/4a/84/d74a84d5-9afa-761e-b632-baab55c2a23b/mzaf_11865500880477235553.plus.aac.p.m4a') }),
]

export const playlists = [
  {
    id: 'p1',
    title: 'Tollywood Hits',
    titleTe: 'తెలుగు హిట్స్',
    description: 'The Telugu superhits trending right now.',
    cover: photo('telugu-hits-playlist'),
    color: '#7f1d1d',
    owner: 'Spotify',
    songIds: ['s10', 's4', 's1', 's16', 's14', 's2', 's5', 's22'],
  },
  {
    id: 'p2',
    title: 'Telugu Melodies',
    titleTe: 'తెలుగు మెలోడీస్',
    description: 'Soft love songs and late-night Telugu melodies.',
    cover: photo('telugu-melodies-playlist'),
    color: '#1e3a5f',
    owner: 'Spotify',
    songIds: ['s2', 's7', 's14', 's19', 's13', 's15', 's8'],
  },
  {
    id: 'p3',
    title: 'Mass Dance',
    titleTe: 'మాస్ డాన్స్',
    description: 'Theatre-roaring beats you can dance to.',
    cover: photo('telugu-mass-dance'),
    color: '#7c2d12',
    owner: 'Spotify',
    songIds: ['s10', 's3', 's5', 's22', 's24', 's6', 's17'],
  },
  {
    id: 'p4',
    title: 'Romantic Telugu',
    titleTe: 'రొమాంటిక్ తెలుగు',
    description: 'A collection of Telugu love songs.',
    cover: photo('telugu-romantic-night'),
    color: '#4a044e',
    owner: 'Spotify',
    songIds: ['s7', 's14', 's16', 's15', 's9', 's20'],
  },
  {
    id: 'p5',
    title: 'Folk & Janapada',
    titleTe: 'జానపదం',
    description: 'Village folk and folk-mass mixes.',
    cover: photo('telugu-janapada'),
    color: '#365314',
    owner: 'Spotify',
    songIds: ['s10', 's3', 's12', 's6', 's17'],
  },
  {
    id: 'p6',
    title: 'Workout Mass',
    titleTe: 'వర్క్‌అవుట్ మాస్',
    description: 'High-energy Telugu tracks for the gym.',
    cover: photo('telugu-gym-mass'),
    color: '#111827',
    owner: 'Spotify',
    songIds: ['s10', 's22', 's5', 's24', 's3', 's21'],
  },
  {
    id: 'p7',
    title: 'Cinema Songs',
    titleTe: 'సినిమా సాంగ్స్',
    description: 'Picked from blockbuster movie albums.',
    cover: photo('telugu-cinema-songs'),
    color: '#1e1b4b',
    owner: 'Spotify',
    songIds: ['s1', 's4', 's10', 's7', 's16', 's19'],
  },
  {
    id: 'p8',
    title: 'Rainy Evening',
    titleTe: 'వర్షపు సాయంత్రం',
    description: 'Rain, coffee, and Telugu melody.',
    cover: photo('telugu-rain-melody'),
    color: '#164e63',
    owner: 'Spotify',
    songIds: ['s2', 's14', 's19', 's7', 's15', 's20', 's13'],
  },
  {
    id: 'p9',
    title: 'Bollywood Butter',
    description: 'The biggest Hindi hits from Arijit, Pritam, and more.',
    cover: photo('bollywood-butter-hits'),
    color: '#7f1d1d',
    owner: 'Spotify',
    songIds: ['s25', 's26', 's28', 's27', 's30', 's29', 's32', 's33'],
  },
  {
    id: 'p10',
    title: 'Hindi Romance',
    description: 'Soft Bollywood love songs for late nights.',
    cover: photo('bollywood-romance-night'),
    color: '#4a044e',
    owner: 'Spotify',
    songIds: ['s26', 's27', 's30', 's32', 's25'],
  },
  {
    id: 'p11',
    title: 'Hollywood Hits',
    description: 'English chart-toppers from Ed Sheeran, The Weeknd, and Taylor.',
    cover: photo('hollywood-hits-playlist'),
    color: '#1e3a8a',
    owner: 'Spotify',
    songIds: ['s36', 's34', 's35', 's37', 's38', 's39', 's41', 's43'],
  },
  {
    id: 'p12',
    title: 'English Pop',
    description: 'Global pop radio: Perfect, Flowers, Levitating, and more.',
    cover: photo('english-pop-radio'),
    color: '#0f766e',
    owner: 'Spotify',
    songIds: ['s34', 's39', 's40', 's41', 's42', 's43', 's37'],
  },
]

export const podcasts = [
  {
    id: 'pod1',
    title: 'Telugu Kathalu',
    titleTe: 'తెలుగు కథలు',
    creator: 'Katha Vahini',
    description: 'A new Telugu story every week.',
    cover: photo('telugu-stories-podcast'),
    duration: 2480,
    category: 'Stories',
    audio: audio(1),
  },
  {
    id: 'pod2',
    title: 'Cinema Talkies',
    titleTe: 'సినిమా టాకీస్',
    creator: 'Tollywood Daily',
    description: 'Tollywood news, reviews, and gossip.',
    cover: photo('telugu-cinema-talk'),
    duration: 1860,
    category: 'Cinema',
    audio: audio(2),
  },
  {
    id: 'pod3',
    title: 'Bhakti Sandhya',
    titleTe: 'భక్తి సంధ్య',
    creator: 'Annamayya Studio',
    description: 'Keerthanas, bhajans, and spiritual talk.',
    cover: photo('telugu-bhakti'),
    duration: 3120,
    category: 'Bhakti',
    audio: audio(3),
  },
  {
    id: 'pod4',
    title: 'Nenu Ready',
    titleTe: 'నేను రెడీ',
    creator: 'Fit Telugu',
    description: 'Fitness, food, and mindset in Telugu.',
    cover: photo('telugu-fitness'),
    duration: 1540,
    category: 'Health',
    audio: audio(4),
  },
  {
    id: 'pod5',
    title: 'Navvula Time',
    titleTe: 'నవ్వుల టైమ్',
    creator: 'Hyderabad Comedy Club',
    description: 'Stand-up, punch lines, and backstage.',
    cover: photo('telugu-comedy'),
    duration: 2700,
    category: 'Comedy',
    audio: audio(5),
  },
  {
    id: 'pod6',
    title: 'Palle Paata',
    titleTe: 'పల్లె పాట',
    creator: 'Janapada Radio',
    description: 'Village music and janapada stories.',
    cover: photo('telugu-village-radio'),
    duration: 1988,
    category: 'Folk',
    audio: audio(6),
  },
]

export const categories = [
  { id: 'c1', title: 'Telugu', titleTe: 'తెలుగు', color: '#dc148c', icon: 'Music' },
  { id: 'c2', title: 'Melody', titleTe: 'మెలోడీ', color: '#1e3264', icon: 'Heart' },
  { id: 'c3', title: 'Mass', titleTe: 'మాస్', color: '#e91429', icon: 'AudioLines' },
  { id: 'c4', title: 'Folk', titleTe: 'జానపదం', color: '#148a08', icon: 'Leaf' },
  { id: 'c5', title: 'Romantic', titleTe: 'రొమాంటిక్', color: '#8d67ab', icon: 'Sparkles' },
  { id: 'c6', title: 'Dance', titleTe: 'డాన్స్', color: '#d84000', icon: 'PartyPopper' },
  { id: 'c7', title: 'Cinema', titleTe: 'సినిమా', color: '#8400e7', icon: 'Disc3' },
  { id: 'c8', title: 'Bhakti', titleTe: 'భక్తి', color: '#ba5d07', icon: 'Sparkles' },
  { id: 'c9', title: 'Podcasts', titleTe: 'పాడ్‌కాస్ట్‌లు', color: '#006450', icon: 'Mic2' },
  { id: 'c10', title: 'New', titleTe: 'కొత్తవి', color: '#e8115b', icon: 'Radio' },
  { id: 'c11', title: 'Workout', titleTe: 'వర్క్‌అవుట్', color: '#777777', icon: 'Dumbbell' },
  { id: 'c12', title: 'Chill', titleTe: 'చిల్', color: '#477d95', icon: 'CloudRain' },
  { id: 'c13', title: 'Made For You', titleTe: 'మీ కోసం', color: '#503750', icon: 'Focus' },
  { id: 'c14', title: 'Live', titleTe: 'లైవ్', color: '#8c1932', icon: 'CalendarDays' },
  { id: 'c15', title: 'Item', titleTe: 'ఐటం', color: '#9f1239', icon: 'Headphones' },
  { id: 'c16', title: 'Party', titleTe: 'పార్టీ', color: '#537aa1', icon: 'Guitar' },
  { id: 'c17', title: 'Bollywood', color: '#e11d48', icon: 'Music' },
  { id: 'c18', title: 'Hindi', color: '#f59e0b', icon: 'Heart' },
  { id: 'c19', title: 'English', color: '#2563eb', icon: 'Headphones' },
  { id: 'c20', title: 'Pop', color: '#7c3aed', icon: 'PartyPopper' },
]

export const recentlyPlayedIds = ['s10', 's25', 's1', 's34', 's4', 's36']
export const featuredPlaylistId = 'p1'

export function getSong(id) {
  return songs.find((song) => song.id === id)
}

export function getSongsByIds(ids) {
  return ids.map(getSong).filter(Boolean)
}

export function getPlaylist(id) {
  return playlists.find((playlist) => playlist.id === id)
}

export function getArtist(id) {
  return artists.find((artist) => artist.id === id)
}

export function getAlbum(id) {
  return albums.find((album) => album.id === id)
}

export function songsByArtist(artistId) {
  return songs.filter((song) => song.artistId === artistId).sort((a, b) => b.plays - a.plays)
}

export function albumsByArtist(artistId) {
  const fromSongs = [...new Set(songs.filter((song) => song.artistId === artistId).map((song) => song.albumId))]
  const owned = albums.filter((album) => album.artistId === artistId || fromSongs.includes(album.id))
  return owned
}

export function albumTracks(albumId) {
  return songs.filter((song) => song.albumId === albumId)
}

function haystack(item) {
  return [
    item.title,
    item.titleTe,
    item.artist,
    item.artistTe,
    item.name,
    item.nameTe,
    item.album,
    item.albumTe,
    item.description,
    item.creator,
    item.category,
    item.language,
    ...(item.genres || []),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

export function searchCatalog(query) {
  const q = query.trim().toLowerCase()
  if (!q) {
    return { songs: [], artists: [], albums: [], playlists: [], podcasts: [] }
  }

  if (['song', 'songs', 'పాట', 'పాటలు'].includes(q)) {
    return { songs, artists: [], albums: [], playlists: [], podcasts: [] }
  }
  if (['album', 'albums', 'ఆల్బమ్', 'ఆల్బమ్‌లు'].includes(q)) {
    return { songs: [], artists: [], albums, playlists: [], podcasts: [] }
  }
  if (['artist', 'artists', 'కళాకారులు', 'సింగర్'].includes(q)) {
    return { songs: [], artists, albums: [], playlists: [], podcasts: [] }
  }
  if (['playlist', 'playlists', 'ప్లేజాబితా'].includes(q)) {
    return { songs: [], artists: [], albums: [], playlists, podcasts: [] }
  }
  if (['podcast', 'podcasts', 'పాడ్కాస్ట్', 'పాడ్‌కాస్ట్‌లు'].includes(q)) {
    return { songs: [], artists: [], albums: [], playlists: [], podcasts }
  }
  if (['telugu', 'తెలుగు', 'tollywood'].includes(q)) {
    const teluguSongs = songs.filter((item) => item.language === 'telugu')
    return {
      songs: teluguSongs,
      artists: artists.filter((item) => item.genres.includes('Telugu')),
      albums: albums.filter((item) => teluguSongs.some((song) => song.albumId === item.id)),
      playlists: playlists.filter((item) => ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'].includes(item.id)),
      podcasts,
    }
  }
  if (['hindi', 'bollywood', 'bolywood'].includes(q)) {
    const hindiSongs = songs.filter((item) => item.language === 'hindi')
    return {
      songs: hindiSongs,
      artists: artists.filter((item) => item.genres.includes('Bollywood') || item.genres.includes('Hindi')),
      albums: albums.filter((item) => hindiSongs.some((song) => song.albumId === item.id)),
      playlists: playlists.filter((item) => ['p9', 'p10'].includes(item.id)),
      podcasts: [],
    }
  }
  if (['english', 'hollywood', 'holiwood', 'pop'].includes(q)) {
    const englishSongs = songs.filter((item) => item.language === 'english')
    return {
      songs: englishSongs,
      artists: artists.filter((item) => item.genres.includes('English') || item.genres.includes('Pop')),
      albums: albums.filter((item) => englishSongs.some((song) => song.albumId === item.id)),
      playlists: playlists.filter((item) => ['p11', 'p12'].includes(item.id)),
      podcasts: [],
    }
  }
  if (['music', 'సంగీతం', 'cinema', 'సినిమా', 'new', 'కొత్తవి', 'made for you', 'మీ కోసం', 'live', 'లైవ్'].includes(q)) {
    return { songs, artists, albums, playlists, podcasts }
  }

  const textMatch = {
    songs: songs.filter((item) => haystack(item).includes(q)),
    artists: artists.filter((item) => haystack(item).includes(q)),
    albums: albums.filter((item) => haystack(item).includes(q)),
    playlists: playlists.filter((item) => haystack(item).includes(q)),
    podcasts: podcasts.filter((item) => haystack(item).includes(q)),
  }

  const genreArtists = artists.filter((item) =>
    item.genres.some((genre) => genre.toLowerCase().includes(q) || q.includes(genre.toLowerCase())),
  )
  if (genreArtists.length && !['sid', 'thaman', 'dsp'].some((name) => q.includes(name))) {
    const artistIds = new Set(genreArtists.map((item) => item.id))
    return {
      songs: songs.filter((item) => artistIds.has(item.artistId)),
      artists: genreArtists,
      albums: albums.filter((item) => songs.some((song) => song.albumId === item.id && artistIds.has(song.artistId))),
      playlists: textMatch.playlists.length ? textMatch.playlists : playlists.filter((item) => haystack(item).includes(q)),
      podcasts: textMatch.podcasts,
    }
  }

  const moods = {
    melody: ['p2', 'p4', 'p8'],
    మెలోడీ: ['p2', 'p4', 'p8'],
    romantic: ['p4', 'p2'],
    రొమాంటిక్: ['p4', 'p2'],
    mass: ['p3', 'p6', 'p1'],
    మాస్: ['p3', 'p6', 'p1'],
    folk: ['p5'],
    జానపదం: ['p5'],
    dance: ['p3', 'p6'],
    డాన్స్: ['p3', 'p6'],
    workout: ['p6'],
    వర్క్అవుట్: ['p6'],
    chill: ['p8', 'p2'],
    చిల్: ['p8', 'p2'],
    party: ['p3', 'p1'],
    పార్టీ: ['p3', 'p1'],
    hits: ['p1', 'p7', 'p9', 'p11'],
    bollywood: ['p9', 'p10'],
    hindi: ['p9', 'p10'],
    hollywood: ['p11', 'p12'],
    english: ['p11', 'p12'],
    pop: ['p11', 'p12'],
    item: ['p3', 'p5'],
    ఐటం: ['p3', 'p5'],
    bhakti: [],
    భక్తి: [],
  }

  const moodIds = moods[q]
  if (moodIds) {
    if (q.includes('bhakti') || q.includes('భక్తి')) {
      return { songs: [], artists: [], albums: [], playlists: [], podcasts: podcasts.filter((item) => item.category === 'Bhakti') }
    }
    const lists = playlists.filter((item) => moodIds.includes(item.id))
    const trackIds = [...new Set(lists.flatMap((item) => item.songIds))]
    const moodSongs = getSongsByIds(trackIds)
    return {
      songs: moodSongs,
      artists: artists.filter((item) => moodSongs.some((song) => song.artistId === item.id)),
      albums: albums.filter((item) => moodSongs.some((song) => song.albumId === item.id)),
      playlists: lists,
      podcasts: [],
    }
  }

  return textMatch
}

export function podcastToTrack(podcast) {
  return {
    id: podcast.id,
    title: podcast.title,
    titleTe: podcast.titleTe,
    artist: podcast.creator,
    artistId: null,
    album: 'Podcast',
    albumId: null,
    duration: podcast.duration,
    plays: 0,
    cover: podcast.cover,
    audio: podcast.audio,
    type: 'podcast',
  }
}
