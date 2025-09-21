// routes/mobilesRoutes.js
import express from "express";
import mongoose from "mongoose";
import Mobile from "../models/Mobile.js";

const router = express.Router();

// GET /api/mobiles → list with brand, price, sort, search
router.get("/", async (req, res) => {
  try {
    const { brand, minPrice, maxPrice, sort, page = 1, limit = 10, q } = req.query;
    const filter = {};

    // Search filter (brand OR model)
    if (q) {
      filter.$or = [
        { brand: { $regex: q, $options: "i" } },
        { model: { $regex: q, $options: "i" } }
      ];
    }

    // Brand filter
    if (brand) filter.brand = brand;

    // Price filter
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    let query = Mobile.find(filter);

    // Sorting
    if (sort === "price_asc") query = query.sort({ price: 1 });
    else if (sort === "price_desc") query = query.sort({ price: -1 });
    else if (sort === "rating_desc") query = query.sort({ rating: -1 });
    else query = query.sort({ createdAt: -1 }); // default latest

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);
    query = query.skip(skip).limit(Number(limit));

    const results = await query.exec();
    const total = await Mobile.countDocuments(filter);

    res.json({ total, page: Number(page), limit: Number(limit), results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/mobiles/brands → list of brands
router.get("/brands", async (req, res) => {
  try {
    const brands = await Mobile.distinct("brand");
    res.json(brands.sort());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/mobiles/:id → single mobile details
router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid mobile ID" });
    }
    const mobile = await Mobile.findById(req.params.id);
    if (!mobile) return res.status(404).json({ error: "Mobile not found" });
    res.json(mobile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/mobiles → create new mobile
router.post("/", async (req, res) => {
  try {
    const mobile = new Mobile(req.body);
    await mobile.save();
    res.json(mobile);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
