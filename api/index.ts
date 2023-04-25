import { OrdinalDetail, Utxo } from './types';

const XVERSE_BASE_URL = 'https://api.xverse.app/v1';

const getOrdinalDetailsById = async (id: string) => {
  try {
    const response = await fetch(`${XVERSE_BASE_URL}/ordinals/${id}`);

    if (response.status >= 400) {
      return;
    }

    const ordinalId = await response.json();
    return ordinalId;
  } catch (error) {
    console.error(error);
  }
};

const getOrdinalIdByTxId = async (txId: string) => {
  try {
    const response = await fetch(
      `${XVERSE_BASE_URL}/ordinals/output/${txId}/0`,
    );

    if (response.status >= 400) {
      return;
    }

    const ordinalId = (await response.json()) as { id: string };
    return ordinalId;
  } catch (error) {
    console.error(error);
  }
};

const getUnspentOutputs = async (address: string) => {
  try {
    const response = await fetch(
      `https://blockstream.info/api/address/${address}/utxo`,
    );

    if (response.status >= 400) {
      return [];
    }

    const utxoList = (await response.json()) as Utxo[];
    return utxoList;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const filterOrdinalId = (ordinal?: {
  id: string;
}): ordinal is { id: string } => {
  return !!ordinal?.id;
};

export const getOrdinalsList = async (address: string) => {
  try {
    const utxoList = await getUnspentOutputs(address);

    const ordinalIdPromiseList = utxoList.map(async (utxo) =>
      getOrdinalIdByTxId(utxo.txid),
    );
    const ordinalIdList = await Promise.all(ordinalIdPromiseList);
    const ordinalIdListFiltered = ordinalIdList.filter(filterOrdinalId);

    const ordinalDetailsPromiseList = ordinalIdListFiltered.map(
      async (ordinalId) => getOrdinalDetailsById(ordinalId?.id),
    );
    const ordinalDetailsList = await Promise.all(ordinalDetailsPromiseList);

    return ordinalDetailsList as OrdinalDetail[];
  } catch (error) {
    console.error(error);
  }
};

export const getOrdinalContentById = async (id: string) => {
  try {
    const response = await fetch(`https://ordinals.com/content/${id}`);

    if (response.status >= 400) {
      return;
    }

    const contentType = response.headers.get('content-type')!;
    console.log(contentType);

    if (contentType.startsWith('application/json;')) {
      return response.json();
    }

    const ordinalId = await response.text();
    return ordinalId;
  } catch (error) {
    console.error(error);
  }
};
