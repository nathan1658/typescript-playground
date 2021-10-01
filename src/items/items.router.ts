/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";
import * as ItemService from "./items.service";
import { BaseItem, Item } from "./item.interface";
import { networkInterfaces } from "os";

/**
 * Router Definition
 */

export const itemsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items

itemsRouter.get("/", async (req: Request, res: Response) => {
    try {
        const items: Item[] = await ItemService.findAll();
        res.status(200).send(items);
    } catch (e) {
        res.status(500).send(e.message);
    }
})


// GET items/:id

itemsRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    try {
        const item = await ItemService.find(id);
        if (item) return res.status(200).send(item);

        return res.status(404).send("Item not found.");
    } catch (e) {
        res.status(500).send(e.message);
    }
})

// POST items

itemsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const item: BaseItem = req.body;
        const newItem = await ItemService.create(item);


        return res.status(201).json(newItem);
    } catch (e) {
        return res.status(500).send(e.message);
    }
})

// PUT items/:id

itemsRouter.put("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    try {
        const itemUpdate: Item = req.body;
        const existingItem: Item = await ItemService.find(id);
        if (!existingItem) {
            const newItem = await ItemService.create(itemUpdate);
            return res.status(201).json(newItem);
        }
        //update existing

        const updatedItem = await ItemService.update(id, itemUpdate);
        return res.status(200).json(updatedItem);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
})

// DELETE items/:id


itemsRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10);
        await ItemService.remove(id);
        res.sendStatus(204);
    } catch (ex) {
        return res.status(500).send(ex.message);
    }
});