import Task from '../../src/task';
import { TaskRunOptions } from '../../src/types';

const week = 86400 * 7;

export default async (task: Task, { force, from }: TaskRunOptions = {}): Promise<void> => {
  let ts = Math.round((1686643082 + 600) / week) * week;
  let nextWeek = Math.round((1686643082 + 600) / week) * week + week;

  let contract = await task.deployAndVerify('DistributionScheduler', [], from, force);

  console.log('ts:',ts);
  console.log('nextWeek:',nextWeek);
  //
  let tx = null;
  const rewardToken = '0xA3496414a9900A9AE5960C1fEC30e563213b68bE'; // DFV
  const gaugePools = [
    '0x63930B109B0277fb93f282748f4dEad7128c0a52',
    '0x58ddE15d0B9D3b0c5eBcA26484709B64834E7f17',
    '0x51882a89c9B2044d7D6fc4094F34694e9C91b11F',
  ];

  // tx = await contract.scheduleDistribution(
  //   gaugePools[0], // gauge pool
  //   rewardToken, // token
  //   '1000000000000000000000', // amount
  //   ts // startTime
  // );
  // console.log('======tx:', tx);

  // let tx = await contract.scheduleDistribution(
  //   gaugePools[1], // gauge pool
  //   rewardToken, // token
  //   '1000000000000000000000', // amount
  //   ts // startTime
  // );
  // console.log('======tx:', tx);

  // tx = await contract.scheduleDistribution(
  //   gaugePools[2], // gauge pool
  //   rewardToken, // token
  //   '1500000000000000000000', // amount
  //   ts // startTime
  // );
  // console.log('======tx:', tx);


  // Start distribution
  // tx = await contract.startDistributionForToken(gaugePools[0], rewardToken);
  // console.log('======tx:', tx);

  // tx = await contract.startDistributions(gaugePools[1]);
  // console.log('======tx:', tx);

  // tx = await contract.startDistributions(gaugePools[2]);
  // console.log('======tx:', tx);

  tx = await contract.getPendingRewardsAt(gaugePools[2], rewardToken, nextWeek);
  console.log('======tx:', tx);
};
