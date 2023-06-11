import Task from '../../src/task';
import { TaskRunOptions } from '../../src/types';
import { LiquidityGaugeFactoryDeployment } from './input';
import * as expectEvent from '@balancer-labs/v2-helpers/src/test/expectEvent';

export default async (task: Task, { force, from }: TaskRunOptions = {}): Promise<void> => {
  const input = task.input() as LiquidityGaugeFactoryDeployment;

  const gaugeImplementationArgs = [input.BalancerMinter, input.VotingEscrowDelegationProxy, input.AuthorizerAdaptor];
  const gaugeImplementation = await task.deploy('LiquidityGaugeV5', gaugeImplementationArgs, from, force);

  const args = [gaugeImplementation.address];
  let factory = await task.deployAndVerify('LiquidityGaugeFactory', args, from, force);

  // let rs = await (await factory.create('0xD3361154e84118704bc404a8d290353543db0048', "20000000000000000")).wait();
  // console.log(rs);

  // const event = expectEvent.inReceipt(rs, 'GaugeCreated');

  // console.log('event.args:', event.args);


};
