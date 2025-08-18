import BigNumber from 'bignumber.js';

export const SECONDS_IN_A_YEAR = 3600 * 24 * 364;

export const aprToApy = (apr: BigNumber, compoundingInterval: number): BigNumber => {
  const base = BigNumber(1).plus(BigNumber(apr).times(compoundingInterval).dividedBy(SECONDS_IN_A_YEAR));
  const exp = BigNumber(SECONDS_IN_A_YEAR).dividedBy(compoundingInterval);

  return BigNumber(Math.pow(base.toNumber(), exp.toNumber())).minus(1);
};
