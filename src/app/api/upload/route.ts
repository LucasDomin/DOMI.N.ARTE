import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdminClient, isSupabaseStorageConfigured, SUPABASE_BUCKET } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Nenhum arquivo enviado." }, { status: 400 });
    }

    // Production path: upload to Supabase Storage
    if (isSupabaseStorageConfigured) {
      const supabase = getSupabaseAdminClient();
      if (supabase) {
        const ext = file.name.split(".").pop() || "bin";
        const key = `works/${Date.now()}-${Math.random().toString(36).slice(2, 9)}.${ext}`;
        const arrayBuffer = await file.arrayBuffer();

        const { error } = await supabase.storage
          .from(SUPABASE_BUCKET)
          .upload(key, arrayBuffer, {
            contentType: file.type || "application/octet-stream",
            upsert: false,
          });

        if (error) {
          return NextResponse.json({ error: error.message }, { status: 500 });
        }

        const { data } = supabase.storage.from(SUPABASE_BUCKET).getPublicUrl(key);
        return NextResponse.json({ url: data.publicUrl, storage: "supabase" });
      }
    }

    // Fallback: base64 data URL (dev / no Supabase). Capped to avoid bloating DB.
    const MAX_FALLBACK_BYTES = 2.5 * 1024 * 1024; // 2.5MB
    if (file.size > MAX_FALLBACK_BYTES) {
      return NextResponse.json(
        {
          error:
            "Arquivo muito grande para o modo local. Configure o Supabase Storage para uploads ilimitados.",
        },
        { status: 413 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const dataUrl = `data:${file.type};base64,${buffer.toString("base64")}`;
    return NextResponse.json({ url: dataUrl, storage: "inline" });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Falha no upload.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
