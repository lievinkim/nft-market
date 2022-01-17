import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NftsCreateDto } from './dto/nfts.create.dto';
import { NftDto } from './dto/nfts.dto';
import { Nfts } from './nfts.schema';

@Injectable()
export class NftsRepository {
  constructor(
    @InjectModel(Nfts.name) private readonly nftsModel: Model<Nfts>,
  ) {}

  async getAllNfts(): Promise<NftDto[]> {
    try {
      return await this.nftsModel.find({ minted: true });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async getMyNfts(owner): Promise<NftDto[]> {
    try {
      return await this.nftsModel.find({ owner: owner });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async mintNft(owner): Promise<NftDto> {
    try {
      const unmintedNft = await this.nftsModel.aggregate([
        { $match: { minted: false } },
        { $sample: { size: 1 } },
      ]);

      return await this.nftsModel.findOneAndUpdate(
        { _id: unmintedNft[0]._id },
        {
          minted: true,
          owner: owner,
        },
        {
          upsert: true,
        },
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async createNft(nftsCreateDto: NftsCreateDto): Promise<NftDto> {
    return await this.nftsModel.create(nftsCreateDto);
  }
}
