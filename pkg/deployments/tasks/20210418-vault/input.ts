import Task, { TaskMode } from '../../src/task';
import { MONTH } from '@balancer-labs/v2-helpers/src/time';

export type VaultDeployment = {
  Authorizer: string;
  WETH: string;
  pauseWindowDuration: number;
  bufferPeriodDuration: number;
  oracle: string;
};

const Authorizer = new Task('20210418-authorizer', TaskMode.READ_ONLY);
const WETH = new Task('00000000-tokens', TaskMode.READ_ONLY);
const oracle = "0xed60472a4dc5410009B456019D6f88FA6bD480ee";

export default {
  Authorizer,
  pauseWindowDuration: 3 * MONTH,
  bufferPeriodDuration: MONTH,
  WETH,
  oracle
};
