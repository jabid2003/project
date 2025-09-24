// seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Mobile from "./models/Mobile.js";

dotenv.config();

const sample = [
  {
    brand: "Samsung",
    model: "Galaxy S24 Ultra",
    price: 79999,
    images: [
      "https://example.com/s24ultra_side.jpg"
    ],
    highlights: [
      "6.8-inch Dynamic AMOLED 2X, 120Hz",
      "Snapdragon 8 Gen 3 for Galaxy",
      "200MP Quad Camera",
      "5000mAh with 45W Fast Charging"
    ],
    specs: {
      General: { "Launch Date": "Jan 2024", "Operating System": "Android 14, One UI 6" },
      Display: { "Type": "Dynamic AMOLED 2X", "Size": "6.8 inches", "Resolution": "1440 x 3088 pixels", "Refresh Rate": "120Hz", "Protection": "Gorilla Glass Victus 2" },
      Performance: { "Chipset": "Snapdragon 8 Gen 3", "CPU": "Octa-core", "GPU": "Adreno 750", "RAM": "12GB" },
      Storage: { "Internal": "256GB", "Expandable": "No" },
      Camera: { "Rear": "200MP + 12MP + 10MP + 10MP", "Front": "12MP", "Video": "8K @ 30fps, 4K @ 60fps" },
      Battery: { "Capacity": "5000mAh", "Charging": "45W + 15W Wireless" },
      Connectivity: { "5G": "Yes", "SIM": "Dual SIM", "Wi-Fi": "Wi-Fi 6E", "Bluetooth": "v5.3", "USB": "Type-C 3.2" },
      Design: { "Dimensions": "162.3 x 79 x 8.6 mm", "Weight": "234 g", "Build": "Aluminum frame, Gorilla Glass" }
    },
    pros: ["QHD+ AMOLED display", "Snapdragon 8 Gen 3 performance", "200MP versatile camera", "Good battery life with fast charging"],
    cons: ["Expensive", "Bulky design", "No expandable storage"],
    buyLinks: [
      { store: "Amazon", url: "https://amazon.in/s24-ultra" },
      { store: "Flipkart", url: "https://flipkart.com/s24-ultra" },
      { store: "Samsung Store", url: "https://samsung.com/in/s24-ultra" }
    ],
    popular: true,
    latest: false
  },
  {
    brand: "Apple",
    model: "iPhone 15 Pro",
    price: 134999,
    images: [
  
      "https://example.com/iphone15pro_side.jpg"
    ],
    highlights: [
      "6.1-inch Super Retina XDR OLED",
      "Apple A17 Pro Chip",
      "48MP Triple Camera",
      "iOS 17 with Dynamic Island"
    ],
    specs: {
      General: { "Launch Date": "Sep 2023", "Operating System": "iOS 17" },
      Display: { "Type": "Super Retina XDR OLED", "Size": "6.1 inches", "Resolution": "1179 x 2556 pixels", "Refresh Rate": "120Hz", "Protection": "Ceramic Shield Glass" },
      Performance: { "Chipset": "Apple A17 Pro", "CPU": "Hexa-core", "GPU": "Apple GPU (6-core)", "RAM": "8GB" },
      Storage: { "Internal": "256GB", "Expandable": "No" },
      Camera: { "Rear": "48MP + 12MP + 12MP", "Front": "12MP", "Video": "4K @ 60fps" },
      Battery: { "Capacity": "4300mAh", "Charging": "20W + MagSafe" },
      Connectivity: { "5G": "Yes", "SIM": "Dual eSIM/Nano", "Wi-Fi": "Wi-Fi 6E", "Bluetooth": "v5.3", "USB": "USB-C" },
      Design: { "Dimensions": "146.6 x 70.6 x 8.3 mm", "Weight": "187 g", "Build": "Titanium + Ceramic Shield" }
    },
    pros: ["Stunning OLED display", "A17 Pro extreme performance", "Excellent cameras", "Premium titanium build"],
    cons: ["Very costly", "No expandable storage", "Slow charging"],
    buyLinks: [
      { store: "Amazon", url: "https://amazon.in/iphone-15-pro" },
      { store: "Flipkart", url: "https://flipkart.com/iphone-15-pro" },
      { store: "Apple Store", url: "https://apple.com/in/iphone-15-pro" }
    ],
    popular: true,
    latest: false
  },
  {
    brand: "OnePlus",
    model: "Nord 4",
    price: 29999,
    images: [
      "https://example.com/nord4_front.jpg"
     
    ],
    highlights: [
      "6.5-inch AMOLED, 90Hz",
      "Snapdragon 7 Gen 2",
      "64MP Dual Camera",
      "4500mAh Battery, 65W Fast Charging"
    ],
    specs: {
      General: { "Launch Date": "July 2023", "Operating System": "Android 13, OxygenOS" },
      Display: { "Type": "AMOLED", "Size": "6.5 inches", "Resolution": "1080 x 2400 pixels", "Refresh Rate": "90Hz", "Protection": "Gorilla Glass" },
      Performance: { "Chipset": "Snapdragon 7 Gen 2", "CPU": "Octa-core", "GPU": "Adreno", "RAM": "8GB" },
      Storage: { "Internal": "128GB", "Expandable": "No" },
      Camera: { "Rear": "64MP + 8MP", "Front": "16MP", "Video": "4K @ 30fps" },
      Battery: { "Capacity": "4500mAh", "Charging": "65W Fast Charging" },
      Connectivity: { "5G": "Yes", "SIM": "Dual SIM", "Wi-Fi": "Wi-Fi 6", "Bluetooth": "v5.2", "USB": "Type-C" },
      Design: { "Dimensions": "159.2 x 73.2 x 8.3 mm", "Weight": "184 g", "Build": "Plastic frame, Glass back" }
    },
    pros: ["Smooth AMOLED display", "Good gaming performance", "65W super fast charging", "Affordable price"],
    cons: ["No expandable storage", "Not IP rated", "Average camera"],
    buyLinks: [
      { store: "Amazon", url: "https://amazon.in/oneplus-nord-4" },
      { store: "Flipkart", url: "https://flipkart.com/oneplus-nord-4" },
      { store: "OnePlus Store", url: "https://oneplus.in/nord-4" }
    ],
    popular: true,
    latest: false
  },
  {
    brand: "Redmi",
    model: "Note 13 Pro+",
    price: 25999,
    images: [
      "https://example.com/note13pro+_front.jpg"
     
    ],
    highlights: [
      "6.67-inch AMOLED, 120Hz",
      "MediaTek Dimensity 7200-Ultra",
      "200MP OIS Camera",
      "120W HyperCharge"
    ],
    specs: {
      General: { "Launch Date": "Dec 2023", "Operating System": "Android 14, MIUI" },
      Display: { "Type": "AMOLED", "Size": "6.67 inches", "Resolution": "1220 x 2712 pixels", "Refresh Rate": "120Hz", "Protection": "Gorilla Glass Victus" },
      Performance: { "Chipset": "Dimensity 7200-Ultra", "CPU": "Octa-core", "GPU": "Mali-G610", "RAM": "8GB" },
      Storage: { "Internal": "256GB", "Expandable": "No" },
      Camera: { "Rear": "200MP + 8MP + 2MP", "Front": "16MP", "Video": "4K @ 30fps" },
      Battery: { "Capacity": "5000mAh", "Charging": "120W HyperCharge" },
      Connectivity: { "5G": "Yes", "SIM": "Dual SIM", "Wi-Fi": "Wi-Fi 6", "Bluetooth": "v5.3", "USB": "Type-C" },
      Design: { "Dimensions": "161.4 x 74.2 x 8.9 mm", "Weight": "210 g", "Build": "Glass front, Leather/Glass back" }
    },
    pros: ["200MP OIS camera", "120W insanely fast charging", "Great AMOLED display", "Solid performance"],
    cons: ["MIUI bloatware", "No expandable storage", "A bit heavy"],
    buyLinks: [
      { store: "Amazon", url: "https://amazon.in/redmi-note-13-pro-plus" },
      { store: "Flipkart", url: "https://flipkart.com/redmi-note-13-pro-plus" }
    ],
    popular: false,
    latest: true
  },
  {
    brand: "Realme",
    model: "GT 5 Pro",
    price: 54999,
    images: [
      "https://example.com/realmegt5pro_front.jpg"
     
    ],
    highlights: [
      "6.78-inch AMOLED, 144Hz",
      "Snapdragon 8 Gen 3",
      "50MP Sony IMX890 Camera",
      "5400mAh, 100W Fast Charging"
    ],
    specs: {
      General: { "Launch Date": "Dec 2023", "Operating System": "Android 14, Realme UI 5.0" },
      Display: { "Type": "AMOLED", "Size": "6.78 inches", "Resolution": "1440 x 3200 pixels", "Refresh Rate": "144Hz", "Protection": "Gorilla Glass Victus 2" },
      Performance: { "Chipset": "Snapdragon 8 Gen 3", "CPU": "Octa-core", "GPU": "Adreno 750", "RAM": "12GB" },
      Storage: { "Internal": "256GB", "Expandable": "No" },
      Camera: { "Rear": "50MP + 50MP + 8MP", "Front": "32MP", "Video": "8K @ 30fps, 4K @ 60fps" },
      Battery: { "Capacity": "5400mAh", "Charging": "100W SuperVOOC" },
      Connectivity: { "5G": "Yes", "SIM": "Dual SIM", "Wi-Fi": "Wi-Fi 7", "Bluetooth": "v5.3", "USB": "Type-C" },
      Design: { "Dimensions": "163.1 x 74.4 x 9.2 mm", "Weight": "220 g", "Build": "Aluminum frame, Glass back" }
    },
    pros: ["144Hz QHD+ AMOLED screen", "Snapdragon 8 Gen 3 powerhouse", "Good cameras with OIS", "100W super fast charging"],
    cons: ["Bulky size", "No expandable storage", "Realme UI ads"],
    buyLinks: [
      { store: "Amazon", url: "https://amazon.in/realme-gt-5-pro" },
      { store: "Flipkart", url: "https://flipkart.com/realme-gt-5-pro" }
    ],
    popular: false,
    latest: true
  },

  {
    brand: "Vivo",
    model: "X90 Pro",
    price: 59999,
    images: [
      "https://example.com/vivox90pro_front.jpg"
    
    ],
    highlights: [
      "6.78-inch AMOLED, 120Hz",
      "Snapdragon 8 Gen 2",
      "50MP ZEISS Quad Camera",
      "4800mAh, 66W Fast Charging"
    ],
    specs: {
      General: { "Launch Date": "Mar 2024", "Operating System": "Android 14, Funtouch OS 14" },
      Display: {
        "Type": "AMOLED",
        "Size": "6.78 inches",
        "Resolution": "1440 x 3200 pixels",
        "Refresh Rate": "120Hz",
        "Protection": "Gorilla Glass Victus"
      },
      Performance: {
        "Chipset": "Snapdragon 8 Gen 2",
        "CPU": "Octa-core",
        "GPU": "Adreno 740",
        "RAM": "12GB"
      },
      Storage: { "Internal": "256GB", "Expandable": "No" },
      Camera: { "Rear": "50MP + 48MP + 12MP + 8MP", "Front": "32MP", "Video": "8K @ 30fps, 4K @ 60fps" },
      Battery: { "Capacity": "4800mAh", "Charging": "66W" },
      Connectivity: { "5G": "Yes", "SIM": "Dual SIM", "Wi-Fi": "Wi-Fi 6", "Bluetooth": "v5.3", "USB": "Type-C" },
      Design: { "Dimensions": "163.5 x 74.8 x 8.9 mm", "Weight": "209 g", "Build": "Glass front & back, Aluminum frame" }
    },
    pros: ["Excellent camera system", "High refresh AMOLED", "Fast charging", "Premium design"],
    cons: ["Expensive", "No expandable storage", "Limited availability"],
    buyLinks: [
      { store: "Amazon", url: "https://amazon.in/vivo-x90-pro" },
      { store: "Flipkart", url: "https://flipkart.com/vivo-x90-pro" }
    ],
    popular: true,
    latest: true
  },
  {
    brand: "Oppo",
    model: "Find X6 Pro",
    price: 72999,
    images: [
      "https://example.com/oppofindx6pro_front.jpg"
     
    ],
    highlights: [
      "6.82-inch AMOLED, 120Hz",
      "Snapdragon 8 Gen 2",
      "50MP Triple Camera",
      "5000mAh, 80W SuperVOOC"
    ],
    specs: {
      General: { "Launch Date": "Apr 2024", "Operating System": "Android 14, ColorOS 14" },
      Display: { "Type": "AMOLED", "Size": "6.82 inches", "Resolution": "1440 x 3216 pixels", "Refresh Rate": "120Hz", "Protection": "Gorilla Glass Victus" },
      Performance: { "Chipset": "Snapdragon 8 Gen 2", "CPU": "Octa-core", "GPU": "Adreno 740", "RAM": "12GB" },
      Storage: { "Internal": "256GB", "Expandable": "No" },
      Camera: { "Rear": "50MP + 50MP + 13MP", "Front": "32MP", "Video": "8K @ 30fps, 4K @ 60fps" },
      Battery: { "Capacity": "5000mAh", "Charging": "80W" },
      Connectivity: { "5G": "Yes", "SIM": "Dual SIM", "Wi-Fi": "Wi-Fi 6", "Bluetooth": "v5.3", "USB": "Type-C" },
      Design: { "Dimensions": "163.6 x 73.9 x 8.3 mm", "Weight": "218 g", "Build": "Glass front & back, Aluminum frame" }
    },
    pros: ["Superb display", "Fast charging", "High-end chipset", "Premium build"],
    cons: ["Pricey", "No headphone jack", "Heavy"],
    buyLinks: [
      { store: "Amazon", url: "https://amazon.in/oppo-find-x6-pro" },
      { store: "Flipkart", url: "https://flipkart.com/oppo-find-x6-pro" }
    ],
    popular: true,
    latest: true
  },
  {
    brand: "Motorola",
    model: "Edge 40 Pro",
    price: 48999,
    images: [
      "https://example.com/motoedge40pro_front.jpg"
     
    ],
    highlights: [
      "6.7-inch P-OLED, 144Hz",
      "Snapdragon 8 Gen 2",
      "50MP Dual Camera",
      "4800mAh, 68W Fast Charging"
    ],
    specs: {
      General: { "Launch Date": "Feb 2024", "Operating System": "Android 14" },
      Display: { "Type": "P-OLED", "Size": "6.7 inches", "Resolution": "1440 x 2880 pixels", "Refresh Rate": "144Hz", "Protection": "Gorilla Glass" },
      Performance: { "Chipset": "Snapdragon 8 Gen 2", "CPU": "Octa-core", "GPU": "Adreno 740", "RAM": "12GB" },
      Storage: { "Internal": "256GB", "Expandable": "No" },
      Camera: { "Rear": "50MP + 50MP", "Front": "32MP", "Video": "8K @ 30fps, 4K @ 60fps" },
      Battery: { "Capacity": "4800mAh", "Charging": "68W" },
      Connectivity: { "5G": "Yes", "SIM": "Dual SIM", "Wi-Fi": "Wi-Fi 6E", "Bluetooth": "v5.3", "USB": "Type-C" },
      Design: { "Dimensions": "161.1 x 73.9 x 8.8 mm", "Weight": "210 g", "Build": "Glass front & back, Aluminum frame" }
    },
    pros: ["Smooth display", "Fast performance", "Good battery life", "Clean Android experience"],
    cons: ["Limited camera versatility", "No wireless charging", "Pricey"],
    buyLinks: [
      { store: "Amazon", url: "https://amazon.in/motorola-edge-40-pro" },
      { store: "Flipkart", url: "https://flipkart.com/motorola-edge-40-pro" }
    ],
    popular: true,
    latest: false
  },
  {
    brand: "Nothing",
    model: "Phone 2",
    price: 39999,
    images: [
      "https://example.com/nothingphone2_front.jpg"
      
    ],
    highlights: [
      "6.7-inch OLED, 120Hz",
      "Snapdragon 8+ Gen 1",
      "50MP Dual Camera",
      "4500mAh, 33W Fast Charging"
    ],
    specs: {
      General: { "Launch Date": "Jan 2024", "Operating System": "Android 14" },
      Display: { "Type": "OLED", "Size": "6.7 inches", "Resolution": "1080 x 2400 pixels", "Refresh Rate": "120Hz", "Protection": "Gorilla Glass" },
      Performance: { "Chipset": "Snapdragon 8+ Gen 1", "CPU": "Octa-core", "GPU": "Adreno", "RAM": "12GB" },
      Storage: { "Internal": "256GB", "Expandable": "No" },
      Camera: { "Rear": "50MP + 12MP", "Front": "16MP", "Video": "4K @ 60fps" },
      Battery: { "Capacity": "4500mAh", "Charging": "33W" },
      Connectivity: { "5G": "Yes", "SIM": "Dual SIM", "Wi-Fi": "Wi-Fi 6", "Bluetooth": "v5.2", "USB": "Type-C" },
      Design: { "Dimensions": "159.2 x 75.8 x 8.3 mm", "Weight": "193 g", "Build": "Glass front & back, Aluminum frame" }
    },
    pros: ["Clean design", "OLED display", "Decent performance", "Good build quality"],
    cons: ["Average battery", "No wireless charging", "Limited availability"],
    buyLinks: [
      { store: "Amazon", url: "https://amazon.in/nothing-phone-2" },
      { store: "Flipkart", url: "https://flipkart.com/nothing-phone-2" }
    ],
    popular: false,
    latest: true
  },
  {
    brand: "Realme",
    model: "Narzo 60 Pro",
    price: 15999,
    images: [
      "https://example.com/narzo60pro_front.jpg"
      
    ],
    highlights: [
      "6.6-inch IPS LCD, 120Hz",
      "MediaTek Dimensity 6100+",
      "50MP Dual Camera",
      "5000mAh, 33W Fast Charging"
    ],
    specs: {
      General: { "Launch Date": "Nov 2023", "Operating System": "Android 13, Realme UI 5" },
      Display: { "Type": "IPS LCD", "Size": "6.6 inches", "Resolution": "1080 x 2412 pixels", "Refresh Rate": "120Hz" },
      Performance: { "Chipset": "MediaTek Dimensity 6100+", "CPU": "Octa-core", "GPU": "Mali-G57 MC2", "RAM": "6GB" },
      Storage: { "Internal": "128GB", "Expandable": "No" },
      Camera: { "Rear": "50MP + 2MP", "Front": "8MP", "Video": "1080p @ 30fps" },
      Battery: { "Capacity": "5000mAh", "Charging": "33W" },
      Connectivity: { "5G": "Yes", "SIM": "Dual SIM", "Wi-Fi": "Wi-Fi 5", "Bluetooth": "v5.1", "USB": "Type-C" },
      Design: { "Dimensions": "164.1 x 75.9 x 8.5 mm", "Weight": "186 g", "Build": "Plastic back & frame" }
    },
    pros: ["Budget-friendly", "Decent performance", "Good battery", "Smooth display"],
    cons: ["No AMOLED", "Average camera", "Limited features"],
    buyLinks: [
      { store: "Amazon", url: "https://amazon.in/realme-narzo-60-pro" },
      { store: "Flipkart", url: "https://flipkart.com/realme-narzo-60-pro" }
    ],
    popular: true,
    latest: false
  }

];

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected for seeding...");
    await Mobile.deleteMany({});
    await Mobile.insertMany(sample);
    console.log("✅ 5 Sample mobiles seeded with full highlights, popular & latest flags!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed Error:", err);
    process.exit(1);
  }
};

run();
