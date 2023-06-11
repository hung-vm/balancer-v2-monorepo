import Task from '../../src/task';
import { TaskRunOptions } from '../../src/types';
import { ChildChainLiquidityGaugeFactoryDeployment } from './input';
import * as expectEvent from '@balancer-labs/v2-helpers/src/test/expectEvent';

export default async (task: Task, { force, from }: TaskRunOptions = {}): Promise<void> => {
  const input = task.input() as ChildChainLiquidityGaugeFactoryDeployment;

  const gaugeArgs = [input.BAL, input.Vault, input.AuthorizerAdaptor];
  const gaugeImplementation = await task.deploy('RewardsOnlyGauge', gaugeArgs, from, force);

  const streamerArgs = [input.BAL, input.AuthorizerAdaptor];
  const streamerImplementation = await task.deploy('ChildChainStreamer', streamerArgs, from, force);

  const factoryArgs = [gaugeImplementation.address, streamerImplementation.address];
  let factory = await task.deployAndVerify('ChildChainLiquidityGaugeFactory', factoryArgs, from, force);

  // let rs = await (await factory.create('0xEBc6bE23b7BD76774e8a9a168619954d07818c23')).wait();
  // console.log(rs);

  // const event = expectEvent.inReceipt(rs, 'RewardsOnlyGaugeCreated');

  // console.log('Gauge:', event.args.gauge);

  let rs = await (await factory.create('0xD3361154e84118704bc404a8d290353543db0048')).wait();
  console.log(rs);

  const event = expectEvent.inReceipt(rs, 'RewardsOnlyGaugeCreated');

  console.log('Gauge:', event.args.gauge);
};
