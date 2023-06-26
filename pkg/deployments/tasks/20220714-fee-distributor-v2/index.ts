import Task from '../../src/task';
import { TaskRunOptions } from '../../src/types';
import { FeeDistributorDeployment } from './input';

const week = 86400 * 7;

export default async (task: Task, { force, from }: TaskRunOptions = {}): Promise<void> => {
  const input = task.input() as FeeDistributorDeployment;

  const args = [input.VotingEscrow, input.startTime];
  let contract = await task.deployAndVerify('FeeDistributor', args, from, force);
  // let tx = await contract.depositToken('0xA3496414a9900A9AE5960C1fEC30e563213b68bE', '1000000000000000000000');
  // console.log('==========tx:', tx);

  let ts = Math.floor((1686643082 + 600) / week) * week;
  let nextWeek = Math.floor((1686643082 + 600) / week) * week + week;

  let tx = null;
  tx = await contract.getUserTimeCursor('0x343eCF760a020936eEE8D655b43C5cBD40769A05');
  console.log('tx:', tx);

  tx = await contract.getTokenTimeCursor('0xA3496414a9900A9AE5960C1fEC30e563213b68bE');
  console.log('tx:', tx);

  tx = await contract.getUserTokenTimeCursor("0x343eCF760a020936eEE8D655b43C5cBD40769A05",'0xA3496414a9900A9AE5960C1fEC30e563213b68bE');
  console.log('tx:', tx);

  tx = await contract.getUserBalanceAtTimestamp("0x343eCF760a020936eEE8D655b43C5cBD40769A05",ts);
  console.log('tx:', tx);



};
