import Task from '../../src/task';
import { TaskRunOptions } from '../../src/types';
import { SingleRecipientGaugeFactoryDeployment } from './input';
import * as expectEvent from '@balancer-labs/v2-helpers/src/test/expectEvent';

export default async (task: Task, { force, from }: TaskRunOptions = {}): Promise<void> => {
  const input = task.input() as SingleRecipientGaugeFactoryDeployment;

  const args = [input.BalancerMinter];
  const factory = await task.deployAndVerify('SingleRecipientGaugeFactory', args, from, force);

  const implementation = await factory.getGaugeImplementation();
  await task.verify('SingleRecipientGauge', implementation, [input.BalancerMinter]);
  await task.save({ SingleRecipientGauge: implementation });

  // let rs = await (await factory.create('0xD3361154e84118704bc404a8d290353543db0048', "20000000000000000", false)).wait();
  // console.log(rs);

  // const event = expectEvent.inReceipt(rs, 'GaugeCreated');

  // console.log('Gauge:', event.args.gauge);
};
