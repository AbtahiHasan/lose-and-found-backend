import { TClaim, TFoundItem } from './found-items.interface';
import FoundItem, { Claim } from './found-items.model';

const createFoundItem = async (payload: TFoundItem) => {
  const result = await FoundItem.create(payload);

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
const getAllFoundItem = async () => {
  const result = await FoundItem.find().sort({ createdAt: -1 });

  return result;
};
const getMyFoundItems = async (userId: string) => {
  const result = await FoundItem.find({ userId }).sort({ createdAt: -1 });

  return result;
};

const FoundItemServices = {
  createFoundItem,
  createClaim,
  getAllFoundItem,
  getMyFoundItems,
};
export default FoundItemServices;
