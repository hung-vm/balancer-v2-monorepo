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
const oracle = "0xB0A3E83540923ecFfc9a8eE9042F30b6AD4a6B01";

export default {
  Authorizer,
  pauseWindowDuration: 3 * MONTH,
  bufferPeriodDuration: MONTH,
  WETH,
  oracle
};
