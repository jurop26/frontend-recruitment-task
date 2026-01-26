import { Router } from "express";
import { randomUUID } from "crypto";
import { getAll, getById, create, update, remove } from "../db/db.js";

const router = Router();
const COLLECTION = "clips";

/**
 * GET /api/clips
 * Get all clips
 */
router.get("/", (req, res) => {
  console.log("GET /api/clips");
  const clips = getAll(COLLECTION);
  res.json(clips);
});

/**
 * GET /api/clips/:id
 * Get a single clip by ID
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(`GET /api/clips/${id}`);

  const clip = getById(COLLECTION, id);

  if (!clip) {
    return res.status(404).json({ error: "Clip not found" });
  }

  res.json(clip);
});

/**
 * POST /api/clips
 * Create a new clip
 */
router.post("/", (req, res) => {
  console.log("POST /api/clips", req.body);

  const newProject = {
    id: randomUUID(),
    data: req.body || {},
  };

  const created = create(COLLECTION, newProject);
  res.status(201).json(created);
});

/**
 * PUT /api/clips/:id
 * Update an existing project
 */
router.put("/:id", (req, res) => {
  const { id } = req.params;
  console.log(`PUT /api/clips/${id}`, req.body);

  const existing = getById(COLLECTION, id);

  if (!existing) {
    return res.status(404).json({ error: "Clip not found" });
  }

  const updatedProject = {
    id,
    data: req.body || {},
  };

  const result = update(COLLECTION, id, updatedProject);
  res.json(result);
});

/**
 * DELETE /api/clips/:id
 * Delete a project
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  console.log(`DELETE /api/clips/${id}`);

  const success = remove(COLLECTION, id);

  if (!success) {
    return res.status(404).json({ error: "Clip not found" });
  }

  res.status(204).send();
});

export default router;
