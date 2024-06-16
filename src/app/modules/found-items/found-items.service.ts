import { TClaim, TFoundItem } from './found-items.interface';
import FoundItem, { Claim } from './found-items.model';

const createFoundItem = async (payload: TFoundItem, userId: string) => {
  const result = await FoundItem.create({ ...payload, userId });

  return result;
};
const createClaim = async (payload: TClaim) => {
  const alreadyClaimed = await Claim.findOne({
    id: payload.id,
    userId: payload.userId,
  });
  if (alreadyClaimed) throw new Error('you are already claimed!');
  const result = await Claim.create(payload);

  return result;
};
const getMyClaims = async (userId: string) => {
  const result = await Claim.find({
    userId: userId,
  });

  return result;
};

const getAllFoundItem = async () => {
  const result = await FoundItem.find().sort({ createdAt: -1 });

  return result;
};
const getMyFoundItems = async (userId: string) => {
  const result = await FoundItem.find({ userId }).sort({ createdAt: -1 });

  return result;
};
const updateStatus = async (payload: { id: string; status: string }) => {
  const result = await FoundItem.findByIdAndUpdate(payload?.id, {
    $set: { status: payload.status },
  });

  return result;
};
const deleteFoundItem = async (id: string) => {
  const result = await FoundItem.findByIdAndDelete(id);

  return result;
};

const FoundItemServices = {
  createFoundItem,
  createClaim,
  getMyClaims,
  getAllFoundItem,
  getMyFoundItems,

  updateStatus,
  deleteFoundItem,
};
export default FoundItemServices;
