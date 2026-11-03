
// ================================================================
// LIFECONNECT — Main Application Script
// "Reconnect with your past. Live meaningfully today."
// ================================================================

// ----------------------------------------------------------------
// 1. API ARCHITECTURE (ready for Python backend integration)
// ----------------------------------------------------------------
const API_BASE_URL = '/api';

/**
 * Centralized API request function.
 * Replace mock implementations below with real fetch calls when backend is ready.
 */
async function apiRequest(endpoint, method = 'GET', body = null) {
  const opts = {
    method,
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  if (body) opts.body = JSON.stringify(body);
  // TODO: Replace with real fetch call
  // const res = await fetch(API_BASE_URL + endpoint, opts);
  // return res.json();
  return Promise.resolve({ mock: true });
}

// Auth API stubs (replace with real calls when backend is ready)
async function loginUser(email, password) {
  // TODO: return fetch(API_BASE_URL + '/auth/login', { method:'POST', body:... })
  return mockLogin(email, password);
}

async function signupUser(data) {
  // TODO: return fetch(API_BASE_URL + '/auth/signup', { method:'POST', body:... })
  return mockSignup(data);
}

async function getProfile() {
  // TODO: return fetch(API_BASE_URL + '/profile')
  return getStoredUser();
}

async function getMemories() {
  // TODO: return fetch(API_BASE_URL + '/memories')
  return getStoredMemories();
}

async function saveMemory(data) {
  // TODO: return fetch(API_BASE_URL + '/memories', { method:'POST', body:... })
  return saveStoredMemory(data);
}

async function getFriends() {
  // TODO: return fetch(API_BASE_URL + '/friends')
  return MOCK_DATA.friends;
}

async function getCommunities() {
  // TODO: return fetch(API_BASE_URL + '/communities')
  return MOCK_DATA.communities;
}

// ----------------------------------------------------------------
// 2. LOCAL STORAGE KEYS
// ----------------------------------------------------------------
const LS = {
  USER:        'lifeconnect_user',
  SESSION:     'lifeconnect_session',
  PREFS:       'lifeconnect_preferences',
  MEMORIES:    'lifeconnect_memories',
  EASY_MODE:   'lifeconnect_easy_mode',
  COMMUNITIES: 'lifeconnect_communities',
  AVATAR:      'lifeconnect_avatar',
};

// ----------------------------------------------------------------
// 3. DEMO CREDENTIALS
// ----------------------------------------------------------------
const DEMO_EMAIL    = 'demo@lifeconnect.local';
const DEMO_PASSWORD = 'Demo123!';

const DEMO_USER = {
  name:      'Rajesh Sharma',
  firstName: 'Rajesh',
  email:     DEMO_EMAIL,
  mobile:    '9876543210',
  age:       65,
  city:      'Chandigarh',
  interests: ['Old Friends', 'Music', 'Movies', 'Family', 'Wellness'],
  decade:    '1970s',
  avatar:    'R',
};

// ----------------------------------------------------------------
// 4. MOCK DATA
// ----------------------------------------------------------------
const MOCK_DATA = {
  friends: [
    { id:1, name:'Rajiv Kumar Sharma', initials:'R', school:'DAV College', batch:'1978', city:'Chandigarh', profession:'Retired Engineer', common:'Same school batch of 1978', status:'connected' },
    { id:2, name:'Sunita Malhotra', initials:'S', school:'Government Girls College', batch:'1979', city:'Delhi', profession:'Retired Teacher', common:'Same city, same era', status:'pending' },
    { id:3, name:'Harinder Singh Gill', initials:'H', school:'Punjab University', batch:'1977', city:'Amritsar', profession:'Retired Doctor', common:'Mutual friend: Rajiv Sharma', status:'none' },
    { id:4, name:'Meena Kapoor', initials:'M', school:'Loreto Convent School', batch:'1980', city:'Shimla', profession:'Writer', common:'Book lovers group', status:'none' },
    { id:5, name:'Vikram Nath Joshi', initials:'V', school:'IIT Roorkee', batch:'1976', city:'Dehradun', profession:'Retired Professor', common:'Same college era', status:'connected' },
    { id:6, name:'Kamla Devi Verma', initials:'K', school:'BHU Varanasi', batch:'1975', city:'Varanasi', profession:'Classical Musician', common:'Music lovers community', status:'pending' },
    { id:7, name:'Arvind Chandra Gupta', initials:'A', school:'Allahabad University', batch:'1973', city:'Prayagraj', profession:'Retired Banker', common:'Same hometown era', status:'none' },
    { id:8, name:'Padma Subramaniam', initials:'P', school:'Stella Maris College', batch:'1974', city:'Chennai', profession:'Retired Nurse', common:'Wellness community', status:'none' },
  ],
  communities: [
    { id:1, name:'1970s School Alumni', emoji:'🏫', category:'Alumni', members:2431, active:'Very Active', meetup:'Monthly online', desc:'Connect with schoolmates from the golden decade of the 1970s.', joined:true },
    { id:2, name:'Lata Mangeshkar Fans', emoji:'🎵', category:'Music', members:8923, active:'Very Active', meetup:'Weekly discussions', desc:'Celebrate the timeless music of the nightingale of India.', joined:true },
    { id:3, name:'Old Bollywood Lovers', emoji:'🎬', category:'Movies', members:5621, active:'Active', meetup:'Fortnightly watch party', desc:'Rediscover the golden era of Hindi cinema from the 60s, 70s and 80s.', joined:false },
    { id:4, name:'Morning Yoga & Walking', emoji:'🧘', category:'Wellness', members:3218, active:'Very Active', meetup:'Daily 6 AM', desc:'Start your day right with a supportive community of walkers and yogis.', joined:false },
    { id:5, name:'Cricket Memories', emoji:'🏏', category:'Sports', members:6754, active:'Active', meetup:'Match days', desc:'Relive the golden era of Indian cricket with fellow fans.', joined:false },
    { id:6, name:'Classic Book Lovers', emoji:'📚', category:'Books', members:2109, active:'Active', meetup:'Monthly book club', desc:'Discuss the books that shaped generations — Premchand, Tagore, Gulzar and more.', joined:false },
    { id:7, name:'Punjabi Heritage Group', emoji:'🌾', category:'Regional', members:4320, active:'Active', meetup:'Cultural events', desc:'Celebrate Punjabi culture, food, language and community.', joined:false },
    { id:8, name:'Doordarshan Memories', emoji:'📺', category:'Nostalgia', members:7891, active:'Very Active', meetup:'Sundays', desc:'Remember Ramayan, Mahabharat, Chitrahaar and all those memorable shows.', joined:false },
  ],
  memories: [
    { year:1965, title:'First Day at School', content:'I still remember the smell of new notebooks and the nervousness of that first day at DAV School, Chandigarh. My mother had packed laddoos in my tiffin.', type:'story', emoji:'📚' },
    { year:1970, title:'College Days', content:'The best years of my life at Punjab University. The canteen, the debates, the friendships formed in the hostels.', type:'story', emoji:'🎓' },
    { year:1975, title:'First Job in Delhi', content:'Got my first government job posting. Arrived in Delhi with one suitcase and a heart full of dreams.', type:'story', emoji:'💼' },
    { year:1980, title:'Marriage', content:'The most beautiful day of my life. Family gathered from across Punjab and Haryana. The shehnai, the marigolds, the celebration.', type:'story', emoji:'💑' },
    { year:1984, title:'First Child — Rohit', content:'Became a parent. Held the baby and understood what love truly means.', type:'story', emoji:'👶' },
    { year:1988, title:'Family Trip to Shimla', content:'Our first proper family holiday. The children saw snow for the first time. Priya\'s expression when snowflakes fell on her nose.', type:'story', emoji:'⛄' },
    { year:1992, title:'New Home', content:'Built our own house after years of saving. Every brick has a memory in it.', type:'story', emoji:'🏡' },
    { year:1998, title:'Daughter\'s School Result', content:'Priya scored 95% in board exams. The entire neighbourhood celebrated with us.', type:'story', emoji:'🌟' },
  ],
  timeMachine: {
    1965: {
      songs:    ['Aaj Phir Jeene Ki Tamanna Hai — Lata', 'Mere Sanam — Asha Bhosle', 'Teri Aankhon Ke Siva — Mohd Rafi', 'Phoolon Ka Taron Ka — Lata'],
      movies:   ['Guide', 'Waqt', 'Himalaya Ki God Mein', 'Dosti'],
      cricket:  ['India vs Pakistan Test Series', 'Tiger Pataudi leading India', 'Nawab of Pataudi era', 'Test cricket golden age'],
      events:   ['India-Pakistan War 1965', 'First Indian satellite plans', 'Green Revolution begins', 'IIT system established'],
      radio:    ['Binaca Geetmala on Radio Ceylon', 'Vividh Bharati launches', 'Radio Ceylon golden era', 'Ameen Sayani hosts'],
      magazines:['Dharmayug', 'Illustrated Weekly of India', 'Filmfare', 'Nandan for children'],
    },
    1970: {
      songs:    ['Mere Naina Sawan Bhado — Kishore Kumar', 'Chhoti Si Baat — Amol Palekar', 'Dum Maro Dum — Asha', 'Yeh Jo Hai Zindagi — Kishore'],
      movies:   ['Hare Rama Hare Krishna', 'Haathi Mere Saathi', 'Anand', 'Jawani Diwani'],
      cricket:  ['Sunil Gavaskar debuts', 'India vs West Indies tours', 'Farokh Engineer wicketkeeping', 'Bishan Bedi spinning magic'],
      events:   ['Bangladesh Liberation 1971', 'Indira Gandhi wins election', 'India-Soviet Treaty', 'First Green Revolution results'],
      radio:    ['Vividh Bharati popular shows', 'Jai Mala show', 'Hawa Mahal drama', 'Chitralok film music'],
      magazines:['Sarika', 'Kadambini', 'Champak launched', 'Bal Bharati'],
    },
    1975: {
      songs:    ['Dil Apna Aur Preet Parai', 'Ek Ajnabee Haseena Se — Kishore', 'Aana Jaana Laga Rahega — Rafi', 'Kabhie Kabhie — Lata'],
      movies:   ['Sholay', 'Deewar', 'Jai Santoshi Maa', 'Chupke Chupke'],
      cricket:  ['Clive Lloyd\'s West Indies domination', 'India struggling in tests', 'Farokh Engineer\'s last years', 'First World Cup — West Indies win'],
      events:   ['Emergency declared 1975', 'Indira Gandhi\'s government', 'Kisan movement', 'Railway strike'],
      radio:    ['Binaca Geetmala — Ameen Sayani', 'Military band programmes', 'Sangeeth Sarita', 'Youth programmes'],
      magazines:['Parag for youth', 'Suman Saurabh', 'Navneet', 'Sarika literature'],
    },
    1980: {
      songs:    ['Dard-E-Dil — Kishore Kumar', 'Pyaar Karne Waale — Lata', 'Hungama Ho Gaya — Kishore', 'Dekha Ek Khwaab — Lata & Kishore'],
      movies:   ['Karz', 'Kranti', 'Qurbani', 'Dostana'],
      cricket:  ['Kapil Dev\'s rise', 'Sunil Gavaskar\'s 10000 runs', 'India tours England', 'Young Mohinder Amarnath'],
      events:   ['Indira Gandhi returns to power', 'Olympic boycott', 'Punjab unrest begins', 'India\'s first satellite Rohini'],
      tv:       ['Doordarshan begins colour', 'Hum Log serial begins', 'Buniyaad serial', 'Doordarshan'],
      magazines:['Indrajaal Comics', 'Chandamama', 'Nandan', 'Bal Bharati'],
    },
    1985: {
      songs:    ['Tujhse Naraaz Nahin — Lata & Anup', 'Saat Samundar Paar — Kumar Sanu', 'Jaadu Teri Nazar — Udit Narayan', 'Pehla Nasha — Udit & Sadhna'],
      movies:   ['Ram Teri Ganga Maili', 'Tezaab', 'Arjun', 'Mard'],
      cricket:  ['India wins 1983 World Cup legacy', 'Kapil Dev\'s bowling records', 'Gavaskar\'s centuries', 'Mohinder Amarnath\'s heroics'],
      events:   ['Rajiv Gandhi becomes PM', 'Bhopal gas tragedy aftermath', 'Computerisation begins', 'BSNL telephone expansion'],
      tv:       ['Ramayan serials begin', 'Chitrahaar Wednesday & Friday', 'Hum Log final episodes', 'Quiz programmes'],
      magazines:['Reader\'s Digest Hindi', 'Grihshobha', 'Sarita', 'Manohar Kahaniyan'],
    },
    1990: {
      songs:    ['Dil Hai Ke Manta Nahin', 'Pehla Nasha', 'Mere Rang Mein', 'Tip Tip Barsa Pani'],
      movies:   ['Dil', 'Qayamat Se Qayamat Tak legacy', 'Dil Hai Ke Manta Nahin', 'Sadak'],
      cricket:  ['Sachin Tendulkar\'s early years', 'Azharuddin captaincy', 'India in World Cup', 'Wills Cup cricket'],
      events:   ['Economic reforms 1991', 'Mandal Commission agitation', 'Gulf War effects', 'Satellite TV arrives in India'],
      tv:       ['Star TV launches in India', 'Mahabharat on DD', 'Shri Krishna serial', 'MTV India begins'],
      magazines:['Outlook magazine', 'India Today', 'Femina', 'Filmfare awards era'],
    },
    1995: {
      songs:    ['Chura Ke Dil Mera', 'Kuch Kuch Hota Hai coming', 'Tu Cheez Badi Hai', 'Maahi Ve — AR Rahman'],
      movies:   ['Dilwale Dulhania Le Jayenge', 'Rangeela', 'Bombay', 'Karan Arjun'],
      cricket:  ['Sachin\'s golden era', 'India vs Sri Lanka matches', 'Vinod Kambli era', 'World Cup 1996 preparations'],
      events:   ['Internet arrives in India 1995', 'Mobile phones begin', 'Economic liberalisation results', 'IT industry growth begins'],
      tv:       ['Zee TV established', 'KBC precursor shows', 'Sangeeth Mala', 'Film-based programmes'],
      magazines:['Internet magazines begin', 'Business Today', 'India Today international', 'Sportstar'],
    },
    2000: {
      songs:    ['Kaho Naa Pyaar Hai', 'Lagaan music', 'Dil Chahta Hai soundtrack', 'Mohabbatein songs'],
      movies:   ['Lagaan', 'Dil Chahta Hai', 'Kabhi Khushi Kabhie Gham', 'Devdas'],
      cricket:  ['India wins 2000s series', 'Sachin vs Sehwag opening', 'Harbhajan\'s hat trick', 'Dravid\'s wall era'],
      events:   ['IT boom and bust', 'Mobile revolution', 'KBC with Amitabh Bachchan', 'Commonwealth Games preparation'],
      tv:       ['KBC — Kaun Banega Crorepati', 'Indian Idol begin years', 'Reality TV arrives', 'News channels multiply'],
      magazines:['Digital magazines begin', 'Technology focus journals', 'Health magazines boom', 'Celebrity magazines'],
    },
  },
  legalTopics: [
    { id:'pension', label:'Pension Forms', icon:'💰' },
    { id:'bank',    label:'Bank Documents', icon:'🏦' },
    { id:'govt',    label:'Government Schemes', icon:'🏛️' },
    { id:'insurance', label:'Insurance', icon:'🛡️' },
    { id:'property', label:'Property Papers', icon:'🏠' },
    { id:'tax',     label:'Income Tax', icon:'📋' },
  ],
  legalResponses: {
    pension: {
      question: 'What is this pension form asking me?',
      steps: [
        { n:1, title:'Your Personal Information', desc:'Section A asks for your full name as per service records, date of birth, and personal identification number.' },
        { n:2, title:'Your Service Details', desc:'Section B asks for your department, designation at retirement, date of joining, and date of retirement.' },
        { n:3, title:'Bank Information', desc:'Section C needs your bank account number and IFSC code where the pension will be credited each month.' },
        { n:4, title:'Documents You May Need', desc:'Life certificate (required yearly), service book, retirement order, identity proof (Aadhaar), and two passport photos.' },
      ],
    },
    bank: {
      question: 'Can you explain this bank form?',
      steps: [
        { n:1, title:'Account Holder Details', desc:'Your name, address, and mobile number linked to your account. These must match your Aadhaar.' },
        { n:2, title:'Service Request', desc:'The specific service you are requesting — nomination update, KYC update, or signature change.' },
        { n:3, title:'Declaration', desc:'By signing, you confirm the information is correct. Read each point carefully before signing.' },
        { n:4, title:'Documents to Attach', desc:'Self-attested copy of Aadhaar and PAN card. Recent passport-size photograph.' },
      ],
    },
    govt: {
      question: 'What is this government scheme about?',
      steps: [
        { n:1, title:'Who Can Apply', desc:'Citizens above 60 years of age with no other government pension income below the threshold amount.' },
        { n:2, title:'What You Receive', desc:'Monthly financial support credited directly to your bank account. Amount varies by state scheme.' },
        { n:3, title:'How to Apply', desc:'Visit your nearest Common Service Centre (CSC) with documents, or apply online at the scheme portal.' },
        { n:4, title:'Documents Required', desc:'Age proof (Aadhaar), income certificate from tehsildar, bank passbook, and residence proof.' },
      ],
    },
    insurance: {
      question: 'Can you explain my insurance policy?',
      steps: [
        { n:1, title:'Policy Basics', desc:'Your policy number, start date, and end date. The insured amount you or your family will receive.' },
        { n:2, title:'Premium Details', desc:'How much you pay and when — monthly, quarterly, or annually. Grace period if you miss a payment.' },
        { n:3, title:'What is Covered', desc:'The specific situations where the insurance will pay — hospitalisation, accident, or life cover.' },
        { n:4, title:'How to Make a Claim', desc:'Contact the insurance company by phone or app, fill the claim form, and attach hospital bills and identity proof.' },
      ],
    },
    property: {
      question: 'Can you help me understand this property document?',
      steps: [
        { n:1, title:'Property Details', desc:'Survey number, plot area, location, and address as registered with local authority.' },
        { n:2, title:'Owner Information', desc:'Current registered owner name and any co-owners. Check if your name is correctly spelled.' },
        { n:3, title:'Encumbrances', desc:'Any loans or legal claims against the property. This must be clear before any sale or transfer.' },
        { n:4, title:'Important Advice', desc:'For any property transaction, always consult a registered lawyer. This explanation is for understanding only.' },
      ],
    },
    tax: {
      question: 'Can you explain my Income Tax form?',
      steps: [
        { n:1, title:'Personal Details Section', desc:'Your name, PAN number, date of birth, and contact information. These must exactly match your PAN card.' },
        { n:2, title:'Income Details', desc:'All sources of income — pension, bank interest, rent, or any business income. Senior citizens have special provisions.' },
        { n:3, title:'Deductions Available', desc:'Senior citizens can claim higher standard deduction, medical insurance deduction, and other benefits. Check Section 80D.' },
        { n:4, title:'Verification', desc:'Sign the form digitally using Aadhaar OTP, or physically sign and mail to the Income Tax Department.' },
      ],
    },
  },
  wellnessActivities: [
    { id:1, icon:'🧘', title:'Morning Yoga', duration:'10 minutes', desc:'Gentle stretches to start your day with energy.', completed:false },
    { id:2, icon:'🧠', title:'Memory Game', duration:'5 minutes', desc:'Keep your mind sharp with today\'s puzzle.', completed:false },
    { id:3, icon:'🚶', title:'Morning Walk', duration:'20 minutes', desc:'A refreshing community walk — even indoors counts.', completed:false },
    { id:4, icon:'💨', title:'Deep Breathing', duration:'5 minutes', desc:'4-7-8 breathing to calm your mind and body.', completed:false },
    { id:5, icon:'📖', title:'Read Something', duration:'15 minutes', desc:'A poem, a story, or a chapter of your favourite book.', completed:false },
    { id:6, icon:'🤲', title:'Light Stretching', duration:'8 minutes', desc:'Gentle neck, shoulder, and hand stretches.', completed:false },
    { id:7, icon:'🎵', title:'Listen to Favourite Music', duration:'15 minutes', desc:'A familiar song can lift the spirit beautifully.', completed:false },
    { id:8, icon:'📝', title:'Write One Memory', duration:'10 minutes', desc:'Write one beautiful memory in your life vault today.', completed:false },
    { id:9, icon:'📞', title:'Call a Friend or Family', duration:'Any', desc:'Connection is the best wellness activity of all.', completed:false },
  ],
  nostalgiaLibrary: {
    songs: [
      { title:'Laga Chunari Mein Daag', artist:'Lata Mangeshkar', year:'1963', emoji:'🎵' },
      { title:'Roop Tera Mastana', artist:'Kishore Kumar', year:'1969', emoji:'🎵' },
      { title:'Aaj Phir Jeene Ki', artist:'Lata Mangeshkar', year:'1965', emoji:'🎵' },
      { title:'Mere Naina Sawan Bhado', artist:'Kishore Kumar', year:'1974', emoji:'🎵' },
      { title:'Kabhi Kabhi Mere Dil Mein', artist:'Lata Mangeshkar', year:'1976', emoji:'🎵' },
      { title:'O Saathi Re', artist:'Kishore Kumar', year:'1978', emoji:'🎵' },
      { title:'Pardah Hai Pardah', artist:'Mohd Rafi', year:'1977', emoji:'🎵' },
      { title:'Chura Liya Hai Tumne', artist:'Asha Bhosle & Rafi', year:'1973', emoji:'🎵' },
    ],
    movies: [
      { title:'Sholay', year:'1975', emoji:'🎬' },
      { title:'Deewar', year:'1975', emoji:'🎬' },
      { title:'Guide', year:'1965', emoji:'🎬' },
      { title:'Anand', year:'1971', emoji:'🎬' },
      { title:'Mughal-E-Azam', year:'1960', emoji:'🎬' },
      { title:'Pakeezah', year:'1972', emoji:'🎬' },
    ],
    magazines: [
      { title:'Nandan', desc:'Beloved children\'s magazine', emoji:'📕' },
      { title:'Champak', desc:'Stories, puzzles and wisdom', emoji:'📗' },
      { title:'Dharmayug', desc:'Literary and cultural weekly', emoji:'📘' },
      { title:'Sarika', desc:'Short stories and literature', emoji:'📙' },
      { title:'Bal Bharati', desc:'School children\'s magazine', emoji:'📓' },
      { title:'Chandamama', desc:'Classic children\'s stories', emoji:'📔' },
    ],
    radio: [
      { title:'Binaca Geetmala', desc:'Ameen Sayani\'s iconic countdown show', emoji:'📻' },
      { title:'Hawa Mahal', desc:'Hindi drama on All India Radio', emoji:'📻' },
      { title:'Vividh Bharati', desc:'India\'s premier entertainment radio', emoji:'📻' },
      { title:'Jaimala', desc:'Military dedication programme', emoji:'📻' },
    ],
  },
  familyBridgeCards: [
    {
      parentName: 'Papa',
      story: '"I was telling you about the time I first rode a bicycle in 1972..."',
      prompt: 'Ask him about it tonight — he would love to share the whole story.',
      actions: ['Listen', 'Ask About It', 'Save Story'],
    },
    {
      parentName: 'Maa',
      story: '"Your mother saved a beautiful memory about her college days in Varanasi..."',
      prompt: 'She mentioned her favourite professor and the Ganga ghat walks.',
      actions: ['Listen', 'Read Memory', 'Share'],
    },
    {
      parentName: 'Dada Ji',
      story: '"Grandfather shared the story of Partition — how the family crossed the border in 1947..."',
      prompt: 'This is a precious piece of family history. Listen and preserve it.',
      actions: ['Listen', 'Record Story', 'Save for Family'],
    },
  ],
};

// ----------------------------------------------------------------
// 5. LOCAL STORAGE HELPERS
// ----------------------------------------------------------------
function getStoredUser()     { return JSON.parse(localStorage.getItem(LS.USER) || 'null'); }
function getStoredSession()  { return localStorage.getItem(LS.SESSION); }
function getStoredMemories() { return JSON.parse(localStorage.getItem(LS.MEMORIES) || 'null'); }
function getEasyMode()       { return localStorage.getItem(LS.EASY_MODE) === 'true'; }
function getJoinedComms()    { return JSON.parse(localStorage.getItem(LS.COMMUNITIES) || '[]'); }
function getAvatar()         { return localStorage.getItem(LS.AVATAR) || null; }

function saveStoredMemory(mem) {
  const mems = getStoredMemories() || [...MOCK_DATA.memories];
  mems.push(mem);
  mems.sort((a,b) => a.year - b.year);
  localStorage.setItem(LS.MEMORIES, JSON.stringify(mems));
  return mem;
}

function isLoggedIn() {
  return !!getStoredSession() && !!getStoredUser();
}

function mockLogin(email, password) {
  if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
    localStorage.setItem(LS.SESSION, 'demo-session-' + Date.now());
    localStorage.setItem(LS.USER, JSON.stringify(DEMO_USER));
    return { success: true, user: DEMO_USER };
  }
  // Check locally registered users
  const registered = JSON.parse(localStorage.getItem('lifeconnect_registered') || '[]');
  const found = registered.find(u => u.email === email && u.password === password);
  if (found) {
    const user = { ...found };
    delete user.password;
    localStorage.setItem(LS.SESSION, 'session-' + Date.now());
    localStorage.setItem(LS.USER, JSON.stringify(user));
    return { success: true, user };
  }
  return { success: false, error: 'Invalid email or password. Try demo@lifeconnect.local / Demo123!' };
}

function mockSignup(data) {
  const registered = JSON.parse(localStorage.getItem('lifeconnect_registered') || '[]');
  if (registered.find(u => u.email === data.email)) {
    return { success: false, error: 'This email is already registered. Please login.' };
  }
  const user = { ...data, avatar: data.name.charAt(0).toUpperCase() };
  registered.push(user);
  localStorage.setItem('lifeconnect_registered', JSON.stringify(registered));
  const sessionUser = { ...user };
  delete sessionUser.password;
  localStorage.setItem(LS.SESSION, 'session-' + Date.now());
  localStorage.setItem(LS.USER, JSON.stringify(sessionUser));
  return { success: true, user: sessionUser };
}

function logout() {
  localStorage.removeItem(LS.SESSION);
  localStorage.removeItem(LS.USER);
  navigate('home');
  updateNavForAuth();
  showToast('You have been signed out. See you soon!', 'info');
}

// ----------------------------------------------------------------
// 6. TOAST NOTIFICATIONS
// ----------------------------------------------------------------
function showToast(msg, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  const icons = { success: '✓', error: '✗', info: 'ℹ' };
  toast.innerHTML = `<span>${icons[type] || 'ℹ'}</span> ${msg}`;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3600);
}

// ----------------------------------------------------------------
// 7. NAVIGATION / ROUTER
// ----------------------------------------------------------------
const VIEWS = ['home', 'dashboard', 'login', 'signup', 'reconnect', 'memories',
               'wellness', 'community', 'companion', 'voice', 'legal', 'vault',
               'family', 'profile', 'nostalgia'];

function navigate(viewId) {
  // Auth guard
  const protectedViews = ['dashboard', 'vault', 'family', 'profile', 'companion'];
  if (protectedViews.includes(viewId) && !isLoggedIn()) {
    navigate('login');
    return;
  }

  VIEWS.forEach(id => {
    const el = document.getElementById('view-' + id);
    if (el) el.classList.remove('active');
  });

  const target = document.getElementById('view-' + viewId);
  if (!target) { navigate('home'); return; }
  target.classList.add('active');

  window.location.hash = viewId;

  // Sync nav active state
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  document.querySelectorAll('.mobile-menu__link').forEach(l => l.classList.remove('active'));
  document.querySelectorAll('.bottom-nav-item').forEach(l => l.classList.remove('active'));

  document.querySelectorAll(`[data-nav="${viewId}"]`).forEach(l => l.classList.add('active'));

  // Close mobile menu
  document.getElementById('mobile-menu').classList.remove('open');
  document.querySelector('.nav-hamburger').classList.remove('open');

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Run view-specific init
  onViewChange(viewId);
}

function onViewChange(viewId) {
  if (viewId === 'dashboard') initDashboard();
  if (viewId === 'reconnect') initReconnect();
  if (viewId === 'community') initCommunity();
  if (viewId === 'wellness')  initWellness();
  if (viewId === 'vault')     initVault();
  if (viewId === 'nostalgia') initNostalgia();
  if (viewId === 'companion') initCompanion();
  if (viewId === 'family')    initFamily();
  if (viewId === 'profile')   initProfile();
  if (viewId === 'memories')  initMemories();
}

// ----------------------------------------------------------------
// 8. NAVBAR
// ----------------------------------------------------------------
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // Close menu on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && !mobileMenu.contains(e.target)) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    }
  });

  updateNavForAuth();
}

function updateNavForAuth() {
  const loggedIn = isLoggedIn();
  const user = getStoredUser();
  const navActions = document.getElementById('nav-actions');
  if (!navActions) return;

  if (loggedIn && user) {
    navActions.innerHTML = `
      <button class="nav-avatar" onclick="navigate('dashboard')" title="My Dashboard" aria-label="Go to dashboard">${user.avatar || user.name.charAt(0)}</button>
      <button class="btn btn-secondary btn-sm" onclick="navigate('profile')">Profile</button>
      <button class="btn btn-ghost btn-sm" onclick="logout()">Sign Out</button>
    `;
  } else {
    navActions.innerHTML = `
      <button class="btn btn-secondary btn-sm" onclick="navigate('login')">Login</button>
      <button class="btn btn-primary btn-sm" onclick="navigate('signup')">Get Started</button>
    `;
  }

  // Show/hide dashboard nav link
  const dashLink = document.getElementById('nav-dashboard-link');
  if (dashLink) dashLink.style.display = loggedIn ? 'inline-block' : 'none';

  // Update home-page CTAs to reflect auth state
  updateHomeCTAsForAuth();
}

/**
 * Rewires every "Get Started" / signup CTA on the landing page to point
 * to the authenticated dashboard when the user is already logged in.
 *
 * Buttons/links targeted (by id or selector):
 *   #hero-get-started       — Hero section primary CTA
 *   #cta-start              — Bottom "Start Your LifeConnect Journey" CTA
 *   #mobile-menu-get-started — Mobile menu "Get Started Free" button
 *   #footer-get-started     — Footer Account column "Get Started" link
 */
function updateHomeCTAsForAuth() {
  const loggedIn = isLoggedIn();

  // Hero CTA
  const heroCta = document.getElementById('hero-get-started');
  if (heroCta) {
    if (loggedIn) {
      heroCta.textContent = 'Go to My Home';
      heroCta.onclick = () => navigate('dashboard');
    } else {
      heroCta.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg> Get Started`;
      heroCta.onclick = () => navigate('signup');
    }
  }

  // Bottom CTA banner
  const ctaStart = document.getElementById('cta-start');
  if (ctaStart) {
    if (loggedIn) {
      ctaStart.textContent = 'Go to My Home';
      ctaStart.onclick = () => navigate('dashboard');
    } else {
      ctaStart.textContent = 'Start Your LifeConnect Journey';
      ctaStart.onclick = () => navigate('signup');
    }
  }

  // Mobile menu "Get Started Free"
  const mobileGetStarted = document.getElementById('mobile-menu-get-started');
  if (mobileGetStarted) {
    if (loggedIn) {
      mobileGetStarted.textContent = 'My Home';
      mobileGetStarted.onclick = () => navigate('dashboard');
    } else {
      mobileGetStarted.textContent = 'Get Started Free';
      mobileGetStarted.onclick = () => navigate('signup');
    }
  }

  // Footer "Get Started" link
  const footerGetStarted = document.getElementById('footer-get-started');
  if (footerGetStarted) {
    if (loggedIn) {
      footerGetStarted.textContent = 'My Home';
      footerGetStarted.onclick = () => navigate('dashboard');
    } else {
      footerGetStarted.textContent = 'Get Started';
      footerGetStarted.onclick = () => navigate('signup');
    }
  }
}

// ----------------------------------------------------------------
// 9. HERO — LANDING PAGE
// ----------------------------------------------------------------
function initHero() {
  // Intersection Observer for fade-in animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
}

// ----------------------------------------------------------------
// 10. EASY MODE
// ----------------------------------------------------------------
function initEasyMode() {
  const enabled = getEasyMode();
  document.body.classList.toggle('easy-mode', enabled);

  const toggle = document.getElementById('easy-mode-toggle');
  if (toggle) {
    toggle.checked = enabled;
    toggle.addEventListener('change', () => {
      const on = toggle.checked;
      document.body.classList.toggle('easy-mode', on);
      localStorage.setItem(LS.EASY_MODE, on);
      showToast(on ? 'Easy Mode ON — larger text and buttons.' : 'Easy Mode OFF.', 'info');
    });
  }
}

// ----------------------------------------------------------------
// 11. AI COMPANION CHAT
// ----------------------------------------------------------------
let companionAvatar = '🌻';
let companionName = 'Mitra';

const AI_RESPONSES = {
  greet: [
    { text: "Good morning! I found something I think you\'ll love today.", actions: ['Show me', 'Maybe later'] },
    { text: "I remembered something you mentioned — about your college days at Punjab University.", actions: ['Tell me more', 'Save this memory'] },
    { text: "You might enjoy this — a song from the 1975 era. Shall I tell you more?", actions: ['Yes, tell me', 'Not right now'] },
  ],
  song: [
    { text: "It\'s \"Aaj Phir Jeene Ki Tamanna Hai\" by Lata Mangeshkar — from the film Guide (1965). A timeless classic from a golden era.\n\n(This song is available on licensed music platforms. LifeConnect does not host copyrighted content.)", actions: ['Find on YouTube', 'Save to favourites', 'Tell me another'] },
  ],
  memory: [
    { text: "I\'ve noted that memory. It\'s now saved in your Memory Vault. You can add more details or a photograph anytime.", actions: ['Go to Vault', 'Add another memory'] },
  ],
  friend: [
    { text: "I found 3 people who may be from your 1978 batch at DAV College, Chandigarh. Would you like to see their profiles?", actions: ['Show me', 'Not right now'] },
  ],
  wellbeing: [
    { text: "You\'ve been quieter than usual today. Would you like me to call someone, play a favourite song, or just talk for a while?", actions: ['Call Family', 'Play Music', "I\'m Fine, Thank You"] },
  ],
  general: [
    { text: "That\'s interesting! Tell me more, and I\'ll try to help.", actions: ['Continue', 'Try something else'] },
    { text: "I\'m still learning about you. The more we talk, the better I\'ll understand what you love.", actions: ['Tell me more', 'Okay'] },
    { text: "I\'ll look that up for you. Meanwhile, would you like me to find some memories from that era?", actions: ['Yes please', 'No thanks'] },
  ],
};

function getAIResponse(msg) {
  const lower = msg.toLowerCase();
  if (!msg.trim()) return null;
  if (lower.includes('song') || lower.includes('music') || lower.includes('lata') || lower.includes('kishore')) return AI_RESPONSES.song[0];
  if (lower.includes('friend') || lower.includes('school') || lower.includes('college') || lower.includes('batch')) return AI_RESPONSES.friend[0];
  if (lower.includes('memory') || lower.includes('remember') || lower.includes('recall')) return AI_RESPONSES.memory[0];
  if (lower.includes('lonely') || lower.includes('sad') || lower.includes('quiet') || lower.includes('miss')) return AI_RESPONSES.wellbeing[0];
  return AI_RESPONSES.general[Math.floor(Math.random() * AI_RESPONSES.general.length)];
}

function addChatMessage(container, role, text, actions) {
  const msg = document.createElement('div');
  msg.className = `chat-msg ${role}`;
  const avatarIcon = role === 'ai' ? companionAvatar : '🙂';
  msg.innerHTML = `
    <div class="chat-msg__avatar">${avatarIcon}</div>
    <div>
      <div class="chat-msg__bubble">${text.replace(/\n/g, '<br>')}</div>
      ${actions ? `<div class="chat-msg__actions">${actions.map(a => `<button class="chat-msg__btn" onclick="handleChatAction(this,'${a}')">${a}</button>`).join('')}</div>` : ''}
    </div>
  `;
  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;
}

function handleChatAction(btn, action) {
  const container = btn.closest('.chat-ui__body');
  if (!container) return;
  // Add user message
  addChatMessage(container, 'user', action, null);
  btn.closest('.chat-msg__actions').remove();
  // Simulate AI thinking
  setTimeout(() => {
    const res = getAIResponse(action);
    if (res) addChatMessage(container, 'ai', res.text, res.actions);
    else addChatMessage(container, 'ai', "I\'m here with you. What would you like to talk about?", ['Memories', 'Music', 'Friends']);
  }, 800);
}

function initCompanionChatUI(containerId, bodyId, inputId, sendId) {
  const body = document.getElementById(bodyId);
  const input = document.getElementById(inputId);
  const send = document.getElementById(sendId);
  if (!body || !input || !send) return;

  // Initial greeting
  body.innerHTML = '';
  const user = getStoredUser();
  const greeting = user
    ? `Good morning, ${user.firstName || user.name.split(' ')[0]} Ji! I found something you may like today.`
    : 'Good morning! I\'m Mitra, your AI companion. What would you like to explore today?';
  addChatMessage(body, 'ai', greeting, ['Show me', 'Tell me more', 'Play a Song']);

  const sendMsg = () => {
    const msg = input.value.trim();
    if (!msg) return;
    addChatMessage(body, 'user', msg, null);
    input.value = '';
    setTimeout(() => {
      const res = getAIResponse(msg);
      if (res) addChatMessage(body, 'ai', res.text, res.actions);
    }, 700);
  };

  send.addEventListener('click', sendMsg);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendMsg(); });
}

function initCompanion() {
  // Avatar selection
  const avatarOptions = document.querySelectorAll('.avatar-option');
  const savedAvatar = getAvatar();
  avatarOptions.forEach(opt => {
    if (savedAvatar && opt.dataset.name === savedAvatar) opt.classList.add('selected');
    opt.addEventListener('click', () => {
      avatarOptions.forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
      companionAvatar = opt.dataset.emoji;
      companionName = opt.dataset.name;
      localStorage.setItem(LS.AVATAR, opt.dataset.name);
      showToast(`${companionName} is now your companion.`, 'success');
      initCompanionChatUI('companion-chat', 'companion-chat-body', 'companion-chat-input', 'companion-chat-send');
    });
  });

  // Tabs
  const tabBtns = document.querySelectorAll('#view-companion .tab-btn');
  const tabPanels = document.querySelectorAll('#view-companion .tab-panel');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(btn.dataset.tab).classList.add('active');
    });
  });

  initCompanionChatUI('companion-chat', 'companion-chat-body', 'companion-chat-input', 'companion-chat-send');
}

// ----------------------------------------------------------------
// 12. VOICE UI
// ----------------------------------------------------------------
let recognition = null;
let isListening = false;

const VOICE_COMMANDS = [
  '"Call my daughter"',
  '"Show my old photos"',
  '"Play Lata Mangeshkar songs"',
  '"What year did India win the World Cup?"',
  '"Find my school friends"',
];

const DEMO_VOICE_RESPONSES = [
  { trigger: ['call', 'daughter', 'son', 'phone', 'family'], response: 'Family calling feature would connect to your selected communication app here. (Feature requires backend integration.)' },
  { trigger: ['photo', 'picture', 'image', 'vault'], response: 'Opening your Memory Vault to show your saved photos and memories.' },
  { trigger: ['song', 'music', 'lata', 'kishore', 'play'], response: 'Music playback would connect to your licensed music service here. Showing songs from the 1970s era.' },
  { trigger: ['doctor', 'appointment', 'medicine', 'book'], response: 'Appointment booking would connect to your selected healthcare service here. (Feature requires backend integration.)' },
  { trigger: ['friend', 'school', 'college', 'reconnect'], response: 'Opening Reconnect to find people from your past.' },
  { trigger: ['weather', 'today', 'news'], response: 'News and weather would come from connected services here. (Feature requires backend integration.)' },
];

function initVoiceUI(orbId, statusId, transcriptId) {
  const orb = document.getElementById(orbId);
  const statusEl = document.getElementById(statusId);
  const transcriptEl = document.getElementById(transcriptId);
  if (!orb) return;

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  function setStatus(text) { if (statusEl) statusEl.textContent = text; }
  function setTranscript(text) { if (transcriptEl) transcriptEl.textContent = text; }

  function processVoiceCommand(text) {
    const lower = text.toLowerCase();
    const match = DEMO_VOICE_RESPONSES.find(r => r.trigger.some(t => lower.includes(t)));
    const response = match ? match.response : 'I heard you. This would be processed by the LifeConnect assistant. (Demo mode — real actions require backend integration.)';
    setStatus('Understood');
    setTranscript(`"${text}"`);
    setTimeout(() => {
      setStatus(response);
      setTranscript('');
    }, 1500);
    setTimeout(() => { setStatus('Tap the microphone to speak'); }, 5000);

    // Navigation shortcuts
    if (text.toLowerCase().includes('photo') || text.toLowerCase().includes('vault')) navigate('vault');
    if (text.toLowerCase().includes('friend') || text.toLowerCase().includes('reconnect')) navigate('reconnect');
  }

  function startSimulatedListening() {
    const demos = ['Call my daughter', 'Play old songs', 'Find my school friends', 'Open my memories'];
    const demo = demos[Math.floor(Math.random() * demos.length)];
    setStatus('Listening...');
    setTranscript('');
    setTimeout(() => {
      setTranscript(`"${demo}"`);
      setTimeout(() => processVoiceCommand(demo), 1000);
    }, 1500);
  }

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'hi-IN';
    recognition.interimResults = true;

    recognition.onresult = (e) => {
      const transcript = Array.from(e.results).map(r => r[0].transcript).join('');
      setTranscript(`"${transcript}"`);
      if (e.results[0].isFinal) processVoiceCommand(transcript);
    };
    recognition.onerror = () => {
      orb.classList.remove('listening');
      isListening = false;
      setStatus('Could not hear you. Tap to try again.');
    };
    recognition.onend = () => {
      orb.classList.remove('listening');
      isListening = false;
    };
  }

  orb.addEventListener('click', () => {
    if (isListening) {
      if (recognition) recognition.stop();
      orb.classList.remove('listening');
      isListening = false;
      setStatus('Tap the microphone to speak');
      return;
    }
    isListening = true;
    orb.classList.add('listening');
    setStatus('Listening...');
    setTranscript('');
    if (SpeechRecognition && recognition) {
      try { recognition.start(); } catch(e) { startSimulatedListening(); }
    } else {
      startSimulatedListening();
    }
  });

  setStatus('Tap the microphone to speak');
}

// ----------------------------------------------------------------
// 13. TIME MACHINE
// ----------------------------------------------------------------
function initTimeMachine() {
  const years = Object.keys(MOCK_DATA.timeMachine);
  const selector = document.getElementById('year-selector');
  const content = document.getElementById('era-content');
  if (!selector || !content) return;

  function loadYear(year) {
    const data = MOCK_DATA.timeMachine[year];
    document.querySelectorAll('.year-btn').forEach(b => b.classList.toggle('active', b.dataset.year === year));
    const categories = [
      { key: 'songs',    label: 'Popular Songs',      icon: '🎵' },
      { key: 'movies',   label: 'Hit Movies',          icon: '🎬' },
      { key: 'cricket',  label: 'Cricket Moments',     icon: '🏏' },
      { key: 'events',   label: 'Important Events',    icon: '📰' },
      { key: 'radio',    label: 'Radio',                icon: '📻' },
      { key: 'tv',       label: 'Television',          icon: '📺' },
      { key: 'magazines',label: 'Magazines & Comics',  icon: '📕' },
    ];
    const available = categories.filter(c => data[c.key]);
    content.innerHTML = available.map(c => `
      <div class="era-card">
        <span class="era-card__icon">${c.icon}</span>
        <div class="era-card__label">${c.label}</div>
        <ul class="era-card__items">
          ${data[c.key].map(item => `<li class="era-card__item">${item}</li>`).join('')}
        </ul>
      </div>
    `).join('');
  }

  selector.innerHTML = years.map(y => `<button class="year-btn" data-year="${y}">${y}</button>`).join('');
  selector.querySelectorAll('.year-btn').forEach(btn => {
    btn.addEventListener('click', () => loadYear(btn.dataset.year));
  });
  loadYear(years[3]); // Default to 1980
}

// ----------------------------------------------------------------
// 14. RECONNECT PAGE
// ----------------------------------------------------------------
let reconnectFilters = { school: '', city: '', batch: '' };
let sentRequests = new Set();

function initReconnect() {
  renderFriends();
  const searchInput = document.getElementById('reconnect-search');
  const batchFilter = document.getElementById('batch-filter');
  const cityFilter = document.getElementById('city-filter');

  if (searchInput) searchInput.addEventListener('input', renderFriends);
  if (batchFilter) batchFilter.addEventListener('change', renderFriends);
  if (cityFilter) cityFilter.addEventListener('change', renderFriends);
}

function renderFriends() {
  const grid = document.getElementById('friends-grid');
  if (!grid) return;
  const search = (document.getElementById('reconnect-search')?.value || '').toLowerCase();
  const batch  = document.getElementById('batch-filter')?.value || '';
  const city   = document.getElementById('city-filter')?.value || '';

  let friends = MOCK_DATA.friends;
  if (search) friends = friends.filter(f =>
    f.name.toLowerCase().includes(search) ||
    f.school.toLowerCase().includes(search) ||
    f.profession.toLowerCase().includes(search) ||
    f.city.toLowerCase().includes(search)
  );
  if (batch) friends = friends.filter(f => f.batch === batch);
  if (city) friends = friends.filter(f => f.city.toLowerCase().includes(city.toLowerCase()));

  if (!friends.length) {
    grid.innerHTML = `<div style="text-align:center;padding:48px;color:var(--text-sec);grid-column:1/-1;">
      <div style="font-size:48px;margin-bottom:16px;">🔍</div>
      <p style="font-size:var(--text-lg);">No people found matching your search.</p>
      <p>Try different keywords or clear the filters.</p>
    </div>`;
    return;
  }

  grid.innerHTML = friends.map(f => {
    const sent = sentRequests.has(f.id);
    const connected = f.status === 'connected';
    return `
      <div class="profile-card" id="friend-${f.id}">
        <div class="profile-card__avatar">${f.initials}</div>
        <div class="profile-card__name">${f.name}</div>
        <div class="profile-card__meta">${f.school}</div>
        <div class="profile-card__meta">Batch of ${f.batch} · ${f.city}</div>
        <div class="profile-card__meta" style="color:var(--text-light);font-size:13px;">${f.profession}</div>
        <div class="profile-card__tag">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          ${f.common}
        </div>
        <div style="margin-top:16px;">
          ${connected ? `<button class="btn btn-green btn-sm btn-block" disabled>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Connected
          </button>` : sent ? `<button class="btn btn-secondary btn-sm btn-block" disabled>Request Sent</button>` :
          `<button class="btn btn-primary btn-sm btn-block" onclick="sendReconnectRequest(${f.id}, '${f.name}')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/><line x1="12" y1="12" x2="12" y2="18"/><line x1="9" y1="15" x2="15" y2="15"/></svg>
            Reconnect
          </button>`}
        </div>
      </div>
    `;
  }).join('');
}

function sendReconnectRequest(id, name) {
  sentRequests.add(id);
  showToast(`Reconnect request sent to ${name}. We\'ll notify you when they respond.`, 'success');
  renderFriends();
}

// ----------------------------------------------------------------
// 15. COMMUNITY PAGE
// ----------------------------------------------------------------
function initCommunity() {
  const joined = getJoinedComms();
  const grid = document.getElementById('community-grid');
  if (!grid) return;

  grid.innerHTML = MOCK_DATA.communities.map(c => {
    const isJoined = joined.includes(c.id) || c.joined;
    return `
      <div class="community-card" id="comm-${c.id}">
        <div class="community-card__banner">${c.emoji}</div>
        <div class="community-card__body">
          <div class="community-card__name">${c.name}</div>
          <div class="community-card__stats">
            <span class="community-card__stat">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
              ${c.members.toLocaleString()} members
            </span>
            <span class="community-card__stat">🟢 ${c.active}</span>
          </div>
          <p style="font-size:var(--text-sm);color:var(--text-sec);margin-bottom:16px;line-height:1.55;">${c.desc}</p>
          <p style="font-size:12px;color:var(--text-light);margin-bottom:16px;">📅 ${c.meetup}</p>
          ${isJoined ?
            `<button class="btn btn-ghost btn-sm btn-block" onclick="leaveCommunity(${c.id},'${c.name}')">Joined — Leave?</button>` :
            `<button class="btn btn-primary btn-sm btn-block" onclick="joinCommunity(${c.id},'${c.name}')">Join Community</button>`
          }
        </div>
      </div>
    `;
  }).join('');
}

function joinCommunity(id, name) {
  const joined = getJoinedComms();
  if (!joined.includes(id)) { joined.push(id); localStorage.setItem(LS.COMMUNITIES, JSON.stringify(joined)); }
  showToast(`You\'ve joined "${name}"! Welcome to the community.`, 'success');
  initCommunity();
}

function leaveCommunity(id, name) {
  const joined = getJoinedComms().filter(c => c !== id);
  localStorage.setItem(LS.COMMUNITIES, JSON.stringify(joined));
  showToast(`You\'ve left "${name}".`, 'info');
  initCommunity();
}

// ----------------------------------------------------------------
// 16. WELLNESS PAGE
// ----------------------------------------------------------------
let wellnessState = [];

function initWellness() {
  wellnessState = MOCK_DATA.wellnessActivities.map(a => ({ ...a }));
  const saved = localStorage.getItem('lc_wellness_' + getTodayKey());
  if (saved) wellnessState = JSON.parse(saved);
  renderWellness();
}

function getTodayKey() {
  return new Date().toISOString().split('T')[0];
}

function renderWellness() {
  const grid = document.getElementById('activity-grid-wellness');
  if (!grid) return;
  const completed = wellnessState.filter(a => a.completed).length;
  const total = wellnessState.length;

  // Update the Wellness page's own progress elements
  const progress = document.getElementById('wellness-progress-wellness');
  if (progress) {
    progress.textContent = `${completed} of ${total} activities completed today`;
  }
  const bar = document.getElementById('wellness-bar-wellness');
  if (bar) {
    bar.style.width = `${(completed / total) * 100}%`;
  }

  // Also keep the Dashboard mini-wellness widget in sync (separate IDs)
  const dashProgress = document.getElementById('wellness-progress');
  if (dashProgress) dashProgress.textContent = `${completed} of ${total} activities completed today`;
  const dashBar = document.getElementById('wellness-bar');
  if (dashBar) dashBar.style.width = `${(completed / total) * 100}%`;

  grid.innerHTML = wellnessState.map(a => `
    <div class="activity-card ${a.completed ? 'completed' : ''}" onclick="toggleActivity(${a.id})" role="listitem" tabindex="0" aria-label="${a.title} — ${a.completed ? 'completed' : 'tap to complete'}">
      <div class="activity-card__check">${a.completed ? '✓' : ''}</div>
      <span class="activity-card__icon">${a.icon}</span>
      <div class="activity-card__title">${a.title}</div>
      <div class="activity-card__duration">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        ${a.duration}
      </div>
      <p style="font-size:var(--text-sm);color:var(--text-sec);">${a.desc}</p>
    </div>
  `).join('');
}

function toggleActivity(id) {
  const act = wellnessState.find(a => a.id === id);
  if (!act) return;
  act.completed = !act.completed;
  localStorage.setItem('lc_wellness_' + getTodayKey(), JSON.stringify(wellnessState));
  if (act.completed) showToast(`"${act.title}" marked complete! Great work!`, 'success');
  renderWellness();
}

// ----------------------------------------------------------------
// 17. DIGITAL MEMORY VAULT
// ----------------------------------------------------------------
function initVault() {
  renderTimeline();
}

function renderTimeline() {
  const container = document.getElementById('timeline-container');
  if (!container) return;
  const memories = getStoredMemories() || MOCK_DATA.memories;
  container.innerHTML = `<div class="timeline">${memories.map((m, i) => `
    <div class="timeline-item" style="animation-delay:${i * 0.08}s">
      <div class="timeline-item__dot"></div>
      <div class="timeline-item__year">${m.year}</div>
      <div class="timeline-item__card">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;">
          <div class="timeline-item__title">${m.emoji || '📖'} ${m.title}</div>
          <span class="badge badge-orange">${m.type || 'story'}</span>
        </div>
        <div class="timeline-item__text">${m.content}</div>
      </div>
    </div>
  `).join('')}</div>`;
}

function openAddMemoryModal() {
  if (!isLoggedIn()) { navigate('login'); return; }
  document.getElementById('add-memory-modal').classList.add('open');
}

function closeAddMemoryModal() {
  document.getElementById('add-memory-modal').classList.remove('open');
}

function saveNewMemory() {
  const year  = document.getElementById('mem-year').value;
  const title = document.getElementById('mem-title').value;
  const content = document.getElementById('mem-content').value;
  const type  = document.getElementById('mem-type').value;

  if (!year || !title) {
    showToast('Please fill in the year and title.', 'error');
    return;
  }
  const mem = { year: parseInt(year), title, content, type, emoji: '📖' };
  saveMemory(mem);
  closeAddMemoryModal();
  showToast('Memory saved to your Vault!', 'success');
  renderTimeline();
  // Clear form
  ['mem-year', 'mem-title', 'mem-content'].forEach(id => { const el = document.getElementById(id); if(el) el.value = ''; });
}

// ----------------------------------------------------------------
// 18. NOSTALGIA LIBRARY
// ----------------------------------------------------------------
let nostalgiaCategory = 'songs';

function initNostalgia() {
  renderNostalgia();
  const buttons = document.querySelectorAll('.nostalgia-cat-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      nostalgiaCategory = btn.dataset.cat;
      renderNostalgia();
    });
  });
}

function renderNostalgia() {
  const grid = document.getElementById('nostalgia-grid');
  if (!grid) return;
  const items = MOCK_DATA.nostalgiaLibrary[nostalgiaCategory] || [];
  grid.innerHTML = items.map(item => `
    <div class="media-card">
      <div class="media-card__thumb">
        ${item.emoji}
        <span class="media-card__licensed">Licensed Source</span>
      </div>
      <div class="media-card__body">
        <div class="media-card__title">${item.title}</div>
        <div class="media-card__meta">${item.artist || item.desc || ''} ${item.year ? `· ${item.year}` : ''}</div>
        <button class="btn btn-ghost btn-sm" onclick="showToast('This would open an external licensed source. LifeConnect does not host copyrighted content.','info')">
          Find Legally
        </button>
      </div>
    </div>
  `).join('');
}

// ----------------------------------------------------------------
// 19. AI MEMORY SEARCH
// ----------------------------------------------------------------
function initMemorySearch() {
  const btn = document.getElementById('memory-search-btn');
  const input = document.getElementById('memory-search-input');
  if (!btn || !input) return;
  btn.addEventListener('click', doMemorySearch);
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') doMemorySearch(); });
}

const MEMORY_SEARCH_RESULTS = [
  {
    title: 'Nagin (1954) — A scene with a woman in a red saree on a train',
    desc: 'This classic film features iconic scenes with a red saree and train sequences. Music by Hemant Kumar.',
    type: 'Movie',
    match: 90,
  },
  {
    title: '"Aa Ja Re Ab Mera Dil Pukara" — Aadha Din Aadhee Raat (1977)',
    desc: 'A popular song featuring a train journey scene, performed by Lata Mangeshkar.',
    type: 'Song',
    match: 82,
  },
  {
    title: 'Madhumati (1958) — Dilip Kumar / Vyjayanthimala',
    desc: 'A classic film with memorable train sequences and Vyjayanthimala in traditional attire.',
    type: 'Movie',
    match: 75,
  },
];

const MEMORY_SEARCH_RESULTS_2 = [
  {
    title: 'Nandan Magazine — Children\'s Literature Classic',
    desc: 'Nandan was published by Hind Pocket Books from 1964. Beloved for its stories, comics and educational content. Your subscription era was likely the 1970s-80s.',
    type: 'Magazine',
    match: 98,
  },
  {
    title: 'Champak Magazine — Stories and Adventure',
    desc: 'Another beloved children\'s magazine published alongside Nandan, with similar content for the same generation.',
    type: 'Magazine',
    match: 72,
  },
];

function doMemorySearch() {
  const input = document.getElementById('memory-search-input');
  const results = document.getElementById('memory-search-results');
  if (!input || !results) return;
  const query = input.value.trim();
  if (!query) { showToast('Please describe the memory you are searching for.', 'info'); return; }
  results.innerHTML = `<p style="color:var(--text-sec);margin-bottom:24px;font-style:italic;">Searching for memories matching: "${query}"...</p>`;

  setTimeout(() => {
    const data = query.toLowerCase().includes('nandan') || query.toLowerCase().includes('magazine') ?
      MEMORY_SEARCH_RESULTS_2 : MEMORY_SEARCH_RESULTS;
    results.innerHTML = `
      <p style="color:var(--text-sec);margin-bottom:16px;">Found ${data.length} possible matches for your memory:</p>
      ${data.map(r => `
        <div class="memory-result">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px;">
            <div style="font-family:var(--font-serif);font-size:var(--text-md);font-weight:700;color:var(--text-dark);">${r.title}</div>
            <span class="badge badge-orange">${r.match}% match</span>
          </div>
          <p style="font-size:var(--text-base);color:var(--text-sec);margin-bottom:12px;">${r.desc}</p>
          <span class="badge badge-green">${r.type}</span>
        </div>
      `).join('')}
      <p style="font-size:13px;color:var(--text-light);margin-top:16px;">Results are based on your description. LifeConnect uses AI to find possible matches — these are not guaranteed to be the exact memory.</p>
    `;
  }, 1200);
}

// ----------------------------------------------------------------
// 20. LEGAL ASSISTANT
// ----------------------------------------------------------------
let legalTopic = 'pension';

function initLegal() {
  renderLegalTopics();
  loadLegalDemo('pension');
}

function renderLegalTopics() {
  const chips = document.getElementById('legal-topic-chips');
  if (!chips) return;
  chips.innerHTML = MOCK_DATA.legalTopics.map(t => `
    <button class="chip ${t.id === legalTopic ? 'active' : ''}" onclick="loadLegalDemo('${t.id}')" id="legal-chip-${t.id}">
      ${t.icon} ${t.label}
    </button>
  `).join('');
}

function loadLegalDemo(topic) {
  legalTopic = topic;
  document.querySelectorAll('#legal-topic-chips .chip').forEach(c => c.classList.remove('active'));
  const active = document.getElementById('legal-chip-' + topic);
  if (active) active.classList.add('active');

  const data = MOCK_DATA.legalResponses[topic];
  if (!data) return;

  const body = document.getElementById('legal-chat-body');
  if (!body) return;
  body.innerHTML = '';

  // User question
  addChatMessage(body, 'user', data.question, null);
  setTimeout(() => {
    const response = `I\'ll explain this in simple, everyday language.\n\nThis document has ${data.steps.length} main parts:`;
    addChatMessage(body, 'ai', response, null);
    setTimeout(() => {
      const stepsHTML = data.steps.map(s => `
        <div style="background:var(--green-pale);border-radius:12px;padding:16px;margin-top:12px;border-left:4px solid var(--green-deep);">
          <div style="font-weight:700;color:var(--green-deep);margin-bottom:6px;">Step ${s.n}: ${s.title}</div>
          <div style="font-size:var(--text-base);color:var(--text-dark);">${s.desc}</div>
        </div>
      `).join('');

      const msgWrap = document.createElement('div');
      msgWrap.className = 'chat-msg ai';
      msgWrap.innerHTML = `
        <div class="chat-msg__avatar">${companionAvatar}</div>
        <div style="flex:1;">
          <div class="chat-msg__bubble">${stepsHTML}</div>
          <div class="chat-msg__actions">
            <button class="chat-msg__btn" onclick="showToast('Remember: This is for understanding only. Always consult a professional for legal or financial matters.','info')">Got it</button>
            <button class="chat-msg__btn" onclick="showToast('A lawyer or financial advisor can give you proper guidance. This AI only explains in simpler language.','info')">Need more help?</button>
          </div>
        </div>
      `;
      body.appendChild(msgWrap);
      body.scrollTop = body.scrollHeight;
    }, 600);
  }, 600);
}

// ----------------------------------------------------------------
// 21. FAMILY BRIDGE
// ----------------------------------------------------------------
let familyCardIdx = 0;

function initFamily() {
  renderFamilyCard();
}

function renderFamilyCard() {
  const card = document.getElementById('family-bridge-card');
  if (!card) return;
  const data = MOCK_DATA.familyBridgeCards[familyCardIdx % MOCK_DATA.familyBridgeCards.length];
  card.innerHTML = `
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:24px;">
      <div style="width:60px;height:60px;border-radius:50%;background:var(--orange-light);display:flex;align-items:center;justify-content:center;font-size:28px;">👴</div>
      <div>
        <div style="font-size:var(--text-sm);color:var(--text-sec);">Today's story from</div>
        <div style="font-family:var(--font-serif);font-size:var(--text-lg);font-weight:700;color:var(--text-dark);">${data.parentName}</div>
      </div>
      <span class="badge badge-orange" style="margin-left:auto;">New</span>
    </div>
    <div class="family-card__story">${data.story}</div>
    <div class="family-card__prompt">${data.prompt}</div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;">
      ${data.actions.map(a => `<button class="btn btn-primary btn-sm" onclick="handleFamilyAction('${a}')">${a}</button>`).join('')}
      <button class="btn btn-secondary btn-sm" onclick="nextFamilyCard()">Next Story →</button>
    </div>
    <p style="font-size:12px;color:var(--text-light);margin-top:16px;">
      🔒 Privacy: Family members only see content you choose to share with them.
    </p>
  `;
}

function handleFamilyAction(action) {
  if (action === 'Listen') { showToast('Voice playback would play the recorded memory. (Demo mode)', 'info'); return; }
  if (action.includes('Save') || action.includes('Record')) { showToast('Story saved to Family Memory Vault.', 'success'); return; }
  if (action.includes('Share')) { showToast('Sharing would send this to selected family members with permission.', 'info'); return; }
  showToast(`${action} — Feature coming soon with backend integration.`, 'info');
}

function nextFamilyCard() {
  familyCardIdx++;
  renderFamilyCard();
}

// ----------------------------------------------------------------
// 22. MEMORIES PAGE
// ----------------------------------------------------------------
function initMemories() {
  initTimeMachine();
  initMemorySearch();
  initNostalgia();
}

// ----------------------------------------------------------------
// 23. DASHBOARD
// ----------------------------------------------------------------
function initDashboard() {
  const user = getStoredUser();
  if (!user) return;

  const greeting = getDashboardGreeting(user.firstName || user.name.split(' ')[0]);
  const greetEl = document.getElementById('dashboard-greeting');
  const subEl = document.getElementById('dashboard-sub');
  if (greetEl) greetEl.textContent = greeting;
  if (subEl) subEl.textContent = 'Here\'s something special for you today.';

  // Dashboard voice orb
  initVoiceUI('dashboard-voice-orb', 'dashboard-voice-status', 'dashboard-voice-transcript');

  // Init companion chat preview
  initCompanionChatUI('dashboard-chat', 'dashboard-chat-body', 'dashboard-chat-input', 'dashboard-chat-send');
}

function getDashboardGreeting(name) {
  const hour = new Date().getHours();
  const salutation = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';
  return `${salutation}, ${name} Ji ☀️`;
}

// ----------------------------------------------------------------
// 24. PROFILE
// ----------------------------------------------------------------
function initProfile() {
  const user = getStoredUser();
  if (!user) return;

  const avatarEl = document.getElementById('profile-avatar-display');
  const nameEl = document.getElementById('profile-name-display');
  const emailEl = document.getElementById('profile-email-display');
  const cityEl = document.getElementById('profile-city-display');

  if (avatarEl) avatarEl.textContent = user.avatar || user.name.charAt(0);
  if (nameEl) nameEl.textContent = user.name;
  if (emailEl) emailEl.textContent = user.email;
  if (cityEl) cityEl.textContent = user.city || 'Not specified';

  // Text size select
  const textSizeSelect = document.getElementById('text-size-select');
  if (textSizeSelect) {
    textSizeSelect.addEventListener('change', (e) => {
      document.documentElement.style.setProperty('--text-base', e.target.value + 'px');
      showToast('Text size updated.', 'success');
    });
  }
}

// ----------------------------------------------------------------
// 25. AUTH FORMS
// ----------------------------------------------------------------
function initLoginForm() {
  const form = document.getElementById('login-form');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const pass  = document.getElementById('login-password').value;
    clearErrors('login-form');

    let valid = true;
    if (!email) { showError('login-email-error', 'Email is required'); valid = false; }
    else if (!/\S+@\S+\.\S+/.test(email)) { showError('login-email-error', 'Please enter a valid email address'); valid = false; }
    if (!pass) { showError('login-pass-error', 'Password is required'); valid = false; }
    if (!valid) return;

    const btn = form.querySelector('button[type=submit]');
    btn.textContent = 'Signing in...';
    btn.disabled = true;

    const result = await loginUser(email, pass);
    btn.textContent = 'Login';
    btn.disabled = false;

    if (result.success) {
      updateNavForAuth();
      showToast(`Welcome back, ${result.user.firstName || result.user.name.split(' ')[0]} Ji!`, 'success');
      navigate('dashboard');
    } else {
      showError('login-general-error', result.error);
    }
  });
}

function initSignupForm() {
  const form = document.getElementById('signup-form');
  if (!form) return;

  // Interest chips
  document.querySelectorAll('#signup-form .interest-chip').forEach(chip => {
    chip.addEventListener('click', () => chip.classList.toggle('selected'));
  });

  // Decade selection
  document.querySelectorAll('#signup-form .decade-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#signup-form .decade-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors('signup-form');

    const name    = document.getElementById('signup-name').value.trim();
    const email   = document.getElementById('signup-email').value.trim();
    const mobile  = document.getElementById('signup-mobile').value.trim();
    const age     = document.getElementById('signup-age').value;
    const pass    = document.getElementById('signup-pass').value;
    const confirm = document.getElementById('signup-confirm').value;
    const interests = [...document.querySelectorAll('#signup-form .interest-chip.selected')].map(c => c.dataset.value);
    const decade  = document.querySelector('#signup-form .decade-btn.active')?.dataset.decade || '';

    let valid = true;
    if (!name)   { showError('signup-name-error',  'Full name is required'); valid = false; }
    if (!email)  { showError('signup-email-error', 'Email is required'); valid = false; }
    else if (!/\S+@\S+\.\S+/.test(email)) { showError('signup-email-error', 'Please enter a valid email'); valid = false; }
    if (mobile && !/^[6-9]\d{9}$/.test(mobile)) { showError('signup-mobile-error', 'Please enter a valid 10-digit Indian mobile number'); valid = false; }
    if (!pass)   { showError('signup-pass-error',    'Password is required'); valid = false; }
    else if (pass.length < 8) { showError('signup-pass-error', 'Password must be at least 8 characters'); valid = false; }
    if (pass !== confirm) { showError('signup-confirm-error', 'Passwords do not match'); valid = false; }
    if (!valid) return;

    const btn = form.querySelector('button[type=submit]');
    btn.textContent = 'Creating account...';
    btn.disabled = true;

    const result = await signupUser({ name, email, mobile, age, password: pass, interests, decade, avatar: name.charAt(0).toUpperCase() });
    btn.textContent = 'Create Account';
    btn.disabled = false;

    if (result.success) {
      updateNavForAuth();
      showToast(`Welcome to LifeConnect, ${name.split(' ')[0]} Ji!`, 'success');
      navigate('dashboard');
    } else {
      showError('signup-general-error', result.error);
    }
  });
}

function showError(id, msg) {
  const el = document.getElementById(id);
  if (el) { el.textContent = msg; el.style.display = 'flex'; }
  const inputId = id.replace('-error', '');
  const input = document.getElementById(inputId);
  if (input) input.classList.add('error');
}

function clearErrors(formId) {
  document.querySelectorAll(`#${formId} .form-error`).forEach(el => { el.textContent = ''; el.style.display = 'none'; });
  document.querySelectorAll(`#${formId} .form-input`).forEach(el => el.classList.remove('error'));
}

// ----------------------------------------------------------------
// 26. APP INITIALIZATION
// ----------------------------------------------------------------
function initApp() {
  // Apply easy mode
  initEasyMode();

  // Init navbar
  initNavbar();

  // Handle hash routing
  const hash = window.location.hash.replace('#', '') || 'home';
  if (hash === 'dashboard' || hash === 'home') {
    navigate(isLoggedIn() ? 'dashboard' : 'home');
  } else {
    navigate(hash);
  }

  // Auth forms
  initLoginForm();
  initSignupForm();

  // Landing page voice
  initVoiceUI('voice-orb', 'voice-status', 'voice-transcript');

  // Hero animation
  initHero();

  // Landing chat
  initCompanionChatUI('home-chat', 'home-chat-body', 'home-chat-input', 'home-chat-send');

  // Time Machine (landing)
  initTimeMachine();

  // Legal assistant
  initLegal();

  // Memory search (landing)
  initMemorySearch();

  // Float mic nav
  const floatMic = document.getElementById('floating-mic');
  if (floatMic) floatMic.addEventListener('click', () => navigate('voice'));

  // Hash change listener
  window.addEventListener('hashchange', () => {
    const v = window.location.hash.replace('#', '');
    if (VIEWS.includes(v)) navigate(v);
  });

  // Wellbeing check-in demo
  const wellbeingBtns = document.querySelectorAll('.wellbeing-action');
  wellbeingBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      if (action === 'call')   showToast('Calling family — this would connect to your phone or app. (Demo mode)', 'info');
      if (action === 'music')  showToast('Music would play from your favourite playlist. (Demo mode)', 'info');
      if (action === 'fine')   showToast('That\'s wonderful! Have a beautiful day!', 'success');
    });
  });

  // Nostalgic Stickers System
  initNostalgicStickers();
}

// ----------------------------------------------------------------
// 27. NOSTALGIC STICKER INTERACTION SYSTEM
// ----------------------------------------------------------------

/** Synthesizes pleasant retro audio effects using Web Audio API */
function playStickerSound(type = 'pop') {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'tape') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.12);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === 'chime') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08);
      osc.frequency.setValueAtTime(783.99, now + 0.16);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(740, now + 0.08);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    }
  } catch (err) {
    // Ignore audio context errors
  }
}

/** Shows nostalgic memory modal */
function showStickerMemoryModal(title, memoryText, icon) {
  const modal = document.getElementById('sticker-modal');
  const titleEl = document.getElementById('sticker-modal-title');
  const textEl = document.getElementById('sticker-modal-text');
  const iconEl = document.getElementById('sticker-modal-icon');

  if (titleEl) titleEl.textContent = title || 'Nostalgic Memory';
  if (textEl) textEl.textContent = `"${memoryText || 'A cherished golden memory from the past.'}"`;
  if (iconEl) iconEl.textContent = icon || '📼';

  if (modal) modal.classList.add('open');
}

/** Closes sticker memory modal */
function closeStickerModal() {
  const modal = document.getElementById('sticker-modal');
  if (modal) modal.classList.remove('open');
}

/** Filters stickers on the album board by category */
function filterStickers(category, btnEl) {
  const chips = document.querySelectorAll('.sticker-filter-chips .chip');
  chips.forEach(c => c.classList.remove('active'));
  if (btnEl) btnEl.classList.add('active');

  const stickers = document.querySelectorAll('#sticker-board .album-sticker-item');
  stickers.forEach(sticker => {
    const cat = sticker.dataset.category;
    if (category === 'all' || cat === category) {
      sticker.classList.remove('hidden-by-filter');
    } else {
      sticker.classList.add('hidden-by-filter');
    }
  });

  playStickerSound('pop');
}

/** Dynamic extra nostalgic stickers pool */
const EXTRA_STICKERS_POOL = [
  { title: "Marbles & Tops", icon: "🔴", sound: "pop", cat: "childhood", memory: "Playing Gulli Danda and colorful Glass Marbles (Kanchas) in the lane after school.", bg: "#FFF8E8", textBg: "#FFE0B2", color: "#D9651A" },
  { title: "Comics & Nandan", icon: "📚", sound: "chime", cat: "childhood", memory: "Waiting for monthly comic books like Chacha Chaudhary, Suppandi and Nandan magazines.", bg: "#F3E5F5", textBg: "#E1BEE7", color: "#7B1FA2" },
  { title: "Fountain Pen", icon: "🖊️", sound: "pop", cat: "letters", memory: "Filling blue Chelpark ink into a classic Hero fountain pen and practicing cursive calligraphy.", bg: "#E3F2FD", textBg: "#BBDEFB", color: "#1565C0" },
  { title: "Phonograph LP", icon: "🎵", sound: "tape", cat: "music", memory: "Spinning classic 45 RPM vinyl singles on a portable record player at family celebrations.", bg: "#E8F5E9", textBg: "#C8E6C9", color: "#2E7D32" },
  { title: "Gold Star Badge", icon: "⭐", sound: "chime", cat: "badges", memory: "Receiving shiny star stickers on school notebooks for neat homework!", bg: "#FFFDE7", textBg: "#FFF59D", color: "#F57F17" }
];

let extraStickerIndex = 0;

/** Stamps a new random sticker into the corkboard */
function stampRandomSticker() {
  const board = document.getElementById('sticker-board');
  if (!board) return;

  const data = EXTRA_STICKERS_POOL[extraStickerIndex % EXTRA_STICKERS_POOL.length];
  extraStickerIndex++;

  const rot = (Math.random() * 14 - 7).toFixed(1);
  const newItem = document.createElement('div');
  newItem.className = 'album-sticker-item';
  newItem.dataset.category = data.cat;
  newItem.dataset.title = data.title;
  newItem.dataset.icon = data.icon;
  newItem.dataset.sound = data.sound;
  newItem.dataset.memory = data.memory;
  newItem.style.cssText = `--rot:${rot}deg; --bg:${data.bg};`;

  newItem.innerHTML = `
    <div class="sticker-tape-mark"></div>
    <div class="sticker-icon-wrap" style="background:${data.textBg};color:${data.color};">${data.icon}</div>
    <div class="sticker-text-wrap">
      <strong>${data.title}</strong>
      <span>Stamped Memory ✨</span>
    </div>
    <span class="sticker-sparkle">✨</span>
  `;

  board.appendChild(newItem);
  attachStickerEvents(newItem);
  playStickerSound(data.sound);
  showToast(`Stamped new sticker: ${data.title}!`, 'success');
}

/** Resets sticker positions and filters */
function resetStickerBoard() {
  const board = document.getElementById('sticker-board');
  if (!board) return;

  const firstChip = document.querySelector('.sticker-filter-chips .chip');
  if (firstChip) filterStickers('all', firstChip);

  const items = board.querySelectorAll('.album-sticker-item');
  items.forEach(item => {
    item.style.position = '';
    item.style.left = '';
    item.style.top = '';
    item.style.zIndex = '';
  });

  playStickerSound('chime');
  showToast('Sticker board reset to initial layout.', 'info');
}

/** Attaches drag & drop and click events to a single sticker */
function attachStickerEvents(sticker) {
  sticker.addEventListener('click', (e) => {
    if (sticker.dataset.wasDragged === 'true') {
      sticker.dataset.wasDragged = 'false';
      return;
    }

    const sound = sticker.dataset.sound || 'pop';
    playStickerSound(sound);

    const title = sticker.dataset.title;
    const memory = sticker.dataset.memory;
    const icon = sticker.dataset.icon;

    if (memory) {
      showStickerMemoryModal(title, memory, icon);
    }
  });

  let isDragging = false;
  let startX, startY, initialLeft, initialTop;

  function startDrag(e) {
    if (e.target.tagName === 'BUTTON') return;
    isDragging = true;
    sticker.dataset.wasDragged = 'false';

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    startX = clientX;
    startY = clientY;

    const board = sticker.closest('.sticker-board') || sticker.offsetParent || document.body;
    const boardRect = board.getBoundingClientRect();
    const rect = sticker.getBoundingClientRect();

    initialLeft = rect.left - boardRect.left;
    initialTop = rect.top - boardRect.top;

    sticker.style.position = 'absolute';
    sticker.style.left = `${initialLeft}px`;
    sticker.style.top = `${initialTop}px`;
    sticker.style.zIndex = '100';

    document.addEventListener('mousemove', onDrag);
    document.addEventListener('touchmove', onDrag, { passive: false });
    document.addEventListener('mouseup', stopDrag);
    document.addEventListener('touchend', stopDrag);
  }

  function onDrag(e) {
    if (!isDragging) return;

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const dx = clientX - startX;
    const dy = clientY - startY;

    if (Math.abs(dx) > 6 || Math.abs(dy) > 6) {
      sticker.dataset.wasDragged = 'true';
    }

    sticker.style.left = `${initialLeft + dx}px`;
    sticker.style.top = `${initialTop + dy}px`;

    if (e.cancelable) e.preventDefault();
  }

  function stopDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', onDrag);
    document.removeEventListener('touchmove', onDrag);
    document.removeEventListener('mouseup', stopDrag);
    document.removeEventListener('touchend', stopDrag);
  }

  sticker.addEventListener('mousedown', startDrag);
  sticker.addEventListener('touchstart', startDrag, { passive: true });
}

/** Initializes all interactive nostalgic stickers */
function initNostalgicStickers() {
  const stickers = document.querySelectorAll('.album-sticker-item, .hero-sticker');
  stickers.forEach(sticker => attachStickerEvents(sticker));

  const stickerModal = document.getElementById('sticker-modal');
  if (stickerModal) {
    stickerModal.addEventListener('click', (e) => {
      if (e.target === stickerModal) closeStickerModal();
    });
  }
}

// ----------------------------------------------------------------
// 28. START
// ----------------------------------------------------------------
document.addEventListener('DOMContentLoaded', initApp);

