import prisma from "@/lib/prisma";
import { IncomingForm } from "formidable";
import path from "path";
import { parse } from "cookie";
import { verifyJwt } from "@/lib/jwt";
import fs from "fs";
import fsp from "fs/promises";

export const config = {
  api: {
    bodyParser: false, // required for formidable
  },
};

function getUserIdFromReq(req) {
  try {
    const cookies = parse(req.headers.cookie || "");
    const token = cookies.token;
    if (!token) return null;
    const payload = verifyJwt(token);
    return payload?.id || null;
  } catch {
    return null;
  }
}

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

async function ensureUploadDir() {
  if (!fs.existsSync(UPLOAD_DIR)) {
    await fsp.mkdir(UPLOAD_DIR, { recursive: true });
  }
}

export default async function handler(req, res) {
  const userId = getUserIdFromReq(req);
  if (!userId) {
    return res.status(401).json({ success: false, message: "Not authenticated" });
  }

  if (req.method === "GET") {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true, profilePic: true },
      });
      return res.status(200).json(user);
    } catch (err) {
      console.error("GET /api/user/profile error:", err);
      return res.status(500).json({ error: "Failed to fetch profile" });
    }
  }

  if (req.method === "PUT") {
    try {
      await ensureUploadDir();

      const form = new IncomingForm({
        uploadDir: UPLOAD_DIR,
        keepExtensions: true,
        maxFileSize: 5 * 1024 * 1024, // 5MB
        multiples: false,
      });

      form.parse(req, async (err, fields, files) => {
        if (err) {
          console.error("Form parse error:", err);
          return res.status(400).json({ error: "Invalid form data" });
        }

        try {
          const name = (fields.name && String(fields.name)) || undefined;
          let imageUrl;

          const file = files.profilePic;
          if (file) {
            const fileObj = Array.isArray(file) ? file[0] : file;

            // Validate mime type
            const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
            if (!allowed.includes(fileObj.mimetype)) {
              if (fileObj.filepath && fs.existsSync(fileObj.filepath)) {
                await fsp.unlink(fileObj.filepath);
              }
              return res.status(400).json({ error: "Unsupported image type" });
            }

            const fileName = path.basename(fileObj.filepath);
            imageUrl = `/uploads/${fileName}`;

            // remove old pic if replacing
            const existing = await prisma.user.findUnique({
              where: { id: userId },
              select: { profilePic: true },
            });
            if (existing?.profilePic && existing.profilePic.startsWith("/uploads/")) {
              const oldPath = path.join(process.cwd(), "public", existing.profilePic);
              if (fs.existsSync(oldPath)) {
                fsp.unlink(oldPath).catch(() => {});
              }
            }
          }

          const updated = await prisma.user.update({
            where: { id: userId },
            data: {
              ...(name !== undefined ? { name } : {}),
              ...(imageUrl ? { profilePic: imageUrl } : {}),
            },
            select: { id: true, name: true, email: true, profilePic: true },
          });

          return res.status(200).json(updated);
        } catch (e) {
          console.error("PUT /api/user/profile error:", e);
          return res.status(500).json({ error: "Failed to update profile" });
        }
      });
    } catch (e) {
      console.error("PUT /api/user/profile outer error:", e);
      return res.status(500).json({ error: "Unexpected error" });
    }
    return;
  }

  return res.status(405).json({ error: "Method not allowed" });
}
