export const formatAddress = (
  address: string | null | undefined, 
  startChars: number = 6, 
  endChars: number = 4
): string => {
  if (!address) return 'Not connected';
  if (address.length <= startChars + endChars) return address;
  
  return `${address.slice(0, startChars)}...${address.slice(-endChars)}`;
};
