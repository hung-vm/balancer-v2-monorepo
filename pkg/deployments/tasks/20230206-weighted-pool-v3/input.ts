import Task, { TaskMode } from '../../src/task';
import { MONTH } from '@balancer-labs/v2-helpers/src/time';

export type WeightedPoolDeployment = {
  Vault: string;
  ProtocolFeePercentagesProvider: string;
  FactoryVersion: string;
  PoolVersion: string;
  WETH: string;
  BAL: string;
  pauseWindowDuration: number;
  bufferPeriodDuration: number;
};

const Vault = new Task('20210418-vault', TaskMode.READ_ONLY);
const ProtocolFeePercentagesProvider = new Task('20220725-protocol-fee-percentages-provider', TaskMode.READ_ONLY);
const WETH = new Task('00000000-tokens', TaskMode.READ_ONLY);
const BAL = new Task('00000000-tokens', TaskMode.READ_ONLY);

const BaseVersion = { version: 3, deployment: '20230206-weighted-pool-v3' };

export default {
  Vault,
  ProtocolFeePercentagesProvider,
  WETH,
  BAL,
  FactoryVersion: JSON.stringify({ name: 'WeightedPoolFactory', ...BaseVersion }),
  PoolVersion: JSON.stringify({ name: 'WeightedPool', ...BaseVersion }),
  pauseWindowDuration: 3 * MONTH,
  bufferPeriodDuration: MONTH,
};
