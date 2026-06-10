"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [foods, setFoods] = useState<any[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const getFoods = async () => {
    const { data } = await supabase
      .from("foods")
      .select("*")
      .order("id", { ascending: false });

    setFoods(data || []);
  };

  useEffect(() => {
    getFoods();
  }, []);

  const addFood = async (e: React.FormEvent) => {
    e.preventDefault();

    let imageUrls: string[] = [];

    for (const file of imageFiles) {
      const fileName =
        Date.now() + "-" + Math.random() + "-" + file.name;

      const { error: uploadError } =
        await supabase.storage
          .from("foods")
          .upload(fileName, file);

      if (uploadError) {
        alert(uploadError.message);
        return;
      }

      const { data } = supabase.storage
        .from("foods")
        .getPublicUrl(fileName);

      imageUrls.push(data.publicUrl);
    }

    const { error } = await supabase
      .from("foods")
      .insert([
        {
          title,
          price: Number(price),
          category,
          images: imageUrls,
        },
      ]);

    if (error) {
      alert(error.message);
      return;
    }

    setTitle("");
    setPrice("");
    setCategory("");
    setImageFiles([]);

    getFoods();
  };

  const deleteFood = async (id: number) => {
    if (!confirm("حذف شود؟")) return;

    await supabase
      .from("foods")
      .delete()
      .eq("id", id);

    getFoods();
  };

  const deleteImage = async (
    foodId: number,
    imageUrl: string,
    images: string[]
  ) => {
    const newImages = images.filter(
      (img) => img !== imageUrl
    );

    await supabase
      .from("foods")
      .update({
        images: newImages,
      })
      .eq("id", foodId);

    getFoods();
  };

  const addImageToFood = async (
    foodId: number,
    file: File,
    currentImages: string[]
  ) => {
    const fileName =
      Date.now() + "-" + file.name;

    const { error } =
      await supabase.storage
        .from("foods")
        .upload(fileName, file);

    if (error) {
      alert(error.message);
      return;
    }

    const { data } = supabase.storage
      .from("foods")
      .getPublicUrl(fileName);

    await supabase
      .from("foods")
      .update({
        images: [
          ...currentImages,
          data.publicUrl,
        ],
      })
      .eq("id", foodId);

    getFoods();
  };

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">
        پنل مدیریت
      </h1>

      <form
        onSubmit={addFood}
        className="space-y-4 max-w-xl"
      >
        <input
          type="text"
          placeholder="نام غذا"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="w-full p-3 rounded bg-zinc-900"
        />

        <input
          type="number"
          placeholder="قیمت"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          className="w-full p-3 rounded bg-zinc-900"
        />

        <input
          type="text"
          placeholder="دسته بندی"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="w-full p-3 rounded bg-zinc-900"
        />

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) =>
            setImageFiles(
              Array.from(
                e.target.files || []
              ).slice(0, 5)
            )
          }
          className="w-full"
        />

        <button
          type="submit"
          className="bg-yellow-500 text-black px-6 py-3 rounded"
        >
          ثبت غذا
        </button>
      </form>

      <div className="mt-10 space-y-6">
        {foods.map((food) => (
          <div
            key={food.id}
            className="bg-zinc-900 p-5 rounded-xl"
          >
            <div className="flex justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  {food.title}
                </h2>

                <p>{food.category}</p>

                <p className="text-yellow-400">
                  {food.price?.toLocaleString(
                    "fa-IR"
                  )}{" "}
                  تومان
                </p>
              </div>

              <button
                onClick={() =>
                  deleteFood(food.id)
                }
                className="bg-red-600 px-4 py-2 rounded"
              >
                حذف غذا
              </button>
            </div>

            <div className="flex gap-3 flex-wrap mt-4">
              {food.images?.map(
                (
                  image: string,
                  index: number
                ) => (
                  <div
                    key={index}
                    className="relative"
                  >
                    <img
                      src={image}
                      alt=""
                      className="w-32 h-32 object-cover rounded"
                    />

                    <button
                      onClick={() =>
                        deleteImage(
                          food.id,
                          image,
                          food.images
                        )
                      }
                      className="absolute top-1 right-1 bg-red-600 w-6 h-6 rounded-full"
                    >
                      ×
                    </button>
                  </div>
                )
              )}
            </div>

            {food.images?.length < 5 && (
              <div className="mt-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file =
                      e.target.files?.[0];

                    if (!file) return;

                    addImageToFood(
                      food.id,
                      file,
                      food.images || []
                    );
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}