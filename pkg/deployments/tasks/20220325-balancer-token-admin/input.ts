import Task, { TaskMode } from '../../src/task';

export type BalancerTokenAdminDeployment = {
  BAL: string;
  Vault: string;
};

const TestBALTask = new Task('20220325-test-balancer-token', TaskMode.READ_ONLY);
const Vault = new Task('20210418-vault', TaskMode.READ_ONLY);

export default {
  Vault,
  mainnet: {
    BAL: '0xba100000625a3754423978a60c9317c58a424e3D',
  },
  kovan: {
    BAL: TestBALTask.output({ network: 'kovan' }).TestBalancerToken,
  },
  goerli: {
    BAL: TestBALTask.output({ network: 'goerli' }).TestBalancerToken,
  },
  defiverse: {
    BAL: '0x1F6fB04E57ff270B2c97168e48b5bf5a1e32D8b7',
  },
};
