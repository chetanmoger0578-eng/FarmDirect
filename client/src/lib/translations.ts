export type Language = 'en' | 'hi' | 'kn';

export interface TranslationType {
    // Login/Landing
    title: string;
    subtitle: string;
    customerCardTitle: string;
    customerCardDescription: string;
    customerBenefits: string[];
    farmerCardTitle: string;
    farmerCardDescription: string;
    farmerBenefits: string[];
    back: string;
    customerLoginTitle: string;
    customerLoginDescription: string;
    continueWithGoogle: string;
    farmerLoginTitle: string;
    farmerLoginDescription: string;
    email: string;
    password: string;
    login: string;
    loggingIn: string;
    noAccount: string;
    registerHere: string;
    farmerRegistrationTitle: string;
    farmerRegistrationDescription: string;
    fullName: string;
    farmName: string;
    aadharNumber: string;
    location: string;
    register: string;
    registering: string;
    createdBy: string;
    teamInnovators: string;

    // Marketplace/App
    searchPlaceholder: string;
    heroTitle: string;
    heroSubtitle: string;
    browseProducts: string;
    meetFarmers: string;
    all: string;
    noProductsFound: string;
    localFarmers: string;
    farmersDescription: string;
    aboutFarmDirect: string;
    aboutDescription: string;
    forFarmers: string;
    listProducts: string;
    reachCustomers: string;
    growBusiness: string;
    contact: string;
    rightsReserved: string;
    logout: string;
    cart: string;
    checkout: string;
    addToCart: string;
    price: string;

    // Farmer Dashboard
    farmerDashboard: string;
    totalOrders: string;
    activeProducts: string;
    revenue: string;
    orders: string;
    products: string;
    analytics: string;
    farmProfile: string;
    noOrdersYet: string;
    addProductsToStart: string;
    noRevenueDataYet: string;

    // Cart
    shoppingCart: string;
    items: string;
    emptyCart: string;
    subtotal: string;
    deliveryFee: string;
    total: string;
    proceedToCheckout: string;

    // AI Assistant
    aiAssistantLogo: string;
    aiAssistantTitle: string;
    aiAssistantWelcome: string;
    aiAssistantPlaceholder: string;
    aiAssistantAsk: string;
    aiAssistantClose: string;
    aiResponse1: string;
    aiResponse2: string;
    aiResponse3: string;
}

export const translations: Record<Language, TranslationType> = {
    en: {
        title: "FarmDirect",
        subtitle: "Connecting local farmers with consumers",
        customerCardTitle: "I'm a Customer",
        customerCardDescription: "Browse and buy fresh produce from local farms",
        customerBenefits: ["Access to regional produce", "Direct from farmers", "Fresh and sustainable", "Delivery to your door"],
        farmerCardTitle: "I'm a Farmer",
        farmerCardDescription: "Sell your produce directly to local consumers",
        farmerBenefits: ["Reach local customers", "Fair prices for your produce", "Manage your inventory", "Build your farm brand"],
        back: "Back",
        customerLoginTitle: "Customer Login",
        customerLoginDescription: "Sign in with your Google account",
        continueWithGoogle: "Continue with Google",
        farmerLoginTitle: "Farmer Login",
        farmerLoginDescription: "Enter your credentials to access your dashboard",
        email: "Email Address",
        password: "Password",
        login: "Log In",
        loggingIn: "Logging in...",
        noAccount: "Don't have an account?",
        registerHere: "Register here",
        farmerRegistrationTitle: "Farmer Registration",
        farmerRegistrationDescription: "Join FarmDirect to start selling",
        fullName: "Full Name",
        farmName: "Farm Name",
        aadharNumber: "Aadhar Number (12 digits)",
        location: "Location",
        register: "Register",
        registering: "Registering...",
        createdBy: "Created by",
        teamInnovators: "Team Innovators",
        searchPlaceholder: "Search for products or farmers...",
        heroTitle: "Fresh from Local Farms",
        heroSubtitle: "Connect directly with farmers in your region. Fresh, sustainable, and delivered to your door.",
        browseProducts: "Browse Products",
        meetFarmers: "Meet the Farmers",
        all: "All",
        noProductsFound: "No products found matching your criteria.",
        localFarmers: "Local Farmers",
        farmersDescription: "Get to know the farmers who grow your food. Each farm is committed to sustainable practices and quality produce.",
        aboutFarmDirect: "About FarmDirect",
        aboutDescription: "Connecting local farmers with consumers for fresh, sustainable produce delivered directly to your door.",
        forFarmers: "For Farmers",
        listProducts: "List your products",
        reachCustomers: "Reach local customers",
        growBusiness: "Grow your business",
        contact: "Contact",
        rightsReserved: "All rights reserved.",
        logout: "Log Out",
        cart: "Cart",
        checkout: "Checkout",
        addToCart: "Add to Cart",
        price: "Price",
        farmerDashboard: "Farmer Dashboard",
        totalOrders: "Total Orders",
        activeProducts: "Active Products",
        revenue: "Revenue",
        orders: "Orders",
        products: "Products",
        analytics: "Analytics",
        farmProfile: "Farm Profile",
        noOrdersYet: "No orders yet",
        addProductsToStart: "Add products to get started",
        noRevenueDataYet: "No revenue data yet",
        shoppingCart: "Shopping Cart",
        items: "items",
        emptyCart: "Your cart is empty",
        subtotal: "Subtotal",
        deliveryFee: "Delivery Fee",
        total: "Total",
        proceedToCheckout: "Proceed to Checkout",
        aiAssistantLogo: "Sprout AI",
        aiAssistantTitle: "FarmDirect Assistant",
        aiAssistantWelcome: "Hello! I am Sprout AI. How can I help you today?",
        aiAssistantPlaceholder: "Type your question...",
        aiAssistantAsk: "Ask AI",
        aiAssistantClose: "Close",
        aiResponse1: "You can find fresh organic vegetables in the 'Browse Products' section. Many farmers near your location have active listings!",
        aiResponse2: "For farmers, I recommend updating your stock weekly to keep customers informed about your freshest harvest.",
        aiResponse3: "Market trends show a high demand for organic tomatoes and greens this week in your region!",
    },
    hi: {
        title: "FarmDirect",
        subtitle: "स्थानीय किसानों को उपभोक्ताओं से जोड़ना",
        customerCardTitle: "मैं एक ग्राहक हूँ",
        customerCardDescription: "स्थानीय खेतों से ताज़ा उत्पाद खोजें और खरीदें",
        customerBenefits: ["क्षेत्रीय उत्पादों तक पहुँच", "सीधे किसानों से", "ताज़ा और टिकाऊ", "आपके दरवाजे तक डिलीवरी"],
        farmerCardTitle: "मैं एक किसान हूँ",
        farmerCardDescription: "अपने उत्पाद सीधे स्थानीय उपभोक्ताओं को बेचें",
        farmerBenefits: ["स्थानीय ग्राहकों तक पहुँचें", "अपने उत्पादों के लिए उचित मूल्य", "अपनी सूची प्रबंधित करें", "अपना फार्म ब्रांड बनाएं"],
        back: "पीछे",
        customerLoginTitle: "ग्राहक लॉगिन",
        customerLoginDescription: "अपने Google खाते से साइन इन करें",
        continueWithGoogle: "गूगल के साथ आगे बढ़ें",
        farmerLoginTitle: "किसान लॉगिन",
        farmerLoginDescription: "अपने डैशबोर्ड तक पहुँचने के लिए अपनी क्रेडेंशियल दर्ज करें",
        email: "ईमेल पता",
        password: "पासवर्ड",
        login: "लॉग इन करें",
        loggingIn: "लॉग इन हो रहा है...",
        noAccount: "खाता नहीं है?",
        registerHere: "यहाँ पंजीकरण करें",
        farmerRegistrationTitle: "किसान पंजीकरण",
        farmerRegistrationDescription: "बिक्री शुरू करने के लिए FarmDirect से जुड़ें",
        fullName: "पूरा नाम",
        farmName: "फार्म का नाम",
        aadharNumber: "आधार नंबर (12 अंक)",
        location: "स्थान",
        register: "पंजीकरण करें",
        registering: "पंजीकरण हो रहा है...",
        createdBy: "द्वारा बनाया गया",
        teamInnovators: "टीम इनोवेटर्स",
        searchPlaceholder: "उत्पादों या किसानों की खोज करें...",
        heroTitle: "स्थानीय खेतों से ताज़ा",
        heroSubtitle: "अपने क्षेत्र के किसानों से सीधे जुड़ें। ताज़ा, टिकाऊ और आपके दरवाजे तक पहुँचाया गया।",
        browseProducts: "उत्पादों को ब्राउज़ करें",
        meetFarmers: "किसानों से मिलें",
        all: "सभी",
        noProductsFound: "आपकी कसौटी से मेल खाने वाला कोई उत्पाद नहीं मिला।",
        localFarmers: "स्थानीय किसान",
        farmersDescription: "उन किसानों को जानें जो आपका भोजन उगाते हैं। प्रत्येक फार्म टिकाऊ प्रथाओं और गुणवत्ता वाले उत्पादों के लिए प्रतिबद्ध है।",
        aboutFarmDirect: "FarmDirect के बारे में",
        aboutDescription: "सीधे आपके दरवाजे तक पहुँचाए गए ताज़ा, टिकाऊ उत्पादों के लिए स्थानीय किसानों को उपभोक्ताओं से जोड़ना।",
        forFarmers: "किसानों के लिए",
        listProducts: "अपने उत्पादों को सूचीबद्ध करें",
        reachCustomers: "स्थानीय ग्राहकों तक पहुँचें",
        growBusiness: "अपना व्यवसाय बढ़ाएँ",
        contact: "संपर्क करें",
        rightsReserved: "सर्वाधिकार सुरक्षित।",
        logout: "लॉग आउट",
        cart: "कार्ट",
        checkout: "चेकआउट",
        addToCart: "कार्ट में जोड़ें",
        price: "कीमत",
        farmerDashboard: "किसान डैशबोर्ड",
        totalOrders: "कुल आदेश",
        activeProducts: "सक्रिय उत्पाद",
        revenue: "राजस्व",
        orders: "आदेश",
        products: "उत्पाद",
        analytics: "विश्लेषण",
        farmProfile: "फार्म प्रोफाइल",
        noOrdersYet: "अभी तक कोई आदेश नहीं",
        addProductsToStart: "शुरू करने के लिए उत्पाद जोड़ें",
        noRevenueDataYet: "अभी तक कोई राजस्व डेटा नहीं",
        shoppingCart: "खरीदारी कार्ट",
        items: "वस्तुएं",
        emptyCart: "आपकी कार्ट खाली है",
        subtotal: "उप-कुल",
        deliveryFee: "वितरण शुल्क",
        total: "कुल",
        proceedToCheckout: "चेकआउट के लिए आगे बढ़ें",
        aiAssistantLogo: "स्प्राउट AI",
        aiAssistantTitle: "FarmDirect सहायक",
        aiAssistantWelcome: "नमस्ते! मैं स्प्राउट AI हूँ। आज मैं आपकी क्या सहायता कर सकता हूँ?",
        aiAssistantPlaceholder: "अपना प्रश्न लिखें...",
        aiAssistantAsk: "AI से पूछें",
        aiAssistantClose: "बंद करें",
        aiResponse1: "आप 'उत्पाद ब्राउज़ करें' अनुभाग में ताज़ा जैविक सब्जियां पा सकते हैं। आपके स्थान के पास कई किसानों के पास सक्रिय लिस्टिंग है!",
        aiResponse2: "किसानों के लिए, मैं ग्राहकों को आपकी ताज़ा फसल के बारे में सूचित रखने के लिए साप्ताहिक रूप से अपने स्टॉक को अपडेट करने की सलाह देता हूँ।",
        aiResponse3: "बाजार के रुझान इस सप्ताह आपके क्षेत्र में जैविक टमाटर और साग की उच्च मांग दिखाते हैं!",
    },
    kn: {
        title: "FarmDirect",
        subtitle: "ಸ್ಥಳೀಯ ರೈತರನ್ನು ಗ್ರಾಹಕರೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುವುದು",
        customerCardTitle: "ನಾನು ಗ್ರಾಹಕ",
        customerCardDescription: "ಸ್ಥಳೀಯ ತೋಟಗಳಿಂದ ತಾಜಾ ಉತ್ಪನ್ನಗಳನ್ನು ಹುಡುಕಿ ಮತ್ತು ಖರೀದಿಸಿ",
        customerBenefits: ["ಪ್ರಾದೇಶಿಕ ಉತ್ಪನ್ನಗಳಿಗೆ ಪ್ರವೇಶ", "ನೇರವಾಗಿ ರೈತರಿಂದ", "ತಾಜಾ ಮತ್ತು ಸುಸ್ಥಿರ", "ನಿಮ್ಮ ಮನೆ ಬಾಗಿಲಿಗೆ ವಿತರಣೆ"],
        farmerCardTitle: "ನಾನು ರೈತ",
        farmerCardDescription: "ನಿಮ್ಮ ಉತ್ಪನ್ನಗಳನ್ನು ನೇರವಾಗಿ ಸ್ಥಳೀಯ ಗ್ರಾಹಕರಿಗೆ ಮಾರಾಟ ಮಾಡಿ",
        farmerBenefits: ["ಸ್ಥಳೀಯ ಗ್ರಾಹಕರನ್ನು ತಲುಪಿ", "ನಿಮ್ಮ ಉತ್ಪನ್ನಗಳಿಗೆ ನ್ಯಾಯಯುತ ಬೆಲೆ", "ನಿಮ್ಮ ದಾಸ್ತಾನು ನಿರ್ವಹಿಸಿ", "ನಿಮ್ಮ ಫಾರ್ಮ್ ಬ್ರ್ಯಾಂಡ್ ನಿರ್ಮಿಸಿ"],
        back: "ಹಿಂದಕ್ಕೆ",
        customerLoginTitle: "ಗ್ರಾಹಕ ಲಾಗಿನ್",
        customerLoginDescription: "ನಿಮ್ಮ Google ಖಾತೆಯೊಂದಿಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ",
        continueWithGoogle: "Google ನೊಂದಿಗೆ ಮುಂದುವರಿಯಿರಿ",
        farmerLoginTitle: "ರೈತ ಲಾಗಿನ್",
        farmerLoginDescription: "ನಿಮ್ಮ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ಪ್ರವೇಶಿಸಲು ನಿಮ್ಮ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ",
        email: "ಇಮೇಲ್ ವಿಳಾಸ",
        password: "ಪಾಸ್‌ವರ್ಡ್",
        login: "ಲಾಗಿನ್ ಮಾಡಿ",
        loggingIn: "ಲಾಗಿನ್ ಆಗುತ್ತಿದೆ...",
        noAccount: "ಖಾತೆ ಇಲ್ಲವೇ?",
        registerHere: "ಇಲ್ಲಿ ನೋಂದಾಯಿಸಿ",
        farmerRegistrationTitle: "ರೈತ ನೋಂದಣಿ",
        farmerRegistrationDescription: "ಮಾರಾಟ ಪ್ರಾರಂಭಿಸಲು FarmDirect ಸೇರಿ",
        fullName: "ಪೂರ್ಣ ಹೆಸರು",
        farmName: "ಫಾರ್ಮ್ ಹೆಸರು",
        aadharNumber: "ಆಧಾರ್ ಸಂಖ್ಯೆ (12 ಅಂಕಿಗಳು)",
        location: "ಸ್ಥಳ",
        register: "ನೋಂದಾಯಿಸಿ",
        registering: "ನೋಂದಾಯಿಸಲಾಗುತ್ತಿದೆ...",
        createdBy: "ರಚಿಸಿದವರು",
        teamInnovators: "ಟೀಮ್ ಇನ್ನೋವೇಟರ್ಸ್",
        searchPlaceholder: "ಉತ್ಪನ್ನಗಳು ಅಥವಾ ರೈತರಿಗಾಗಿ ಹುಡುಕಿ...",
        heroTitle: "ಸ್ಥಳೀಯ ಫಾರ್ಮ್‌ಗಳಿಂದ ತಾಜಾ",
        heroSubtitle: "ನಿಮ್ಮ ಪ್ರದೇಶದ ರೈತರೊಂದಿಗೆ ನೇರವಾಗಿ ಸಂಪರ್ಕ ಸಾಧಿಸಿ. ತಾಜಾ, ಸುಸ್ಥಿರ ಮತ್ತು ನಿಮ್ಮ ಮನೆ ಬಾಗಿಲಿಗೆ ತಲುಪಿಸಲಾಗುತ್ತದೆ.",
        browseProducts: "ಉತ್ಪನ್ನಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ",
        meetFarmers: "ರೈತರನ್ನು ಭೇಟಿ ಮಾಡಿ",
        all: "ಎಲ್ಲಾ",
        noProductsFound: "ನಿಮ್ಮ ಹುಡುಕಾಟಕ್ಕೆ ಹೊಂದಿಕೆಯಾಗುವ ಯಾವುದೇ ಉತ್ಪನ್ನಗಳು ಕಂಡುಬಂದಿಲ್ಲ.",
        localFarmers: "ಸ್ಥಳೀಯ ರೈತರು",
        farmersDescription: "ನಿಮ್ಮ ಆಹಾರವನ್ನು ಬೆಳೆಯುವ ರೈತರನ್ನು ತಿಳಿದುಕೊಳ್ಳಿ. ಪ್ರತಿ ಫಾರ್ಮ್ ಸುಸ್ಥಿರ ಪದ್ಧತಿಗಳು ಮತ್ತು ಗುಣಮಟ್ಟದ ಉತ್ಪನ್ನಗಳಿಗೆ ಬದ್ಧವಾಗಿದೆ.",
        aboutFarmDirect: "FarmDirect ಬಗ್ಗೆ",
        aboutDescription: "ನೇರವಾಗಿ ನಿಮ್ಮ ಮನೆ ಬಾಗಿಲಿಗೆ ತಾಜಾ, ಸುಸ್ಥಿರ ಉತ್ಪನ್ನಗಳಿಗಾಗಿ ಸ್ಥಳೀಯ ರೈತರನ್ನು ಗ್ರಾಹಕರೊಂದಿಗೆ ಸಂಪರ್ಕಿಸುವುದು.",
        forFarmers: "ರೈತರಿಗಾಗಿ",
        listProducts: "ನಿಮ್ಮ ಉತ್ಪನ್ನಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡಿ",
        reachCustomers: "ಸ್ಥಳೀಯ ಗ್ರಾಹಕರನ್ನು ತಲುಪಿ",
        growBusiness: "ನಿಮ್ಮ ವ್ಯವಹಾರವನ್ನು ಬೆಳೆಸಿಕೊಳ್ಳಿ",
        contact: "ಸಂಪರ್ಕ",
        rightsReserved: "ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
        logout: "ಲೋಗೌಟ್",
        cart: "ಕಾರ್ಟ್",
        checkout: "ಚೆಕ್‌ಔಟ್",
        addToCart: "ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ",
        price: "ಬೆಲೆ",
        farmerDashboard: "ರೈತ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
        totalOrders: "ಒಟ್ಟು ಆದೇಶಗಳು",
        activeProducts: "ಸಕ್ರಿಯ ಉತ್ಪನ್ನಗಳು",
        revenue: "ಆದಾಯ",
        orders: "ಆದೇಶಗಳು",
        products: "ಉತ್ಪನ್ನಗಳು",
        analytics: "ವಿಶ್ಲೇಷಣೆ",
        farmProfile: "ಫಾರ್ಮ್ ವಿವರ",
        noOrdersYet: "ಇನ್ನೂ ಯಾವುದೇ ಆದೇಶಗಳಿಲ್ಲ",
        addProductsToStart: "ಪ್ರಾರಂಭಿಸಲು ಉತ್ಪನ್ನಗಳನ್ನು ಸೇರಿಸಿ",
        noRevenueDataYet: "ಇನ್ನೂ ಯಾವುದೇ ಆದೇಶದ ಮಾಹಿತಿ ಇಲ್ಲ",
        shoppingCart: "ಶಾಪಿಂಗ್ ಕಾರ್ಟ್",
        items: "ವಸ್ತುಗಳು",
        emptyCart: "ನಿಮ್ಮ ಕಾರ್ಟ್ ಖಾಲಿಯಿದೆ",
        subtotal: "ಉಪ-ಮೊತ್ತ",
        deliveryFee: "ವಿತರಣಾ ಶುಲ್ಕ",
        total: "ಒಟ್ಟು",
        proceedToCheckout: "ಚೆಕ್‌ಔಟ್‌ಗೆ ಮುಂದುವರಿಯಿರಿ",
        aiAssistantLogo: "ಸ್ಪೌಟ್ AI",
        aiAssistantTitle: "FarmDirect ಸಹಾಯಕ",
        aiAssistantWelcome: "ಹಲೋ! ನಾನು ಸ್ಪೌಟ್ AI. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
        aiAssistantPlaceholder: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ...",
        aiAssistantAsk: "AI ಕೇಳಿ",
        aiAssistantClose: "ಮುಚ್ಚಿ",
        aiResponse1: "ನೀವು 'ಉತ್ಪನ್ನಗಳನ್ನು ಬ್ರೌಸ್ ಮಾಡಿ' ವಿಭಾಗದಲ್ಲಿ ತಾಜಾ ಸಾವಯವ ತರಕಾರಿಗಳನ್ನು ಕಾಣಬಹುದು. ನಿಮ್ಮ ಸ್ಥಳದ ಸಮೀಪವಿರುವ ಅನೇಕ ರೈತರು ಸಕ್ರಿಯ ಪಟ್ಟಿಗಳನ್ನು ಹೊಂದಿದ್ದಾರೆ!",
        aiResponse2: "ರೈತರಿಗಾಗಿ, ಗ್ರಾಹಕರಿಗೆ ನಿಮ್ಮ ತಾಜಾ ಸುಗ್ಗಿಯ ಬಗ್ಗೆ ಮಾಹಿತಿ ನೀಡಲು ವಾರಕ್ಕೊಮ್ಮೆ ನಿಮ್ಮ ದಾಸ್ತಾನುಗಳನ್ನು ನವೀಕರಿಸಲು ನಾನು ಶಿಫಾರಸು ಮಾಡುತ್ತೇನೆ.",
        aiResponse3: "ಮಾರುಕಟ್ಟೆ ಪ್ರವೃತ್ತಿಗಳು ಈ ವಾರ ನಿಮ್ಮ ಪ್ರದೇಶದಲ್ಲಿ ಸಾವಯವ ಟೊಮೆಟೊ ಮತ್ತು ಸೊಪ್ಪಿಗೆ ಹೆಚ್ಚಿನ ಬೇಡಿಕೆಯನ್ನು ತೋರಿಸುತ್ತಿವೆ!",
    },
};
