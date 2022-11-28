import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import FileService from "./fileService";
const prisma = new PrismaClient();

class CategoryController {
  async getAll(req: Request, res: Response) {
    try {
      const categories = await prisma.category.findMany();
      res.json(categories);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.category.update({
        where: { id: Number(id) },
        data: {
          positions: {
            deleteMany: {},
          },
        },
      });
      const category = await prisma.category.delete({
        where: { id: Number(id) },
        // include: { positions: true },
      });
      res.json(category);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async getCategoryWithPositions(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const category = await prisma.category.findUnique({
        where: { id: Number(id) },
        include: {
          positions: true,
        },
      });
      res.json(category);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async create(req: Request, res: Response) {
    try {
      let imageName;
      if (req.files) {
        imageName = await FileService.saveFile(req.files);
      }
      const { name } = req.body;
      const result = await prisma.category.create({
        data: { name, imageName },
      });
      res.json(result);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      let imageName;
      if (req.files) {
        imageName = await FileService.saveFile(req.files);
      }
      const { name } = req.body;
      const result = await prisma.category.update({
        where: { id: Number(id) },
        data: { name, imageName },
      });
      res.json(result);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new CategoryController();
