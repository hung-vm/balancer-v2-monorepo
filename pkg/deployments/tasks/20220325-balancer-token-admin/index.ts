import Task from '../../src/task';
import { TaskRunOptions } from '../../src/types';
import { BalancerTokenAdminDeployment } from './input';

export default async (task: Task, { force, from }: TaskRunOptions = {}): Promise<void> => {
  const input = task.input() as BalancerTokenAdminDeployment;

  const args = [input.Vault, input.BAL];
  let admin = await task.deployAndVerify('BalancerTokenAdmin', args, from, force);
  // await admin.activate();
};
