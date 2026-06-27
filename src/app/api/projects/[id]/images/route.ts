import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { DEFAULT_PROJECTS, Still } from "@/lib/defaults";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projectId = parseInt(id);

    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, projectId));

    if (!project) {
      const fallback = DEFAULT_PROJECTS.find((p) => p.id === projectId);
      if (fallback) return NextResponse.json(fallback.stills);
      return NextResponse.json([]);
    }

    const stills = (project.stills as Still[]) || [];
    return NextResponse.json(stills);
  } catch (error) {
    return NextResponse.json([]);
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projectId = parseInt(id);
    const body = await req.json();

    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, projectId));

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const currentStills = (project.stills as Still[]) || [];
    const newStill: Still = {
      url: body.url,
      type: body.type || "branding",
      order: currentStills.length,
    };

    const updatedStills = [...currentStills, newStill];

    const [updatedProject] = await db
      .update(projects)
      .set({ stills: updatedStills, updatedAt: new Date() })
      .where(eq(projects.id, projectId))
      .returning();

    return NextResponse.json(newStill, { status: 201 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to add image";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projectId = parseInt(id);
    const body = await req.json();

    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, projectId));

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    let currentStills = (project.stills as Still[]) || [];

    if (body.reorder && Array.isArray(body.images)) {
      // Reorder using provided mappings
      const reorderedStills: Still[] = [];
      const imageMap = new Map<string, number>(body.images.map((img: any) => [String(img.id || img.url), Number(img.order)]));

      currentStills.forEach((still) => {
          const key = String(still.url);
          const newOrder = imageMap.get(key);
        if (newOrder !== undefined) {
          reorderedStills.push({ ...still, order: newOrder });
        } else {
          reorderedStills.push(still);
        }
      });

      // Sort by order ascendingly
      reorderedStills.sort((a, b) => a.order - b.order);

      const [updatedProject] = await db
        .update(projects)
        .set({ stills: reorderedStills, updatedAt: new Date() })
        .where(eq(projects.id, projectId))
        .returning();

      return NextResponse.json({ success: true, stills: reorderedStills });
    }

    if (body.url && body.type) {
      // Update individual metadata or url
      const updatedStills = currentStills.map((still) => {
        if (still.url === body.url) {
          return { ...still, type: body.type };
        }
        return still;
      });

      await db
        .update(projects)
        .set({ stills: updatedStills, updatedAt: new Date() })
        .where(eq(projects.id, projectId));

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to update images";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const projectId = parseInt(id);
    const { searchParams } = new URL(req.url);
    const urlToDelete = searchParams.get("url");

    if (!urlToDelete) {
      return NextResponse.json({ error: "Missing image url" }, { status: 400 });
    }

    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, projectId));

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const currentStills = (project.stills as Still[]) || [];
    const filteredStills = currentStills
      .filter((still) => still.url !== urlToDelete)
      .map((still, index) => ({ ...still, order: index }));

    await db
      .update(projects)
      .set({ stills: filteredStills, updatedAt: new Date() })
      .where(eq(projects.id, projectId));

    return NextResponse.json({ success: true, stills: filteredStills });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Failed to delete image";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
