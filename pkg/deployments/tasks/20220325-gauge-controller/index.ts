import Task from '../../src/task';
import { TaskRunOptions } from '../../src/types';
import { GaugeSystemDeployment } from './input';

export default async (task: Task, { force, from }: TaskRunOptions = {}): Promise<void> => {
  const input = task.input() as GaugeSystemDeployment;

  //const veBALArgs = [input.BPT, 'Vote Escrowed Balancer BPT', 'veBAL', input.AuthorizerAdaptor];
  const veBALArgs = [input.BPT, 'Vote Escrowed Defiverse BPT', 'veDFV', input.AuthorizerAdaptor];
  const veBAL = await task.deploy('VotingEscrow', veBALArgs, from, force);

  const gaugeControllerArgs = [veBAL.address, input.AuthorizerAdaptor];
  // const gaugeControllerArgs = ["0x90A1cA7A41426fc5E4a90801891B7167b0A45A58", input.AuthorizerAdaptor];
  const gaugeController = await task.deploy('GaugeController', gaugeControllerArgs, from, force);

  const minterArgs = [input.BalancerTokenAdmin, gaugeController.address];
  await task.deploy('BalancerMinter', minterArgs, from, force);
};
