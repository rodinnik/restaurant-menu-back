import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import FileService from "./fileService";
const prisma = new PrismaClient();

class PositionController {
  async getAll(req: Request, res: Response) {
    try {
      const positions = await prisma.position.findMany();
      res.json(positions);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const position = await prisma.position.delete({
        where: { id: Number(id) },
      });
      res.json(position);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async getPositionById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const position = await prisma.position.findUnique({
        where: { id: Number(id) },
      });
      res.json(position);
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
      const { title, content, categoryId } = req.body;
      const result = await prisma.position.create({
        data: {
          title,
          content,
          imageName,
          category: { connect: { id: Number(categoryId) } },
        },
      });
      res.json(result);
    } catch (e) {
      console.log(e);
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
      const { title, content } = req.body;
      const result = await prisma.position.update({
        where: { id: Number(id) },
        data: {
          title,
          content,
          imageName,
        },
      });
      res.json(result);
    } catch (e) {
      console.log(e);
      res.status(500).json(e);
    }
  }
}

export default new PositionController();
