  function toggleProfileMenu(){

    document.getElementById("profileDropdown").classList.toggle("show");

}

window.onclick=function(e){

    if(!e.target.closest(".profile-menu")){

        document.getElementById("profileDropdown").classList.remove("show");

    }

}
function toggleOwnerProfileMenu() {

    document
        .getElementById("ownerProfileDropdown")
        .classList.toggle("show");

}

document.addEventListener("click", function (e) {

    const menu = document.querySelector(".owner-profile-menu");

    if (!menu.contains(e.target)) {

        document
            .getElementById("ownerProfileDropdown")
            .classList.remove("show");

    }

});
const firebaseConfig = {
  apiKey: "AIzaSyAfUCS3W26AifYgIbvY2J61CSgkDkn649M",
  authDomain: "alhamd-fast-food.firebaseapp.com",
  projectId: "alhamd-fast-food",
  storageBucket: "alhamd-fast-food.firebasestorage.app",
  messagingSenderId: "435660072478",
  appId: "1:435660072478:web:1827e1e6054a21341bf00f"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

/* ============================================================
   REPLACE your existing PRODUCTS array (from `const PRODUCTS = [`
   down to its closing `];`) with everything below, INCLUDING the
   helper functions pizza(), halfFull(), pieces() which stay the
   same — just add customVariants() as a new helper above PRODUCTS.
   ============================================================ */

function pizza(name, cat, s, m, l, xl){
  return {
    name, cat,
    variants:[
      {label:"Small",  price:s},
      {label:"Medium", price:m},
      {label:"Large",  price:l},
      {label:"XL",     price:xl},
    ]
  };
}
function halfFull(name, cat, half, full){
  return { name, cat, variants:[ {label:"Half", price:half}, {label:"Full", price:full} ] };
}
function pieces(name, cat, six, twelve){
  return { name, cat, variants:[ {label:"6 pcs", price:six}, {label:"12 pcs", price:twelve} ] };
}
/* NEW helper: build a product with only the specific size/price pairs given
   (used for pizzas/toppings that don't offer every size, e.g. no Small). */
function customVariants(name, cat, sizeMap){
  return {
    name, cat,
    variants: Object.entries(sizeMap).map(([label, price]) => ({label, price}))
  };
}

const PRODUCTS = [
  /* ---- Hot Wings ---- */
  pieces("Hot Wings", "Hot Wings", 300, 600),
  pieces("Honey Wings", "Hot Wings", 350, 650),
  pieces("B.B.Q Wings", "Hot Wings", 350, 650),

  /* ---- Nuggets ---- */
  pieces("Nuggets", "Nuggets", 300, 600),
  pieces("Poppers", "Nuggets", 300, 600),

  /* ---- Fries ---- */
  {name:"Regular Fries", cat:"Fries", price:150},
  {name:"Large Family Fries", cat:"Fries", price:300},
  halfFull("Loaded Fries", "Fries", 350, 600),

  /* ---- Pasta ---- */
  halfFull("Al Fareedu Pasta", "Pasta", 450, 700),
  halfFull("Creamy Crunchy Pasta", "Pasta", 400, 600),
  halfFull("Macroni Pasta", "Pasta", 400, 600),

  /* ---- Burgers ---- */
  {name:"Zinger Burger", cat:"Burgers", price:350},
  {name:"Loaded Zinger", cat:"Burgers", price:440},
  {name:"Royal Burger", cat:"Burgers", price:300},
  {name:"Double Dacker", cat:"Burgers", price:500},
  {name:"Garlic Maayo Burger", cat:"Burgers", price:300},
  {name:"Chiplote Burger", cat:"Burgers", price:300},
  {name:"Chapli Burger", cat:"Burgers", price:300},
  {name:"Patti Burger", cat:"Burgers", price:250},
  {name:"Chicken Burger", cat:"Burgers", price:170},
  {name:"Simple Burger", cat:"Burgers", price:150},

  /* ---- Juices / Shakes (prices not visible on menu — set to 0, edit in Owner panel) ---- */
  customVariants("Mango Shake", "Juices & Shakes", {Small:0, Large:0}),
  customVariants("Apple Shake", "Juices & Shakes", {Small:0, Large:0}),
  customVariants("Banana Shake", "Juices & Shakes", {Small:0, Large:0}),
  customVariants("Mint Margreta", "Juices & Shakes", {Small:0, Large:0}),
  customVariants("Khoya Khajoor", "Juices & Shakes", {Small:0, Large:0}),
  customVariants("Strawberry Shake", "Juices & Shakes", {Small:0, Large:0}),

  /* ---- Biryani (prices not visible — set to 0) ---- */
  halfFull("Simple Biryani", "Biryani", 0, 0),
  halfFull("Chicken Biryani", "Biryani", 0, 0),

  /* ---- Coffee & Tea (prices not visible — set to 0) ---- */
  halfFull("Tea", "Coffee & Tea", 0, 0),
  halfFull("Green Tea", "Coffee & Tea", 0, 0),
  halfFull("Coffee", "Coffee & Tea", 0, 0),

  /* ---- Cold Drinks (each size its own price — all set to 0, edit in Owner panel) ---- */
  customVariants("Cold Drink", "Cold Drinks", {
    "250ml": 0,
    "500ml": 0,
    "1L": 0,
    "1.5L": 0,
    "2.25L": 0,
    "2.5L": 0
  }),

  /* ---- Special Pizza ---- */
  customVariants("Crown Crust Pizza", "Special Pizza", {Medium:1299, Large:1599, XL:2199}),
  pizza("Kabab Stuffer Pizza", "Special Pizza", 699, 1299, 1599, 2199),
  pizza("Chicken Shahi Pizza", "Special Pizza", 699, 1299, 1599, 2199),
  pizza("Bonfire Pizza", "Special Pizza", 699, 1299, 1599, 2199),
  pizza("Behari Kabab Pizza", "Special Pizza", 699, 1299, 1599, 2199),
  pizza("Chicken Cheese Crust Pizza", "Special Pizza", 699, 1299, 1599, 2199),
  pizza("Mughlai Special Pizza", "Special Pizza", 699, 1299, 1599, 2199),
  pizza("Chicken Lasagna Pizza", "Special Pizza", 699, 1299, 1599, 2199),
  pizza("Chicken Malai Boti Pizza", "Special Pizza", 699, 1299, 1599, 2199),
  customVariants("Steak Pizza", "Special Pizza", {Medium:1299, Large:1599, XL:2199}),
  pizza("Chicken Seekh Kabab Pizza", "Special Pizza", 699, 1299, 1599, 2199),
  pizza("Peri Peri Pizza", "Special Pizza", 699, 1299, 1599, 2199),

  /* ---- Extra Toppings / Cheese / Veggies (Medium/Large/XL only) ---- */
  customVariants("Extra Toppings", "Extras", {Medium:100, Large:100, XL:100}),
  customVariants("Extra Cheese", "Extras", {Medium:100, Large:100, XL:100}),
  customVariants("Extra Veggies", "Extras", {Medium:100, Large:100, XL:100}),

  /* ---- Regular Pizza ---- */
  pizza("Chicken Fajita Pizza", "Regular Pizza", 500, 1099, 1499, 2099),
  pizza("Chicken Tikka Pizza", "Regular Pizza", 500, 1099, 1499, 2099),
  pizza("Hot & Spicy Pizza", "Regular Pizza", 500, 1099, 1499, 2099),
  pizza("Chicken Achari Pizza", "Regular Pizza", 500, 1099, 1499, 2099),
  pizza("Chicken Supreme Pizza", "Regular Pizza", 500, 1099, 1499, 2099),
  pizza("Veg Lovers Pizza", "Regular Pizza", 500, 900, 1200, 1700),
  pizza("Cheese Lovers Pizza", "Regular Pizza", 500, 900, 1200, 1700),

  /* ---- Shawarma ---- */
  customVariants("Shawarma", "Shawarma", {Small:150, Large:200}),
  {name:"Plater Shawarma", cat:"Shawarma", price:349},

  /* ---- Paratha & Wrap ---- */
  {name:"Chicken Paratha Roll", cat:"Rolls & Wraps", price:200},
  {name:"Chicken Cheese Roll", cat:"Rolls & Wraps", price:250},
  {name:"Chicken Kabab Roll", cat:"Rolls & Wraps", price:250},
  {name:"Zinger Roll", cat:"Rolls & Wraps", price:250},
  {name:"Crispy Wrap", cat:"Rolls & Wraps", price:300},
  {name:"Special Wrap", cat:"Rolls & Wraps", price:350},

  /* ---- Sandwiches ---- */
  {name:"Club Sandwich", cat:"Sandwiches", price:400},
  {name:"B.B.Q Sandwich", cat:"Sandwiches", price:300},

  /* ---- Broast (prices not visible — set to 0) ---- */
  {name:"Broast Leg Piece", cat:"Broast", price:0},
  {name:"Broast Chest Piece", cat:"Broast", price:0},
  {name:"Broast Drum Stick", cat:"Broast", price:0},

  /* ---- Burger Deals ---- */
  {name:"Zinger Deal 1 (1 Zinger + 250ml Drink)", cat:"Burger Deals", price:430},
  {name:"Zinger Deal 2 (2 Zinger + 500ml Drink + Regular Fries)", cat:"Burger Deals", price:949},
  {name:"Zinger Deal 3 (3 Zinger + Regular Fries + 1L Drink)", cat:"Burger Deals", price:1350},
  {name:"Zinger Deal 4 (2 Zinger + 6 Hot Wings + 6 Regular Fries + 1.5L Drink)", cat:"Burger Deals", price:1500},
  {name:"Family Deal (5 Zinger + Family Fries + 2.25L Drink)", cat:"Burger Deals", price:2199},

  /* ---- Pizza Deals ---- */
  {name:"Pizza Deal 1 (Large + Medium Pizza + Fries + 1.5L Drink)", cat:"Pizza Deals", price:2750},
  {name:"Pizza Deal 2 (2 Medium Pizza + 1.5L Drink)", cat:"Pizza Deals", price:2350},
  {name:"Pizza Deal 3 (4 Small Pizza + 1.5L Drink)", cat:"Pizza Deals", price:1999},
  {name:"Pizza Deal 4 (Small + Medium Pizza + 12 Hot Wings + 1.5L Drink)", cat:"Pizza Deals", price:2099},
  {name:"Pizza Combo Deal (Medium Pizza + Zinger + Small Creamy Crunchy Pasta + 1.5L Drink)", cat:"Pizza Deals", price:1900},
  {name:"Birthday Pizza Deal (2 Large Pizza + 12 Hot Wings + 12 Nuggets + Family Fries + 2.25L Drink + Gift)", cat:"Pizza Deals", price:4700},

  /* ---- Other Deals ---- */
  {name:"Yaari Deal (2 Small Shawarma + 6 Hot Wings + 6 Nuggets + Regular Fries + 2.25L Drink)", cat:"Other Deals", price:1599},
];
let EXTRA_CATEGORIES = []; // categories the owner has created that may not have products yet
function getCategories(){
  return [...new Set([...PRODUCTS.map(p=>p.cat), ...EXTRA_CATEGORIES])];
}
function getCategoriesWithAll(){
  return ["All", ...getCategories()];
}

/* ---------------- PRICE OVERRIDES (Owner-editable, saved in browser) ---------------- */
const PRICE_OVERRIDE_KEY = "alhamd_price_overrides";
function loadPriceOverrides(){
  try{
    const raw = localStorage.getItem(PRICE_OVERRIDE_KEY);
    if(!raw) return;
    const overrides = JSON.parse(raw);
    PRODUCTS.forEach(p => { if(overrides[p.name] !== undefined) p.price = overrides[p.name]; });
  }catch(e){ /* ignore corrupt storage */ }
}
function savePriceOverrides(){
  try{
    const overrides = {};
    PRODUCTS.forEach(p => { overrides[p.name] = p.price; });
    localStorage.setItem(PRICE_OVERRIDE_KEY, JSON.stringify(overrides));
  }catch(e){ /* ignore storage errors */ }
}

const RESTAURANT_LOGO = "images/logo-main.jpg";

let currentRole = "salesman";
let currentUser = null;
let bill = []; // {name, price, qty}
let sales = []; // {billNo, date, dateStr, cashier, items:[...], subtotal, deliveryCharge, total}
let expenses = []; // {expenseNo, date, description, amount, addedBy}
let activeCat = "All";

/* ---------------- CLOUD SYNC (Firebase Firestore — real database) ---------------- */
let cloudSyncStatus = "idle"; // idle | loading | ok | error
const salesCollection = db.collection("sales");

/* ---- Real-time Firestore storage usage estimate (feeds the notification bell) ----
   Firestore doesn't expose "% of 1GiB used" through any client-side API, so this
   estimates it from the JSON size of documents already being synced live below —
   no extra reads or writes are made just for this estimate. */
const FIRESTORE_USAGE_ESTIMATE = { salesBytes: 0, expensesBytes: 0, settingsBytes: 0 };
function estimateBytes(obj){
  try{ return new TextEncoder().encode(JSON.stringify(obj)).length; }
  catch(e){ return JSON.stringify(obj).length; }
}
function notifyStorageUsageChanged(){
  if(typeof NotificationSystem !== 'undefined') NotificationSystem.refresh();
}

function cloudConfigured(){
  return true; // Firebase is always configured once the config above is filled in
}

// Live sync: any bill added/removed on ANY device updates every open POS instantly.
salesCollection.orderBy("date", "desc").onSnapshot((snapshot) => {
  sales = snapshot.docs.map(doc => {
    const d = doc.data();
    return {
      billNo: d.billNo,
      date: d.date && d.date.toDate ? d.date.toDate() : new Date(d.date),
      cashier: d.cashier,
      cashierUsername: d.cashierUsername,
      items: d.items || [],
      subtotal: Number(d.subtotal) || 0,
      deliveryCharge: Number(d.deliveryCharge) || 0,
      discountPercent: Number(d.discountPercent) || 0,
      discount: Number(d.discount) || 0,
      total: Number(d.total) || 0,
      paymentMethod: d.paymentMethod === 'online' ? 'online' : 'cash',
      paymentStatus: d.paymentStatus === 'pending' ? 'pending' : 'paid',
      orderType: d.orderType || 'Dine In',
      customerNumber: d.customerNumber || ''
    };
  });
  FIRESTORE_USAGE_ESTIMATE.salesBytes = snapshot.docs.reduce((sum, doc) => sum + estimateBytes(doc.data()), 0);
  notifyStorageUsageChanged();
  cloudSyncStatus = "ok";
  updateCloudStatusUI();
  if(currentUser && currentUser.role === "owner") renderOwnerDashboard();
}, (err) => {
  console.error("Cloud sync (listen) failed:", err);
  cloudSyncStatus = "error";
  updateCloudStatusUI();
});

function syncSaleToCloud(sale){
  salesCollection.doc(String(sale.billNo)).set({
    billNo: sale.billNo,
    date: sale.date.toISOString(),
    cashier: sale.cashier,
    cashierUsername: sale.cashierUsername,
    items: sale.items,
    subtotal: sale.subtotal,
    deliveryCharge: sale.deliveryCharge,
    discountPercent: sale.discountPercent,
    discount: sale.discount,
    total: sale.total,
    paymentMethod: sale.paymentMethod || 'cash',
    paymentStatus: sale.paymentStatus || 'paid',
    orderType: sale.orderType || 'Dine In',
    customerNumber: sale.customerNumber || ''
  }).catch(err => console.error("Cloud sync (save) failed:", err));
}

function markBillPaid(billNo){
  const sale = sales.find(s => s.billNo === billNo);
  if(!sale) return;
  showConfirmModal(
    'Mark as Paid?',
    'Bill ' + billNo + ' (Rs ' + sale.total + ') will be marked as paid and moved out of the unpaid list.',
    '✅ Yes, Mark Paid',
    function(){
      const prevStatus = sale.paymentStatus;
      sale.paymentStatus = 'paid';
      salesCollection.doc(String(billNo)).update({ paymentStatus: 'paid' })
        .then(() => {
          renderUnpaidBills();
          renderSalesReport();
        })
        .catch(err => {
          console.error("Cloud sync (mark paid) failed:", err);
          sale.paymentStatus = prevStatus;
          alert("Couldn't mark this bill as paid — check your connection and try again.");
          renderUnpaidBills();
        });
    },
    '✅'
  );
}

function syncDeleteToCloud(billNo){
  salesCollection.doc(String(billNo)).delete()
    .catch(err => console.error("Cloud sync (delete) failed:", err));
}

async function loadSalesFromCloud(){
  // No-op now: the onSnapshot listener above keeps `sales` live automatically.
  // Kept as a function so the existing "🔄 Refresh" button still works without errors.
}
/* ---------------- EXPENSE CLOUD SYNC (Firebase Firestore) ---------------- */
const expensesCollection = db.collection("expenses");

expensesCollection.orderBy("date", "desc").onSnapshot((snapshot) => {
  expenses = snapshot.docs.map(doc => {
    const d = doc.data();
    return {
      expenseNo: d.expenseNo,
      date: d.date && d.date.toDate ? d.date.toDate() : new Date(d.date),
      description: d.description,
      amount: Number(d.amount) || 0,
      addedBy: d.addedBy,
      addedByUsername: d.addedByUsername,
      paymentMethod: d.paymentMethod || 'cash'
    };
  });
  FIRESTORE_USAGE_ESTIMATE.expensesBytes = snapshot.docs.reduce((sum, doc) => sum + estimateBytes(doc.data()), 0);
  notifyStorageUsageChanged();
  renderExpensesSalesman();
  if(currentUser && currentUser.role === "owner") renderOwnerDashboard();
}, (err) => {
  console.error("Expense cloud sync (listen) failed:", err);
});

function syncExpenseToCloud(expense){
  expensesCollection.doc(String(expense.expenseNo)).set({
    expenseNo: expense.expenseNo,
    date: expense.date.toISOString(),
    description: expense.description,
    amount: expense.amount,
    addedBy: expense.addedBy,
    addedByUsername: expense.addedByUsername,
    paymentMethod: expense.paymentMethod || 'cash'
  }).catch(err => console.error("Expense cloud sync (save) failed:", err));
}

function syncDeleteExpenseToCloud(expenseNo){
  expensesCollection.doc(String(expenseNo)).delete()
    .catch(err => console.error("Expense cloud sync (delete) failed:", err));
}

function updateCloudStatusUI(){
  const el = document.getElementById('cloudSyncStatus');
  if(!el) return;
  if(!cloudConfigured()){
    el.textContent = "☁️ Cloud sync not set up yet";
    el.style.color = "#b08900";
  } else if(cloudSyncStatus === "loading"){
    el.textContent = "☁️ Syncing…";
    el.style.color = "#888";
  } else if(cloudSyncStatus === "ok"){
    el.textContent = "☁️ Synced";
    el.style.color = "#2e7d32";
  } else if(cloudSyncStatus === "error"){
    el.textContent = "☁️ Sync failed — check connection";
    el.style.color = "#c62828";
  }
}

/* ---------------- SETTINGS CLOUD SYNC (Firebase Firestore) ---------------- */
const settingsDocRef = db.collection("settings").doc("main");

settingsDocRef.onSnapshot((doc) => {
  if (!doc.exists) return;
  const d = doc.data();

  if (d.products && d.products.length) {
    PRODUCTS.length = 0;
    d.products.forEach(p => PRODUCTS.push(p));
  }
  if (d.extraCategories) {
    EXTRA_CATEGORIES.length = 0;
    d.extraCategories.forEach(c => EXTRA_CATEGORIES.push(c));
  }
  if (typeof d.deliveryChargeAmount === 'number') deliveryChargeAmount = d.deliveryChargeAmount;
  if (typeof d.deliveryEnabled === 'boolean') deliveryEnabled = d.deliveryEnabled;
  if (typeof d.theme === 'string') currentTheme = d.theme;
  if (d.salesmanUsername) SALESMEN[0].username = d.salesmanUsername;
  if (d.salesmanPassword) SALESMEN[0].password = d.salesmanPassword;
  if (d.salesmanPhoto) SALESMEN[0].photo = d.salesmanPhoto;
  if (typeof d.salesmanDisplayName === 'string') {
    try{ localStorage.setItem(SALESMAN_NAME_KEY, d.salesmanDisplayName); }catch(e){}
    if(currentUser && currentUser.role === 'salesman'){
      currentUser.name = d.salesmanDisplayName;
      const profileNameEl = document.getElementById('profileName');
      if(profileNameEl) profileNameEl.textContent = d.salesmanDisplayName || 'Salesman';
    }
    const saleField = document.getElementById('salesmanNameInput');
    if(saleField) saleField.value = d.salesmanDisplayName;
    const expField = document.getElementById('expenseSalesmanNameInput');
    if(expField) expField.value = d.salesmanDisplayName;
  }
  if (d.ownerUsername) OWNER_ACCOUNT.username = d.ownerUsername;
  if (d.ownerPassword) OWNER_ACCOUNT.password = d.ownerPassword;
  if (d.ownerPhoto) OWNER_ACCOUNT.photo = d.ownerPhoto;
  if (d.ownerName) {
    OWNER_ACCOUNT.name = d.ownerName;
  }
  if (d.ownerRole) {
    OWNER_ACCOUNT.role = d.ownerRole;
  }
  if (d.adminUsername) SECOND_ADMIN_ACCOUNT.username = d.adminUsername;
  if (d.adminPassword) SECOND_ADMIN_ACCOUNT.password = d.adminPassword;
  if (d.adminPhoto) SECOND_ADMIN_ACCOUNT.photo = d.adminPhoto;
  if (d.adminName) SECOND_ADMIN_ACCOUNT.name = d.adminName;
  if (d.ownerName || d.ownerRole){
    if(currentUser && currentUser.role === 'owner' && currentOwnerAccountRef === OWNER_ACCOUNT){
      currentUser.name = OWNER_ACCOUNT.name;
      const ownerProfileNameEl = document.getElementById('ownerProfileName');
      if(ownerProfileNameEl) ownerProfileNameEl.textContent = OWNER_ACCOUNT.name;
      const ownerProfileRoleEl = document.getElementById('ownerProfileRole');
      if(ownerProfileRoleEl) ownerProfileRoleEl.textContent = OWNER_ACCOUNT.role || 'Owner';
      const ownerSubtitleEl = document.getElementById('ownerSubtitle');
      if(ownerSubtitleEl) ownerSubtitleEl.textContent = (OWNER_ACCOUNT.role || "Owner") + " Dashboard · " + OWNER_ACCOUNT.name;
    }
    renderAdminUsersList();
  }
  if (d.adminName){
    if(currentUser && currentUser.role === 'owner' && currentOwnerAccountRef === SECOND_ADMIN_ACCOUNT){
      currentUser.name = SECOND_ADMIN_ACCOUNT.name;
      const ownerProfileNameEl = document.getElementById('ownerProfileName');
      if(ownerProfileNameEl) ownerProfileNameEl.textContent = SECOND_ADMIN_ACCOUNT.name;
      const ownerSubtitleEl = document.getElementById('ownerSubtitle');
      if(ownerSubtitleEl) ownerSubtitleEl.textContent = SECOND_ADMIN_ACCOUNT.role + " Dashboard · " + SECOND_ADMIN_ACCOUNT.name;
    }
    renderAdminUsersList();
  }
  document.querySelectorAll('#salesmanProfileImgBtn, #salesmanProfileImgLarge').forEach(function(img){ if(SALESMEN[0].photo) img.src = SALESMEN[0].photo; });
  if(currentOwnerAccountRef === OWNER_ACCOUNT){
    document.querySelectorAll('#ownerProfileImgBtn, #ownerProfileImgLarge').forEach(function(img){ if(OWNER_ACCOUNT.photo) img.src = OWNER_ACCOUNT.photo; });
  } else if(currentOwnerAccountRef === SECOND_ADMIN_ACCOUNT){
    document.querySelectorAll('#ownerProfileImgBtn, #ownerProfileImgLarge').forEach(function(img){ if(SECOND_ADMIN_ACCOUNT.photo) img.src = SECOND_ADMIN_ACCOUNT.photo; });
  }

  FIRESTORE_USAGE_ESTIMATE.settingsBytes = estimateBytes(d);
  notifyStorageUsageChanged();

  // Re-render whatever is currently on screen so the change shows instantly
  renderCategories();
  if (document.getElementById('productGrid')) renderProducts();
  refreshDeliveryChargeUI();
  refreshThemeSettingUI();
  if (currentUser && currentUser.role === 'owner') {
    renderPriceManager();
    pmRefreshCategorySelect();
    pmRenderCategoryManager();
    renderProductManagerList();
    renderCredentialsManager();
  }
  renderBill();
}, (err) => console.error("Settings sync (listen) failed:", err));

function pushSettingsToCloud(partial) {
  settingsDocRef.set(partial, { merge: true })
    .catch(err => console.error("Settings sync (write) failed:", err));
}

/* ---------------- WEBSITE THEME (Independence Day toggle, synced via settings/main.theme) ----------------
   The ordering website (js/menu.js) listens to the same settings/main document and reads
   this field to switch its whole color palette + show/hide the "14 August" banner.
--------------------------------------------------------------------- */
let currentTheme = "default"; // "default" | "independence_day"

function updateThemeSetting(themeValue){
  currentTheme = themeValue;
  pushSettingsToCloud({ theme: themeValue });
  refreshThemeSettingUI();
  const tag = document.getElementById('themeSavedTag');
  if(tag){
    tag.classList.add('show');
    setTimeout(() => tag.classList.remove('show'), 1400);
  }
}
function refreshThemeSettingUI(){
  const label = document.getElementById('themeCurrentLabel');
  if(label) label.textContent = currentTheme === 'independence_day' ? 'Independence Day 🇵🇰' : 'Default';
  const btnInd = document.getElementById('themeBtnIndependence');
  const btnDef = document.getElementById('themeBtnDefault');
  if(btnInd) btnInd.style.outline = currentTheme === 'independence_day' ? '3px solid #0F7D3B' : 'none';
  if(btnDef) btnDef.style.outline = currentTheme !== 'independence_day' ? '3px solid #444' : 'none';
}

/* ---------------- DELIVERY CHARGE (Owner-editable, saved in browser) ---------------- */
const DELIVERY_CHARGE_KEY = "alhamd_delivery_charge";
const DELIVERY_ENABLED_KEY = "alhamd_delivery_enabled";
let deliveryChargeAmount = 250;
let deliveryEnabled = true;
let selectedDeliveryOption = "free"; // "free" | "paid"
let discountApplied = false;
let selectedPaymentMethod = "cash"; // "cash" | "online"
let discountPercent = 0;

function loadDeliveryCharge(){
  try{
    const raw = localStorage.getItem(DELIVERY_CHARGE_KEY);
    if(raw === null) return;
    const v = parseFloat(raw);
    if(!isNaN(v) && v >= 0) deliveryChargeAmount = v;
  }catch(e){ /* ignore corrupt storage */ }
}
function saveDeliveryCharge(){
  try{ localStorage.setItem(DELIVERY_CHARGE_KEY, String(deliveryChargeAmount)); }
  catch(e){ /* ignore storage errors */ }
}
function loadDeliveryEnabled(){
  try{
    const raw = localStorage.getItem(DELIVERY_ENABLED_KEY);
    if(raw === null) return;
    deliveryEnabled = raw === "true";
  }catch(e){ /* ignore corrupt storage */ }
}
function saveDeliveryEnabled(){
  try{ localStorage.setItem(DELIVERY_ENABLED_KEY, String(deliveryEnabled)); }
  catch(e){ /* ignore storage errors */ }
}
function refreshDeliveryChargeUI(){
  const label = document.getElementById('deliveryAmountLabel');
  if(label) label.textContent = deliveryChargeAmount;
  const settingInput = document.getElementById('deliveryChargeSettingInput');
  if(settingInput) settingInput.value = deliveryChargeAmount;
  const toggle = document.getElementById('deliveryEnabledToggle');
  if(toggle) toggle.checked = deliveryEnabled;
  const row = document.getElementById('deliveryRow');
  if(row) row.classList.toggle('hidden', !deliveryEnabled);
}
function updateDeliveryChargeSetting(value){
  const v = Math.max(0, Math.round(parseFloat(value) || 0));
  deliveryChargeAmount = v;
  saveDeliveryCharge();
  refreshDeliveryChargeUI();
  renderBill();
  const tag = document.getElementById('deliveryChargeSavedTag');
  if(tag){
    tag.classList.add('show');
    setTimeout(() => tag.classList.remove('show'), 1400);
  }
}
function updateDeliveryEnabled(checked){
  deliveryEnabled = checked;
  saveDeliveryEnabled();
  if(!deliveryEnabled) setDeliveryOption('free');
  refreshDeliveryChargeUI();
  renderBill();
}
function setPaymentMethod(method){
  selectedPaymentMethod = method;
  const cashBtn = document.getElementById('payMethodCash');
  const onlineBtn = document.getElementById('payMethodOnline');
  if(cashBtn) cashBtn.classList.toggle('active', method === 'cash');
  if(onlineBtn) onlineBtn.classList.toggle('active', method === 'online');
}

let selectedPaymentStatus = "paid"; // "paid" | "pending"
function setPaymentStatus(status){
  selectedPaymentStatus = status;
  const paidBtn = document.getElementById('payStatusPaid');
  const pendingBtn = document.getElementById('payStatusPending');
  if(paidBtn) paidBtn.classList.toggle('active', status === 'paid');
  if(pendingBtn) pendingBtn.classList.toggle('active', status === 'pending');
}

let selectedExpensePaymentMethod = "cash"; // "cash" | "online"
function setExpensePaymentMethod(method){
  selectedExpensePaymentMethod = method;
  const cashBtn = document.getElementById('expPayMethodCash');
  const onlineBtn = document.getElementById('expPayMethodOnline');
  if(cashBtn) cashBtn.classList.toggle('active', method === 'cash');
  if(onlineBtn) onlineBtn.classList.toggle('active', method === 'online');
}

function setDeliveryOption(opt){
  if(!deliveryEnabled) opt = "free";
  selectedDeliveryOption = opt;
  const toggleSwitch = document.getElementById('deliveryToggleSwitch');
  if(toggleSwitch) toggleSwitch.checked = (opt === 'paid');
  renderBill();
}

/* ---------------- DISCOUNT (percent, manually entered by salesman per-bill) ---------------- */
function setDiscountOption(checked){
  discountApplied = checked;
  const wrap = document.getElementById('discountAmountWrap');
  if(wrap) wrap.classList.toggle('hidden', !checked);
  if(!checked){
    discountPercent = 0;
    const input = document.getElementById('discountAmountInput');
    if(input) input.value = '';
  }
  renderBill();
}

function updateDiscountAmount(value){
  let v = parseFloat(value);
  if(isNaN(v) || v < 0) v = 0;
  if(v > 100) v = 100;
  discountPercent = v;
  renderBill();
}

function resetDiscount(){
  discountApplied = false;
  discountPercent = 0;
  const toggle = document.getElementById('discountToggleSwitch');
  if(toggle) toggle.checked = false;
  const wrap = document.getElementById('discountAmountWrap');
  if(wrap) wrap.classList.add('hidden');
  const input = document.getElementById('discountAmountInput');
  if(input) input.value = '';
}

/* ---------------- HEADER NAV: ADD SALE / ADD EXPENSE ---------------- */
function showSaleSection(){
  document.getElementById('expenseModal').classList.add('hidden');
  const saleBtn = document.getElementById('navAddSaleBtn');
  const expBtn = document.getElementById('navAddExpenseBtn');
  if(saleBtn) saleBtn.classList.add('active');
  if(expBtn) expBtn.classList.remove('active');
}
function openExpenseModal(){
  renderExpensesSalesman();
  const expNameField = document.getElementById('expenseSalesmanNameInput');
  if(expNameField){
    expNameField.value = currentUser ? currentUser.name : '';
  }
  document.getElementById('expenseModal').classList.remove('hidden');
  const saleBtn = document.getElementById('navAddSaleBtn');
  const expBtn = document.getElementById('navAddExpenseBtn');
  if(saleBtn) saleBtn.classList.remove('active');
  if(expBtn) expBtn.classList.add('active');
}
function closeExpenseModal(){
  showSaleSection();
}

/* ---------------- DAILY EXPENSES (added by salesman, visible to owner) ---------------- */
function addExpense(){
  const descInput = document.getElementById('expenseDescInput');
  const amtInput = document.getElementById('expenseAmountInput');
  const desc = descInput.value.trim();
  const amt = Math.max(0, Math.round(parseFloat(amtInput.value) || 0));
  if(!desc || amt <= 0) return;
  if(!(currentUser && currentUser.name && currentUser.name.trim())){
    alert('Please enter your name first (on the Add Sale screen) so it can be added to this expense.');
    closeExpenseModal();
    const nameInput = document.getElementById('salesmanNameInput');
    if(nameInput) nameInput.focus();
    return;
  }
  const addedBy = currentUser ? currentUser.name : 'Salesman';
  const addedByUsername = currentUser ? currentUser.username : '';
  const expenseNo = "E-" + Math.floor(100000 + Math.random()*899999);
const newExpense = { expenseNo, date: new Date(), description: desc, amount: amt, addedBy, addedByUsername, paymentMethod: selectedExpensePaymentMethod };
expenses.push(newExpense);
syncExpenseToCloud(newExpense);  descInput.value = '';
  amtInput.value = '';
  setExpensePaymentMethod('cash');
  renderExpensesSalesman();
}

function deleteExpense(expenseNo){
  if(!currentUser) return;
  if(currentUser.role === 'salesman'){
    const target = expenses.find(e => e.expenseNo === expenseNo);
    if(!target || target.addedByUsername !== currentUser.username) return; // salesmen may only delete their own
  }
  expenses = expenses.filter(e => e.expenseNo !== expenseNo);
syncDeleteExpenseToCloud(expenseNo);
renderExpensesSalesman();
  if(currentUser.role === 'owner') renderOwnerDashboard();
}

function ownerDeleteExpense(expenseNo){
  if(!currentUser || currentUser.role !== 'owner') return;
  if(!confirm('Delete this expense record permanently?')) return;
 expenses = expenses.filter(e => e.expenseNo !== expenseNo);
syncDeleteExpenseToCloud(expenseNo);
renderOwnerDashboard();
}

function deleteSale(billNo){
  if(!currentUser || currentUser.role !== 'owner') return;
  if(!confirm('Delete bill ' + billNo + ' permanently? This cannot be undone.')) return;
  sales = sales.filter(s => s.billNo !== billNo);
  syncDeleteToCloud(billNo);
  renderOwnerDashboard();
}

function expensesTodayList(){
  const today = new Date();
  return expenses.filter(e => isSameDay(e.date, today));
}

function renderExpensesSalesman(){
  const body = document.getElementById('expenseTableBodySalesman');
  if(!body) return;
const todays = expensesTodayList();
  if(todays.length === 0){
    body.innerHTML = `<tr class="empty-row"><td colspan="6">No expenses added today.</td></tr>`;
  } else {
    body.innerHTML = todays.map(e => `
      <tr>
        <td>${formatTime(e.date)}</td>
        <td>${e.description}</td>
        <td>Rs ${e.amount}</td>
        <td>${(e.paymentMethod || 'cash') === 'online' ? '📲 Online' : '💵 Cash'}</td>
        <td>${e.addedBy}</td>
        <td><button class="expense-del-btn" onclick="deleteExpense('${e.expenseNo}')">✕</button></td>
      </tr>
    `).join('');
  }
  const total = expensesTodayList().reduce((s,e)=>s+e.amount,0);
  const totalEl = document.getElementById('expenseTodayTotalSalesman');
  if(totalEl) totalEl.textContent = `Rs ${total.toLocaleString()}`;
}

let expenseReportMode = 'daily';
function setExpenseReportMode(mode){
  expenseReportMode = mode;
  const sel = document.getElementById('expenseRangeSelect');
  if(sel) sel.value = mode;
  renderExpensesOwner();
}

function renderExpensesOwner(){
  const body = document.getElementById('expenseTableBodyOwner');
  if(!body) return;
  const dateInput = document.getElementById('expenseReportDateInput');
  let picked = new Date();
  if(dateInput){
    if(!dateInput.value){
      const t = new Date();
      dateInput.value = `${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,'0')}-${String(t.getDate()).padStart(2,'0')}`;
    }
    picked = new Date(dateInput.value + 'T00:00:00');
  }

  const matches = (d) => {
    if(expenseReportMode === 'daily') return isSameDay(d, picked);
    if(expenseReportMode === 'weekly') return isSameWeek(d, picked);
    if(expenseReportMode === 'monthly') return d.getFullYear() === picked.getFullYear() && d.getMonth() === picked.getMonth();
    return d.getFullYear() === picked.getFullYear();
  };

  const isToday = expenseReportMode === 'daily' && isSameDay(picked, new Date());
  const rangeLabel = { daily: formatDate(picked), weekly: 'This Week', monthly: 'This Month', yearly: 'This Year' }[expenseReportMode];
  const labelEl = document.getElementById('expenseGrandTotalLabel');
  if(labelEl) labelEl.textContent = isToday ? "Today's Total Expenses" : `Total Expenses — ${rangeLabel}`;

  const periodExpensesList = expenses.filter(e => matches(e.date));

  // Search only ever narrows down THIS period's results — it never reaches
  // into other days/weeks/months.
  const searchInput = document.getElementById('expenseSearchInput');
  const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
  const searchedExpensesList = searchTerm ? periodExpensesList.filter(e => {
    const haystack = [
      e.description, e.amount,
      (e.paymentMethod || 'cash') === 'online' ? 'online' : 'cash',
      e.addedBy, e.addedByUsername,
      formatTime(e.date), formatDate(e.date)
    ].filter(Boolean).join(' ').toLowerCase();
    return haystack.includes(searchTerm);
  }) : periodExpensesList;

  if(searchedExpensesList.length === 0){
    body.innerHTML = `<tr class="empty-row"><td colspan="7">${searchTerm ? "No matching expenses in this period." : (isToday ? "No expenses recorded today." : "No expenses recorded in this period.")}</td></tr>`;
  } else {
    body.innerHTML = searchedExpensesList.map(e => `
      <tr>
        <td>${formatDate(e.date)}</td>
        <td>${formatTime(e.date)}</td>
        <td>${e.description}</td>
        <td>Rs ${e.amount}</td>
        <td>${(e.paymentMethod || 'cash') === 'online' ? '📲 Online' : '💵 Cash'}</td>
        <td>${e.addedBy}</td>
        <td>
          <button class="view-btn" onclick="viewExpense('${e.expenseNo}')">👁</button>
          <button class="expense-del-btn" onclick="ownerDeleteExpense('${e.expenseNo}')">🗑️</button>
        </td>
      </tr>
    `).join('');
  }
  const periodTotal = searchedExpensesList.reduce((s,e)=>s+e.amount,0);
  const grandTotalEl = document.getElementById('expenseGrandTotalOwner');
  if(grandTotalEl) grandTotalEl.textContent = `Rs ${periodTotal.toLocaleString()}`;

  const allTimeTotal = expenses.reduce((s,e)=>s+e.amount,0);
  const statEl = document.getElementById('statExpenses');
  if(statEl) statEl.textContent = `Rs ${allTimeTotal.toLocaleString()}`;
}


/* ---------------- LOGIN ---------------- */
function selectRole(role){
  currentRole = role;
  document.getElementById('roleSalesmanBtn').classList.toggle('active', role==='salesman');
  document.getElementById('roleOwnerBtn').classList.toggle('active', role==='owner');
  document.getElementById('signInBtn').textContent = role==='salesman' ? 'Sign in as Salesman' : 'Sign in as Owner';
  document.getElementById('loginEmail').placeholder = role==='salesman' ? 'salesman' : 'owner';
}

function togglePasswordVisibility(){
  const pwInput = document.getElementById('loginPassword');
  const btn = document.getElementById('togglePasswordBtn');
  const isHidden = pwInput.type === 'password';
  pwInput.type = isHidden ? 'text' : 'password';
  btn.textContent = isHidden ? '🙈' : '👁️';
  btn.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
}

/* Only ONE shared salesman login now. Whoever is working that shift
   types their own name in the "Your Name" field once they sign in —
   that same name is then used automatically on bill receipts AND on
   any expense they add, so there's nothing to re-type. */
const SALESMEN = [
  { username: "salesman", password: "sales123", photo: "https://i.imgur.com/2DhmtJ4.png" }
];
const OWNER_ACCOUNT = { username: "owner", password: "owner123", name: "Choudhary ZAIN", role: "Owner", photo: "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEYIt1qafO-e6ZnF-pg4KEkP0VbMJMdzAACNykAAvjGUFfvNjFgP6k6oT0E.jpeg" };

/* Second admin — a real, separate login that lands on the same Owner
   dashboard, with its own "Admin" role. The Admin can change his own
   username/password/name/photo from Settings ▸ Admin Login Settings —
   but that block only ever renders when the Admin himself is signed
   in; the Owner never sees or can edit these credentials. */
const SECOND_ADMIN_ACCOUNT = { username: "zaid", password: "zaid123", name: "Zaid Ali", role: "Admin", photo: "" };

/* Which admin account is currently signed in — OWNER_ACCOUNT or
   SECOND_ADMIN_ACCOUNT — so credential edits only ever affect the
   account that's actually logged in, and so the Admin Login Settings
   block only shows for the Admin, never the Owner. */
let currentOwnerAccountRef = null;

/* Renders the Admin Users list in Settings: the primary owner login
   (kept live from OWNER_ACCOUNT, editable via the form below it)
   plus the second admin — a real login of its own, shown here for
   reference only. The Owner can see his name/role but never his
   username, password, or photo. */
function renderAdminUsersList(){
  const el = document.getElementById('adminUsersList');
  if(!el) return;
  el.innerHTML =
    '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border:1px solid #eee;border-radius:12px;margin-bottom:10px;">' +
      '<div><div style="font-weight:700;">' + (OWNER_ACCOUNT.name || 'Owner') + '</div>' +
      '<div style="color:#8a8a8a;font-size:13px;">' + (OWNER_ACCOUNT.role || 'Owner') + '</div></div>' +
      '<span style="font-size:12px;color:#1fae72;font-weight:600;">Editable below</span>' +
    '</div>' +
    '<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 14px;border:1px solid #eee;border-radius:12px;background:#fafafa;">' +
      '<div><div style="font-weight:700;">' + SECOND_ADMIN_ACCOUNT.name + '</div>' +
      '<div style="color:#8a8a8a;font-size:13px;">' + SECOND_ADMIN_ACCOUNT.role + '</div></div>' +
      '<span style="font-size:12px;color:#8a8a8a;font-weight:600;">🔒 Separate login — credentials hidden from Admin</span>' +
    '</div>';
}
const SALESMAN_NAME_KEY = "alhamd_salesman_last_name";
const CREDENTIALS_KEY = "alhamd_login_credentials";

/* Remembers WHO is logged in (role + which account) so that a page
   refresh (F5) can put the user straight back on their own screen
   instead of bouncing them back to the login page. Only a role/account
   marker is saved here — never a password. */
const SESSION_KEY = "alhamd_pos_session";
function saveSession(session){
  try{ localStorage.setItem(SESSION_KEY, JSON.stringify(session)); }catch(e){ /* ignore storage errors */ }
}
function clearSession(){
  try{ localStorage.removeItem(SESSION_KEY); }catch(e){ /* ignore storage errors */ }
}

/* Loads any saved username/password changes the owner made, so they
   survive a page refresh. Falls back to the defaults above if none saved. */
function loadCredentials(){
  try{
    const raw = localStorage.getItem(CREDENTIALS_KEY);
    if(!raw) return;
    const saved = JSON.parse(raw);
    if(saved.salesman){
      if(saved.salesman.username) SALESMEN[0].username = saved.salesman.username;
      if(saved.salesman.password) SALESMEN[0].password = saved.salesman.password;
      if(saved.salesman.photo) SALESMEN[0].photo = saved.salesman.photo;
    }
    if(saved.owner){
      if(saved.owner.username) OWNER_ACCOUNT.username = saved.owner.username;
      if(saved.owner.password) OWNER_ACCOUNT.password = saved.owner.password;
      if(saved.owner.photo) OWNER_ACCOUNT.photo = saved.owner.photo;
      if(saved.owner.name) OWNER_ACCOUNT.name = saved.owner.name;
      if(saved.owner.role) OWNER_ACCOUNT.role = saved.owner.role;
    }
    if(saved.admin){
      if(saved.admin.username) SECOND_ADMIN_ACCOUNT.username = saved.admin.username;
      if(saved.admin.password) SECOND_ADMIN_ACCOUNT.password = saved.admin.password;
      if(saved.admin.photo) SECOND_ADMIN_ACCOUNT.photo = saved.admin.photo;
      if(saved.admin.name) SECOND_ADMIN_ACCOUNT.name = saved.admin.name;
    }
  }catch(e){ /* ignore corrupt storage */ }
}

/* ---------------- LOGIN SETTINGS (Owner) ---------------- */
function renderCredentialsManager(){
  const sn = document.getElementById('credSalesmanName');
  const su = document.getElementById('credSalesmanUsername');
  const sp = document.getElementById('credSalesmanPassword');
  const sph = document.getElementById('credSalesmanPhoto');
  const on = document.getElementById('credOwnerName');
  const or_ = document.getElementById('credOwnerRole');
  const ou = document.getElementById('credOwnerUsername');
  const op = document.getElementById('credOwnerPassword');
  const oph = document.getElementById('credOwnerPhoto');
  if(sn){ let savedName = ''; try{ savedName = localStorage.getItem(SALESMAN_NAME_KEY) || ''; }catch(e){} sn.value = savedName; }
  if(su) su.value = SALESMEN[0].username;
  if(sp) sp.value = SALESMEN[0].password;
  if(sph) sph.value = SALESMEN[0].photo || '';
  if(on) on.value = OWNER_ACCOUNT.name || '';
  if(or_) or_.value = OWNER_ACCOUNT.role || 'Owner';
  if(ou) ou.value = OWNER_ACCOUNT.username;
  if(op) op.value = OWNER_ACCOUNT.password;
  if(oph) oph.value = OWNER_ACCOUNT.photo || '';
  const sMsg = document.getElementById('credSalesmanMsg');
  const oMsg = document.getElementById('credOwnerMsg');
  if(sMsg) sMsg.textContent = '';
  if(oMsg) oMsg.textContent = '';

  /* Admin Login Settings only ever render for the Admin himself —
     the Owner never sees this block or the Admin's credentials. */
  const adminBlock = document.getElementById('adminLoginSettingsBlock');
  if(adminBlock){
    if(currentOwnerAccountRef === SECOND_ADMIN_ACCOUNT){
      adminBlock.classList.remove('hidden');
      const an = document.getElementById('credAdminName');
      const au = document.getElementById('credAdminUsername');
      const ap = document.getElementById('credAdminPassword');
      const aph = document.getElementById('credAdminPhoto');
      if(an) an.value = SECOND_ADMIN_ACCOUNT.name || '';
      if(au) au.value = SECOND_ADMIN_ACCOUNT.username;
      if(ap) ap.value = SECOND_ADMIN_ACCOUNT.password;
      if(aph) aph.value = SECOND_ADMIN_ACCOUNT.photo || '';
      const aMsg = document.getElementById('credAdminMsg');
      if(aMsg) aMsg.textContent = '';
    } else {
      adminBlock.classList.add('hidden');
    }
  }
  renderAdminUsersList();
}

function updateAdminCredentials(){
  /* Safety check: this can only ever change SECOND_ADMIN_ACCOUNT, and
     only while the Admin himself is signed in — the Owner has no path
     to this function since the block is hidden for him. */
  if(currentOwnerAccountRef !== SECOND_ADMIN_ACCOUNT) return;
  const nEl = document.getElementById('credAdminName');
  const uEl = document.getElementById('credAdminUsername');
  const pEl = document.getElementById('credAdminPassword');
  const phEl = document.getElementById('credAdminPhoto');
  const msgEl = document.getElementById('credAdminMsg');
  const name = nEl ? nEl.value.trim() : '';
  const username = uEl.value.trim();
  const password = pEl.value.trim();
  const photo = phEl ? phEl.value.trim() : '';
  if(!username || !password){
    if(msgEl){ msgEl.textContent = 'Username and password cannot be empty.'; msgEl.style.color = 'var(--ember)'; }
    return;
  }
  if(name) SECOND_ADMIN_ACCOUNT.name = name;
  SECOND_ADMIN_ACCOUNT.username = username;
  SECOND_ADMIN_ACCOUNT.password = password;
  if(photo) SECOND_ADMIN_ACCOUNT.photo = photo;
  if(currentUser && currentUser.role === 'owner' && currentOwnerAccountRef === SECOND_ADMIN_ACCOUNT){
    currentUser.name = SECOND_ADMIN_ACCOUNT.name;
    const ownerProfileNameEl = document.getElementById('ownerProfileName');
    if(ownerProfileNameEl) ownerProfileNameEl.textContent = SECOND_ADMIN_ACCOUNT.name;
    const ownerProfileRoleEl = document.getElementById('ownerProfileRole');
    if(ownerProfileRoleEl) ownerProfileRoleEl.textContent = SECOND_ADMIN_ACCOUNT.role;
    const ownerSubtitleEl = document.getElementById('ownerSubtitle');
    if(ownerSubtitleEl) ownerSubtitleEl.textContent = SECOND_ADMIN_ACCOUNT.role + " Dashboard · " + SECOND_ADMIN_ACCOUNT.name;
    const btnImg = document.getElementById('ownerProfileImgBtn');
    const largeImg = document.getElementById('ownerProfileImgLarge');
    if(btnImg && SECOND_ADMIN_ACCOUNT.photo) btnImg.src = SECOND_ADMIN_ACCOUNT.photo;
    if(largeImg && SECOND_ADMIN_ACCOUNT.photo) largeImg.src = SECOND_ADMIN_ACCOUNT.photo;
  }
  saveCredentials();
  renderAdminUsersList();
  if(msgEl){ msgEl.textContent = 'Admin login updated ✓ (use it next time you sign in)'; msgEl.style.color = '#1fae72'; }
}

function updateSalesmanCredentials(){
  const nEl = document.getElementById('credSalesmanName');
  const uEl = document.getElementById('credSalesmanUsername');
  const pEl = document.getElementById('credSalesmanPassword');
  const phEl = document.getElementById('credSalesmanPhoto');
  const msgEl = document.getElementById('credSalesmanMsg');
  const name = nEl ? nEl.value.trim() : '';
  const username = uEl.value.trim();
  const password = pEl.value.trim();
  const photo = phEl ? phEl.value.trim() : '';
  if(!username || !password){
    if(msgEl){ msgEl.textContent = 'Username and password cannot be empty.'; msgEl.style.color = 'var(--ember)'; }
    return;
  }
  SALESMEN[0].username = username;
  SALESMEN[0].password = password;
  if(photo) SALESMEN[0].photo = photo;
  try{ localStorage.setItem(SALESMAN_NAME_KEY, name); }catch(e){ /* ignore storage errors */ }
  if(currentUser && currentUser.role === 'salesman'){
    currentUser.name = name;
    const profileNameEl = document.getElementById('profileName');
    if(profileNameEl) profileNameEl.textContent = name || 'Salesman';
  }
  const saleField = document.getElementById('salesmanNameInput');
  if(saleField) saleField.value = name;
  const expField = document.getElementById('expenseSalesmanNameInput');
  if(expField) expField.value = name;
  const btnImg = document.getElementById('salesmanProfileImgBtn');
  const largeImg = document.getElementById('salesmanProfileImgLarge');
  if(btnImg && SALESMEN[0].photo) btnImg.src = SALESMEN[0].photo;
  if(largeImg && SALESMEN[0].photo) largeImg.src = SALESMEN[0].photo;
  saveCredentials();
  if(msgEl){ msgEl.textContent = 'Salesman login updated ✓'; msgEl.style.color = '#1fae72'; }
}

function updateOwnerCredentials(){
  const nEl = document.getElementById('credOwnerName');
  const rEl = document.getElementById('credOwnerRole');
  const uEl = document.getElementById('credOwnerUsername');
  const pEl = document.getElementById('credOwnerPassword');
  const phEl = document.getElementById('credOwnerPhoto');
  const msgEl = document.getElementById('credOwnerMsg');
  const name = nEl ? nEl.value.trim() : '';
  const role = rEl ? rEl.value.trim() : '';
  const username = uEl.value.trim();
  const password = pEl.value.trim();
  const photo = phEl ? phEl.value.trim() : '';
  if(!username || !password){
    if(msgEl){ msgEl.textContent = 'Username and password cannot be empty.'; msgEl.style.color = 'var(--ember)'; }
    return;
  }
  if(name) OWNER_ACCOUNT.name = name;
  OWNER_ACCOUNT.role = role || 'Owner';
  OWNER_ACCOUNT.username = username;
  OWNER_ACCOUNT.password = password;
  if(photo) OWNER_ACCOUNT.photo = photo;
  if(currentUser && currentUser.role === 'owner' && currentOwnerAccountRef === OWNER_ACCOUNT){
    currentUser.name = OWNER_ACCOUNT.name;
    const ownerProfileNameEl = document.getElementById('ownerProfileName');
    if(ownerProfileNameEl) ownerProfileNameEl.textContent = OWNER_ACCOUNT.name;
    const ownerProfileRoleEl = document.getElementById('ownerProfileRole');
    if(ownerProfileRoleEl) ownerProfileRoleEl.textContent = OWNER_ACCOUNT.role;
    const ownerSubtitleEl = document.getElementById('ownerSubtitle');
    if(ownerSubtitleEl) ownerSubtitleEl.textContent = OWNER_ACCOUNT.role + " Dashboard · " + OWNER_ACCOUNT.name;
    const btnImg = document.getElementById('ownerProfileImgBtn');
    const largeImg = document.getElementById('ownerProfileImgLarge');
    if(btnImg && OWNER_ACCOUNT.photo) btnImg.src = OWNER_ACCOUNT.photo;
    if(largeImg && OWNER_ACCOUNT.photo) largeImg.src = OWNER_ACCOUNT.photo;
  }
  saveCredentials();
  renderAdminUsersList();
  if(msgEl){ msgEl.textContent = 'Admin login updated ✓ (use it next time you sign in)'; msgEl.style.color = '#1fae72'; }
}

/* Keeps currentUser.name, the expense modal field, and localStorage
   all in sync whenever the salesman types/edits their name. */
function updateSalesmanName(value, fromExpenseModal){
  const name = value.trim();
  if(currentUser) currentUser.name = name;
  try{ localStorage.setItem(SALESMAN_NAME_KEY, name); }catch(e){ /* ignore storage errors */ }
  if(fromExpenseModal){
    const saleField = document.getElementById('salesmanNameInput');
    if(saleField) saleField.value = name;
  } else {
    const expField = document.getElementById('expenseSalesmanNameInput');
    if(expField) expField.value = name;
  }
}

function handleLogin(){
  const username = document.getElementById('loginEmail').value.trim();
  const pass = document.getElementById('loginPassword').value.trim();
  const errEl = document.getElementById('loginError');
  if(!username || !pass){
    errEl.textContent = "Please enter both username and password.";
    return;
  }
  if(currentRole === 'salesman'){
    const account = SALESMEN.find(s => s.username === username && s.password === pass);
    if(!account){
      errEl.textContent = "Invalid username or password.";
      return;
    }
    errEl.textContent = "";
    let savedName = "";
    try{ savedName = localStorage.getItem(SALESMAN_NAME_KEY) || ""; }catch(e){ /* ignore storage errors */ }
    currentUser = {name: savedName, username: account.username, role:"salesman"};
    saveSession({role:"salesman"});
    document.getElementById("profileName").textContent = currentUser.name || "Salesman";
document.getElementById("profileRole").textContent = "Salesman";
    if(account.photo){
      const btnImg = document.getElementById('salesmanProfileImgBtn');
      const largeImg = document.getElementById('salesmanProfileImgLarge');
      if(btnImg) btnImg.src = account.photo;
      if(largeImg) largeImg.src = account.photo;
    }
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('salesmanScreen').classList.remove('hidden');
    document.getElementById('salesmanSubtitle').textContent = "Salesman POS";
    const nameInput = document.getElementById('salesmanNameInput');
    if(nameInput){
      nameInput.value = savedName;
      nameInput.removeAttribute('readonly');
    }
    renderCategories();
    renderProducts();
    setDeliveryOption('free');
    refreshDeliveryChargeUI();
    renderBill();
    renderExpensesSalesman();
  } else {
    let matchedAccount = null;
    if(username === OWNER_ACCOUNT.username && pass === OWNER_ACCOUNT.password){
      matchedAccount = OWNER_ACCOUNT;
    } else if(username === SECOND_ADMIN_ACCOUNT.username && pass === SECOND_ADMIN_ACCOUNT.password){
      matchedAccount = SECOND_ADMIN_ACCOUNT;
    }
    if(!matchedAccount){
      errEl.textContent = "Invalid username or password.";
      return;
    }
    errEl.textContent = "";
    currentOwnerAccountRef = matchedAccount;
    currentUser = {name: matchedAccount.name, username: matchedAccount.username, role:"owner"};
    saveSession({role:"owner", accountType: matchedAccount === SECOND_ADMIN_ACCOUNT ? "admin" : "owner"});
   document.getElementById("ownerProfileName").textContent = matchedAccount.name;
document.getElementById("ownerProfileRole").textContent = matchedAccount.role || "Owner";
    const btnImg = document.getElementById('ownerProfileImgBtn');
    const largeImg = document.getElementById('ownerProfileImgLarge');
    if(matchedAccount.photo){
      if(btnImg) btnImg.src = matchedAccount.photo;
      if(largeImg) largeImg.src = matchedAccount.photo;
    } else {
      if(btnImg) btnImg.src = "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEYIt1qafO-e6ZnF-pg4KEkP0VbMJMdzAACNykAAvjGUFfvNjFgP6k6oT0E.jpeg";
      if(largeImg) largeImg.src = "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEYIt1qafO-e6ZnF-pg4KEkP0VbMJMdzAACNykAAvjGUFfvNjFgP6k6oT0E.jpeg";
    }
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('ownerScreen').classList.remove('hidden');
    document.getElementById('ownerSubtitle').textContent = (matchedAccount.role || "Owner") + " Dashboard · " + matchedAccount.name;
    showAdminSection('dashboard');
    pmRefreshCategorySelect();
pmRenderCategoryManager();
renderProductManagerList();
    renderOwnerDashboard();
    renderPriceManager();
    renderCategoryManager();
    refreshDeliveryChargeUI();
    renderCredentialsManager();
    loadSalesFromCloud();
  }
}

/* ================= PRODUCT MANAGER (full CRUD, unlimited variants) ================= */
const PRODUCTS_FULL_KEY = "alhamd_products_full_v1";
let pmCurrentVariants = [];
let pmCurrentImage = "";
let pmFilterCat = "All";
let productIdCounter = 1;

function assignProductIds(){
  PRODUCTS.forEach(p => { if(!p.id) p.id = "p" + (productIdCounter++); });
}

function saveAllProducts(){
  try{
    localStorage.setItem(PRODUCTS_FULL_KEY, JSON.stringify({
      products: PRODUCTS,
      extraCategories: EXTRA_CATEGORIES
    }));
  }catch(e){}
  pushSettingsToCloud({ products: PRODUCTS, extraCategories: EXTRA_CATEGORIES }); // NEW
}

function saveDeliveryCharge(){
  try{ localStorage.setItem(DELIVERY_CHARGE_KEY, String(deliveryChargeAmount)); }catch(e){}
  pushSettingsToCloud({ deliveryChargeAmount }); // NEW
}

function saveDeliveryEnabled(){
  try{ localStorage.setItem(DELIVERY_ENABLED_KEY, String(deliveryEnabled)); }catch(e){}
  pushSettingsToCloud({ deliveryEnabled }); // NEW
}

function saveCredentials(){
  let salesmanName = '';
  try{ salesmanName = localStorage.getItem(SALESMAN_NAME_KEY) || ''; }catch(e){}
  try{
    localStorage.setItem(CREDENTIALS_KEY, JSON.stringify({
      salesman: { username: SALESMEN[0].username, password: SALESMEN[0].password, photo: SALESMEN[0].photo },
      owner: { username: OWNER_ACCOUNT.username, password: OWNER_ACCOUNT.password, photo: OWNER_ACCOUNT.photo, name: OWNER_ACCOUNT.name, role: OWNER_ACCOUNT.role },
      admin: { username: SECOND_ADMIN_ACCOUNT.username, password: SECOND_ADMIN_ACCOUNT.password, photo: SECOND_ADMIN_ACCOUNT.photo, name: SECOND_ADMIN_ACCOUNT.name }
    }));
  }catch(e){}
  pushSettingsToCloud({
    salesmanUsername: SALESMEN[0].username,
    salesmanPassword: SALESMEN[0].password,
    salesmanPhoto: SALESMEN[0].photo,
    salesmanDisplayName: salesmanName,
    ownerUsername: OWNER_ACCOUNT.username,
    ownerPassword: OWNER_ACCOUNT.password,
    ownerPhoto: OWNER_ACCOUNT.photo,
    ownerName: OWNER_ACCOUNT.name,
    ownerRole: OWNER_ACCOUNT.role,
    adminUsername: SECOND_ADMIN_ACCOUNT.username,
    adminPassword: SECOND_ADMIN_ACCOUNT.password,
    adminPhoto: SECOND_ADMIN_ACCOUNT.photo,
    adminName: SECOND_ADMIN_ACCOUNT.name
  }); // NEW
}

function loadAllProducts(){
  try{
    const raw = localStorage.getItem(PRODUCTS_FULL_KEY);
    if(!raw) return;
    const saved = JSON.parse(raw);
    if(saved.products && saved.products.length){
      PRODUCTS.length = 0;
      saved.products.forEach(p => PRODUCTS.push(p));
    }
    if(saved.extraCategories){
      EXTRA_CATEGORIES.length = 0;
      saved.extraCategories.forEach(c => EXTRA_CATEGORIES.push(c));
    }
  }catch(e){ /* ignore corrupt storage */ }
}

function pmHandleImageUpload(input){
  const file = input.files && input.files[0];
  if(!file) return;
  const msgEl = document.getElementById('pmFormMsg');

  if(!file.type || !file.type.startsWith('image/')){
    if(msgEl){ msgEl.textContent = "Please choose an image file."; msgEl.style.color = "var(--ember)"; }
    input.value = "";
    return;
  }
  if(msgEl){ msgEl.textContent = "Processing image..."; msgEl.style.color = "#8a8a8a"; }

  const reader = new FileReader();
  reader.onload = function(e){
    const img = new Image();
    img.onload = function(){
      // Resize/compress so any phone/gallery photo (even several MB) stores
      // as a small, safe base64 string instead of silently failing to save.
      const MAX_DIM = 800;
      let w = img.naturalWidth, h = img.naturalHeight;
      if(w > MAX_DIM || h > MAX_DIM){
        if(w >= h){ h = Math.round(h * (MAX_DIM / w)); w = MAX_DIM; }
        else { w = Math.round(w * (MAX_DIM / h)); h = MAX_DIM; }
      }
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);

      let quality = 0.8;
      let dataUrl = canvas.toDataURL('image/jpeg', quality);
      // Keep shrinking quality until it's comfortably under Firestore's
      // 1MB document limit (we're storing this alongside other products).
      while(dataUrl.length > 350000 && quality > 0.3){
        quality -= 0.1;
        dataUrl = canvas.toDataURL('image/jpeg', quality);
      }

      pmCurrentImage = dataUrl;
      document.getElementById('pmProductImageUrl').value = "";
      if(msgEl){ msgEl.textContent = "Image ready ✓"; msgEl.style.color = "#1fae72"; }
      pmRenderImagePreview();
    };
    img.onerror = function(){
      if(msgEl){ msgEl.textContent = "Couldn't read that image. Try a different photo."; msgEl.style.color = "var(--ember)"; }
      input.value = "";
    };
    img.src = e.target.result;
  };
  reader.onerror = function(){
    if(msgEl){ msgEl.textContent = "Couldn't read that file from your device. Try again."; msgEl.style.color = "var(--ember)"; }
    input.value = "";
  };
  reader.readAsDataURL(file);
}

function pmRenderImagePreview(){
  const wrap = document.getElementById('pmImagePreviewWrap');
  if(!wrap) return;
  wrap.innerHTML = pmCurrentImage
    ? `<div style="display:flex;align-items:center;gap:10px;">
         <img src="${pmCurrentImage}" style="width:70px;height:70px;object-fit:cover;border-radius:10px;border:1px solid #eee;">
         <button type="button" onclick="pmRemoveImage()" style="background:#fff;border:1px solid #ddd;color:var(--ember);font-weight:700;padding:8px 14px;border-radius:8px;cursor:pointer;">🗑️ Remove Image</button>
       </div>`
    : "";
}

function pmRemoveImage(){
  pmCurrentImage = "";
  document.getElementById('pmProductImageUrl').value = "";
  document.getElementById('pmProductImageFile').value = "";
  pmRenderImagePreview();
}

function pmToggleVariantMode(checked){
  document.getElementById('pmSinglePriceWrap').classList.toggle('hidden', checked);
  document.getElementById('pmVariantsWrap').classList.toggle('hidden', !checked);
  if(checked && pmCurrentVariants.length === 0){
    pmCurrentVariants = [{label:"", price:0}];
    pmRenderVariantRows();
  }
}

function pmAddVariantRow(){
  pmCurrentVariants.push({label:"", price:0});
  pmRenderVariantRows();
}
function pmRemoveVariantRow(idx){
  pmCurrentVariants.splice(idx,1);
  pmRenderVariantRows();
}
function pmUpdateVariantLabel(idx, val){ pmCurrentVariants[idx].label = val; }
function pmUpdateVariantPriceField(idx, val){ pmCurrentVariants[idx].price = Math.max(0, Math.round(parseFloat(val)||0)); }

function pmRenderVariantRows(){
  const wrap = document.getElementById('pmVariantRows');
  if(!wrap) return;
  wrap.innerHTML = pmCurrentVariants.map((v, idx) => `
    <div style="display:flex;gap:8px;align-items:center;margin-bottom:8px;">
      <input type="text" class="salesman-name-input" style="flex:1;" placeholder="Label e.g. Small, Half, 250ml"
        value="${(v.label||'').replace(/"/g,'&quot;')}" oninput="pmUpdateVariantLabel(${idx}, this.value)">
      <span style="font-weight:700;color:#8a8a8a;">Rs</span>
      <input type="number" min="0" step="1" class="price-input" style="width:100px;" value="${v.price}"
        oninput="pmUpdateVariantPriceField(${idx}, this.value)">
      <button type="button" class="expense-del-btn" onclick="pmRemoveVariantRow(${idx})">✕</button>
    </div>
  `).join('');
}

function pmRefreshCategorySelect(){
  const select = document.getElementById('pmProductCategory');
  if(!select) return;
  const prev = select.value;
  select.innerHTML = getCategories().map(c => `<option value="${c.replace(/"/g,'&quot;')}">${c}</option>`).join('');
  if(getCategories().includes(prev)) select.value = prev;
}

function pmResetForm(){
  document.getElementById('pmEditingId').value = "";
  document.getElementById('pmProductName').value = "";
  document.getElementById('pmProductImageUrl').value = "";
  document.getElementById('pmProductImageFile').value = "";
  document.getElementById('pmSinglePrice').value = "";
  document.getElementById('pmHasVariants').checked = false;
  document.getElementById('pmSinglePriceWrap').classList.remove('hidden');
  document.getElementById('pmVariantsWrap').classList.add('hidden');
  document.getElementById('pmFormTitle').textContent = "➕ Add New Product";
  document.getElementById('pmSaveBtn').textContent = "+ Add Product";
  document.getElementById('pmFormMsg').textContent = "";
  pmCurrentVariants = [];
  pmCurrentImage = "";
  pmRenderVariantRows();
  pmRenderImagePreview();
  pmRefreshCategorySelect();
}

function pmAddCategory(){
  const input = document.getElementById('pmNewCategoryInput');
  const name = input.value.trim();
  if(!name) return;
  if(getCategories().map(c=>c.toLowerCase()).includes(name.toLowerCase())){
    alert('That category already exists.');
    return;
  }
  EXTRA_CATEGORIES.push(name);
  input.value = "";
  saveAllProducts();
  pmRenderCategoryManager();
  pmRefreshCategorySelect();
  renderCategories();
  if(document.getElementById('priceCatRow')) renderPriceCategories();
}

function pmDeleteCategory(cat){
  if(PRODUCTS.some(p => p.cat === cat)){
    alert('This category still has products in it. Move or delete those products first.');
    return;
  }
  if(!confirm(`Delete category "${cat}"?`)) return;
  EXTRA_CATEGORIES = EXTRA_CATEGORIES.filter(c => c !== cat);
  saveAllProducts();
  pmRenderCategoryManager();
  pmRefreshCategorySelect();
  renderCategories();
  if(document.getElementById('priceCatRow')) renderPriceCategories();
}

function pmRenderCategoryManager(){
  const wrap = document.getElementById('pmCategoryListWrap');
  if(!wrap) return;
  wrap.innerHTML = getCategories().map(c => `
    <span class="cat-pill" style="display:inline-flex;align-items:center;gap:8px;cursor:default;">
      ${c}
      <button type="button" onclick="pmDeleteCategory('${c.replace(/'/g,"\\'")}')" style="background:none;border:none;color:var(--ember);font-weight:900;cursor:pointer;">✕</button>
    </span>
  `).join('');
}

function pmSaveProduct(){
  const msgEl = document.getElementById('pmFormMsg');
  const editingId = document.getElementById('pmEditingId').value;
  const name = document.getElementById('pmProductName').value.trim();
  const cat = document.getElementById('pmProductCategory').value;
  const hasVariants = document.getElementById('pmHasVariants').checked;
  const imageUrl = document.getElementById('pmProductImageUrl').value.trim();
  const image = pmCurrentImage || imageUrl || "";

  if(!name || !cat){
    msgEl.textContent = "Please enter a product name and choose a category.";
    msgEl.style.color = "var(--ember)";
    return;
  }
  if(PRODUCTS.find(p => p.name.toLowerCase() === name.toLowerCase() && p.id !== editingId)){
    msgEl.textContent = "A product with that name already exists.";
    msgEl.style.color = "var(--ember)";
    return;
  }

  const existingProduct = editingId ? PRODUCTS.find(p => p.id === editingId) : null;
  let productData = { name, cat, image, active: existingProduct ? (existingProduct.active !== false) : true };
  if(hasVariants){
    const cleanVariants = pmCurrentVariants
      .map(v => ({label:(v.label||'').trim(), price: Math.max(0, Math.round(v.price||0))}))
      .filter(v => v.label);
    if(cleanVariants.length === 0){
      msgEl.textContent = "Please add at least one variation with a label.";
      msgEl.style.color = "var(--ember)";
      return;
    }
    productData.variants = cleanVariants;
  } else {
    productData.price = Math.max(0, Math.round(parseFloat(document.getElementById('pmSinglePrice').value) || 0));
  }

  if(editingId){
    const idx = PRODUCTS.findIndex(p => p.id === editingId);
    if(idx > -1){ productData.id = editingId; PRODUCTS[idx] = productData; }
    msgEl.textContent = `Updated "${name}" ✓`;
  } else {
    productData.id = "p" + (productIdCounter++);
    PRODUCTS.push(productData);
    msgEl.textContent = `Added "${name}" ✓`;
  }
  msgEl.style.color = "#1fae72";
  saveAllProducts();
  pmResetForm();
  renderCategories();
  if(document.getElementById('productGrid')) renderProducts();
  renderPriceManager();
  renderProductManagerList();
}

function pmEditProduct(id){
  const p = PRODUCTS.find(x => x.id === id);
  if(!p) return;
  document.getElementById('pmEditingId').value = p.id;
  document.getElementById('pmProductName').value = p.name;
  pmRefreshCategorySelect();
  document.getElementById('pmProductCategory').value = p.cat;
  pmCurrentImage = p.image || "";
  document.getElementById('pmProductImageUrl').value = (p.image && p.image.startsWith('http')) ? p.image : "";
  pmRenderImagePreview();

  if(p.variants && p.variants.length){
    document.getElementById('pmHasVariants').checked = true;
    pmCurrentVariants = p.variants.map(v => ({...v}));
    document.getElementById('pmSinglePriceWrap').classList.add('hidden');
    document.getElementById('pmVariantsWrap').classList.remove('hidden');
    pmRenderVariantRows();
  } else {
    document.getElementById('pmHasVariants').checked = false;
    document.getElementById('pmSinglePrice').value = p.price || 0;
    document.getElementById('pmSinglePriceWrap').classList.remove('hidden');
    document.getElementById('pmVariantsWrap').classList.add('hidden');
    pmCurrentVariants = [];
  }
  document.getElementById('pmFormTitle').textContent = `✏️ Editing "${p.name}"`;
  document.getElementById('pmSaveBtn').textContent = "💾 Save Changes";
  document.getElementById('pmFormMsg').textContent = "";
  document.getElementById('productManagerPanel').scrollIntoView({behavior:'smooth'});
}

function pmDeleteProduct(id){
  const p = PRODUCTS.find(x => x.id === id);
  if(!p) return;
  if(!confirm(`Delete "${p.name}" permanently? This cannot be undone.`)) return;
  PRODUCTS = PRODUCTS.filter(x => x.id !== id);
  saveAllProducts();
  renderCategories();
  if(document.getElementById('productGrid')) renderProducts();
  renderPriceManager();
  renderProductManagerList();
}

function pmSetFilterCat(c){ pmFilterCat = c; renderProductManagerList(); }

function renderProductManagerList(){
  const filterRow = document.getElementById('pmCatFilterRow');
  if(filterRow){
    filterRow.innerHTML = getCategoriesWithAll().map(c =>
      `<button class="cat-pill ${c===pmFilterCat?'active':''}" onclick="pmSetFilterCat('${c.replace(/'/g,"\\'")}')">${c}</button>`
    ).join('');
  }
  const wrap = document.getElementById('pmProductListWrap');
  if(!wrap) return;
  const q = (document.getElementById('pmSearchInput')?.value || "").toLowerCase();
  const list = PRODUCTS.filter(p => (pmFilterCat==='All' || p.cat===pmFilterCat) && p.name.toLowerCase().includes(q));
  if(list.length === 0){
    wrap.innerHTML = `<div style="color:#999;text-align:center;padding:30px;">No products found.</div>`;
    return;
  }
  wrap.innerHTML = `<table><thead><tr><th></th><th>Name</th><th>Category</th><th>Price / Variants</th><th>Active</th><th></th></tr></thead><tbody>` +
    list.map(p => {
      const priceDisplay = p.variants && p.variants.length
        ? p.variants.map(v => `${v.label}: Rs ${v.price}`).join(' · ')
        : `Rs ${p.price}`;
      const thumb = p.image
        ? `<img src="${p.image}" style="width:40px;height:40px;object-fit:cover;border-radius:8px;">`
        : `<div style="width:40px;height:40px;border-radius:8px;background:#f2f2f2;"></div>`;
      const isActive = p.active !== false;
      return `<tr style="${isActive ? '' : 'opacity:.55;'}">
        <td>${thumb}</td>
        <td style="font-weight:700;">${p.name}${isActive ? '' : ' <span style=\"font-size:11px;font-weight:700;color:#c0392b;\">(Disabled)</span>'}</td>
        <td class="price-row-cat">${p.cat}</td>
        <td style="font-size:13px;">${priceDisplay}</td>
        <td>
          <label class="da-switch" title="${isActive ? 'Tap to disable' : 'Tap to enable'}">
            <input type="checkbox" onchange="pmToggleActive('${p.id}', this.checked)" ${isActive ? 'checked' : ''}>
            <span class="da-switch-track"></span>
          </label>
        </td>
        <td>
          <button class="view-btn" onclick="pmEditProduct('${p.id}')">✏️</button>
          <button class="expense-del-btn" onclick="pmDeleteProduct('${p.id}')">🗑️</button>
        </td>
      </tr>`;
    }).join('') + `</tbody></table>`;
}

function pmToggleActive(id, checked){
  const p = PRODUCTS.find(x => x.id === id);
  if(!p) return;
  p.active = checked;
  saveAllProducts();
  if(document.getElementById('productGrid')) renderProducts();
  renderProductManagerList();
}
/* ================= ADMIN SIDEBAR SECTION SWITCHING (owner panel only) ================= */
const ADMIN_SECTION_MAP = {
  dashboard: { sec:'secDashboard', nav:'adminNavDashboard', title:'Dashboard' },
  pos:       { sec:'secPOS',       nav:'adminNavPOS',       title:'POS / Sales' },
  unpaid:    { sec:'secUnpaid',    nav:'adminNavUnpaid',    title:'Unpaid Bills' },
  menu:      { sec:'secMenu',      nav:'adminNavMenu',      title:'Menu Management' },
  deals:     { sec:'secDeals',     nav:'adminNavDeals',     title:'Limited Deals' },
  expenses:  { sec:'secExpenses',  nav:'adminNavExpenses',  title:'Expenses' },
  settings:  { sec:'secSettings',  nav:'adminNavSettings',  title:'Settings' }
};
function showAdminSection(name){
  const target = ADMIN_SECTION_MAP[name] || ADMIN_SECTION_MAP.dashboard;
  Object.keys(ADMIN_SECTION_MAP).forEach(function(key){
    const cfg = ADMIN_SECTION_MAP[key];
    const secEl = document.getElementById(cfg.sec);
    const navEl = document.getElementById(cfg.nav);
    if(secEl) secEl.classList.toggle('hidden', key !== name);
    if(navEl) navEl.classList.toggle('active', key === name);
  });
  const titleEl = document.getElementById('adminSectionTitle');
  if(titleEl) titleEl.textContent = target.title;
  if(name === 'unpaid') renderUnpaidBills();
  if(name === 'settings') renderCredentialsManager();
}
function logout(){
  currentUser = null;
  currentOwnerAccountRef = null;
  clearSession();
  bill = [];
  document.getElementById('salesmanScreen').classList.add('hidden');
  document.getElementById('ownerScreen').classList.add('hidden');
  document.getElementById('loginScreen').classList.remove('hidden');
  document.getElementById('loginEmail').value='';
  document.getElementById('loginPassword').value='';
  document.getElementById('loginError').textContent='';
  const nameInput = document.getElementById('salesmanNameInput');
  if(nameInput){ nameInput.value=''; nameInput.removeAttribute('readonly'); }
}

/* Runs once on every page load. If a session marker was saved by a
   previous successful login, this rebuilds that same signed-in screen
   (salesman POS or owner dashboard) instead of leaving the visitor on
   the login page — this is what makes an F5 refresh stay put instead
   of logging the user out. No password is ever stored or re-checked
   here; this only restores an ALREADY authenticated session. */
function restoreSession(){
  let session = null;
  try{
    const raw = localStorage.getItem(SESSION_KEY);
    if(raw) session = JSON.parse(raw);
  }catch(e){ session = null; }
  if(!session || !session.role) return;

  if(session.role === 'salesman'){
    const account = SALESMEN[0];
    let savedName = '';
    try{ savedName = localStorage.getItem(SALESMAN_NAME_KEY) || ''; }catch(e){ /* ignore storage errors */ }
    currentUser = {name: savedName, username: account.username, role:"salesman"};
    document.getElementById("profileName").textContent = currentUser.name || "Salesman";
    document.getElementById("profileRole").textContent = "Salesman";
    if(account.photo){
      const btnImg = document.getElementById('salesmanProfileImgBtn');
      const largeImg = document.getElementById('salesmanProfileImgLarge');
      if(btnImg) btnImg.src = account.photo;
      if(largeImg) largeImg.src = account.photo;
    }
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('salesmanScreen').classList.remove('hidden');
    document.getElementById('salesmanSubtitle').textContent = "Salesman POS";
    const nameInput = document.getElementById('salesmanNameInput');
    if(nameInput){
      nameInput.value = savedName;
      nameInput.removeAttribute('readonly');
    }
    renderCategories();
    renderProducts();
    setDeliveryOption('free');
    refreshDeliveryChargeUI();
    renderBill();
    renderExpensesSalesman();
  } else if(session.role === 'owner'){
    const matchedAccount = session.accountType === 'admin' ? SECOND_ADMIN_ACCOUNT : OWNER_ACCOUNT;
    currentOwnerAccountRef = matchedAccount;
    currentUser = {name: matchedAccount.name, username: matchedAccount.username, role:"owner"};
    document.getElementById("ownerProfileName").textContent = matchedAccount.name;
    document.getElementById("ownerProfileRole").textContent = matchedAccount.role || "Owner";
    const btnImg = document.getElementById('ownerProfileImgBtn');
    const largeImg = document.getElementById('ownerProfileImgLarge');
    if(matchedAccount.photo){
      if(btnImg) btnImg.src = matchedAccount.photo;
      if(largeImg) largeImg.src = matchedAccount.photo;
    } else {
      if(btnImg) btnImg.src = "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEYIt1qafO-e6ZnF-pg4KEkP0VbMJMdzAACNykAAvjGUFfvNjFgP6k6oT0E.jpeg";
      if(largeImg) largeImg.src = "https://img.remit.ee/api/file/BQACAgUAAyEGAASHRsPbAAEYIt1qafO-e6ZnF-pg4KEkP0VbMJMdzAACNykAAvjGUFfvNjFgP6k6oT0E.jpeg";
    }
    document.getElementById('loginScreen').classList.add('hidden');
    document.getElementById('ownerScreen').classList.remove('hidden');
    document.getElementById('ownerSubtitle').textContent = (matchedAccount.role || "Owner") + " Dashboard · " + matchedAccount.name;
    showAdminSection('dashboard');
    pmRefreshCategorySelect();
    pmRenderCategoryManager();
    renderProductManagerList();
    renderOwnerDashboard();
    renderPriceManager();
    renderCategoryManager();
    refreshDeliveryChargeUI();
    renderCredentialsManager();
    loadSalesFromCloud();
  }
}

/* ---------------- SALESMAN POS ---------------- */
function renderCategories(){
  const row = document.getElementById('catRow');
  row.innerHTML = getCategoriesWithAll().map(c =>
    `<button class="cat-pill ${c===activeCat?'active':''}" onclick="setCategory('${c}')">${c}</button>`
  ).join('');
}
function setCategory(c){
  activeCat = c;
  renderCategories();
  renderProducts();
}

/* Tracks which size/variant is currently selected on each multi-variant card,
   keyed by product name, so the price shown + added updates when tapped. */
let selectedVariantIdx = {};

function renderProducts(){
  const q = document.getElementById('searchInput').value.toLowerCase();
  const grid = document.getElementById('productGrid');
  let list = PRODUCTS.filter(p => (activeCat==='All' || p.cat===activeCat) && p.name.toLowerCase().includes(q) && p.active !== false);
  if(list.length===0){
    grid.innerHTML = `<div style="grid-column:1/-1;color:#999;text-align:center;padding:40px;">No items match your search.</div>`;
    return;
  }
  grid.innerHTML = list.map(p => {
    const safeName = p.name.replace(/'/g,"\\'");
    if(p.variants && p.variants.length){
      const curIdx = selectedVariantIdx[p.name] ?? 0;
      const v = p.variants[curIdx];
      const sizeBtns = p.variants.map((vr, i) => `
        <button type="button" class="size-pill ${i===curIdx?'active':''}"
          onclick="event.stopPropagation(); selectVariant('${safeName}', ${i})">${vr.label}</button>
      `).join('');
      return `
        <div class="prod-card prod-card-variant">
          <div class="prod-cat">${p.cat}</div>
          <div class="prod-name">${p.name}</div>
          <div class="size-row">${sizeBtns}</div>
          <button type="button" class="prod-add-btn" onclick="addToBill('${safeName}')">
            Add · Rs ${v.price}
          </button>
        </div>
      `;
    }
    return `
      <button class="prod-card" onclick="addToBill('${safeName}')">
        <div class="prod-cat">${p.cat}</div>
        <div class="prod-name">${p.name}</div>
        <div class="prod-price">Rs ${p.price}</div>
      </button>
    `;
  }).join('');
}

function selectVariant(name, idx){
  selectedVariantIdx[name] = idx;
  renderProducts();
}

function addToBill(name){
  const prod = PRODUCTS.find(p => p.name === name);
  if(!prod) return;
  let price, lineName;
  if(prod.variants && prod.variants.length){
    const idx = selectedVariantIdx[name] ?? 0;
    const v = prod.variants[idx];
    price = v.price;
    lineName = `${prod.name} (${v.label})`;
  } else {
    price = prod.price;
    lineName = prod.name;
  }
  const existing = bill.find(b => b.name === lineName);
  if(existing){ existing.qty++; } else { bill.push({name:lineName, price, qty:1}); }
  renderBill();
}
function changeQty(name, delta){
  const item = bill.find(b => b.name===name);
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0){ bill = bill.filter(b => b.name !== name); }
  renderBill();
}

function renderBill(){
  const wrap = document.getElementById('billItemsWrap');
  const totalsWrap = document.getElementById('billTotalsWrap');
  const chargeBtn = document.getElementById('chargeBtn');

  if(bill.length === 0){
    wrap.innerHTML = `<div class="bill-empty">Tap products to add them to the bill.</div>`;
    totalsWrap.innerHTML = billTotalsHTML(0,0,0,0,0);
    chargeBtn.textContent = "Charge & Save · Rs 0";
    chargeBtn.disabled = true;
    return;
  }
  wrap.innerHTML = bill.map(item => `
    <div class="bill-item">
      <div>
        <div class="bi-name">${item.name}</div>
        <div class="bi-sub">@ Rs ${item.price}</div>
      </div>
      <div class="qty-ctrl">
        <button onclick="changeQty('${item.name.replace(/'/g,"\\'")}', -1)">−</button>
        <span>${item.qty}</span>
        <button onclick="changeQty('${item.name.replace(/'/g,"\\'")}', 1)">+</button>
      </div>
      <div class="bi-amt">Rs ${item.price*item.qty}</div>
    </div>
  `).join('');

  const subtotal = bill.reduce((s,i)=>s+i.price*i.qty,0);
  const deliveryCharge = (deliveryEnabled && selectedDeliveryOption === 'paid') ? deliveryChargeAmount : 0;
  const discount = discountApplied ? Math.round(subtotal * discountPercent / 100) : 0;
  const total = Math.max(0, subtotal + deliveryCharge - discount);
  totalsWrap.innerHTML = billTotalsHTML(subtotal, deliveryCharge, discountPercent, discount, total);
  chargeBtn.textContent = `Charge & Save · Rs ${total}`;
  chargeBtn.disabled = false;
}

function billTotalsHTML(subtotal, deliveryCharge, discountPercent, discount, total){
  const deliveryRow = deliveryCharge > 0
    ? `<div class="bt-row"><span>Delivery Charges</span><span>Rs ${deliveryCharge}</span></div>`
    : "";
  const discountRow = discount > 0
    ? `<div class="bt-row"><span>Discount (${discountPercent}%)</span><span>- Rs ${discount}</span></div>`
    : "";
  return `
    <div class="bt-row"><span>Subtotal</span><span>Rs ${subtotal}</span></div>
    ${deliveryRow}
    ${discountRow}
    <div class="bt-total"><span>Total</span><span>Rs ${total}</span></div>
  `;
}

function chargeBill(){
  if(bill.length === 0) return;
  if(currentUser && currentUser.role === 'salesman' && !(currentUser.name && currentUser.name.trim())){
    alert('Please enter your name first (top of the bill panel) — it will show on the receipt.');
    const nameInput = document.getElementById('salesmanNameInput');
    if(nameInput) nameInput.focus();
    return;
  }
  const subtotal = bill.reduce((s,i)=>s+i.price*i.qty,0);
  const deliveryCharge = (deliveryEnabled && selectedDeliveryOption === 'paid') ? deliveryChargeAmount : 0;
  const discount = discountApplied ? Math.round(subtotal * discountPercent / 100) : 0;
  const total = Math.max(0, subtotal + deliveryCharge - discount);
  const now = new Date();
  const billNo = "A-" + Math.floor(100000 + Math.random()*899999);
  const cashierName = currentUser ? currentUser.name : 'Salesman';
  const cashierUsername = currentUser ? currentUser.username : '';
  const orderTypeEl = document.getElementById('orderType');
  const customerNumberEl = document.getElementById('customerNumber');
  const orderType = orderTypeEl ? orderTypeEl.value : 'Dine In';
  const customerNumber = (orderType === 'Delivery' && customerNumberEl) ? customerNumberEl.value.trim() : '';
  const sale = {
    billNo, date: now, cashier: cashierName, cashierUsername,
    items: bill.map(i=>({...i})), subtotal, deliveryCharge, discountPercent, discount, total,
    paymentMethod: selectedPaymentMethod, paymentStatus: selectedPaymentStatus, orderType, customerNumber
  };
  sales.push(sale);
  syncSaleToCloud(sale);
  showReceipt(sale);
  bill = [];
  setDeliveryOption('free');
  resetDiscount();
  setPaymentMethod('cash');
  setPaymentStatus('paid');
  if(orderTypeEl) orderTypeEl.value = 'Dine In';
  if(customerNumberEl) customerNumberEl.value = '';
  toggleOrderType();
  renderBill();
}

/* ---------------- RECEIPT ---------------- */
function formatDate(d){
  const dd = String(d.getDate()).padStart(2,'0');
  const mm = String(d.getMonth()+1).padStart(2,'0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}
function formatTime(d, withSeconds){
  let hours = d.getHours();
  const mi = String(d.getMinutes()).padStart(2,'0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  if(hours === 0) hours = 12;
  const hh = String(hours).padStart(2,'0');
  const ss = withSeconds ? `:${String(d.getSeconds()).padStart(2,'0')}` : '';
  return `${hh}:${mi}${ss} ${ampm}`;
}

function showReceipt(sale){
  const el = document.getElementById('receiptContent');
  const deliveryRow = sale.deliveryCharge > 0
    ? `<div class="r-row"><span>Delivery Charges</span><span>Rs ${sale.deliveryCharge}</span></div>`
    : "";
  const discountRow = sale.discount > 0
    ? `<div class="r-row"><span>Discount (${sale.discountPercent}%)</span><span>- Rs ${sale.discount}</span></div>`
    : "";
  el.innerHTML = `
    <img src="https://i.ibb.co/RG8N5j1H/alhamd-logo.png" class="receipt-logo" alt="Alhamd Fast Food">
    <p class="sub">Fresh &amp; Fast Since Day One</p>
    <p class="sub">Tel: 0326-6797564</p>
    <hr class="dash">
    <div class="r-row"><span>Bill #: ${sale.billNo}</span><span>${formatDate(sale.date)}</span></div>
    <div class="r-row"><span>Cashier: ${sale.cashier}</span><span>${formatTime(sale.date)}</span></div>
    <div class="r-row">
    <span>Order Type:</span>
    <span>${sale.orderType || 'Dine In'}</span>
</div>

${sale.orderType === 'Delivery' ? `
<div class="r-row">
    <span>Customer No:</span>
    <span>${sale.customerNumber || ''}</span>
</div>
` : ''}
    <div class="r-row"><span>Payment: ${(sale.paymentMethod || 'cash') === 'online' ? '📲 Online Payment' : '💵 Cash'}</span><span></span></div>
    <hr class="dash">
    <div class="r-cols r-header"><span>Item</span><span class="r-col-qty">Qty</span><span class="r-col-amt">Amt</span></div>
    <div class="r-items-scroll">
      ${sale.items.map(i => `
        <div class="r-item">
          <div class="r-cols r-item-name"><span>${i.name}</span><span class="r-col-qty">${i.qty}</span><span class="r-col-amt">Rs ${i.price*i.qty}</span></div>
          <div class="r-item-sub">@ Rs ${i.price}</div>
        </div>
      `).join('')}
    </div>
    <hr class="dash">
    <div class="r-row"><span>Subtotal</span><span>Rs ${sale.subtotal}</span></div>
    ${deliveryRow}
    ${discountRow}
    <div class="r-total-row"><span>TOTAL</span><span>Rs ${sale.total}</span></div>
    <hr class="dash">
    <p class="thanks">Thank you for your order!<br>Please come again</p>
    <div class="receipt-btn-row no-print">
      <button class="close-receipt" onclick="closeReceipt()">Close</button>
      <button class="edit-receipt-btn" onclick="openEditBillModal('${sale.billNo}')">✏️ Edit</button>
      <button class="print-receipt-btn" onclick="printReceipt()">🖨️ Print</button>
    </div>
  `;
  document.getElementById('receiptModal').classList.remove('hidden');
}
function closeReceipt(){
  document.getElementById('receiptModal').classList.add('hidden');
  if(currentUser && currentUser.role === 'owner') renderOwnerDashboard();
}

/* ---------------- THEMED CONFIRM MODAL ---------------- */
let _confirmModalCallback = null;
function showConfirmModal(title, message, okLabel, onConfirm, icon){
  document.getElementById('confirmModalTitle').textContent = title;
  document.getElementById('confirmModalMsg').textContent = message;
  document.getElementById('confirmModalOkBtn').textContent = okLabel || 'Confirm';
  document.getElementById('confirmModalIcon').textContent = icon || '🧾';
  _confirmModalCallback = onConfirm;
  document.getElementById('confirmModal').classList.remove('hidden');
}
function closeConfirmModal(){
  document.getElementById('confirmModal').classList.add('hidden');
  _confirmModalCallback = null;
}
function confirmModalConfirm(){
  const cb = _confirmModalCallback;
  closeConfirmModal();
  if(typeof cb === 'function') cb();
}
function printReceipt(){
  window.print();
}

/* ---------------- EDIT BILL (after save, before/after print) ---------------- */
let editingBill = null;

function openEditBillModal(billNo){
  const sale = sales.find(s => s.billNo === billNo);
  if(!sale) return;
  editingBill = {
    billNo: sale.billNo,
    items: sale.items.map(i => ({...i})),
    paymentMethod: sale.paymentMethod || 'cash',
    paymentStatus: sale.paymentStatus || 'paid',
    orderType: sale.orderType || 'Dine In',
    customerNumber: sale.customerNumber || ''
  };

  document.getElementById('editBillNoLabel').textContent = '#' + sale.billNo;
  document.getElementById('editBillItemSearch').value = '';
  document.getElementById('editBillItemResults').innerHTML = '';
  document.getElementById('editBillItemResults').classList.add('hidden');
  document.getElementById('editBillDeliveryAmountLabel').textContent = deliveryChargeAmount;

  editBillSetOrderType(editingBill.orderType);
  document.getElementById('editBillCustomerNumber').value = editingBill.customerNumber;

  const deliveryToggle = document.getElementById('editBillDeliveryToggle');
  if(deliveryToggle) deliveryToggle.checked = sale.deliveryCharge > 0;

  const discountOn = (sale.discountPercent || 0) > 0;
  const discountToggle = document.getElementById('editBillDiscountToggle');
  if(discountToggle) discountToggle.checked = discountOn;
  document.getElementById('editBillDiscountInput').value = sale.discountPercent || 0;
  document.getElementById('editBillDiscountAmountWrap').classList.toggle('hidden', !discountOn);

  editBillSetPaymentMethod(editingBill.paymentMethod);
  editBillSetPaymentStatus(editingBill.paymentStatus);

  renderEditBillItems();
  document.getElementById('editBillModal').classList.remove('hidden');
}

function closeEditBillModal(){
  document.getElementById('editBillModal').classList.add('hidden');
  editingBill = null;
}

function renderEditBillItems(){
  const wrap = document.getElementById('editBillItemsWrap');
  if(!wrap || !editingBill) return;
  if(editingBill.items.length === 0){
    wrap.innerHTML = `<div class="bill-empty">No items — search above to add one.</div>`;
  } else {
    wrap.innerHTML = editingBill.items.map((item, idx) => `
      <div class="bill-item">
        <div>
          <div class="bi-name">${item.name}</div>
          <div class="bi-sub">@ Rs ${item.price}</div>
        </div>
        <div class="qty-ctrl">
          <button onclick="editBillChangeQty(${idx}, -1)">−</button>
          <span>${item.qty}</span>
          <button onclick="editBillChangeQty(${idx}, 1)">+</button>
        </div>
        <div class="bi-amt">Rs ${item.price*item.qty}</div>
        <button class="ebc-remove-btn" onclick="editBillRemoveItem(${idx})">🗑️</button>
      </div>
    `).join('');
  }
  editBillRecalc();
}

function editBillChangeQty(idx, delta){
  if(!editingBill) return;
  const item = editingBill.items[idx];
  if(!item) return;
  item.qty += delta;
  if(item.qty <= 0) editingBill.items.splice(idx, 1);
  renderEditBillItems();
}

function editBillRemoveItem(idx){
  if(!editingBill) return;
  editingBill.items.splice(idx, 1);
  renderEditBillItems();
}

function editBillSearchProducts(){
  const q = document.getElementById('editBillItemSearch').value.trim().toLowerCase();
  const resultsEl = document.getElementById('editBillItemResults');
  if(!q){ resultsEl.innerHTML = ''; resultsEl.classList.add('hidden'); return; }

  const matches = PRODUCTS.filter(p => p.name.toLowerCase().includes(q)).slice(0, 6);
  const rows = [];
  matches.forEach(p => {
    if(p.variants && p.variants.length){
      p.variants.forEach(v => rows.push({ name: `${p.name} (${v.label})`, price: v.price }));
    } else {
      rows.push({ name: p.name, price: p.price });
    }
  });

  if(rows.length === 0){
    resultsEl.innerHTML = `<div class="ebc-item-result" style="cursor:default;">No matching products</div>`;
    resultsEl.classList.remove('hidden');
    return;
  }

  resultsEl.innerHTML = rows.map((r, i) => `
    <div class="ebc-item-result" data-i="${i}"><span>${r.name}</span><span>Rs ${r.price}</span></div>
  `).join('');
  resultsEl.classList.remove('hidden');
  resultsEl.querySelectorAll('.ebc-item-result[data-i]').forEach(el => {
    el.addEventListener('click', function(){
      const r = rows[parseInt(el.dataset.i, 10)];
      editBillAddItem(r.name, r.price);
    });
  });
}

function editBillAddItem(name, price){
  if(!editingBill) return;
  const existing = editingBill.items.find(i => i.name === name);
  if(existing) existing.qty++;
  else editingBill.items.push({ name, price, qty: 1 });
  document.getElementById('editBillItemSearch').value = '';
  document.getElementById('editBillItemResults').innerHTML = '';
  document.getElementById('editBillItemResults').classList.add('hidden');
  renderEditBillItems();
}

function editBillToggleDiscount(){
  const on = document.getElementById('editBillDiscountToggle').checked;
  document.getElementById('editBillDiscountAmountWrap').classList.toggle('hidden', !on);
  editBillRecalc();
}

function editBillSetOrderType(type){
  if(!editingBill) return;
  editingBill.orderType = type;
  const dineBtn = document.getElementById('editBillTypeDineIn');
  const takeBtn = document.getElementById('editBillTypeTakeAway');
  const delBtn = document.getElementById('editBillTypeDelivery');
  if(dineBtn) dineBtn.classList.toggle('active', type === 'Dine In');
  if(takeBtn) takeBtn.classList.toggle('active', type === 'Take Away');
  if(delBtn) delBtn.classList.toggle('active', type === 'Delivery');

  const custBox = document.getElementById('editBillCustomerNumberBox');
  if(custBox) custBox.classList.toggle('hidden', type !== 'Delivery');
  if(type !== 'Delivery'){
    const custInput = document.getElementById('editBillCustomerNumber');
    if(custInput) custInput.value = '';
    editingBill.customerNumber = '';
  }
}

function editBillSetPaymentMethod(method){
  if(editingBill) editingBill.paymentMethod = method;
  const cashBtn = document.getElementById('editBillPayCash');
  const onlineBtn = document.getElementById('editBillPayOnline');
  if(cashBtn) cashBtn.classList.toggle('active', method === 'cash');
  if(onlineBtn) onlineBtn.classList.toggle('active', method === 'online');
}

function editBillSetPaymentStatus(status){
  if(editingBill) editingBill.paymentStatus = status;
  const paidBtn = document.getElementById('editBillStatusPaid');
  const pendingBtn = document.getElementById('editBillStatusPending');
  if(paidBtn) paidBtn.classList.toggle('active', status === 'paid');
  if(pendingBtn) pendingBtn.classList.toggle('active', status === 'pending');
}

function editBillRecalc(){
  if(!editingBill) return;
  const custInput = document.getElementById('editBillCustomerNumber');
  if(custInput && editingBill.orderType === 'Delivery') editingBill.customerNumber = custInput.value.trim();
  const subtotal = editingBill.items.reduce((s,i) => s + i.price*i.qty, 0);
  const deliveryToggle = document.getElementById('editBillDeliveryToggle');
  const deliveryCharge = (deliveryToggle && deliveryToggle.checked) ? deliveryChargeAmount : 0;
  const discountToggle = document.getElementById('editBillDiscountToggle');
  const discountOn = discountToggle && discountToggle.checked;
  const discountPercent = discountOn ? (parseFloat(document.getElementById('editBillDiscountInput').value) || 0) : 0;
  const discount = discountOn ? Math.round(subtotal * discountPercent / 100) : 0;
  const total = Math.max(0, subtotal + deliveryCharge - discount);
  editingBill._calc = { subtotal, deliveryCharge, discountPercent, discount, total };
  const totalsWrap = document.getElementById('editBillTotalsWrap');
  if(totalsWrap) totalsWrap.innerHTML = billTotalsHTML(subtotal, deliveryCharge, discountPercent, discount, total);
}

function saveEditedBill(){
  if(!editingBill) return;
  if(editingBill.items.length === 0){
    alert('A bill needs at least one item — add one or delete the whole bill instead.');
    return;
  }
  const sale = sales.find(s => s.billNo === editingBill.billNo);
  if(!sale) return;

  editBillRecalc();
  const c = editingBill._calc;
  const updated = {
    items: editingBill.items.map(i => ({...i})),
    subtotal: c.subtotal,
    deliveryCharge: c.deliveryCharge,
    discountPercent: c.discountPercent,
    discount: c.discount,
    total: c.total,
    paymentMethod: editingBill.paymentMethod,
    paymentStatus: editingBill.paymentStatus,
    orderType: editingBill.orderType,
    customerNumber: editingBill.orderType === 'Delivery' ? editingBill.customerNumber : ''
  };

  salesCollection.doc(String(sale.billNo)).update(updated)
    .then(() => {
      Object.assign(sale, updated);
      closeEditBillModal();
      renderSalesReport();
      renderUnpaidBills();
      showReceipt(sale);
    })
    .catch(err => {
      console.error("Cloud sync (edit bill) failed:", err);
      alert("Couldn't save changes — check your connection and try again.");
    });
}

/* ---------------- SALES REPORT (Daily / Weekly / Monthly / Yearly) ---------------- */
let reportMode = 'daily';
function setReportMode(mode){
  reportMode = mode;
  const sel = document.getElementById('reportRangeSelect');
  if(sel) sel.value = mode;
  renderSalesReport();
}
let paymentFilter = "all"; // "all" | "cash" | "online"
function setPaymentFilter(mode){
  paymentFilter = mode;
  const allBtn = document.getElementById('payFilterAll');
  const cashBtn = document.getElementById('payFilterCash');
  const onlineBtn = document.getElementById('payFilterOnline');
  if(allBtn) allBtn.classList.toggle('active', mode === 'all');
  if(cashBtn) cashBtn.classList.toggle('active', mode === 'cash');
  if(onlineBtn) onlineBtn.classList.toggle('active', mode === 'online');
  renderSalesReport();
}

function renderSalesReport(){
  const dateInput = document.getElementById('reportDateInput');
  if(!dateInput) return;
  if(!dateInput.value){
    const t = new Date();
    dateInput.value = `${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,'0')}-${String(t.getDate()).padStart(2,'0')}`;
  }
  let picked = new Date(dateInput.value + 'T00:00:00');

  const matches = (d) => {
    if(reportMode === 'daily') return isSameDay(d, picked);
    if(reportMode === 'weekly') return isSameWeek(d, picked);
    if(reportMode === 'monthly') return d.getFullYear() === picked.getFullYear() && d.getMonth() === picked.getMonth();
    return d.getFullYear() === picked.getFullYear();
  };

  const periodSales = sales.filter(s => matches(s.date) && (paymentFilter === 'all' || (s.paymentMethod || 'cash') === paymentFilter));

  // Search only ever narrows down THIS period's results — it never reaches
  // into other days/weeks/months.
  const searchInput = document.getElementById('reportSearchInput');
  const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
  const searchedSales = searchTerm ? periodSales.filter(s => {
    const haystack = [
      s.billNo,
      s.cashier, s.cashierUsername,
      (s.paymentMethod || 'cash') === 'online' ? 'online' : 'cash',
      (s.paymentStatus || 'paid') === 'pending' ? 'pending' : 'paid',
      formatTime(s.date), formatDate(s.date),
      s.orderType, s.customerNumber,
      ...(s.items || []).map(i => i.name)
    ].filter(Boolean).join(' ').toLowerCase();
    return haystack.includes(searchTerm);
  }) : periodSales;

  const salesTotal = searchedSales.reduce((a,s)=>a+s.total,0);

  document.getElementById('reportBills').textContent = searchedSales.length;
  document.getElementById('reportSales').textContent = `Rs ${salesTotal.toLocaleString()}`;

  renderReportDetails(searchedSales);
  renderUnpaidBills();
}

/* ---------------- TOP SELLING ITEMS (Today / Week / Month / Year / any date) ---------------- */
let topItemsMode = 'daily';
function setTopItemsMode(mode){
  topItemsMode = mode;
  const sel = document.getElementById('topItemsRangeSelect');
  if(sel) sel.value = mode;
  renderTopSellingItems();
}

function renderTopSellingItems(){
  const dateInput = document.getElementById('topItemsDateInput');
  if(!dateInput) return;
  if(!dateInput.value){
    const t = new Date();
    dateInput.value = `${t.getFullYear()}-${String(t.getMonth()+1).padStart(2,'0')}-${String(t.getDate()).padStart(2,'0')}`;
  }
  const picked = new Date(dateInput.value + 'T00:00:00');

  const matches = (d) => {
    if(topItemsMode === 'daily') return isSameDay(d, picked);
    if(topItemsMode === 'weekly') return isSameWeek(d, picked);
    if(topItemsMode === 'monthly') return d.getFullYear() === picked.getFullYear() && d.getMonth() === picked.getMonth();
    return d.getFullYear() === picked.getFullYear();
  };

  const periodSales = sales.filter(s => matches(s.date));

  // Tally quantity sold per item name across every bill in this period.
  const counts = {};
  periodSales.forEach(s => {
    (s.items || []).forEach(i => {
      counts[i.name] = (counts[i.name] || 0) + (i.qty || 0);
    });
  });

  const ranked = Object.entries(counts)
    .map(([name, qty]) => ({ name, qty }))
    .sort((a, b) => b.qty - a.qty);

  const totalQty = ranked.reduce((a, r) => a + r.qty, 0);
  const maxQty = ranked.length ? ranked[0].qty : 0;

  const labelMap = { daily: 'Selected Day', weekly: 'Selected Week', monthly: 'Selected Month', yearly: 'Selected Year' };
  const labelEl = document.getElementById('topItemsPeriodLabel');
  if(labelEl) labelEl.textContent = labelMap[topItemsMode] || 'Period';
  const totalEl = document.getElementById('topItemsTotalQty');
  if(totalEl) totalEl.textContent = `${totalQty} item${totalQty === 1 ? '' : 's'} sold`;

  const listEl = document.getElementById('topItemsList');
  if(!listEl) return;

  if(ranked.length === 0){
    listEl.innerHTML = `<div class="top-item-empty">No items sold in this period.</div>`;
    return;
  }

  listEl.innerHTML = ranked.map((r, idx) => {
    const pct = maxQty ? Math.round((r.qty / maxQty) * 100) : 0;
    const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : (idx + 1);
    const imgSrc = getTopItemImage(r.name);
    const mediaHtml = imgSrc
      ? `<img class="top-item-img" src="${imgSrc}" alt="${r.name}" onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'top-item-img-placeholder',textContent:'🍽️'}))">`
      : `<div class="top-item-img-placeholder">🍽️</div>`;
    return `
      <div class="top-item-row">
        <div class="top-item-media">
          ${mediaHtml}
          <span class="top-item-rank-badge">${medal}</span>
        </div>
        <div class="top-item-info">
          <div class="top-item-name-row">
            <span class="top-item-name">${r.name}</span>
            <span class="top-item-qty">${r.qty} sold</span>
          </div>
          <div class="top-item-bar-track">
            <div class="top-item-bar-fill" style="width:${pct}%;"></div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Looks up the product photo for an item name from the live menu (PRODUCTS).
// Falls back to a plate emoji placeholder when the product has no image set.
function getTopItemImage(name){
  try{
    if(typeof PRODUCTS !== 'undefined' && Array.isArray(PRODUCTS)){
      const p = PRODUCTS.find(p => p.name === name);
      if(p && p.image) return p.image;
    }
  }catch(e){ /* ignore lookup errors, just fall back to placeholder */ }
  return '';
}

/* ---------------- UNPAID BILLS ---------------- */
function renderUnpaidBills(){
  const badge = document.getElementById('unpaidNavBadge');
  const body = document.getElementById('unpaidSalesTableBody');
  if(!body) return;

  const unpaid = sales
    .filter(s => (s.paymentStatus || 'paid') === 'pending')
    .sort((a,b) => b.date - a.date);

  if(badge) badge.textContent = unpaid.length;

  if(unpaid.length === 0){
    body.innerHTML = `<tr class="empty-row"><td colspan="5">No unpaid bills right now 🎉</td></tr>`;
  } else {
    body.innerHTML = unpaid.map(s => `
      <tr>
        <td>${s.billNo}</td>
        <td>${formatDate(s.date)}, ${formatTime(s.date)}</td>
        <td>${s.cashier}</td>
        <td>Rs ${s.total}</td>
        <td>
          <button class="view-btn" onclick="viewSale('${s.billNo}')">👁</button>
          <button class="view-btn" onclick="openEditBillModal('${s.billNo}')">✏️</button>
          <button class="expense-del-btn" style="background:var(--gold-grad);color:#fff;" onclick="markBillPaid('${s.billNo}')">✅ Mark Paid</button>
        </td>
      </tr>
    `).join('');
  }
}

function renderReportDetails(periodSales){
  const salesBody = document.getElementById('reportSalesTableBody');
  if(!salesBody) return;

  if(periodSales.length === 0){
    salesBody.innerHTML = `<tr class="empty-row"><td colspan="7">No bills in this period.</td></tr>`;
  } else {
    salesBody.innerHTML = periodSales.map(s => `
      <tr>
        <td>${s.billNo}</td>
        <td>${formatDate(s.date)}, ${formatTime(s.date)}</td>
        <td>${s.cashier}</td>
        <td>${(s.paymentMethod || 'cash') === 'online' ? '📲 Online' : '💵 Cash'}</td>
        <td>${(s.paymentStatus || 'paid') === 'pending' ? '🕒 Pending' : '✅ Paid'}</td>
        <td>Rs ${s.total}</td>
        <td>
          <button class="view-btn" onclick="viewSale('${s.billNo}')">👁</button>
          <button class="view-btn" onclick="openEditBillModal('${s.billNo}')">✏️</button>
          <button class="expense-del-btn" onclick="deleteSale('${s.billNo}')">🗑️</button>
        </td>
      </tr>
    `).join('');
  }
}

/* ---------------- QUICK CALCULATE (header nav) ---------------- */
function calculateQuick(){
  const wrap = document.getElementById('quickCalcWrap');
  if(!wrap) return;
  const today = new Date();
  const todaySales = sales.filter(s => isSameDay(s.date, today)).reduce((a,s)=>a+s.total,0);
  const todayExpenses = expenses.filter(e => isSameDay(e.date, today)).reduce((a,e)=>a+e.amount,0);
  document.getElementById('quickCalcSales').textContent = `Rs ${todaySales.toLocaleString()}`;
  document.getElementById('quickCalcExpenses').textContent = `Rs ${todayExpenses.toLocaleString()}`;
  document.getElementById('quickCalcNet').textContent = `Rs ${(todaySales - todayExpenses).toLocaleString()}`;
  wrap.classList.toggle('hidden');
}

/* ---------------- OWNER DASHBOARD ---------------- */
function isSameDay(d1, d2){
  return d1.getFullYear()===d2.getFullYear() && d1.getMonth()===d2.getMonth() && d1.getDate()===d2.getDate();
}
function startOfWeek(d){
  // Week starts on Monday
  const date = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const day = date.getDay(); // 0=Sun..6=Sat
  const diff = (day === 0 ? -6 : 1 - day); // shift Sunday back to previous Monday
  date.setDate(date.getDate() + diff);
  date.setHours(0,0,0,0);
  return date;
}
function isSameWeek(d1, d2){
  return startOfWeek(d1).getTime() === startOfWeek(d2).getTime();
}

function renderOwnerDashboard(){
  renderPriceManager();
  renderCategoryManager();
  refreshDeliveryChargeUI();
  renderExpensesOwner();
  const totalRevenue = sales.reduce((s,x)=>s+x.total,0);
  const today = new Date();
  const todaySales = sales.filter(x => isSameDay(x.date, today)).reduce((s,x)=>s+x.total,0);
  const totalBills = sales.length;
  const itemsSold = sales.reduce((s,x)=> s + x.items.reduce((a,i)=>a+i.qty,0), 0);

  const totalExpensesAll = expenses.reduce((s,e)=>s+e.amount,0);

  document.getElementById('statRevenue').textContent = `Rs ${totalRevenue.toLocaleString()}`;
  document.getElementById('statToday').textContent = `Rs ${todaySales.toLocaleString()}`;
  document.getElementById('statBills').textContent = totalBills;
  document.getElementById('statItems').textContent = itemsSold;
  const netEl = document.getElementById('statNetProfit');
  if(netEl) netEl.textContent = `Rs ${(totalRevenue - totalExpensesAll).toLocaleString()}`;
  renderSalesReport();
  renderTopSellingItems();

  renderTrendChart();
}

// ---------- Sales & Expense line charts (scrollable, curved, hover tooltip) ----------
// No day limit: charts always cover every day from the very first sale/expense
// record on file up to today. Older days are reached by scrolling the chart.

// Earliest date across all sales & expense records — the chart's starting point.
function getEarliestRecordDate(){
  const allDates = [
    ...sales.map(s=>s.date),
    ...expenses.map(e=>e.date)
  ].filter(Boolean);
  if(allDates.length === 0) return null;
  return new Date(Math.min(...allDates.map(d=>new Date(d).setHours(0,0,0,0))));
}

function computeChartDays(){
  const today = new Date(); today.setHours(0,0,0,0);
  const earliest = getEarliestRecordDate() || today; // no records yet -> just show today
  const days = [];
  for(let d = new Date(earliest); d.getTime() <= today.getTime(); d.setDate(d.getDate()+1)){
    const dayDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const revenue = sales.filter(s=>isSameDay(s.date,dayDate)).reduce((a,x)=>a+x.total,0);
    const expenseVal = expenses.filter(e=>isSameDay(e.date,dayDate)).reduce((a,e)=>a+e.amount,0);
    days.push({
      date: dayDate,
      label: `${String(dayDate.getDate()).padStart(2,'0')}-${dayDate.toLocaleString('en-US',{month:'short'})}`,
      revenue, expenseVal
    });
  }
  return days;
}

function renderTrendChart(){
  const days = computeChartDays();
  buildLineChart({
    wrapId: 'salesChartWrap', scrollId: 'salesChartScroll',
    days, valueKey: 'revenue', color: '#f5a623', label: 'Sales'
  });
  buildLineChart({
    wrapId: 'expenseChartWrap', scrollId: 'expenseChartScroll',
    days, valueKey: 'expenseVal', color: '#e0522f', label: 'Expenses'
  });
}

// Redraw charts at the right size when the screen rotates or resizes
// (so it stays crisp switching between mobile and desktop).
let _chartResizeTimer;
window.addEventListener('resize', ()=>{
  clearTimeout(_chartResizeTimer);
  _chartResizeTimer = setTimeout(()=>{
    if(currentUser && currentUser.role === 'owner') renderTrendChart();
  }, 200);
});

// Catmull-Rom to Bezier smoothing so the line curves like a real trend line.
function smoothPath(points){
  if(points.length < 3){
    return points.map((p,i)=> `${i===0?'M':'L'} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(' ');
  }
  let d = `M ${points[0].x.toFixed(1)} ${points[0].y.toFixed(1)} `;
  for(let i=0;i<points.length-1;i++){
    const p0 = points[i===0?0:i-1];
    const p1 = points[i];
    const p2 = points[i+1];
    const p3 = points[i+2===points.length+1?i:Math.min(i+2,points.length-1)];
    const cp1x = p1.x + (p2.x - p0.x)/6;
    const cp1y = p1.y + (p2.y - p0.y)/6;
    const cp2x = p2.x - (p3.x - p1.x)/6;
    const cp2y = p2.y - (p3.y - p1.y)/6;
    d += `C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)} `;
  }
  return d;
}

function niceMax(val){
  if(val <= 0) return 5;
  const pow = Math.pow(10, Math.floor(Math.log10(val)));
  const norm = val / pow;
  let step;
  if(norm <= 1) step = 1;
  else if(norm <= 2) step = 2;
  else if(norm <= 2.5) step = 2.5;
  else if(norm <= 5) step = 5;
  else step = 10;
  return step * pow; // one "nice" unit above data, gridlines subdivide it
}

function buildLineChart(opts){
  const { wrapId, scrollId, days, valueKey, color, label } = opts;
  const chartWrap = document.getElementById(wrapId);
  if(!chartWrap) return;

  if(days.length === 0){
    chartWrap.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#999;font-size:13px;">No data yet</div>`;
    return;
  }

  const isMobile = window.innerWidth <= 640;
  const colWidth = isMobile ? 34 : 46;
  const svgW = Math.max(days.length * colWidth, isMobile ? 260 : 320);
  const svgH = isMobile ? 180 : 220;
  const padTop = 16, padBottom = isMobile ? 26 : 32, padLeft = 8, padRight = 8;
  const plotH = svgH - padTop - padBottom;
  const plotW = svgW - padLeft - padRight;
  const fontSizeY = isMobile ? 9 : 10;
  const fontSizeX = isMobile ? 9 : 10;
  const dotR = isMobile ? 2.3 : 3;

  const rawMax = Math.max(...days.map(d=>d[valueKey]), 0);
  const maxVal = Math.max(niceMax(rawMax * 1.15), 5);

  const xFor = (i) => padLeft + (days.length === 1 ? plotW/2 : (i/(days.length-1)) * plotW);
  const yFor = (v) => padTop + plotH - (v/maxVal) * plotH;

  const points = days.map((d,i)=>({ x: xFor(i), y: yFor(d[valueKey]) }));
  const linePath = smoothPath(points);
  const areaPath = `${linePath} L ${points[points.length-1].x.toFixed(1)} ${(padTop+plotH).toFixed(1)} L ${points[0].x.toFixed(1)} ${(padTop+plotH).toFixed(1)} Z`;

  const gridSteps = 5;
  const gridLines = [];
  const yLabels = [];
  for(let g=0; g<=gridSteps; g++){
    const v = maxVal * (g/gridSteps);
    const y = (padTop + plotH - (v/maxVal)*plotH).toFixed(1);
    gridLines.push(`<line x1="${padLeft}" y1="${y}" x2="${svgW-padRight}" y2="${y}" stroke="rgba(28,17,12,0.07)" stroke-width="1"/>`);
    yLabels.push(`<text x="2" y="${(Number(y)+4)}" font-size="${fontSizeY}" fill="#aaa">${Math.round(v).toLocaleString()}</text>`);
  }

  const labelEvery = days.length > 20 ? Math.ceil(days.length/(isMobile?10:15)) : (days.length > 10 ? 2 : 1);
  const xLabels = days.map((d,i)=>{
    if(i % labelEvery !== 0 && i !== days.length-1) return '';
    return `<text x="${xFor(i).toFixed(1)}" y="${svgH-(isMobile?9:12)}" font-size="${fontSizeX}" fill="#999" text-anchor="middle">${d.label}</text>`;
  }).join('');

  const gradId = `grad-${wrapId}`;
  chartWrap.innerHTML = `
    <svg id="svg-${wrapId}" width="${svgW}" height="${svgH}" viewBox="0 0 ${svgW} ${svgH}" style="display:block;overflow:visible;">
      <defs>
        <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.32"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0.02"/>
        </linearGradient>
      </defs>
      ${gridLines.join('')}
      <path d="${areaPath}" fill="url(#${gradId})" stroke="none"/>
      <path d="${linePath}" fill="none" stroke="${color}" stroke-width="${isMobile?2:2.5}" stroke-linejoin="round" stroke-linecap="round"/>
      ${points.map(p=>`<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${dotR}" fill="${color}" stroke="#fff" stroke-width="1.2"/>`).join('')}
      ${yLabels.join('')}
      ${xLabels}
      <line id="crosshair-${wrapId}" class="chart-crosshair" x1="0" y1="${padTop}" x2="0" y2="${padTop+plotH}" style="opacity:0;"/>
      <circle id="hoverdot-${wrapId}" r="4.5" fill="${color}" stroke="#fff" stroke-width="2" style="opacity:0;"/>
    </svg>
    <div class="chart-tooltip" id="tooltip-${wrapId}"></div>
  `;

  // hover / touch tracking to show the value at whatever point the mouse/finger is at
  const svgEl = document.getElementById(`svg-${wrapId}`);
  const tooltipEl = document.getElementById(`tooltip-${wrapId}`);
  const crosshairEl = document.getElementById(`crosshair-${wrapId}`);
  const hoverDotEl = document.getElementById(`hoverdot-${wrapId}`);
  const scrollEl = document.getElementById(scrollId);

  function showAt(clientX){
    const rect = svgEl.getBoundingClientRect();
    const scaleX = svgW / rect.width;
    const localX = (clientX - rect.left) * scaleX;
    let idx = 0, best = Infinity;
    points.forEach((p,i)=>{
      const dist = Math.abs(p.x - localX);
      if(dist < best){ best = dist; idx = i; }
    });
    const p = points[idx];
    const d = days[idx];
    crosshairEl.setAttribute('x1', p.x); crosshairEl.setAttribute('x2', p.x);
    crosshairEl.style.opacity = 1;
    hoverDotEl.setAttribute('cx', p.x); hoverDotEl.setAttribute('cy', p.y);
    hoverDotEl.style.opacity = 1;

    const scaleXInv = rect.width / svgW;
    tooltipEl.style.left = `${p.x * scaleXInv}px`;
    tooltipEl.style.top = `${p.y * (rect.height/svgH)}px`;
    tooltipEl.textContent = `${d.label} · ${label} Rs ${d[valueKey].toLocaleString()}`;
    tooltipEl.classList.add('show');
  }
  function hide(){
    crosshairEl.style.opacity = 0;
    hoverDotEl.style.opacity = 0;
    tooltipEl.classList.remove('show');
  }

  svgEl.addEventListener('mousemove', (e)=> showAt(e.clientX));
  svgEl.addEventListener('mouseleave', hide);
  svgEl.addEventListener('touchstart', (e)=>{ if(e.touches[0]) showAt(e.touches[0].clientX); }, {passive:true});
  svgEl.addEventListener('touchmove', (e)=>{ if(e.touches[0]) showAt(e.touches[0].clientX); }, {passive:true});
  svgEl.addEventListener('touchend', hide);

  // auto-scroll to the most recent day
  if(scrollEl) scrollEl.scrollLeft = scrollEl.scrollWidth;
}


function viewSale(billNo){
  const sale = sales.find(s => s.billNo === billNo);
  if(sale) showReceipt(sale);
}
function viewExpense(expenseNo){
  const exp = expenses.find(e => e.expenseNo === expenseNo);
  if(!exp) return;
  const el = document.getElementById('receiptContent');
  el.innerHTML = `
    <img src="https://i.ibb.co/RG8N5j1H/alhamd-logo.png" class="receipt-logo" alt="Alhamd Fast Food">
    <p class="sub">Expense Record</p>
    <hr class="dash">
    <div class="r-row"><span>Expense #: ${exp.expenseNo}</span><span>${formatDate(exp.date)}</span></div>
    <div class="r-row"><span>Added By: ${exp.addedBy}</span><span>${formatTime(exp.date, true)}</span></div>
    <div class="r-row"><span>Payment: ${(exp.paymentMethod || 'cash') === 'online' ? '📲 Online Payment' : '💵 Cash'}</span><span></span></div>
    <hr class="dash">
    <div class="r-item">
      <div class="r-item-name">${exp.description}</div>
    </div>
    <hr class="dash">
    <div class="r-total-row"><span>AMOUNT</span><span>Rs ${exp.amount}</span></div>
    <hr class="dash">
    <div class="receipt-btn-row no-print">
      <button class="close-receipt" onclick="closeReceipt()">Close</button>
      <button class="print-receipt-btn" onclick="printReceipt()">🖨️ Print</button>
    </div>
  `;
  document.getElementById('receiptModal').classList.remove('hidden');
}
/* ---------------- PRICE MANAGER (Owner) ----------------
   Mirrors the salesman's category-tab + menu-grid layout exactly,
   except each card shows editable price input(s) instead of an
   "Add" button, so the owner can update prices in the same familiar view. */
let priceActiveCat = 'All';

function renderPriceCategories(){
  const row = document.getElementById('priceCatRow');
  if(!row) return;
  row.innerHTML = getCategoriesWithAll().map(c =>
    `<button class="cat-pill ${c===priceActiveCat?'active':''}" onclick="setPriceCategory('${c.replace(/'/g,"\\'")}')">${c}</button>`
  ).join('');
}
function setPriceCategory(c){
  priceActiveCat = c;
  renderPriceCategories();
  renderPriceManager();
}

function renderPriceManager(){
  const grid = document.getElementById('priceProductGrid');
  if(!grid) return;
  renderPriceCategories();
  const q = (document.getElementById('priceSearchInput')?.value || "").toLowerCase();
  const list = PRODUCTS.filter(p => (priceActiveCat==='All' || p.cat===priceActiveCat) && p.name.toLowerCase().includes(q));
  if(list.length === 0){
    grid.innerHTML = `<div style="grid-column:1/-1;color:#999;text-align:center;padding:40px;">No items match your search.</div>`;
    return;
  }
  grid.innerHTML = list.map((p, idx) => {
    const safeName = p.name.replace(/'/g,"\\'");
    if(p.variants && p.variants.length){
      const rows = p.variants.map((v, vIdx) => {
        const rowId = `price-row-${idx}-${vIdx}-${p.name.replace(/[^a-zA-Z0-9]/g,'')}`;
        return `
          <div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:8px;">
            <span class="size-pill" style="cursor:default;">${v.label}</span>
            <span style="display:flex;align-items:center;gap:6px;">
              <span style="font-weight:700;color:#8a8a8a;">Rs</span>
              <input type="number" min="0" step="1" class="price-input" id="${rowId}" style="width:90px;"
                value="${v.price}"
                onchange="updateVariantPrice('${safeName}', ${vIdx}, this.value, '${rowId}')">
              <span class="price-saved-tag" id="${rowId}-tag">Saved ✓</span>
            </span>
          </div>`;
      }).join('');
      return `
        <div class="prod-card prod-card-variant">
          <div class="prod-cat">${p.cat}</div>
          <div class="prod-name">${p.name}</div>
          ${rows}
        </div>
      `;
    }
    const rowId = `price-row-${idx}-${p.name.replace(/[^a-zA-Z0-9]/g,'')}`;
    return `
      <div class="prod-card">
        <div class="prod-cat">${p.cat}</div>
        <div class="prod-name">${p.name}</div>
        <div style="display:flex;align-items:center;gap:6px;">
          <span style="font-weight:800;color:#8a8a8a;">Rs</span>
          <input type="number" min="0" step="1" class="price-input" id="${rowId}" style="width:100px;"
            value="${p.price}"
            onchange="updatePrice('${safeName}', this.value, '${rowId}')">
          <span class="price-saved-tag" id="${rowId}-tag">Saved ✓</span>
        </div>
      </div>
    `;
  }).join('');
}

function updatePrice(name, value, rowId){
  const p = PRODUCTS.find(x => x.name === name);
  if(!p) return;
  const v = Math.max(0, Math.round(parseFloat(value) || 0));
  p.price = v;
 saveAllProducts();
  if(document.getElementById('productGrid')) renderProducts();
  const tag = document.getElementById(`${rowId}-tag`);
  if(tag){
    tag.classList.add('show');
    setTimeout(() => tag.classList.remove('show'), 1400);
  }
}

function updateVariantPrice(name, variantIdx, value, rowId){
  const p = PRODUCTS.find(x => x.name === name);
  if(!p || !p.variants || !p.variants[variantIdx]) return;
  const v = Math.max(0, Math.round(parseFloat(value) || 0));
  p.variants[variantIdx].price = v;
  saveAllProducts();
  if(document.getElementById('productGrid')) renderProducts();
  const tag = document.getElementById(`${rowId}-tag`);
  if(tag){
    tag.classList.add('show');
    setTimeout(() => tag.classList.remove('show'), 1400);
  }
}

/* ---------------- CATEGORY & PRODUCT MANAGER (Owner) ---------------- */
function renderCategoryManager(){
  const select = document.getElementById('newProductCategorySelect');
  if(!select) return;
  const cats = getCategories();
  const prevValue = select.value;
  select.innerHTML = cats.map(c => `<option value="${c.replace(/"/g,'&quot;')}">${c}</option>`).join('');
  if(cats.includes(prevValue)) select.value = prevValue;

  const list = document.getElementById('categoryListWrap');
  if(list){
    list.innerHTML = cats.map(c => `<span class="cat-pill" style="cursor:default;">${c}</span>`).join('');
  }
}

function addCategory(){
  const input = document.getElementById('newCategoryNameInput');
  if(!input) return;
  const name = input.value.trim();
  if(!name) return;
  const existing = getCategories().map(c=>c.toLowerCase());
  if(existing.includes(name.toLowerCase())){
    alert('That category already exists.');
    return;
  }
  EXTRA_CATEGORIES.push(name);
  input.value = '';
  renderCategoryManager();
  renderCategories();
}

function addProduct(){
  const nameInput = document.getElementById('newProductNameInput');
  const priceInput = document.getElementById('newProductPriceInput');
  const catSelect = document.getElementById('newProductCategorySelect');
  const msgEl = document.getElementById('addProductMsg');
  if(!nameInput || !priceInput || !catSelect) return;
  const name = nameInput.value.trim();
  const price = Math.max(0, Math.round(parseFloat(priceInput.value) || 0));
  const cat = catSelect.value;
  if(!name || !cat){
    if(msgEl){ msgEl.textContent = 'Please enter a product name and choose a category.'; msgEl.style.color = 'var(--ember)'; }
    return;
  }
  if(PRODUCTS.some(p => p.name.toLowerCase() === name.toLowerCase())){
    if(msgEl){ msgEl.textContent = 'A product with that name already exists.'; msgEl.style.color = 'var(--ember)'; }
    return;
  }
  PRODUCTS.push({ name, cat, price });
  nameInput.value = '';
  priceInput.value = '';
  if(msgEl){ msgEl.textContent = `Added "${name}" to ${cat} ✓`; msgEl.style.color = '#1fae72'; }
  renderCategoryManager();
  renderCategories();
  renderPriceManager();
  if(document.getElementById('productGrid')) renderProducts();
}

/* ---------------- BACKGROUND IMAGE SLIDER ---------------- */
function startBgSlider(intervalMs){
  const slides = document.querySelectorAll('#bgSlider .bg-slide');
  const dots = document.querySelectorAll('#sliderDots .slider-dot');
  if(!slides.length) return;
  let i = 0;
  setInterval(() => {
    slides[i].classList.remove('active');
    dots[i].classList.remove('active');
    i = (i + 1) % slides.length; // loops back to 0 forever -> runs indefinitely
    slides[i].classList.add('active');
    dots[i].classList.add('active');
  }, intervalMs);
}

/* ---------------- BRAND LOGO MINI-SLIDER (logo <-> owner photo) ---------------- */
function startLogoSlider(intervalMs){
  const slides = document.querySelectorAll('#brandLogoSlider .brand-logo-slide');
  if(!slides.length) return;
  let i = 0;
  setInterval(() => {
    slides[i].classList.remove('active');
    i = (i + 1) % slides.length; // loops back to 0 forever -> runs indefinitely
    slides[i].classList.add('active');
  }, intervalMs);
}

/* init */
loadCredentials();
loadPriceOverrides();
assignProductIds();
loadAllProducts();
assignProductIds();
pmResetForm();
loadDeliveryCharge();
loadDeliveryEnabled();
selectRole('salesman');
startBgSlider(4500); // advances every 4.5s, forever
startLogoSlider(3200); // cycles logo <-> owner photo every 3.2s, forever

// Set the header shop-logo images (salesman + owner topbars) to the restaurant logo
document.querySelectorAll('.shop-logo-img').forEach(function(img){ img.src = RESTAURANT_LOGO; });

// If someone is already signed in (from before this refresh), put them
// straight back on their own screen instead of the login page.
restoreSession();

/* ================= NOTIFICATION SYSTEM (Admin only) - START =================
   Modular: register more alert types later via NotificationSystem.registerAlert().
   Only the storage/database usage warning is implemented for now.
================================================================================= */
const NotificationSystem = (function(){
  const CONFIG = {
    checkIntervalMs: 60000,          // fallback re-check interval (primary updates are real-time via Firestore onSnapshot)
    storage: { warningThreshold: 80 } // % - change the default warning threshold here
  };

  let alerts = [];
  let isOpen = false;
  const els = {};

  function cacheEls(){
    els.wrapper  = document.getElementById('notifWrapper');
    els.bellBtn  = document.getElementById('notifBellBtn');
    els.bellIcon = document.getElementById('notifBellIcon');
    els.badge    = document.getElementById('notifBadge');
    els.dropdown = document.getElementById('notifDropdown');
    els.body     = document.getElementById('notifDropdownBody');
  }

  // Add future alert types from anywhere else in the app, e.g.:
  // NotificationSystem.registerAlert({ id:'x', check(){...}, render(data){...} });
  function registerAlert(alertModule){ alerts.push(alertModule); }

  // ---- FIRESTORE DATABASE USAGE ALERT ----
  // Firestore's free Spark plan caps stored data at 1 GiB. There is no client-side
  // API that reports the real number, so this is estimated from the JSON size of
  // every document already being synced live (sales + expenses + settings) via
  // FIRESTORE_USAGE_ESTIMATE, updated in true real time (no polling) whenever any
  // of those collections change on ANY device.
  const FIRESTORE_FREE_TIER_BYTES = 1 * 1024 * 1024 * 1024; // 1 GiB Spark plan limit

  function getStorageUsagePercent(){
    if(typeof FIRESTORE_USAGE_ESTIMATE === 'undefined') return 0;
    const totalBytes = FIRESTORE_USAGE_ESTIMATE.salesBytes
      + FIRESTORE_USAGE_ESTIMATE.expensesBytes
      + FIRESTORE_USAGE_ESTIMATE.settingsBytes;
    return Math.min(100, Math.round((totalBytes / FIRESTORE_FREE_TIER_BYTES) * 100));
  }

  registerAlert({
    id: 'firestore-usage',
    check(){
      const pct = getStorageUsagePercent();
      return {
        active: pct >= CONFIG.storage.warningThreshold,
        data: { percent: pct, threshold: CONFIG.storage.warningThreshold }
      };
    },
    render(data){
      return '' +
        '<div class="notif-item">' +
          '<div class="notif-item-icon">\u26A0\uFE0F</div>' +
          '<div class="notif-item-content">' +
            '<div class="notif-item-title">Firestore Database Usage Warning</div>' +
            '<div class="notif-item-message">Your Firestore database has reached <strong>' + data.percent + '%</strong> of the 1 GiB free-tier storage limit.</div>' +
            '<div class="notif-item-bar-track"><div class="notif-item-bar-fill" style="width:' + data.percent + '%;"></div></div>' +
            '<div class="notif-item-recommend">Recommendation: upgrade to the Blaze plan before reaching the limit, to avoid write failures.</div>' +
          '</div>' +
        '</div>';
    }
  });

  function evaluateAlerts(){
    return alerts
      .map(function(a){ return { module:a, result:a.check() }; })
      .filter(function(r){ return r.result.active; });
  }

  function render(){
    if(!els.wrapper) return;
    const active = evaluateAlerts();

    els.body.innerHTML = active.length
      ? active.map(function(r){ return r.module.render(r.result.data); }).join('')
      : '<div class="notif-empty">No notifications</div>';

    if(active.length){
      els.badge.style.display = 'flex';
      els.badge.textContent = active.length > 9 ? '9+' : active.length;
      if(!isOpen) els.bellIcon.classList.add('notif-ringing');
    }else{
      els.badge.style.display = 'none';
      els.bellIcon.classList.remove('notif-ringing');
    }
  }

  function openDropdown(){
    isOpen = true;
    els.dropdown.classList.add('show');
    els.bellBtn.setAttribute('aria-expanded', 'true');
    els.bellIcon.classList.remove('notif-ringing'); // stop shaking once opened
  }

  function closeDropdown(){
    isOpen = false;
    els.dropdown.classList.remove('show');
    els.bellBtn.setAttribute('aria-expanded', 'false');
  }

  function toggleDropdown(e){
    if(e) e.stopPropagation();
    isOpen ? closeDropdown() : openDropdown();
  }

  function bindEvents(){
    document.addEventListener('click', function(e){
      if(isOpen && els.wrapper && !els.wrapper.contains(e.target)) closeDropdown();
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && isOpen) closeDropdown();
    });
  }

  function init(){
    cacheEls();
    if(!els.wrapper) return; // bell not present on this screen, skip quietly
    bindEvents();
    render();
    setInterval(render, CONFIG.checkIntervalMs);
  }

  return {
    init,
    registerAlert,
    toggleDropdown,
    closeDropdown,
    setStorageThreshold(pct){ CONFIG.storage.warningThreshold = pct; },
    refresh: render
  };
})();

function toggleNotifDropdown(e){ NotificationSystem.toggleDropdown(e); }
function closeNotifDropdown(e){ if(e) e.stopPropagation(); NotificationSystem.closeDropdown(); }

NotificationSystem.init();
/* ================= NOTIFICATION SYSTEM (Admin only) - END ================= */
/* ============================================================ */
(function () {
  // Same Firebase project as your website / POS.
  const firebaseConfig = {
    apiKey: "AIzaSyAfUCS3W26AifYgIbvY2J61CSgkDkn649M",
    authDomain: "alhamd-fast-food.firebaseapp.com",
    projectId: "alhamd-fast-food",
    storageBucket: "alhamd-fast-food.firebasestorage.app",
    messagingSenderId: "435660072478",
    appId: "1:435660072478:web:1827e1e6054a21341bf00f"
  };
  if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const settingsRef = db.collection("settings").doc("main");

  let PRODUCTS = [];
  let DEALS = [];
  let editingIndex = null;    // null = creating a new deal
  let pendingImageDataDesktop = "";  // newly uploaded desktop photo, as a data URL (not saved yet)
  let pendingImageURLDesktop = "";   // existing desktop photo (URL or data URL) when editing
  let pendingImageDataMobile = "";   // newly uploaded mobile photo, as a data URL (not saved yet)
  let pendingImageURLMobile = "";    // existing mobile photo (URL or data URL) when editing
  let pickedProduct = null;   // {id, name} or null

  const listEl = document.getElementById("daList");
  if (!listEl) return; // this page doesn't have the deals block — nothing to do

  const emptyEl = document.getElementById("daEmpty");
  const newBtn = document.getElementById("daNewBtn");
  const overlay = document.getElementById("daModalOverlay");
  const modalTitle = document.getElementById("daModalTitle");
  const closeBtn = document.getElementById("daCloseBtn");
  const imgInputDesktop = document.getElementById("daImageInputDesktop");
  const imgUrlInputDesktop = document.getElementById("daImageUrlDesktop");
  const previewImgDesktop = document.getElementById("daPreviewImgDesktop");
  const uploadHintDesktop = document.getElementById("daUploadHintDesktop");
  const imgInputMobile = document.getElementById("daImageInputMobile");
  const imgUrlInputMobile = document.getElementById("daImageUrlMobile");
  const previewImgMobile = document.getElementById("daPreviewImgMobile");
  const uploadHintMobile = document.getElementById("daUploadHintMobile");
  const itemSearch = document.getElementById("daItemSearch");
  const itemResults = document.getElementById("daItemResults");
  const itemPicked = document.getElementById("daItemPicked");
  const itemPickedName = document.getElementById("daItemPickedName");
  const itemClear = document.getElementById("daItemClear");
  const activeToggle = document.getElementById("daActiveToggle");
  const statusEl = document.getElementById("daStatus");
  const saveBtn = document.getElementById("daSaveBtn");
  const deleteBtn = document.getElementById("daDeleteBtn");

  /* ---------------- live data ---------------- */
  settingsRef.onSnapshot(function (doc) {
    if (!doc.exists) return;
    const d = doc.data();
    PRODUCTS = Array.isArray(d.products) ? d.products : [];
    DEALS = Array.isArray(d.deals) ? d.deals : [];
    renderList();
  }, function (err) {
    console.error("Deals admin: couldn't load settings/main", err);
  });

  function findProductLabel(d) {
    const match = PRODUCTS.find(function (p) {
      return (d.productId && (p.id === d.productId || p.name === d.productId)) ||
             (!d.productId && p.name === d.itemName);
    });
    return match ? match.name : (d.itemName || "");
  }

  function renderList() {
    if (DEALS.length === 0) {
      listEl.innerHTML = "";
      emptyEl.style.display = "block";
      return;
    }
    emptyEl.style.display = "none";
    listEl.innerHTML = DEALS.map(function (d, i) {
      const linked = d.productId || d.itemName;
      const label = linked ? (findProductLabel(d) || "Linked item") : "No item linked";
      return (
        '<div class="da-card">' +
          '<img class="da-card-thumb" src="' + escapeAttr(d.imageDesktop || d.image || d.imageMobile || "") + '" alt="">' +
          '<div class="da-card-body">' +
            '<div class="da-card-target">' + escapeHtml(label) + '</div>' +
            '<div class="da-card-sub">' + (d.active ? "Live on website" : "Turned off") + '</div>' +
          '</div>' +
          '<div class="da-card-actions">' +
            '<label class="da-switch">' +
              '<input type="checkbox" data-i="' + i + '" class="da-quick-toggle"' + (d.active ? " checked" : "") + '>' +
              '<span class="da-switch-track"></span>' +
            '</label>' +
            '<button type="button" class="da-icon-btn da-edit-btn" data-i="' + i + '" aria-label="Edit deal">✎</button>' +
          '</div>' +
        '</div>'
      );
    }).join("");

    listEl.querySelectorAll(".da-quick-toggle").forEach(function (el) {
      el.addEventListener("change", function () {
        const i = parseInt(el.dataset.i, 10);
        DEALS[i].active = el.checked;
        saveDealsArray().catch(function (err) {
          console.error(err);
          el.checked = !el.checked;
          DEALS[i].active = el.checked;
        });
      });
    });
    listEl.querySelectorAll(".da-edit-btn").forEach(function (el) {
      el.addEventListener("click", function () { openModal(parseInt(el.dataset.i, 10)); });
    });
  }

  /* ---------------- modal open/close ---------------- */
  function openModal(index) {
    editingIndex = (typeof index === "number") ? index : null;
    pendingImageDataDesktop = "";
    pendingImageDataMobile = "";
    imgInputDesktop.value = "";
    imgInputMobile.value = "";
    setStatus("", "");
    itemSearch.value = "";
    itemResults.innerHTML = "";

    if (editingIndex !== null) {
      const d = DEALS[editingIndex];
      modalTitle.textContent = "Edit Deal";

      pendingImageURLDesktop = d.imageDesktop || d.image || "";
      imgUrlInputDesktop.value = pendingImageURLDesktop.indexOf("http") === 0 ? pendingImageURLDesktop : "";
      previewImgDesktop.src = pendingImageURLDesktop;
      previewImgDesktop.style.display = pendingImageURLDesktop ? "block" : "none";
      uploadHintDesktop.style.display = pendingImageURLDesktop ? "none" : "flex";

      pendingImageURLMobile = d.imageMobile || "";
      imgUrlInputMobile.value = pendingImageURLMobile.indexOf("http") === 0 ? pendingImageURLMobile : "";
      previewImgMobile.src = pendingImageURLMobile;
      previewImgMobile.style.display = pendingImageURLMobile ? "block" : "none";
      uploadHintMobile.style.display = pendingImageURLMobile ? "none" : "flex";

      activeToggle.checked = !!d.active;
      deleteBtn.style.display = "inline-flex";
      if (d.productId || d.itemName) {
        const match = PRODUCTS.find(function (p) {
          return (d.productId && (p.id === d.productId || p.name === d.productId)) ||
                 (!d.productId && p.name === d.itemName);
        });
        pickedProduct = match
          ? { id: match.id || match.name, name: match.name }
          : { id: d.productId || "", name: d.itemName || "" };
        showPicked();
      } else {
        pickedProduct = null;
        hidePicked();
      }
    } else {
      modalTitle.textContent = "New Deal";

      pendingImageURLDesktop = "";
      imgUrlInputDesktop.value = "";
      previewImgDesktop.style.display = "none";
      uploadHintDesktop.style.display = "flex";

      pendingImageURLMobile = "";
      imgUrlInputMobile.value = "";
      previewImgMobile.style.display = "none";
      uploadHintMobile.style.display = "flex";

      activeToggle.checked = true;
      deleteBtn.style.display = "none";
      pickedProduct = null;
      hidePicked();
    }

    overlay.style.display = "flex";
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    overlay.style.display = "none";
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", function (e) { if (e.target === overlay) closeModal(); });
  newBtn.addEventListener("click", function () { openModal(null); });

  /* ---------------- image picker ----------------
     No Firebase Storage involved — the photo is embedded directly as the
     image (same approach your Product Manager already uses), or you can
     paste a link instead via the Image URL field below it. */
  imgInputDesktop.addEventListener("change", function () {
    const file = imgInputDesktop.files[0];
    if (!file) return;
    if (file.size > 700 * 1024) {
      setStatus("That photo is a bit heavy to embed directly — try a smaller one, or use the Image URL field instead for full-size photos.", "err");
      imgInputDesktop.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      pendingImageDataDesktop = e.target.result;
      imgUrlInputDesktop.value = "";
      previewImgDesktop.src = pendingImageDataDesktop;
      previewImgDesktop.style.display = "block";
      uploadHintDesktop.style.display = "none";
    };
    reader.readAsDataURL(file);
  });

  imgUrlInputDesktop.addEventListener("input", function () {
    const url = imgUrlInputDesktop.value.trim();
    if (!url) return;
    pendingImageDataDesktop = "";
    imgInputDesktop.value = "";
    previewImgDesktop.src = url;
    previewImgDesktop.style.display = "block";
    uploadHintDesktop.style.display = "none";
  });

  imgInputMobile.addEventListener("change", function () {
    const file = imgInputMobile.files[0];
    if (!file) return;
    if (file.size > 700 * 1024) {
      setStatus("That photo is a bit heavy to embed directly — try a smaller one, or use the Image URL field instead for full-size photos.", "err");
      imgInputMobile.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = function (e) {
      pendingImageDataMobile = e.target.result;
      imgUrlInputMobile.value = "";
      previewImgMobile.src = pendingImageDataMobile;
      previewImgMobile.style.display = "block";
      uploadHintMobile.style.display = "none";
    };
    reader.readAsDataURL(file);
  });

  imgUrlInputMobile.addEventListener("input", function () {
    const url = imgUrlInputMobile.value.trim();
    if (!url) return;
    pendingImageDataMobile = "";
    imgInputMobile.value = "";
    previewImgMobile.src = url;
    previewImgMobile.style.display = "block";
    uploadHintMobile.style.display = "none";
  });

  /* ---------------- item search ---------------- */
  itemSearch.addEventListener("input", function () {
    const q = itemSearch.value.trim().toLowerCase();
    if (!q) { itemResults.innerHTML = ""; return; }
    const matches = PRODUCTS.filter(function (p) {
      return (p.name || "").toLowerCase().includes(q);
    }).slice(0, 8);
    itemResults.innerHTML = matches.map(function (p) {
      return '<div class="da-item-result" data-id="' + escapeAttr(p.id || p.name) + '" data-name="' + escapeAttr(p.name) + '">' + escapeHtml(p.name) + '</div>';
    }).join("");
    itemResults.querySelectorAll(".da-item-result").forEach(function (el) {
      el.addEventListener("click", function () {
        pickedProduct = { id: el.dataset.id, name: el.dataset.name };
        showPicked();
        itemSearch.value = "";
        itemResults.innerHTML = "";
      });
    });
  });
  itemClear.addEventListener("click", function () { pickedProduct = null; hidePicked(); });
  function showPicked() {
    itemPickedName.textContent = pickedProduct.name;
    itemPicked.style.display = "flex";
    itemSearch.style.display = "none";
  }
  function hidePicked() {
    itemPicked.style.display = "none";
    itemSearch.style.display = "block";
  }

  /* ---------------- save / delete ---------------- */
  saveBtn.addEventListener("click", function () {
    const finalImageDesktop = pendingImageDataDesktop || imgUrlInputDesktop.value.trim() || pendingImageURLDesktop || "";
    const finalImageMobile = pendingImageDataMobile || imgUrlInputMobile.value.trim() || pendingImageURLMobile || "";
    if (!finalImageDesktop && !finalImageMobile) {
      setStatus("Please add at least one photo for this deal — desktop, mobile, or both.", "err");
      return;
    }
    saveBtn.disabled = true;
    setStatus("Saving…", "");

    const dealObj = {
      active: !!activeToggle.checked,
      image: finalImageDesktop || finalImageMobile,       // kept so older website code (that only reads "image") still works
      imageDesktop: finalImageDesktop || finalImageMobile, // used on desktop/laptop screens
      imageMobile: finalImageMobile || finalImageDesktop,  // used on phone screens
      productId: pickedProduct ? pickedProduct.id : "",
      itemName: pickedProduct ? pickedProduct.name : ""
    };
    if (editingIndex !== null) DEALS[editingIndex] = dealObj;
    else DEALS.push(dealObj);

    saveDealsArray()
      .then(function () {
        setStatus("Saved — live on your website now.", "ok");
        setTimeout(closeModal, 600);
      })
      .catch(function (err) {
        console.error(err);
        setStatus("Couldn't save — check your connection and try again.", "err");
      })
      .finally(function () {
        saveBtn.disabled = false;
      });
  });

  deleteBtn.addEventListener("click", function () {
    if (editingIndex === null) return;
    if (!confirm("Delete this deal? This can't be undone.")) return;
    const removed = DEALS.splice(editingIndex, 1);
    saveDealsArray()
      .then(closeModal)
      .catch(function (err) {
        console.error(err);
        DEALS.splice(editingIndex, 0, removed[0]);
        setStatus("Couldn't delete — try again.", "err");
      });
  });

  function saveDealsArray() {
    return settingsRef.set({ deals: DEALS }, { merge: true });
  }

  function setStatus(msg, kind) {
    statusEl.textContent = msg;
    statusEl.className = "da-status" + (kind ? " " + kind : "");
  }
  function escapeHtml(str) {
    return String(str).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function escapeAttr(str) { return String(str).replace(/"/g, "&quot;"); }
})();
function toggleOrderType() {
    const type = document.getElementById("orderType").value;
    document.getElementById("customerNumberBox").style.display =
        (type === "Delivery") ? "block" : "none";

    if (type !== "Delivery") {
        document.getElementById("customerNumber").value = "";
    }
}
