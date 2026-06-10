"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [foods, setFoods] = useState<any[]>([]);
const [imageFile, setImageFile] = useState<File | null>(null);
  const getFoods = async () => {
    
    const { data, error } = await supabase
      .from("foods")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setFoods(data || []);
  };

const deleteFood = async (id: number) => {
  const confirmed = confirm("حذف شود؟");

  if (!confirmed) return;

  const { error } = await supabase
    .from("foods")
    .delete()
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }
<input
  type="file"
  accept="image/*"
  onChange={(e) =>
    setImageFile(e.target.files?.[0] || null)
  }
  className="w-full"
/>
  getFoods();
};

  useEffect(() => {
    getFoods();
  }, []);

  const addFood = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase.from("foods").insert([
      {
        title,
        price: Number(price),
        category,
      },
    ]);

    if (error) {
      alert("خطا: " + error.message);
      return;
    }

    alert("غذا با موفقیت ثبت شد");

    setTitle("");
    setPrice("");
    setCategory("");

    getFoods();
  };

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">
        پنل مدیریت رستوران
      </h1>

      <form
        onSubmit={addFood}
        className="max-w-xl space-y-4"
      >
        <input
          type="text"
          placeholder="نام غذا"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded bg-zinc-900 border border-zinc-700"
          required
        />

        <input
          type="number"
          placeholder="قیمت"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="w-full p-3 rounded bg-zinc-900 border border-zinc-700"
          required
        />

        <input
          type="text"
          placeholder="دسته بندی"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 rounded bg-zinc-900 border border-zinc-700"
          required
        />

        <button
          type="submit"
          className="bg-yellow-500 text-black px-6 py-3 rounded font-bold"
        >
          ثبت غذا
        </button>
      </form>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">
          لیست غذاها
        </h2>

        <div className="space-y-3">
          {foods.map((food) => (
            <div
              key={food.id}
              className="flex justify-between items-center bg-zinc-900 p-4 rounded-lg border border-zinc-800"
            >
              <div>
                <h3 className="font-bold text-lg">
                  {food.title}
                </h3>

                <p className="text-zinc-400 text-sm">
                  {food.category}
                </p>
              </div>

             <div className="flex items-center gap-4">
  <span className="text-yellow-400 font-bold">
    {food.price?.toLocaleString("fa-IR")} تومان
  </span>

  <button
    onClick={() => deleteFood(food.id)}
    className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
  >
    حذف
  </button>
</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}