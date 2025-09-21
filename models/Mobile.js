import mongoose from "mongoose";

const mobileSchema = new mongoose.Schema({
  brand: { type: String, required: true },        // Brand name
  model: { type: String, required: true },        // Model name
  price: { type: Number, required: true },        // Price in INR
  
  // Multiple images
  images: [{ type: String }],                     // Array of image URLs
  
  // Short highlights (4-5 key features)
  highlights: [{ type: String }],                 
  
  // Full specifications (nested object)
  specs: {
    General: { type: Map, of: String },
    Display: { type: Map, of: String },
    Performance: { type: Map, of: String },
    Storage: { type: Map, of: String },
    Camera: { type: Map, of: String },
    Battery: { type: Map, of: String },
    Connectivity: { type: Map, of: String },
    Design: { type: Map, of: String }
  },

  // Pros & Cons
  pros: [{ type: String }],
  cons: [{ type: String }],

  // Buy links
  buyLinks: [
    {
      store: { type: String },
      url: { type: String }
    }
  ],

  // Optional filters
  popular: { type: Boolean, default: false },
  latest: { type: Boolean, default: false },
  highPerformance: { type: Boolean, default: false },
  cameraPhone: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("Mobile", mobileSchema);
