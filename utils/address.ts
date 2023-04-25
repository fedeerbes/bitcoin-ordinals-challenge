export const formatAddressForDisplay = ({
  currentAddress,
  truncationLength = 12,
}: {
  currentAddress: string;
  truncationLength?: number;
}) =>
  [
    currentAddress.substring(0, truncationLength),
    currentAddress.substring(currentAddress.length - truncationLength),
  ].join('...');
