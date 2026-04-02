"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader, PlusCircle, Upload } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import axios from "axios";

const categories = [
  "Fruits & Vegetables",
  "Dairy & Eggs",
  "Rice, Atta & Grains",
  "Snacks & Biscuits",
  "Beverages & Drinks",
  "Personal Care",
  "Household Essentials",
  "Instant & Packaged Food",
  "Baby & Pet Care",
];

const units = ["kg", "g", "liter", "ml", "piece", "pack"];

function AddGrocery() {
  const [name, setName] = useState("");
  const [Catergory, setCategory] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [backendImage, setBackendImage] = useState<File | null>(null);

 
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setBackendImage(file);
    setPreview(URL.createObjectURL(file));
  };

  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", Catergory);
      formData.append("price", price);
      formData.append("unit", unit);

      if (backendImage) {
        formData.append("image", backendImage);
      }

      const result = await axios.post(
        "/api/admin/add-grocery",
        formData
      );
      console.log(result.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-green-50 to-white py-16 px-4 relative">
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-green-700 font-semibold bg-white px-4 py-2 rounded-full shadow-md hover:bg-green-100 transition-all"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="hidden md:flex">Back to home</span>
      </Link>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white w-full max-w-2xl shadow-2xl rounded-3xl border border-green-100 p-8"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-3">
            <PlusCircle className="text-green-600 w-8 h-8" />
            <h1>Add Your Grocery</h1>
          </div>
        </div>

        <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="eg: sweets, Milk"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-xl px-4 py-3"
          />

          <select
            value={Catergory}
            onChange={(e) => setCategory(e.target.value)}
            className="border rounded-xl px-4 py-3"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="border rounded-xl px-4 py-3"
          >
            <option value="">Select Unit</option>
            {units.map((u) => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="eg. 120"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="border rounded-xl px-4 py-3"
          />

          <label className="cursor-pointer flex gap-2 items-center">
            <Upload />
            Upload image
            <input type="file" hidden accept="image/*" onChange={handleImageChange} />
          </label>

          {preview && (
            <Image
              src={preview}
              width={100}
              height={100}
              alt="preview"
              className="rounded-xl"
            />
          )}

          <motion.button
            disabled={loading}
            whileTap={{ scale: 0.9 }}
            className="bg-green-600 text-white py-3 rounded-xl"
          >
            {loading ? <Loader className="animate-spin" /> : "Add Grocery"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}

export default AddGrocery;
