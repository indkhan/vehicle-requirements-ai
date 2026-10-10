import { expect, test } from 'vitest';
import { journeySample, dampProgress, angleFrames, fitImage, studioBox } from './journeyMotion.js';
import { models } from './journeyData.js';
test('includes the complete requested dataset without invented G68 trims', () => {
  expect(models).toHaveLength(24);
  expect(['F70','G60','G70','G68'].map(f => models.filter(m=>m.family===f).length)).toEqual([6,10,7,1]);
  expect(new Set(models.map(m=>m.id)).size).toBe(24);
});
test('keeps camera angle continuous across every family handoff and reverses exactly', () => {
  for(let boundary=1;boundary<4;boundary++) {
    const before=journeySample(boundary-0.0001), after=journeySample(boundary+0.0001);
    expect(Math.abs(before.angle-after.angle)).toBeLessThan(0.1);
    expect(before.to).toBe(after.from);
    expect(before.mix).toBeCloseTo(1,2);
    expect(after.mix).toBeCloseTo(0,2);
    expect(before.cabin).toBeCloseTo(after.cabin,2);
  }
  expect(journeySample(1.4)).toEqual(journeySample(1.4));
});
test('damping is frame-rate independent and angles wrap without a last-frame jump', () => {
  const whole=dampProgress(0,2,1/30);
  expect(dampProgress(dampProgress(0,2,1/60),2,1/60)).toBeCloseTo(whole,8);
  expect(angleFrames(359,36)).toEqual({first:35,second:0,mix:0.9});
  expect(angleFrames(360,36)).toEqual({first:0,second:1,mix:0});
});

test('each family enters its cabin and returns outside before the next handoff',()=>{
  for(let family=0;family<4;family++){
    expect(journeySample(family).cabin).toBe(0);
    expect(journeySample(family+.6).cabin).toBeCloseTo(1);
    expect(journeySample(family+.8).cabin).toBeLessThan(1);
    expect(journeySample(family+.93).cabin).toBe(0);
  }
  expect(journeySample(.95).mix).toBeCloseTo(.5);
  expect(journeySample(4).from).toBe(3);
});
test('wide G68 imagery retains its native proportions in the popup',()=>{
  const fitted=fitImage(960,400,{x:24,y:12,width:912,height:516});
  expect(fitted.width/fitted.height).toBe(2.4);
  expect(fitted.height).toBe(380);
});
test('hero framing contains the entire F70 on phone, desktop and short screens',()=>{
  for(const [width,height] of [[390,844],[1440,900],[1280,600]]){
    const fitted=fitImage(960,540,studioBox(width,height));
    expect(fitted.x).toBeGreaterThanOrEqual(0);
    expect(fitted.x+fitted.width).toBeLessThanOrEqual(width);
    expect(fitted.y+fitted.height).toBeLessThanOrEqual(height);
    expect(fitted.width/fitted.height).toBeCloseTo(16/9);
  }
});
