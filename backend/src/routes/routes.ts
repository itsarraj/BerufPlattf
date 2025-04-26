// Import Express and create a router
import express from 'express';
const router = express.Router();

// API
router.post(`/api/`, async (req, res) => {
  console.log(req);
});
router.post(`/api/contacts`, async (req, res) => {});
router.get(`/api/contacts`, async (req, res) => {});

export default router;
