"use client";

import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  // fetch profile
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/user/profile");
        if (!res.ok) return;
        const data = await res.json();
        setUser(data);
        setName(data?.name || "");
        setPreview(data?.profilePic || "");
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    })();
  }, []);

  // handle file change
  function onFileChange(e) {
    const f = e.target.files?.[0];
    setFile(f || null);
    if (f) {
      setPreview(URL.createObjectURL(f));
    } else {
      setPreview(user?.profilePic || "");
    }
  }

  // handle form submit
  async function onSubmit(e) {
    e.preventDefault();
    try {
      const fd = new FormData();
      fd.append("name", name);
      if (file) fd.append("profilePic", file);

      const res = await fetch("/api/user/profile", {
        method: "PUT",
        body: fd,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        alert(err?.error || "Failed to update profile");
        return;
      }

      const updated = await res.json();
      setUser(updated);
      setFile(null);
      setPreview(updated.profilePic || "");
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      alert("Something went wrong.");
    }
  }

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>

      {/* profile pic */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
          {preview ? (
            <img
              src={preview}
              alt="Profile preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
        </div>
        <div className="text-sm text-gray-600">
          Accepted: JPG, PNG, WEBP, GIF. Max 5MB.
        </div>
      </div>

      {/* form */}
      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Profile Image</label>
          <input type="file" accept="image/*" onChange={onFileChange} />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
