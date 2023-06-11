import Task from '../../../src/task';
import { TaskRunOptions } from '../../../src/types';
import { LiquidityGaugeFactoryDeployment } from './input';

export default async (task: Task, { force, from }: TaskRunOptions = {}): Promise<void> => {
  const input = task.input() as LiquidityGaugeFactoryDeployment;

  const gaugeImplementationArgs = [input.BalancerMinter, input.VotingEscrowDelegationProxy, input.AuthorizerAdaptor];
  const gaugeImplementation = await task.deploy('LiquidityGaugeV5', gaugeImplementationArgs, from, force);

  const args = [gaugeImplementation.address];
  let factory = await task.deployAndVerify('LiquidityGaugeFactory', args, from, force);

  let rs = await (await factory.create('0x1dE1Ee5Bf70009462702652A7925f3c956A6feCC')).wait();
  console.log(rs);

  const event = expectEvent.inReceipt(rs, 'GaugeCreated');

  console.log('event.args:', event.args);
};
