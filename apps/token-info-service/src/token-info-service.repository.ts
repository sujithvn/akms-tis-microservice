import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, FilterQuery } from "mongoose";
import { TokenInfoService, TokenInfoServiceDocument } from "./schema/tis.schema";

Injectable()
export class TokenInfoServiceRepository {
    constructor(@InjectModel(TokenInfoService.name) private tisModel: Model<TokenInfoServiceDocument>) {}

    async findOne(filter: FilterQuery<TokenInfoService>): Promise<TokenInfoService> {
        return this.tisModel.findOne(filter);
    }

    async find(filter: FilterQuery<TokenInfoService>): Promise<TokenInfoService[]> {
        return this.tisModel.find(filter);
    }

    async create(tis: TokenInfoService): Promise<TokenInfoService> {
        const createdTis = new this.tisModel(tis);
        return createdTis.save();
    }

    async findOneAndUpdate(filter: FilterQuery<TokenInfoService>, tis: Partial<TokenInfoService>): Promise<TokenInfoService> {
        return this.tisModel.findOneAndUpdate(filter, tis, { new: true });
    }

    async findOneAndDelete(filter: FilterQuery<TokenInfoService>): Promise<TokenInfoService> {
        return this.tisModel.findOneAndDelete(filter);        
    }

}