import { Schema, model } from 'mongoose';

import { TClaim, TFoundItem } from './found-items.interface';

const FoundItemSchema = new Schema<TFoundItem>(
  {
    userId: { type: String },
    category: { type: String },
    description: { type: String },
    date: { type: String },
    location: { type: String },
    email: { type: String },
    status: { type: String, enum: ['found', 'not found'] },
    image: { type: String },
  },
  { timestamps: true },
);

const ClaimSchema = new Schema<TClaim>(
  {
    id: { type: String },
    userId: { type: String },
    description: { type: String },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

export const Claim = model<TClaim>('Claim', ClaimSchema);

const FoundItem = model<TFoundItem>('FoundItem', FoundItemSchema);

export default FoundItem;
